<template>
  <b-modal :id="'focus-card-' + card.name + '-modal'" hide-footer size="lg">
    <div class="text-center">
      <div class="d-flex justify-content-around mt-5">
        <b-button v-b-tooltip.hover
                  class="icon"
                  title="Tourner la carte à gauche"
                  variant="light"
                  @mousedown="rotate('right')"
                  @mouseout="stopRotate"
                  @mouseup="stopRotate"
                  @touchend="stopRotate"
                  @touchout="stopRotate"
                  @touchstart="rotate('right')">
          <div class="h2 mb-0">
            <b-icon-arrow-counterclockwise/>
          </div>
        </b-button>
        <b-button v-b-tooltip.hover
                  class="icon"
                  title="Tourner la carte à droite"
                  variant="light"
                  @mousedown="rotate('left')"
                  @mouseout="stopRotate"
                  @mouseup="stopRotate"
                  @touchend="stopRotate"
                  @touchout="stopRotate"
                  @touchstart="rotate('left')">
          <div class="h2 mb-0">
            <b-icon-arrow-clockwise/>
          </div>
        </b-button>
      </div>

      <img :id="'focus-'+card.name" :src="src" :style="getRotation" alt="Card" class="m-0"/>

      <div class="d-flex justify-content-around mt-5">
        <b-button v-b-tooltip.hover class="icon" title="Retourner la carte" variant="light" @click="() => {this.$emit('returnCard')}">
          <div class="h2 mb-0">
            <b-icon-front/>
          </div>
        </b-button>
        <b-button v-b-tooltip.hover class="icon" title="Défausser la carte" variant="light" @click="() => {this.$emit('discard')}">
          <div class="h2 mb-0">
            <b-icon-trash/>
          </div>
        </b-button>
        <b-button v-b-tooltip.hover class="icon" title="Reposer la carte dans la pioche" variant="light" @click="() => {this.$emit('backToPick')}">
          <div class="h2 mb-0">
            <b-icon-arrow-bar-up/>
          </div>
        </b-button>
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
      this.stopRotate();
      const multiplicator      = direction === 'left' ? 1 : - 1;
      this.rotationsInProgress = setInterval(() =>
                                             {
                                               this.rotation += 2 * multiplicator;
                                             }, 50);
    }, stopRotate()
    {
      if (this.rotationsInProgress !== null)
      {
        clearInterval(this.rotationsInProgress);
      }
    },
  }, mounted()
  {
    this.rotation = this.card.rotation;
  },
};
</script>

<style scoped>

</style>
