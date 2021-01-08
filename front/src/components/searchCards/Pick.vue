<template>
  <div class="row justify-content-center">
    <b-button v-b-tooltip.hover title="Carte précédente" variant="light" @click="previous">
      <b-icon-arrow-bar-left/>
    </b-button>
    <Card v-b-tooltip.hover :draggable="false" :name="cards[currentCardIndex]" :return-allowed="false" :socket="socket" title="Ajouter sur la table" @cardClicked="cardAddOnBoard"/>
    <b-button v-b-tooltip.hover title="Carte suivante" variant="light" @click="next">
      <b-icon-arrow-bar-right/>
    </b-button>
  </div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name:       'Pick', components: { Card }, props: { cards: { default: [] }, socket: { required: true } }, data()
  {
    return {
      currentCardIndex: 0,
    };
  }, methods: {
    previous()
    {
      this.currentCardIndex = (this.currentCardIndex - 1) % (this.cards.length - 1);
    }, next()
    {
      this.currentCardIndex = (this.currentCardIndex + 1) % (this.cards.length - 1);
    }, cardAddOnBoard()
    {
      // TODO emit websocket event
    },
  },
};
</script>

<style scoped>

</style>
