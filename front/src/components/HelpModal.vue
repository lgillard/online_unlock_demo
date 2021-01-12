<template>
  <b-modal id="help-modal" ok-only size="xl">
    <h2>Guide d'utilisation</h2>

    <div>
      <h3>Obtenir des indices aux enigmes</h3>
      <div class="ml-4">
        Dans l'application :
        <ul>
          <li>Cliquez sur "Indice"</li>
          <li>Entrez le numéro de la carte sur laquelle vous souhaitez plus d'informations</li>
        </ul>
      </div>
    </div>

    <div>
      <h3>Chercher une carte</h3>
      <div class="ml-4">
        Pour chercher une carte vous devrez :
        <ul>
          <li>Cliquer sur le bouton "Rechercher une carte" présent en haut à droite de l'écran</li>
          <li>Explorer la pioche en cliquant sur les flèches à droite et à gauche de la carte</li>
          <li>Ajouter la carte choisie sur le plateau de jeu en cliquant dessus</li>
        </ul>
        Une fois vos recherches terminées vous pouvez revenir sur le plateau de jeu en cliquant sur le bouton "ok".
      </div>
    </div>

    <div>
      <h3>Interagir avec une carte</h3>
      <div class="ml-4">
        <h4>Déplacer</h4>
        <p>Pour cela, glissez/déposez une carte n'importe où sur le plateau. La carte sera alors déplacée pour tous les participants du jeu.</p>
      </div>
      <div class="ml-4">
        <h4>Retourner</h4>
        <p>Pour cela, cliquez sur la carte. La carte sera alors retournée pour tous les participant du jeu.</p>
      </div>
      <div class="ml-4">
        <h4>Défausser</h4>
        <p>Pour cela, mettez votre curseur sur la carte puis cliquez sur la poubelle qui apparaît en haut à droite. La carte sera alors défaussée pour tous les participants. Vous pourrez accéder à cette carte à tout moment en faisant...TODO... </p>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'HelpModal',
};
</script>

<style scoped>

</style>
