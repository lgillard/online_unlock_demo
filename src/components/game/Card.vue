<template>
  <img :src="isBack ? backImgSrc : imgSrc" alt="Start card" class="card-size grab"/>
</template>

<script>
export default {
  name:        'Card', props: {
    scenario: { default: 'demo' }, name: { default: 'start' }, isBack: { default: true },
  }, computed: {
    backImgSrc()
    {
      return this._getImgUrl(this.name + '_back');
    }, imgSrc()
    {
      return this._getImgUrl(this.name);
    },
  }, methods:  {
    _getImgUrl(imgName)
    {
      return '/assets/gameList/' + this.scenario + '/' + imgName + '.JPG';
    },
  },
};
</script>

<style scoped>

</style>
