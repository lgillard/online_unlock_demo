<template>
  <b-modal id="help-modal" ok-only size="xl">
    <h1>Guide d'utilisation</h1>
    <div v-if="interractionMode === null" class="text-center">
      <h2>Veuillez sélectionner votre mode d'interraction</h2>
      <div class="row mt-5">
        <div class="col-6">
          <div class="m-auto fit-content-width pointer" @click="() => {this.interractionMode = 'touch'}">
            <b-icon-hand-index class="interaction-icon"/>
            <label class="d-block">Manuel/stylet</label>
          </div>
        </div>
        <div class="col-6">
          <div class="m-auto fit-content-width pointer" @click="() => {this.interractionMode = 'mouse'}">
            <b-icon-mouse class="interaction-icon"/>
            <label class="d-block">Souris/trackpad</label>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
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
            <li v-if="interractionMode === 'touch'">Cliquer sur le menu
              <b-icon-border-width/>
                                                    , puis cliquer sur "Rechercher une carte"
            </li>
            <li v-else>Cliquer sur le bouton "Rechercher une carte" présent en haut à droite de l'écran</li>
            <li>Explorer la pioche en cliquant sur les flèches à droite et à gauche de la carte</li>
            <li>Ajouter la carte choisie sur le plateau de jeu en cliquant dessus</li>
          </ul>
          Une fois vos recherches terminées vous pouvez revenir sur le plateau de jeu en cliquant sur le bouton "ok".
        </div>
      </details>

      <details>
        <summary><h2>Interagir avec une carte</h2></summary>
        <details class="ml-4">
          <summary>
            <h3 class="d-inline">
              <b-icon-front/>
              Retourner une carte
            </h3>
          </summary>
          <p>Pour cela:</p>
          <ul v-if="interractionMode === 'touch'">
            <li>Cliquez sur la carte que vous souhaitez retournez</li>
            <li>Cliquez sur le carré
              <b-icon-front/>
                qui apparaît en haut à droite.
            </li>
          </ul>
          <ul v-else>
            <li>Cliquez sur la carte</li>
          </ul>
          <p>La carte sera alors retournée pour tous les participant du jeu.</p>
        </details>
        <details class="ml-4">
          <summary>
            <h3 class="d-inline">
              <b-icon-arrows-move/>
              Déplacer une carte
            </h3>
          </summary>
          <p>Pour cela:</p>
          <ul>
            <li>Glissez/déposez une carte n'importe où sur le plateau.</li>
          </ul>
          <p> La carte sera alors déplacée pour tous les participants du jeu.</p>
        </details>
        <details class="ml-4">
          <summary>
            <h3 class="d-inline">
              <b-icon-trash/>
              Défausser une carte
            </h3>
          </summary>
          <div>
            <p>Au cours de l'aventure vous serez amenés à défausser des cartes.</p>
            <p>Pour cela:</p>
            <ul>
              <li v-if="interractionMode === 'touch'">Cliquez la carte que vous souhaitez jeter</li>
              <li v-else>Placez votre curseur sur la carte</li>
              <li>Cliquez sur la poubelle
                <b-icon-trash/>
                  qui apparaît en haut à droite.
              </li>
            </ul>
            <p> La carte sera alors défaussée pour tous les participants.</p>
            <p> Vous pourrez accéder à cette carte à tout moment en cliquant sur "Parcourir la défausse" en haut à droite de l'écran. </p>
          </div>
        </details>
        <details class="ml-4">
          <summary>
            <h3 class="d-inline">
              <b-icon-arrow-clockwise/>
              Tourner une carte
            </h3>
          </summary>
          <div>
            <p>Il peut arriver au cours de l'aventure que vous vous souhaitiez tournez une carte pour vous éviter un torticoli.</p>
            <p>Pour cela :</p>
            <ul>
              <li v-if="interractionMode === 'touch'">Cliquez sur la carte à tourner</li>
              <li v-else>Placez votre curseur sur la carte</li>
              <li>Cliquez sur la flèche
                <b-icon-arrow-clockwise/>
                  qui apparaît en haut à droite
              </li>
            </ul>
            <p>La carte sera alors tournée pour tous les participants.</p>
          </div>
        </details>
        <details class="ml-4">
          <summary>
            <h3 class="d-inline">
              <b-icon-arrow-bar-up/>
              Replacer une carte dans la pioche
            </h3>
          </summary>
          <div>
            <p>Il peut arriver au cours de l'aventure que vous vous trompiez de carte. Dans ce cas vous pouvez replacer la carte dans la pioche. </p>
            <p>Pour cela :</p>
            <ul>
              <li v-if="interractionMode === 'touch'">Cliquez sur la carte à ranger</li>
              <li v-else>Placez votre curseur sur la carte</li>
              <li>Cliquez sur la flèche
                <b-icon-arrow-bar-up/>
                  qui apparaît en haut à droite
              </li>
            </ul>
            <p>La carte sera déposée dans la pioche pour tous les participants.</p>
          </div>
        </details>
      </details>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'GameHelpModal', data()
  {
    return { partyCode: '', interractionMode: null };
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

.fit-content-width
{
  width: fit-content;
}

.interaction-icon
{
  height: 8vw;
  width:  8vw;
}
</style>
