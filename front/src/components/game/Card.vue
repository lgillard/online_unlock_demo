<template>
  <img :id="card.name"
       :src="card.isBack ? backImgSrc : imgSrc"
       :style="getZIndex + getXYStyle"
       alt="Start card"
       class="card-size grab ml-5 mr-5"
       @click="e => {returnAllowed ? returnCard(e) : emitCardClickEvent(e)}"/>
</template>

<script>
export default {
  name:        'Card', props: {
    nbTotalCards: { default: 1 }, socket: { required: true }, draggable: { default: true }, returnAllowed: { default: true }, scenario: { default: 'demo' }, card: {
      default: () =>
               {
                 return {
                   x: 100, y: 100, name: 'start', isBack: true, position: 1,
                 };
               },
    },
  }, computed: {
    backImgSrc()
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
    },
  }, methods:  {
    emitCardClickEvent(e)
    {
      e.preventDefault();
      this.$emit('cardClicked');
    }, _getImgUrl(imgName)
    {
      return '/assets/gameList/' + this.scenario + '/' + imgName + '.JPG';
    }, returnCard(e)
    {
      e.preventDefault();
      this.socket.emit('CARD_RETURNED', { name: this.card.name, isBack: !this.card.isBack });
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
    }, _updXYcardPosition(event)
    {
      // prevent default to allow drop
      event.preventDefault();

      // move dragged elem to the selected drop target
      this.card.x = event.x + window.scrollX - 270 / 2;
      this.card.y = event.y + window.scrollY - 450 / 2;
    },
  }, mounted()
  {
    const _this = this;

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
        _this.card.position --;
      }
    });
  }, created()
  {
    this._initDragAndDropListeners();
  },
};
</script>

<style scoped>
.card-size
{
  height: 450px;
}
</style>
