<template>
  <div v-if="cards.length > 0" class="text-center">
    <div class="row justify-content-center">
      <b-button v-b-tooltip.hover title="Carte précédente" variant="light" @click="previous">
        <b-icon-chevron-left/>
      </b-button>
      <img :id="currentCard.name" :alt="'Card ' + currentCard.name" :src="currentCardSrc" class="card-width grab m-0" @click="onCardClick"/>
      <b-button v-b-tooltip.hover title="Carte suivante" variant="light" @click="next">
        <b-icon-chevron-right/>
      </b-button>
    </div>
    <b-button class="add-to-board" @click="onCardClick">Poser la carte sur le plateau</b-button>
  </div>
  <div v-else>La {{ stackName }} est vide</div>
</template>

<script>
export default {
  name:  'Stack',
  props: { stackName: { default: 'pioche' }, cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' }, cardsAreBack: { default: true } },
  data()
  {
    return {
      currentCardIndex: 0,
    };
  },
  computed: {
    currentCard()
    {
      return this.cards[this.currentCardIndex];
    }, currentCardSrc()
    {
      return './assets/gameList/' + this.scenario + '/' + this.currentCard.name + (this.cardsAreBack ? '_back' : '') + '.JPG';
    },
  },
  methods:  {
    previous()
    {
      this.currentCardIndex = (this.currentCardIndex + this.cards.length - 1) % this.cards.length;
    }, next()
    {
      this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    }, onCardClick()
    {
      this.$emit('onCardClick', this.currentCard);

      if (this.cards.length - 1 === this.currentCardIndex)
      {
        this.currentCardIndex = 0;
      }
    },
  },
};
</script>

<style scoped>
.add-to-board
{
  margin-top: 10px;
}

.card-width
{
  width:  215px;
  height: 390px;
}
</style>
