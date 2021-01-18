<template>
  <div>
    <img v-for="scenario of scenarii" :key="scenario" :src="getSrc(scenario)" class="pointer" height="300" width="200" @click="scenarioChosen(scenario)"/>
  </div>
</template>

<script>
export default {
  name:       'HomeContent', data()
  {
    return {
      scenarii: ['demo',
                 'christmas'],
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
