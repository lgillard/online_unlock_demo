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
        <div>
          <p>Au cours de l'aventure vous serez amenés à défausser des cartes.</p>
          <p>Pour cela:</p>
          <ul>
            <li>Mettez votre curseur sur la carte</li>
            <li>Cliquez sur la poubelle
              <b-icon-trash/>
                qui apparaît en haut à droite.
            </li>
          </ul>
          <p> La carte sera alors défaussée pour tous les participants. Vous pourrez accéder à cette carte à tout moment en cliquant sur "Parcourir la défausse" en haut à droite de l'écran. </p>
        </div>
      </div>
      <div class="ml-4">
        <h4>Replacer une carte dans la pioche</h4>
        <div>
          <p>Il peut arriver au cours de l'aventure que vous vous trompiez de carte. Dans ce cas vous pouvez replacer la carte dans la pioche. </p>
          <p>Pour cela :</p>
          <ul>
            <li>Placez votre curseur sur la carte</li>
            <li>Cliquez sur la flèche
              <b-icon-arrow-bar-up/>
                qui apparaît en haut à droite
            </li>
          </ul>
          <p>La carte sera déposée dans la pioche pour tous les participants.</p>
        </div>
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
