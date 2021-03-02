<template>
  <b-modal :id="'focus-card-' + card.name + '-modal'" hide-footer size="lg">
    <div class="text-center">
      <img :id="'focus-'+card.name" :src="src" :style="getRotation" alt="Card" class="m-0"/>
      <div class="h2 mb-2 d-flex justify-content-around mt-5">
        <div v-b-tooltip.hover
             class="pointer icon"
             title="Tourner la carte à gauche"
             @mousedown="rotate('right')"
             @mouseup="stopRotate"
             @touchend="stopRotate"
             @touchstart="rotate('right')">
          <b-icon-arrow-counterclockwise/>
        </div>
        <div v-b-tooltip.hover
             class="pointer icon"
             title="Tourner la carte à droite"
             @mousedown="rotate('left')"
             @mouseup="stopRotate"
             @touchend="stopRotate"
             @touchstart="rotate('left')">
          <b-icon-arrow-clockwise/>
        </div>
      </div>
      <div class="h2 mb-2 d-flex justify-content-around mt-5">
        <div v-b-tooltip.hover class="pointer icon" title="Retourner la carte" @click="() => {this.$emit('returnCard')}">
          <b-icon-front/>
        </div>
        <div v-b-tooltip.hover class="pointer icon" title="Défausser la carte" @click="() => {this.$emit('discard')}">
          <b-icon-trash/>
        </div>
        <div v-b-tooltip.hover class="pointer icon" title="Reposer la carte dans la pioche" @click="() => {this.$emit('backToPick')}">
          <b-icon-arrow-bar-up/>
        </div>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name:        'FocusModal', props: {
    card:        {
      required: true, default: () =>
      {
        return {
          x: 100, y: 100, name: 'start', isBack: true, position: 1, rotation: 0,
        };
      },
    }, scenario: { required: true },
  }, data()
  {
    return { rotation: 0, rotationInProgress: null };
  }, computed: {
    src()
    {
      return './assets/gameList/' + this.scenario + '/' + (this.card.isBack ? this.backName : this.frontName);
    }, frontName()
    {
      return this.card.name + '.JPG';
    }, backName()
    {
      return this.card.name + '_back.JPG';
    }, getRotation()
    {
      return '-webkit-transform: rotate(' + this.rotation + 'deg);\n' + '  transform: rotate(' + this.rotation + 'deg);';
    },
  }, methods:  {
    rotate(direction)
    {
      const multiplicator     = direction === 'left' ? 1 : - 1;
      this.rotationInProgress = setInterval(() =>
                                            {
                                              this.rotation += 2 * multiplicator;
                                            }, 50);
    }, stopRotate()
    {
      clearInterval(this.rotationInProgress);
    },
  }, mounted()
  {
    this.rotation = this.card.rotation;
  },
};
</script>

<style scoped>

</style>
