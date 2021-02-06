<template>
  <div class="guide-container">
    <div v-b-tooltip.hover class="pointer" title="Fermer le guide" @click="quitHelp">
      <b-icon-x class="close-cross" variant="light"/>
    </div>
    <img :class="question === '' ? '' : 'pointer'" :src="mouseImgSrc" alt="Mouse guide" @click="next"/>
    <div class="bubble bubble-bottom-left">
      <div v-if="question === ''">
        <p v-if="!alreadyQuestionned">Comment puis-je vous aider ?</p>
        <p v-else>Autre chose ?</p>
        <b-row>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('START_PARTY')">Je veux lancer une partie</b-button>
          </b-col>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('PLAY_WITH_FRIEND')">Je veux jouer avec mes amis</b-button>
          </b-col>
          <b-col>
            <b-button class="max-size" @click="selectQuestion('DIFFICULTIES_INFO')">Je veux choisir une difficulté</b-button>
          </b-col>
          <b-col>
            <b-button v-if="!alreadyQuestionned" class="max-size" @click="quitHelp">Non, rien</b-button>
            <b-button v-else class="max-size" @click="quitHelp">Non, merci</b-button>
          </b-col>
        </b-row>
      </div>
      <div v-else>
        <div>
          <div v-if="question === 'START_PARTY'">
            <p v-if="sentenceIndex === 0">Si vous n'avez
              <span class="font-weight-bold">jamais joué</span>
                                          sur unlock demo en ligne,
              <span class="font-weight-bold">cliquez sur l'image "tutoriel"</span>
                                          .
            </p>
            <p v-if="sentenceIndex === 1">Sinon, cliquez sur n'importe quelle autre image de scénario.</p>
          </div>
          <div v-if="question === 'PLAY_WITH_FRIEND'">
            <p v-if="sentenceIndex === 0">Rien de mieux qu'une partie de Unlock! entre amis. <br>Mais c'est parfois difficile avec la distance...</p>
            <p v-if="sentenceIndex === 1">Heureusement avec l'application Unlock! en ligne rien de plus simple !</p>
            <p v-if="sentenceIndex === 2">Il vous suffit d'entrer le
              <span class="font-weight-bold">même code partie que vos amis,</span>
                                          dans la barre
              <span class="font-weight-bold">en haut de l'écran.</span>
              <br>Et voilà, le tour est joué !
            </p>
          </div>
          <div v-if="question === 'DIFFICULTIES_INFO'">
            <p v-if="sentenceIndex === 0">Le choix du scénario est important car
              <span class="font-weight-bold">la difficulté varie</span>
                                          parfois beaucoup.
            </p>
            <p v-if="sentenceIndex === 1">Pour vous aider à choisir regardez
              <span class="font-weight-bold">le nombre de {{ '' }}</span>
              <b-icon-lock-fill/>
            </p>
            <p v-if="sentenceIndex === 2">Un scénario
              <b-icon-lock-fill/>
              <b-icon-lock/>
              <b-icon-lock/>
                                          indique un niveau débutant. <br> Ces scénarii sont idéaux pour les personnes
              <span class="font-weight-bold">pas ou peu familières</span>
                                          avec les escape games.
            </p>
            <p v-if="sentenceIndex === 3">Un scénario
              <b-icon-lock-fill/>
              <b-icon-lock-fill/>
              <b-icon-lock/>
                                          indique un niveau avancé. <br> Ces scénarii sont idéaux pour les personnes
              <span class="font-weight-bold">familières</span>
                                          avec les escape games.
            </p>
            <p v-if="sentenceIndex === 4">Un scénario
              <b-icon-lock-fill/>
              <b-icon-lock-fill/>
              <b-icon-lock-fill/>
                                          indique un niveau difficile. <br> Ces scénarii sont idéaux pour les personnes
              <span class="font-weight-bold">très familières</span>
                                          avec les escape games et ayant un
              <span class="font-weight-bold">esprit logique très développé.</span>
            </p>
          </div>
        </div>
        <div v-if="sentenceIndex > 0" class="previous-icon pointer" @click="previous">
          <b-icon-caret-left-fill></b-icon-caret-left-fill>
        </div>
        <div class="next-icon pointer" @click="next">
          <b-icon-caret-right-fill></b-icon-caret-right-fill>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:       'WelcomeExplanations', data()
  {
    return { mouseImgSrc: './assets/mouse.png', question: '', sentenceIndex: 0, nbSentence: 0, alreadyQuestionned: false };
  }, methods: {
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
        case 'START_PARTY':
          this.nbSentence = 2;
          break;
        case 'PLAY_WITH_FRIEND':
          this.nbSentence = 3;
          break;
        case 'DIFFICULTIES_INFO':
          this.nbSentence = 5;
          break;
        default:
          break;
      }
      this.alreadyQuestionned = true;
    }, quitHelp()
    {
      this.$emit('guideReadEnd');
    },
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
</style>
