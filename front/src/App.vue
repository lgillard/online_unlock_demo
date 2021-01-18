<template>
  <div id="app">
    <HomeHeader v-if="!scenarioHasBeenSelected"/>
    <GameHeader v-else :discard="discard" :pick="pick" :scenario="scenario" :socket="socket" @quitGame="quitGame"/>
    <main>
      <HomeContent v-if="!scenarioHasBeenSelected" @scenarioChosen="scenarioChosen"/>
      <Board v-else :cards="board" :scenario="scenario" :socket="socket"/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer      from '@/components/Footer';
import Board       from '@/components/game/Board';
import GameHeader  from '@/components/game/GameHeader';
import HomeContent from '@/components/home/HomeContent';
import HomeHeader  from '@/components/home/HomeHeader';
import io          from 'socket.io-client';

export default {
  name:        'App', components: {
    HomeContent, HomeHeader, Board, Footer, GameHeader,
  }, data()
  {
    return {
      scenario: '', socket: io('localhost:3001'), pick: { default: () => [] }, board: { default: () => [] }, discard: { default: () => [] },
    };
  }, computed: {
    scenarioHasBeenSelected()
    {
      return this.scenario !== '';
    },
  }, methods:  {
    scenarioChosen(scenario)
    {
      this.scenario = scenario;
      this.socket.emit('SCENARIO_CHOSEN', scenario);
    }, quitGame()
    {
      this.scenario = '';
    },
  }, mounted()
  {
    this.socket.on('SCENARIO_IN_PROGRESS', scenario =>
    {
      this.scenario = scenario;
    });
    this.socket.on('CARD_STACKS', data =>
    {
      this.board   = data.cardsOnBoard;
      this.pick    = data.cardsOnPick;
      this.discard = data.cardsOnDiscard;
    });
    this.socket.on('ABANDON_CURRENT_GAME', () =>
    {
      this.scenario = '';
    });
  },
};
</script>

<style>
#app
{
  color:                   #2c3e50;
  font-family:             Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing:  antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align:              center;
}

.grab
{
  cursor: grab;
}

.pointer
{
  cursor: pointer;
}
</style>
