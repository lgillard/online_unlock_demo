<template>
  <b-modal id="search-pick-modal" hide-footer title="Rechercher dans la pioche">
    <Pick :cards="cards" :scenario="scenario" :socket="socket"/>
  </b-modal>
</template>

<script>
import Pick from '@/components/pickExplorer/Pick';

export default {
  name: 'PickModal', components: { Pick }, props: {
    cards: { default: () => [] }, socket: { required: true }, scenario: { default: 'demo' },
  },
};
</script>

<style scoped>

</style>
