<template>
  <div class="dropzone">
    <Card :x="x" :y="y"/>
  </div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name:       'Board', components: { Card }, created()
  {
    this._initDragAndDropListeners();
  }, data()
  {
    return {
      x: 100, y: 100,
    };
  }, methods: {
    _initDragAndDropListeners()
    {
      let cardDraggedId;

      document.addEventListener('dragstart', (event) =>
      {
        // store a ref. on the dragged elem
        cardDraggedId = event.target.attributes['id'].value;
      }, false);

      /* events fired on the drop targets */
      document.addEventListener('dragover', (event) =>
      {
        // prevent default to allow drop
        event.preventDefault();
      }, false);

      document.addEventListener('drop', (event) =>
      {
        // prevent default action (open as link for some elements)
        event.preventDefault();

        // move dragged elem to the selected drop target
        if (event.target.className.indexOf('dropzone') >= 0)
        {
          // eslint-disable-next-line no-debugger
          console.log(event.x, event.y, cardDraggedId);
          this.x = event.x;
          this.y = event.y;
        }
      }, false);
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
