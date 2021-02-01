<template>
  <div :style="getXYStyle">
    <b-icon-cursor-fill flip-h/>
  </div>
</template>

<script>
export default {
  name:       'FriendCursor', props: {
    friendId: { required: true }, socket: { required: true },
  }, data()
  {
    return { x: 0, y: 0 };
  }, mounted()
  {
    const _this = this;
    this.socket.on('MOUSE_' + this.friendId + '_MOVE', ({ x, y }) =>
    {
      _this.x = x;
      _this.y = y;
    });
  }, methods: {
    getXYStyle()
    {
      if (this.draggable)
      {
        return 'left: ' + this.x + 'px;' + 'top: ' + this.y + 'px; position: absolute;';
      }
      return '';
    },
  },
};
</script>

<style scoped>

</style>
