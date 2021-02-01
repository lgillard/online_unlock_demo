<template>
  <div :style="getZIndex + getXYStyle" class="container p-0 m-0">
    <div v-if="draggable" :style="displayToolBar ? 'd-flex' : ''" class="toolbar h2 mb-2 icon-container container">
      <div v-b-tooltip.hover class="pointer icon" title="Retourner la carte" @click="returnCard">
        <b-icon-front/>
      </div>
      <div v-b-tooltip.hover class="pointer icon" title="Reposer la carte dans la pioche" @click="backToPick">
        <b-icon-arrow-bar-up/>
      </div>
      <div v-b-tooltip.hover class="pointer icon" title="Défausser la carte" @click="discard">
        <b-icon-trash/>
      </div>
      <!--      <div v-b-tooltip.hover class="pointer icon" title="Tourner la carte à gauche" @click="turnLeft">-->
      <!--        <b-icon-arrow-counterclockwise/>-->
      <!--      </div>-->
      <div v-b-tooltip.hover class="pointer icon" title="Tourner la carte à droite" @click="turnRight">
        <b-icon-arrow-clockwise/>
      </div>
    </div>
    <div :style="getWidthHeight">
      <img :id="card.name"
           :src="card.isBack ? backImgSrc : imgSrc"
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
    isTurned()
    {
      return (this.card.rotation % 180) !== 0;
    }, getWidthHeight()
    {
      return !this.isTurned ? 'width: 270px; height: 490px;' : 'height: 270px; width: 490px;';
    }, backImgSrc()
    {
      return this._getImgUrl(this.card.name + '_back');
    }, imgSrc()
    {
      return this._getImgUrl(this.card.name);
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
      const rotateStyle = '-webkit-transform: rotate(' + this.card.rotation + 'deg); -moz-transform: rotate(' + this.card.rotation + 'deg); -o-transform: rotate(' + this.card.rotation + 'deg); -ms-transform: rotate(' + this.card.rotation + 'deg); transform: rotate(' + this.card.rotation + 'deg);';
      return rotateStyle + (this.isTurned ? 'margin-top: -110px !important;' : '');
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
    }, _getImgUrl(imgName)
    {
      return './assets/gameList/' + this.scenario + '/' + imgName + '.JPG';
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
          _this._updXYcardPosition(event);
        }
      }, false);

      document.addEventListener('drop', (event) =>
      {
        if (cardDraggedId === _this.card.name)
        {
          _this._updXYcardPosition(event);
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
        this.lastMove = event;

        const height = !this.isTurned ? 270 : 450;
        const width  = !this.isTurned ? 450 : 270;

        // move dragged elem to the selected drop target
        this.card.x        = this.lastMove.touches[0].clientX + window.scrollX - height / 2;
        this.card.y        = this.lastMove.touches[0].clientY + window.scrollY - width / 2;
        this.card.position = this.nbTotalCards;
      }
    }, _updXYcardPosition(event)
    {
      // prevent default to allow drop
      event.preventDefault();

      const height = !this.isTurned ? 270 : 450;
      const width  = !this.isTurned ? 450 : 270;

      // move dragged elem to the selected drop target
      this.card.x = event.x + window.scrollX - height / 2;
      this.card.y = event.y + window.scrollY - width / 2;
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
    this.socket.on('CARD_GO_FRONT', ({ name, position }) =>
    {
      if (name !== _this.card.name && _this.card.position > position)
      {
        _this.card.position = _this.card.position - 1;
      }
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
  width: 270px;
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
