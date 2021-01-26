<template>
  <b-modal id="help-modal" ok-only size="xl">
    <h1>Guide d'utilisation</h1>

    <details>
      <summary><h2>Partager la partie en cours</h2></summary>
      <div>
        Si quelqu'un souhaite rejoindre votre partie en cours il lui suffit de remplacer son "code partie" par le votre :
        <span id="party-code-in-help" class="font-italic">{{ partyCode }}</span>
      </div>
    </details>
    <details>
      <summary><h2>Obtenir des indices aux enigmes</h2></summary>
      <div class="ml-4">
        Dans l'application :
        <ul>
          <li>Cliquez sur "Indice"</li>
          <li>Entrez le numéro de la carte sur laquelle vous souhaitez plus d'informations</li>
        </ul>
      </div>
    </details>

    <details>
      <summary><h2>Chercher une carte</h2></summary>
      <div class="ml-4">
        Pour chercher une carte vous devrez :
        <ul>
          <li>Cliquer sur le bouton "Rechercher une carte" présent en haut à droite de l'écran</li>
          <li>Explorer la pioche en cliquant sur les flèches à droite et à gauche de la carte</li>
          <li>Ajouter la carte choisie sur le plateau de jeu en cliquant dessus</li>
        </ul>
        Une fois vos recherches terminées vous pouvez revenir sur le plateau de jeu en cliquant sur le bouton "ok".
      </div>
    </details>

    <details>
      <summary><h2>Interagir avec une carte</h2></summary>
      <details class="ml-4">
        <summary><h3 class="d-inline">Déplacer une carte</h3></summary>
        <p>Pour cela, glissez/déposez une carte n'importe où sur le plateau. La carte sera alors déplacée pour tous les participants du jeu.</p>
      </details>
      <details class="ml-4">
        <summary><h3 class="d-inline">Retourner une carte</h3></summary>
        <p>Pour cela, cliquez sur la carte. La carte sera alors retournée pour tous les participant du jeu.</p>
      </details>
      <details class="ml-4">
        <summary><h3 class="d-inline">Défausser une carte</h3></summary>
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
      </details>
      <details class="ml-4">
        <summary><h3 class="d-inline">Replacer une carte dans la pioche</h3></summary>
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
      </details>
    </details>
  </b-modal>
</template>

<script>
export default {
  name: 'GameHelpModal', data()
  {
    return { partyCode: '' };
  }, mounted()
  {
    this.partyCode = localStorage.getItem('PARTY_CODE');
  },
};
</script>

<style scoped>
h2
{
  display:   inline;
  font-size: 2vw;
}

h3
{
  font-size: 1.5vw;
}

#party-code-in-help
{
  background-color: lightgray;
  border:           thin solid black;
  padding:          0 5px;
}
</style>
