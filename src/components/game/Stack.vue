<template>
  <div v-if="cards.length > 0" class="row justify-content-center">
    <b-button v-b-tooltip.hover title="Carte précédente" variant="light" @click="previous">
      <b-icon-chevron-left/>
    </b-button>
    <Card v-b-tooltip.hover
          :card="currentCard"
          :draggable="false"
          :return-allowed="false"
          :scenario="scenario"
          :socket="socket"
          title="Ajouter sur la table"
          @cardClicked="onCardClick"/>
    <b-button v-b-tooltip.hover title="Carte suivante" variant="light" @click="next">
      <b-icon-chevron-right/>
    </b-button>
  </div>
  <div v-else>La {{ stackName }} est vide</div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name:        'Stack',
  components:  { Card },
  props:       { stackName: { default: 'pioche' }, cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' } },
  data()
  {
    return {
      currentCardIndex: 0,
    };
  },
  computed:    {
    currentCard()
    {
      return this.cards[this.currentCardIndex];
    },
  },
  methods:     {
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

</style>
