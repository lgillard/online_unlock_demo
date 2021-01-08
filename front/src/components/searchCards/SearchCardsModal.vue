<template>
  <b-modal id="search-cards-modal" size="xl">
    <h2>Rechercher une carte</h2>
    <Pick :cards="cards" :socket="socket"/>
  </b-modal>
</template>

<script>

import Pick from '@/components/searchCards/Pick';

export default {
  name: 'SearchCardsModal', components: { Pick }, props: {
    cards: { default: [] }, socket: { required: true },
  },
};
</script>

<style scoped>

</style>
