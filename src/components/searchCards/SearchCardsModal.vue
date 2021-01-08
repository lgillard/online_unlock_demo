<template>
  <b-modal id="search-cards-modal" size="xl">
    <h2>Rechercher une carte</h2>
    <Pick/>
  </b-modal>
</template>

<script>

import Pick from '@/components/searchCards/Pick';

export default {
  name: 'SearchCardsModal', components: { Pick },
};
</script>

<style scoped>

</style>
