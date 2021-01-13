<template>
  <b-modal id="search-pick-modal" ok-only>
    <h2>Rechercher dans la pioche</h2>
    <Pick :cards="cards" :socket="socket"/>
  </b-modal>
</template>

<script>
import Pick from '@/components/pickExplorer/Pick';

export default {
  name: 'PickModal', components: { Pick }, props: {
    cards: { default: () => [] }, socket: { required: true },
  },
};
</script>

<style scoped>

</style>
