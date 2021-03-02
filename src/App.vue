<template>
  <div id="app">
    <b-overlay :show="guideType !== ''" opacity="0.95" variant="dark" z-index="500">
      <template #overlay>
        <WelcomeExplanations v-if="guideType === 'WELCOME'" @guideReadEnd="closeGuide()"></WelcomeExplanations>
        <HomeHelp v-if="guideType === 'HOME'" @guideReadEnd="closeGuide()"></HomeHelp>
        <GameHelp v-if="guideType === 'GAME'" @guideReadEnd="closeGuide()"></GameHelp>
        <StartGameWelcome v-if="guideType === 'WELCOME_GAME'" :scenario="scenario" @guideReadEnd="closeGuide()"></StartGameWelcome>
      </template>
      <HomeHeader v-if="!scenarioHasBeenSelected" :socket="socket" @openHomeHelp="() => this.openHelp('HOME')"/>
      <GameHeader v-else :discard="discard" :pick="pick" :scenario="scenario" :socket="socket" @openGameHelp="() => this.openHelp('GAME')" @quitGame="quitGame"/>
      <main>
        <HomeContent v-if="!scenarioHasBeenSelected" @scenarioChosen="scenarioChosen"/>
        <Board v-else :cards="board" :scenario="scenario" :socket="socket"/>
      </main>
      <Footer/>
    </b-overlay>
  </div>
</template>

<script>
import Footer              from '@/components/Footer';
import Board               from '@/components/game/Board';
import GameHeader          from '@/components/game/GameHeader';
import GameHelp            from '@/components/game/GameHelp';
import StartGameWelcome    from '@/components/game/StartGameWelcome';
import HomeContent         from '@/components/home/HomeContent';
import HomeHeader          from '@/components/home/HomeHeader';
import HomeHelp            from '@/components/home/HomeHelp';
import WelcomeExplanations from '@/components/home/WelcomeExplanations';
import io                  from 'socket.io-client';

export default {
  name:        'App', components: {
    WelcomeExplanations, HomeContent, HomeHeader, Board, Footer, GameHeader, HomeHelp, GameHelp, StartGameWelcome,
  }, data()
  {
    return {
      displayGuide: true,
      guideType:    'WELCOME',
      scenario:     '',
      socket:       io('https://catnip-jagged-catshark.glitch.me/'),
      pick:         { default: () => [] },
      board:        { default: () => [] },
      discard:      { default: () => [] },
    };
  }, computed: {
    scenarioHasBeenSelected()
    {
      return this.scenario !== '';
    },
  }, methods:  {
    scenarioChosen(scenario)
    {
      this.socket.emit('SCENARIO_CHOSEN', scenario);
    }, quitGame()
    {
      this.socket.emit('ABANDON_CURRENT_GAME');
    }, closeGuide()
    {
      this.guideType = '';
    }, openHelp(type)
    {
      this.guideType = type;
    },
  }, mounted()
  {
    const _this = this;
    this.socket.on('SCENARIO_IN_PROGRESS', scenario =>
    {
      _this.scenario = scenario;
      if (scenario !== '')
      {
        _this.guideType = 'WELCOME_GAME';
      }
    });
    this.socket.on('CARD_STACKS', data =>
    {
      _this.board   = data.cardsOnBoard;
      _this.pick    = data.cardsOnPick;
      _this.discard = data.cardsOnDiscard;
    });
    this.socket.on('ABANDON_CURRENT_GAME', () =>
    {
      _this.scenario = '';
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
