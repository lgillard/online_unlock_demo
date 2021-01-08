<template>
  <img :id="name" :src="isBack ? backImgSrc : imgSrc" :style="draggable ? getXYStyle : ''" alt="Start card" class="card-size grab ml-5 mr-5" @click="returnCard()"/>
</template>

<script>
export default {
  name:        'Card', props: {
    draggable: { default: true }, returnAllowed: { default: true }, x: { default: 100 }, y: { default: 100 }, scenario: { default: 'demo' }, name: { default: 'start' },
  }, data()
  {
    return { isBack: true };
  }, computed: {
    backImgSrc()
    {
      return this._getImgUrl(this.name + '_back');
    }, imgSrc()
    {
      return this._getImgUrl(this.name);
    }, getXYStyle()
    {
      return 'left: ' + this.x + 'px;' + 'top: ' + this.y + 'px; position: absolute';
    },
  }, methods:  {
    _getImgUrl(imgName)
    {
      return '/assets/gameList/' + this.scenario + '/' + imgName + '.JPG';
    }, returnCard()
    {
      if (this.returnAllowed)
      {
        this.isBack = !this.isBack;
      }
    },
  },
};
</script>

<style scoped>
.card-size
{
  height: 450px;
}
</style>
