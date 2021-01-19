<template>
  <div>
    <h2>Bonjour et bienvenue sur l'application unlock en ligne !</h2>
    <p>
      <a href="https://play.google.com/store/apps/details?id=com.spacecowboys.unlocks01&hl=fr&gl=US">Télécharger l'application mobile</a>
      puis sélectionnez le scénario de votre choix
    </p>
    <div>
      <img v-for="scenario of scenarii" :key="scenario" :src="getSrc(scenario)" class="pointer" height="300" width="200" @click="scenarioChosen(scenario)"/>
    </div>
  </div>
</template>

<script>
export default {
  name:       'HomeContent', data()
  {
    return {
      scenarii: ['demo',
                 'christmas',
                 'spirou'],
    };
  }, methods: {
    scenarioChosen(scenario)
    {
      this.$emit('scenarioChosen', scenario);
    }, getSrc(scenario)
    {
      return '/assets/gameList/' + scenario + '/cover.JPG';
    },
  },
};
</script>

<style scoped>
div
{
  height: 80vh;
}

img
{
  margin: 4vh;
}
</style>
