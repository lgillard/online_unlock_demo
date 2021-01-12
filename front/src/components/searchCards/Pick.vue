<template>
  <div v-if="cards.length > 0" class="row justify-content-center">
    <b-button v-b-tooltip.hover title="Carte précédente" variant="light" @click="previous">
      <b-icon-chevron-left/>
    </b-button>
    <Card v-b-tooltip.hover :card="currentCard" :draggable="false" :return-allowed="false" :socket="socket" title="Ajouter sur la table" @cardClicked="cardAddOnBoard"/>
    <b-button v-b-tooltip.hover title="Carte suivante" variant="light" @click="next">
      <b-icon-chevron-right/>
    </b-button>
  </div>
  <div v-else>La pioche est vide</div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name:        'Pick', components: { Card }, props: { cards: { default: () => [] }, socket: { required: true } }, data()
  {
    return {
      currentCardIndex: 0,
    };
  }, computed: {
    currentCard()
    {
      return this.cards[this.currentCardIndex];
    },
  }, methods:  {
    previous()
    {
      this.currentCardIndex = (this.currentCardIndex + this.cards.length - 1) % this.cards.length;
    }, next()
    {
      this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    }, cardAddOnBoard()
    {
      this.socket.emit('CARD_FROM_PICK_TO_BOARD', this.currentCard.name);
    },
  },
};
</script>

<style scoped>

</style>
