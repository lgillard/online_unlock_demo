<template>
  <div class="guide-container">
    <img :src="mouseImgSrc" alt="Mouse guide" class="pointer" @click="next"/>
    <div class="bubble bubble-bottom-left">
      <div>
        <p v-if="currentTextIndex === 0">Bonjour et bienvenue sur l'application
          <span class="font-weight-bold">Unlock!</span>
                                         en ligne, le jeu d'escape game de
          <a href="https://www.spacecowboys.fr/">SpaceCowboys.</a>
        </p>
        <p v-if="currentTextIndex === 1">Pour jouer, rien de plus simple,
          <a href="https://play.google.com/store/apps/details?id=com.spacecowboys.unlocks01&hl=fr&gl=US">téléchargez</a>
                                         l'application mobile gratuite.
        </p>
        <p v-if="currentTextIndex === 2" class="font-weight-bold">...</p>
        <p v-if="currentTextIndex === 3">Parfait, vous pouvez à présent lancer le
          <span class="font-weight-bold">tutoriel</span>
                                         pour découvrir les
          <span class="font-weight-bold">règles</span>
                                         !
        </p>
        <p v-if="currentTextIndex === 4">Vous pouvez jouer seul ou
          <span class="font-weight-bold">avec vos amis !</span>
          <br>Pour cela il vous suffit de remplacer votre
          <span class="font-weight-bold">code partie</span>
                                         par celui de vos amis !
        </p>
        <p v-if="currentTextIndex === 5">Ah si, une dernière chose ! <br> Si vous êtes
          <span class="font-weight-bold">perdus</span>
                                         sur le site, appelez-moi en cliquant sur le
          <span class="font-weight-bold"> bouton d'aide
            <b-icon-question-circle></b-icon-question-circle>
          </span>
                                         en haut à droite.
        </p>
      </div>
      <div v-if="currentTextIndex > 0" class="previous-icon pointer" @click="previous">
        <b-icon-caret-left-fill></b-icon-caret-left-fill>
      </div>
      <div class="next-icon pointer" @click="next">
        <b-icon-caret-right-fill></b-icon-caret-right-fill>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:       'WelcomeExplanations', data()
  {
    return { mouseImgSrc: './assets/mouse.png', partyCodeSrc: './assets/partyCode.png', nbTexts: 6, currentTextIndex: 0 };
  }, methods: {
    next()
    {
      this.currentTextIndex ++;
      if (this.currentTextIndex >= this.nbTexts)
      {
        this.$emit('guideReadEnd');
      }
    }, previous()
    {
      this.currentTextIndex --;
    },
  },
};
</script>

<style scoped>
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
</style>
