<template>
  <b-modal id="quit-game-modal" cancel-title="Quitter sans sauvegarder" ok-title="Sauvegarder la partie" size="xl" @cancel="quitWithoutSave" @ok="saveAndQuit">
    <h2>Souhaitez-vous abandonner la partie ou la sauvegarder pour y rejouer plus tard</h2>
    <p>En cliquant sur "Quitter sans sauvegarder" vous stoppez et supprimer le jeu en cours pour tous les participants</p>
  </b-modal>
</template>

<script>
export default {
  name: 'LeaveGameModal', methods: {
    quitWithoutSave()
    {
      this.$emit('quitWithoutSave');
    }, saveAndQuit()
    {
      this.$emit('saveAndQuit');
    },
  },
};
</script>

<style scoped>

</style>
