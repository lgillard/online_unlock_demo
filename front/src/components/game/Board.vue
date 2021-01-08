<template>
  <div>
    <Card :socket="socket" :x="x" :y="y"/>
  </div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name:       'Board', components: { Card }, props: { socket: { required: true } }, created()
  {
    this._initDragAndDropListeners();
  }, data()
  {
    return {
      x: 100, y: 100, cardHeight: 450, cardWidth: 270,
    };
  }, methods: {
    _initDragAndDropListeners()
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
      this.x = event.x + window.scrollX - this.cardWidth / 2;
      this.y = event.y + window.scrollY - this.cardHeight / 2;
    },
  },
};
</script>

<style scoped>
div
{
  height:           150vh;
  width:            150vw;
  background-color: antiquewhite;
}
</style>
