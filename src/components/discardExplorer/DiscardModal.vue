<template>
  <b-modal id="search-discard-modal" hide-footer>
    <h2>Rechercher dans la défausse</h2>
    <Discard :cards="cards" :scenario="scenario" :socket="socket"/>
  </b-modal>
</template>

<script>
import Discard from '@/components/discardExplorer/Discard';

export default {
  name: 'DiscardModal', components: { Discard }, props: {
    cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' },
  },
};
</script>

<style scoped>

</style>
