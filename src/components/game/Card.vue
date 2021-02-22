<template>
  <div :style="getZIndex + getXYStyle" class="container p-0 m-0">
    <div v-if="draggable" :style="displayToolBar ? 'd-flex' : ''" class="toolbar h2 mb-2 icon-container container">
      <div v-b-tooltip.hover class="pointer icon" title="Retourner la carte" @click="returnCard">
        <b-icon-front/>
      </div>
      <div v-b-tooltip.hover class="pointer icon" title="Tourner la carte à droite" @click="turnRight">
        <b-icon-arrow-clockwise/>
      </div>
      <div v-b-tooltip.hover class="pointer icon" title="Défausser la carte" @click="discard">
        <b-icon-trash/>
      </div>
      <div v-b-tooltip.hover class="pointer icon" title="Reposer la carte dans la pioche" @click="backToPick">
        <b-icon-arrow-bar-up/>
      </div>
    </div>
    <div :style="getWidthHeight">
      <img :id="card.name"
           :src="src"
           :style="getRotation"
           alt="Start card"
           class="card-width grab m-0"
           @click="click"
           @touchend="touchEnd"
           @touchmove="touchMove"
           @touchstart="e => e.preventDefault"/>
    </div>
  </div>
</template>

<script>
export default {
  name:        'Card', props: {
    nbTotalCards: { default: 1 }, socket: { required: true }, draggable: { default: true }, returnAllowed: { default: true }, scenario: { default: 'demo' }, card: {
      default: () =>
               {
                 return {
                   x: 100, y: 100, name: 'start', isBack: true, position: 1, rotation: 0,
                 };
               },
    },
  }, data()
  {
    return { lastMove: null, displayToolBar: false };
  }, computed: {
    height()
    {
      return this.isTurned ? 270 : 450;
    }, width()
    {
      return this.isTurned ? 450 : 270;
    }, src()
    {
      return './assets/gameList/' + this.scenario + '/' + (this.card.isBack ? this.backName : this.frontName);
    }, frontName()
    {
      return this.card.name + '.JPG';
    }, backName()
    {
      return this.card.name + '_back.JPG';
    }, isTurned()
    {
      return (this.card.rotation % 180) !== 0;
    }, getWidthHeight()
    {
      const height = this.height === 450 ? this.height + 40 : this.height;
      const width  = this.width === 450 ? this.width + 40 : this.width;
      return 'width:' + width + 'px; height: ' + height + 'px;';
    }, getXYStyle()
    {
      if (this.draggable)
      {
        return 'left: ' + this.card.x + 'px;' + 'top: ' + this.card.y + 'px; position: absolute;';
      }
      return '';
    }, getZIndex()
    {
      return 'z-index: ' + (100 + this.card.position) + ';';
    }, getRotation()
    {
      let rotateStyle = '-webkit-transform: rotate(' + this.card.rotation + 'deg);';
      rotateStyle += '-moz-transform: rotate(' + this.card.rotation + 'deg);';
      rotateStyle += '-o-transform: rotate(' + this.card.rotation + 'deg);';
      rotateStyle += '-ms-transform: rotate(' + this.card.rotation + 'deg);';
      rotateStyle += 'transform: rotate(' + this.card.rotation + 'deg);';
      rotateStyle += (this.isTurned ? 'margin-top: -110px !important;' : '');
      return rotateStyle;
    },
  }, methods:  {
    click(event)
    {
      event.preventDefault();
      if (this.returnAllowed)
      {
        this.returnCard(event);
      }
      else
      {
        this.emitCardClickEvent(event);
      }
    }, touchEnd(event)
    {
      event.preventDefault();

      if (!this.returnAllowed)
      {
        this.emitCardClickEvent(event);
        return;
      }

      if (this.lastMove !== null)
      {
        this.touchDrop(event);
      }
      else
      {
        this.showToolBar();
      }
      this.lastMove = null;
    }, showToolBar()
    {
      this.displayToolBar = true;
      const _this         = this;
      setTimeout(() =>
                 {
                   _this.displayToolBar = false;
                 }, 2000);
    }, turnRight()
    {
      this.socket.emit('CARD_ROTATE', { name: this.card.name, rotation: 90 });
    }, emitCardClickEvent(e)
    {
      e.preventDefault();
      this.$emit('cardClicked');
    }, returnCard(e)
    {
      e.preventDefault();
      this.socket.emit('CARD_RETURNED', { name: this.card.name, isBack: !this.card.isBack });
    }, discard()
    {
      this.socket.emit('CARD_FROM_BOARD_TO_DISCARD', this.card.name);
    }, backToPick()
    {
      this.socket.emit('CARD_FROM_BOARD_TO_PICK', this.card.name);
    }, _initDragAndDropListeners()
    {
      let cardDraggedId;
      let oldPos;
      const _this = this;

      document.addEventListener('dragstart', (event) =>
      {
        // store a ref. on the dragged elem
        cardDraggedId = event.target.attributes['id'].value;

        if (_this.card.name === cardDraggedId)
        {
          oldPos              = _this.card.position;
          _this.card.position = _this.nbTotalCards + 1;
        }
      }, false);

      /* events fired on the drop targets */
      document.addEventListener('dragover', (event) =>
      {
        if (cardDraggedId === _this.card.name)
        {
          event.preventDefault();
          _this.card.x = event.x + window.scrollX - _this.width / 2;
          _this.card.y = event.y + window.scrollY - _this.height / 2;
        }
      }, false);

      document.addEventListener('drop', (event) =>
      {
        if (cardDraggedId === _this.card.name)
        {
          event.preventDefault();
          _this.card.x        = event.x + window.scrollX - _this.width / 2;
          _this.card.y        = event.y + window.scrollY - _this.height / 2;
          _this.card.position = oldPos;
          _this.socket.emit('CARD_MOVED', _this.card);
        }
      }, false);
    }, touchDrop()
    {
      if (this.draggable)
      {
        this.socket.emit('CARD_MOVED', this.card);
      }
    }, touchMove(event)
    {
      event.preventDefault();
      if (this.draggable)
      {
        this.lastMove      = event;
        this.card.x        = this.lastMove.touches[0].clientX + window.scrollX - this.width / 2;
        this.card.y        = this.lastMove.touches[0].clientY + window.scrollY - this.height / 2;
        this.card.position = this.nbTotalCards;
      }
    },
  }, mounted()
  {
    const _this = this;

    this.socket.on('CARD_' + this.card.name + '_TURN', rotation =>
    {
      _this.card.rotation = rotation;
    });
    this.socket.on('CARD_RETURNED_' + this.card.name, isBack =>
    {
      _this.card.isBack = isBack;
    });
    this.socket.on('CARD_' + this.card.name + '_MOVED', card =>
    {
      // TODO: find another way to upd card (create error in explorer console)
      _this.card = card;
    });
  }, created()
  {
    this._initDragAndDropListeners();
  },
};
</script>

<style scoped>
.card-width
{
  width:  270px;
  height: 490px;
}

img
{
  border-radius: 10px;
}

.toolbar
{
  height:   50px;
  padding:  5px 10px;
  position: absolute;
  top:      -50px;
}

.container > .toolbar
{
  display: none;
}

.container:hover > .toolbar
{
  display: flex;
}

.container
{
  background-color: whitesmoke;
  height:           fit-content;
  width:            fit-content;
}

.icon-container
{
  margin:   0;
  position: absolute;
  right:    0;
  width:    fit-content;
}

.icon
{
  margin: 5px;
}
</style>
