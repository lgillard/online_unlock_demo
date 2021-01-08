<template>
  <img :id="name" :src="isBack ? backImgSrc : imgSrc" :style="getXYStyle" alt="Start card" class="card-size grab" @click="returnCard()"/>
</template>

<script>
export default {
  name:        'Card', props: {
    returnAllowed: { default: true }, x: { default: 100 }, y: { default: 100 }, scenario: { default: 'demo' }, name: { default: 'start' },
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
      return 'left: ' + this.x + 'px;' + 'top: ' + this.y + 'px;';
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
img
{
  position: absolute;
}
</style>
