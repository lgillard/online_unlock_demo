<template>
  <Stack :cards="cards" :scenario="scenario" :socket="socket" stack-name="pioche" @onCardClick="cardAddOnBoard"/>
</template>

<script>
import Stack from '@/components/game/Stack';

export default {
  name: 'Pick', components: { Stack }, props: { cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' } }, methods: {
    cardAddOnBoard(card)
    {
      this.socket.emit('CARD_FROM_PICK_TO_BOARD', card.name);
    },
  },
};
</script>

<style scoped>

</style>
