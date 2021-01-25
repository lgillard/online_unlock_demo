<template>
  <b-modal id="quit-game-modal" ok-only ok-title="Abandonner la partie" size="xl" @ok="quitWithoutSave">
    <h2>Souhaitez-vous quitter le jeu ? Tout retour à la partie en cours sera alors impossible</h2>
    <p>En cliquant sur "Abandonner la partie" vous stoppez et supprimer le jeu en cours pour tous les participants</p>
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
