<template>
  <div>
    <Card v-for="card of cards" :key="card.name" :card="card" :nbTotalCards="cards.length" :socket="socket"/>
  </div>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name: 'Board', components: { Card }, props: { socket: { required: true }, cards: { default: () => [] } },
};
</script>

<style scoped>
div
{
  height: 150vh;
}
</style>
