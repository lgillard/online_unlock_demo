<template>
  <Stack :cards="cards" :scenario="scenario" :socket="socket" stackName="défausse" @onCardClick="cardAddOnBoard"/>
</template>

<script>
import Stack from '@/components/game/Stack';

export default {
  name: 'Discard', components: { Stack }, props: { cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' } }, methods: {
    cardAddOnBoard(card)
    {
      this.socket.emit('CARD_FROM_DISCARD_TO_BOARD', card.name);
    },
  },
};
</script>

<style scoped>

</style>
