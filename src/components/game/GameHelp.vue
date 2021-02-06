<template>
  <div class="guide-container" @click="clickInteraction" @touchend="touchInteraction">
    <div v-b-tooltip.hover class="pointer close-cross-container" title="Fermer le guide" @click="quitHelp" @touchend="quitHelp">
      <b-icon-x class="close-cross" variant="light"/>
    </div>
    <img :class="question === '' ? '' : 'pointer'" :src="mouseImgSrc" alt="Mouse guide" class="mouse-recentre" @click="next" @touchend="next"/>
    <div class="bubble bubble-bottom-left bubble-recentre">
      <div v-if="question === ''">
        <p v-if="!alreadyQuestionned">En quoi puis-je vous aider ?</p>
        <p v-else>Autre chose ?</p>
        <b-row>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('FRIEND')" @touchend="selectQuestion('FRIEND')">Je veux jouer avec un ami</b-button>
          </b-col>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('WANT_SOLUTION')" @touchend="selectQuestion('WANT_SOLUTION')">Je voudrais des indices</b-button>
          </b-col>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('SEARCH_CARD')" @touchend="selectQuestion('SEARCH_CARD')">Je voudrais fouiller la pioche</b-button>
          </b-col>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('CARD_INTERACTIONS')" @touchend="selectQuestion('CARD_INTERACTIONS')">Que puis-je faire avec les cartes ?</b-button>
          </b-col>
          <b-col>
            <b-button v-if="!alreadyQuestionned" class="max-size" @click="quitHelp" @touchend="quitHelp">Non, rien</b-button>
            <b-button v-else class="max-size" @click="quitHelp" @touchend="quitHelp">Non, merci</b-button>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <div>
          <div v-if="question === 'FRIEND'">
            <p v-if="sentenceIndex === 0">Votre "code partie" est :
              <span id="party-code-in-help" class="font-italic">{{ partyCode }}</span>
              <br> Pour vous rejoindre, il suffit que vos amis remplacent leur code partie par le vôtre.
            </p>
            <p v-if="sentenceIndex === 1">Mais attention, vos amis doivent se trouver sur la
              <span class="font-weight-bold">page d'accueil</span>
                                          .<br>Autrement ils ne pourront pas changer leur code d'ami...
            </p>
          </div>
          <div v-if="question === 'WANT_SOLUTION'">
            <p v-if="sentenceIndex === 0">Vous souhaitez de l'aide pour répondre aux énigmes ?</p>
            <p v-if="sentenceIndex === 1">Je ne suis malheureusement pas très bien placé pour vous guider...</p>
            <p v-if="sentenceIndex === 2">Mais vous devriez pouvoir obtenir des indices dans
              <span class="font-weight-bold">l'application mobile</span>
                                          en cliquant sur
              <span class="font-weight-bold">"Indice".</span>
            </p>
          </div>
          <div v-if="question === 'SEARCH_CARD'">
            <p v-if="sentenceIndex === 0">Pour accéder aux carte de la pioche il vous suffit de cliquer sur
              <span class="font-weight-bold">"
                <b-icon-search/>
                                             Rechercher une carte".
              </span>
            </p>
            <p v-if="sentenceIndex === 1">Vous pourrez alors
              <span class="font-weight-bold">explorer</span>
                                          la pioche en
              <span class="font-weight-bold">cliquant sur les flèches</span>
                                          à droite et à gauche de la carte.
            </p>
            <p v-if="sentenceIndex === 2">Une fois que vous aurez trouvé votre carte vous n'aurez plus qu'à
              <span class="font-weight-bold">cliquer dessus pour l'ajouter</span>
                                          sur le plateau.
            </p>
            <p v-if="sentenceIndex === 3">Si toutefois
              <span class="font-weight-bold">vous ne trouvez pas</span>
                                          la carte dans la pioche,
              <span class="font-weight-bold">vérifiez dans la défausse</span>
                                          en cliquant sur "
              <b-icon-trash class="mr-3"/>
                                          Parcourir la défausse".
            </p>
          </div>
          <div v-if="question === 'CARD_INTERACTIONS'">
            <div>
              <p>Sur quel type d'interactions voulez-vous plus d'informations ?</p>
              <b-row>
                <b-col>
                  <b-button class="max-size" @click="selectQuestion('RETURN_CARD')" @touchend="selectQuestion('RETURN_CARD')">
                    <b-icon-front class="mr-2"/>
                    Retourner une carte
                  </b-button>
                </b-col>
                <b-col>
                  <b-button class="max-size" @click="selectQuestion('MOVE_CARD')" @touchend="selectQuestion('MOVE_CARD')">
                    <b-icon-arrows-move class="mr-2"/>
                    Déplacer une carte
                  </b-button>
                </b-col>
                <b-col>
                  <b-button class="max-size" @click="selectQuestion('DISCARD_CARD')" @touchend="selectQuestion('DISCARD_CARD')">
                    <b-icon-trash class="mr-2"/>
                    Défausser une carte
                  </b-button>
                </b-col>
              </b-row>
              <b-row class="mt-4">
                <b-col>
                  <b-button class="max-size" @click="selectQuestion('TURN_CARD')" @touchend="selectQuestion('TURN_CARD')">
                    <b-icon-arrow-clockwise class="mr-2"/>
                    Tourner une carte
                  </b-button>
                </b-col>
                <b-col>
                  <b-button class="max-size" @click="selectQuestion('BOARD_TO_PICK')" @touchend="selectQuestion('BOARD_TO_PICK')">
                    <b-icon-arrow-bar-up class="mr-2"/>
                    Replacer une carte dans la pioche
                  </b-button>
                </b-col>
                <b-col>
                  <b-button class="max-size" @click="returnToHelpHome" @touchend="returnToHelpHome">Non rien, c'est très bien</b-button>
                </b-col>
              </b-row>
            </div>
          </div>
          <div v-if="question=== 'RETURN_CARD'">
            <div v-if="isMouse">
              <p v-if="sentenceIndex === 0">
                Il existe plusieurs façons de retourner les cartes. <br>Mais pour moi, la meilleure solution est tout simplement de
                <span class="font-weight-bold">cliquer sur la carte</span>
                !
              </p>
              <p v-if="sentenceIndex === 1">Vous pouvez également
                <span class="font-weight-bold">survoler la carte et cliquer</span>
                                            sur le bouton
                <b-icon-front/>
                                            qui apparaît.
              </p>
            </div>
            <div v-if="isTactile">
              <p v-if="sentenceIndex === 0">Pour retourner une carte, vous devrez tout d'abord
                <span class="font-weight-bold">cliquer dessus.</span>
              </p>
              <p v-if="sentenceIndex === 1">
                <span class="font-weight-bold">Le bouton
                  <b-icon-front/>
                </span>
                apparaîtra alors en haut à droite de la carte.<br> Si vous
                <span class="font-weight-bold">cliquez dessus</span>
                la carte se retournera.
              </p>
            </div>
          </div>
          <div v-if="question=== 'MOVE_CARD'">
            <p v-if="sentenceIndex === 0">Pour déplacer une carte, rien de plus simple !<br>
              <span class="font-weight-bold">Glissez</span>
                                          et
              <span class="font-weight-bold">déposer</span>
                                          la carte à l'endroit que vous désirez.
            </p>
          </div>
          <div v-if="question=== 'DISCARD_CARD'">
            <p v-if="sentenceIndex === 0">
              <span v-if="isMouse">En déplaçant le
                <span class="font-weight-bold">curseur</span>
                                   de votre souris
                <span class="font-weight-bold">sur la carte,</span>
              </span>
              <span v-if="isTactile">En
                <span class="font-weight-bold">cliquant</span>
                                     sur la carte,
              </span>
              le
              <span class="font-weight-bold">bouton
                <b-icon-trash/>
              </span>
              apparaîtra.<br>Il ne vous reste plus qu'à
              <span class="font-weight-bold">cliquer</span>
              dessus pour
              <span class="font-weight-bold">défausser</span>
              la carte.
            </p>
            <p v-if="sentenceIndex === 1">En cas d'erreur ne vous inquietez pas, la carte n'est
              <span class="font-weight-bold">pas perdue.</span>
            </p>
            <p v-if="sentenceIndex === 2">Pour la
              <span class="font-weight-bold">récupérer</span>
                                          il vous suffit de cliquer sur le
              <span class="font-weight-bold">bouton "
                <b-icon-trash/>
                                             Parcourir la défausse".
              </span>
              <br>D'ailleurs, la défausse fonctionne exactement comme la pioche !
            </p>
          </div>
          <div v-if="question=== 'TURN_CARD'">
            <p v-if="sentenceIndex === 0">
              <span v-if="isMouse">En déplaçant le
                <span class="font-weight-bold">curseur</span>
                                   de votre souris
                <span class="font-weight-bold">sur la carte,</span>
              </span>
              <span v-if="isTactile">En
                <span class="font-weight-bold">cliquant</span>
                                     sur la carte,
              </span>
              le
              <span class="font-weight-bold">bouton
                <b-icon-arrow-clockwise/>
              </span>
              apparaîtra.<br>Il ne vous reste plus qu'à
              <span class="font-weight-bold">cliquer</span>
              dessus pour
              <span class="font-weight-bold">tourner</span>
              la carte.
            </p>
          </div>
          <div v-if="question=== 'BOARD_TO_PICK'">
            <p v-if="sentenceIndex === 0">
              <span v-if="isMouse">En déplaçant le
                <span class="font-weight-bold">curseur</span>
                                   de votre souris
                <span class="font-weight-bold">sur la carte,</span>
              </span>
              <span v-if="isTactile">En
                <span class="font-weight-bold">cliquant</span>
                                     sur la carte,
              </span>
              le
              <span class="font-weight-bold">bouton
                <b-icon-arrow-bar-up/>
              </span>
              apparaîtra.<br>Il ne vous reste plus qu'à
              <span class="font-weight-bold">cliquer</span>
              dessus pour
              <span class="font-weight-bold">replacer</span>
              la carte
              <span class="font-weight-bold">dans la pioche.</span>
            </p>
          </div>
        </div>

        <div v-if="sentenceIndex > 0" class="previous-icon pointer" @click="previous" @touchend="previous">
          <b-icon-caret-left-fill></b-icon-caret-left-fill>
        </div>
        <div v-if="!(nextDisabled)" class="next-icon pointer" @click="next" @touchend="next">
          <b-icon-caret-right-fill></b-icon-caret-right-fill>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:        'GameHelp', data()
  {
    return {
      partyCode: '', mouseImgSrc: './assets/mouse.png', question: '', sentenceIndex: 0, nbSentence: 0, alreadyQuestionned: false, interactionMode: 'MOUSE', nextDisabled: false,
    };
  }, methods:  {
    returnToHelpHome()
    {
      this.question      = '';
      this.sentenceIndex = 0;
    }, next()
    {
      this.sentenceIndex ++;
      if (this.sentenceIndex >= this.nbSentence)
      {
        this.returnToHelpHome();
      }
    }, previous()
    {
      this.sentenceIndex --;
    }, selectQuestion(question)
    {
      this.question      = question;
      this.sentenceIndex = 0;
      switch (question)
      {
        case 'FRIEND':
          this.nbSentence   = 2;
          this.nextDisabled = false;
          break;
        case 'WANT_SOLUTION':
          this.nbSentence   = 3;
          this.nextDisabled = false;
          break;
        case 'SEARCH_CARD':
          this.nbSentence   = 4;
          this.nextDisabled = false;
          break;
        case 'CARD_INTERACTIONS':
          this.nbSentence   = 1000;
          this.nextDisabled = true;
          break;
        case 'RETURN_CARD':
          this.sentenceIndex = 0;
          this.nbSentence    = 2;
          this.nextDisabled  = false;
          break;
        case 'MOVE_CARD':
          this.sentenceIndex = 0;
          this.nbSentence    = 1;
          this.nextDisabled  = false;
          break;
        case 'DISCARD_CARD':
          this.sentenceIndex = 0;
          this.nbSentence    = 3;
          this.nextDisabled  = false;
          break;
        case 'TURN_CARD':
          this.sentenceIndex = 0;
          this.nbSentence    = 1;
          this.nextDisabled  = false;
          break;
        case 'BOARD_TO_PICK': // TODO
          this.sentenceIndex = 0;
          this.nbSentence    = 1;
          this.nextDisabled  = false;
          break;
        default:
          break;
      }
      this.alreadyQuestionned = true;
    }, quitHelp()
    {
      this.$emit('guideReadEnd');
    }, clickInteraction(e)
    {
      e.preventDefault();
      this.interactionMode = 'MOUSE';
    }, touchInteraction(e)
    {
      e.preventDefault();
      this.interactionMode = 'TACTILE';
    },
  }, computed: {
    isTactile()
    {
      return this.interactionMode === 'TACTILE';
    }, isMouse()
    {
      return this.interactionMode === 'MOUSE';
    },
  }, mounted()
  {
    this.partyCode = localStorage.getItem('PARTY_CODE');
  },
};
</script>

<style scoped>
.max-size
{
  height: 100%;
  width:  100%;
}

img
{
  height:   50vh;
  bottom:   15%;
  left:     5%;
  position: absolute;
}

.guide-container
{
  height: 80vh;
  width:  90vw;
}

.bubble
{
  position:      relative;
  font-family:   sans-serif;
  font-size:     18px;
  line-height:   24px;
  width:         60vw;
  background:    #ffffff;
  border-radius: 40px;
  padding:       24px;
  text-align:    center;
  color:         #000000;
  left:          20%;
  top:           20%;
}

.bubble-bottom-left:before
{
  content:       '';
  width:         0px;
  height:        0px;
  position:      absolute;
  border-left:   24px solid #ffffff;
  border-right:  12px solid transparent;
  border-top:    12px solid #ffffff;
  border-bottom: 20px solid transparent;
  left:          32px;
  bottom:        -24px;
}

.next-icon
{
  width:    fit-content;
  position: absolute;
  right:    4vw;
}

.previous-icon
{
  width:    fit-content;
  position: absolute;
  left:     4vw;
}

.close-cross
{
  position: absolute;
  right:    0%;
  top:      0%;
  width:    10vh;
  height:   10vh;
}

.close-cross-container
{
  top:      -50%;
  position: absolute;
  right:    0%;
}

.mouse-recentre
{
  top:      -10%;
  position: absolute;
  right:    0%;
}

.bubble-recentre
{
  top:      -25%;
  position: absolute;
  right:    0%;
}

#party-code-in-help
{
  background-color: lightgray;
  border:           thin solid black;
  padding:          0 5px;
}
</style>
