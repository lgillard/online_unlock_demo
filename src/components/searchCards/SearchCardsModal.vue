<template>
  <b-modal id="search-cards-modal" size="xl">
    <h2>Rechercher une carte</h2>
    <div class="row justify-content-center">
      <b-button v-b-tooltip.hover title="Carte précédente" variant="light" @click="previous">
        <b-icon-arrow-bar-left/>
      </b-button>
      <Card v-b-tooltip.hover :draggable="false" :name="cards[currentCardIndex]" :return-allowed="false" title="Ajouter sur la table" @cardClicked="cardAddOnBoard"/>
      <b-button v-b-tooltip.hover title="Carte suivante" variant="light" @click="next">
        <b-icon-arrow-bar-right/>
      </b-button>
    </div>
  </b-modal>
</template>

<script>

import Card from '@/components/game/Card';

export default {
  name:       'SearchCardsModal', components: { Card }, data()
  {
    return {
      currentCardIndex: 0,
      cards:            ['11',
                         '16',
                         '35',
                         '25'],
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
