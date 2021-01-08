<template>
  <b-modal id="search-cards-modal" size="xl">
    <h2>Rechercher une carte</h2>
    <div class="row justify-content-center">
      <b-button v-b-tooltip.hover title="Carte précédente" variant="light">
        <b-icon-arrow-bar-left/>
      </b-button>
      <Card v-b-tooltip.hover :draggable="false" name="11" title="Ajouter sur la table"/>
      <b-button v-b-tooltip.hover title="Carte suivante" variant="light">
        <b-icon-arrow-bar-right/>
      </b-button>
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
