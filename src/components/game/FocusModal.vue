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
        <div class="d-flex">
          <b-button variant="light">
            <div class="h5 mb-0">
              <b-icon-zoom-out @mousedown="zoom('out')" @mouseout="stopZoom" @mouseup="stopZoom" @touchend="stopZoom" @touchout="stopZoom" @touchstart="zoom('out')"/>
            </div>
          </b-button>
          <b-input v-model="zoomValue" :max="zoomMax" :min="zoomMin" class="m-auto" type="number"/>
          <b-button variant="light">
            <div class="h5 mb-0">
              <b-icon-zoom-in @mousedown="zoom('in')" @mouseout="stopZoom" @mouseup="stopZoom" @touchend="stopZoom" @touchout="stopZoom" @touchstart="zoom('in')"/>
            </div>
          </b-button>
        </div>
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

      <img :id="'focus-'+card.name" :src="src" :style="getRotation+getWidthHeight" alt="Card" class="m-0"/>

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
    return { rotation: 0, rotationInProgress: null, zoomValue: 100, zoomInProgress: null, zoomMin: 10, zoomMax: 200 };
  }, computed: {
    getWidthHeight()
    {
      return 'width:' + this.width + 'px; height: ' + this.height + 'px;';
    }, height()
    {
      return 560 * parseInt(this.zoomValue) / 100;
    }, width()
    {
      return 300 * parseInt(this.zoomValue) / 100;
    }, src()
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
      const multiplicative     = direction === 'left' ? 1 : - 1;
      this.rotationsInProgress = setInterval(() =>
                                             {
                                               this.rotation += 2 * multiplicative;
                                             }, 50);
    }, stopRotate()
    {
      if (this.rotationsInProgress !== null)
      {
        clearInterval(this.rotationsInProgress);
      }
    }, zoom(direction)
    {
      const multiplicative = direction === 'in' ? 1 : - 1;
      this.zoomInProgress  = setInterval(() =>
                                         {
                                           this.zoomValue = parseInt(this.zoomValue) + 2 * multiplicative;
                                           if (this.zoomValue <= this.zoomMin || this.zoomMax <= this.zoomValue)
                                           {
                                             this.stopZoom();
                                           }
                                         }, 100);
    }, stopZoom()
    {
      if (this.zoomInProgress !== null)
      {
        clearInterval(this.zoomInProgress);
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
