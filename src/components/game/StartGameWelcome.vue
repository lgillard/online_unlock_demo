<template>
  <div class="guide-container">
    <div v-b-tooltip.hover class="pointer close-cross-container" title="Fermer le guide" @click="closeGuide">
      <b-icon-x class="close-cross" variant="light"/>
    </div>
    <img :src="mouseImgSrc" alt="Mouse guide" class="pointer mouse-recentre" @click="next"/>
    <div class="bubble bubble-bottom-left bubble-recentre">
      <div>
        <div v-if="scenario === 'demo'">
          <p v-if="currentTextIndex === 0">Ah ! Je vois que vous avez choisi le tutoriel. <br>Vous semblez écouter mes conseils à la lettre !</p>
          <p v-if="currentTextIndex === 1">Ce scénario va vous permettre de
            <span class="font-weight-bold">comprendre les principes</span>
                                           du jeu et de
            <span class="font-weight-bold">prendre en main</span>
                                           cette interface.
          </p>
          <p v-if="currentTextIndex === 2">Tout au long de l'aventure il vous faudra
            <span class="font-weight-bold">manipuler les cartes.</span>
            <br>Comme sur un plateau réel vous pourrez
            <span class="font-weight-bold">déplacer, tourner,</span>
                                           et même
            <span class="font-weight-bold">retourner</span>
                                           les cartes.
          </p>
          <p v-if="currentTextIndex === 3">Mais je ne vais pas vous embéter plus longtemps.<br>Amusez vous bien !<br>Et n'oubliez pas, si vous avez la moindre question,
            <span class="font-weight-bold">appelez-moi</span>
                                           en cliquant sur le
            <b-icon-question-circle/>
          </p>
        </div>
        <div v-else>
          <p v-if="currentTextIndex === 0">Vous revoilà déjà ? Je vois que le jeu vous plais !</p>
          <div v-if="currentTextIndex === 1">
            <p>J'ai trouvé quelque chose dans le fond de la boite de jeux.<br>Je me suis dis que ça pourrait vous être utile.</p>
            <img :src="rulesImgSrc" class="rules">
          </div>
          <p v-if="currentTextIndex === 2">Et au fait ! N'oubliez pas, si vous avez la moindre question,
            <span class="font-weight-bold">appelez-moi</span>
                                           en cliquant sur le
            <b-icon-question-circle/>
          </p>
        </div>
      </div>
      <div v-if="currentTextIndex > 0" class="previous-icon pointer" @click="previous">
        <b-icon-caret-left-fill></b-icon-caret-left-fill>
        G
      </div>
      <div class="next-icon pointer" @click="next">
        <b-icon-caret-right-fill></b-icon-caret-right-fill>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:       'StartGameWelcome', props: {
    scenario: { required: true },
  }, data()
  {
    return { mouseImgSrc: './assets/mouse.png', rulesImgSrc: './assets/rules.JPG', nbTexts: 0, currentTextIndex: 0 };
  }, methods: {
    next()
    {
      this.currentTextIndex ++;
      if (this.currentTextIndex >= this.nbTexts)
      {
        this.closeGuide();
      }
    }, previous()
    {
      this.currentTextIndex --;
    }, closeGuide()
    {
      this.$emit('guideReadEnd');
    },
  }, mounted()
  {
    this.nbTexts = this.scenario === 'demo' ? 4 : 3;
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
</style>
