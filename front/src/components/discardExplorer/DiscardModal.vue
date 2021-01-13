<template>
  <b-modal id="search-discard-modal" ok-only>
    <h2>Rechercher dans la défausse</h2>
    <Discard :cards="cards" :socket="socket"/>
  </b-modal>
</template>

<script>
import Discard from '@/components/discardExplorer/Discard';

export default {
  name: 'DiscardModal', components: { Discard }, props: {
    cards: { default: () => [] }, socket: { required: true },
  },
};
</script>

<style scoped>

</style>
