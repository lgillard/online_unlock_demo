<template>
  <img :id="card.name"
       :src="card.isBack ? backImgSrc : imgSrc"
       :style="draggable ? getXYStyle : ''"
       alt="Start card"
       class="card-size grab ml-5 mr-5"
       @click="e => {returnAllowed ? returnCard(e) : emitCardClickEvent(e)}"/>
</template>

<script>
export default {
  name:        'Card', props: {
    socket: { required: true }, draggable: { default: true }, returnAllowed: { default: true }, scenario: { default: 'demo' }, card: {
      default: () =>
               {
                 return {
                   x: 100, y: 100, name: 'start', isBack: true,
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
      return 'left: ' + this.card.x + 'px;' + 'top: ' + this.card.y + 'px; position: absolute';
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
      // let cardDraggedId;

      // document.addEventListener('dragstart', (event) =>
      // {
      //   // store a ref. on the dragged elem
      //   cardDraggedId = event.target.attributes['id'].value;
      // }, false);

      /* events fired on the drop targets */
      document.addEventListener('dragover', (event) =>
      {
        this._updXYcardPosition(event);
      }, false);

      document.addEventListener('drop', (event) =>
      {
        this._updXYcardPosition(event);
        // TODO: emit websocket event
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
    this.socket.on('CARD_RETURNED_' + this.card.name, isBack =>
    {
      this.card.isBack = isBack;
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
