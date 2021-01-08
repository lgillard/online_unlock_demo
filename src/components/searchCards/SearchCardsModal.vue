<template>
  <b-modal id="search-cards-modal" size="xl">
    <h2>Rechercher une carte</h2>
    <div class="row">
      <!-- TODO -->
      <Card :draggable="false"/>
    </div>
  </b-modal>
</template>

<script>
import Card from '@/components/game/Card';

export default {
  name: 'SearchCardsModal', components: { Card },
};
</script>

<style scoped>

</style>
