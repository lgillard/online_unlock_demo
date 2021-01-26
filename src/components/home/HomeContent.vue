<template>
  <div>
    <h2>Bonjour et bienvenue sur l'application unlock en ligne !</h2>
    <p>Ce site vous permet de jouer à des escape-game de
      <a href="https://www.spacecowboys.fr/">Space Cowboy</a>
       avec des personnes loin de chez vous
    </p>
    <p>
      Pour jouer,
      <a href="https://play.google.com/store/apps/details?id=com.spacecowboys.unlocks01&hl=fr&gl=US">télécharger l'application mobile</a>
      puis sélectionnez le scénario de votre choix
    </p>
    <div>
      <img v-for="scenario of scenarii"
           :key="scenario"
           v-b-tooltip:hover
           :src="getSrc(scenario)"
           :title="scenarioTitle(scenario)"
           class="pointer"
           height="300"
           width="200"
           @click="scenarioChosen(scenario)"/>
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
                 'spirou',
                 'ra'],
    };
  }, methods: {
    scenarioChosen(scenario)
    {
      this.$emit('scenarioChosen', scenario);
    }, getSrc(scenario)
    {
      return './assets/gameList/' + scenario + '/cover.JPG';
    }, scenarioTitle(scenarioName)
    {
      return 'Lancer le scénario ' + scenarioName;
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
