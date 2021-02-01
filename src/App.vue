<template>
  <div id="app" @mousemove="mouseMove">
    <HomeHeader v-if="!scenarioHasBeenSelected" :socket="socket"/>
    <GameHeader v-else :discard="discard" :pick="pick" :scenario="scenario" :socket="socket" @quitGame="quitGame"/>
    <main>
      <HomeContent v-if="!scenarioHasBeenSelected" @scenarioChosen="scenarioChosen"/>
      <Board v-else :cards="board" :scenario="scenario" :socket="socket"/>
      <div>
        <FriendCursor v-for="(friendId, index) of friendIds" :key="index" :friendId="friendId" :socket="socket"/>
      </div>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer       from '@/components/Footer';
import FriendCursor from '@/components/FriendCursor';
import Board        from '@/components/game/Board';
import GameHeader   from '@/components/game/GameHeader';
import HomeContent  from '@/components/home/HomeContent';
import HomeHeader   from '@/components/home/HomeHeader';
import io           from 'socket.io-client';

export default {
  name:        'App', components: {
    FriendCursor, HomeContent, HomeHeader, Board, Footer, GameHeader,
  }, data()
  {
    return {
      friendIds: [], scenario: '', socket: io('http://localhost:3000/'), pick: { default: () => [] }, board: { default: () => [] }, discard: { default: () => [] },
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
    }, mouseMove(event)
    {
      this.socket.emit('MOUSE_MOVE', { x: event.x + window.scrollX, y: event.y + window.scrollY });
    },
  }, mounted()
  {
    const _this = this;
    this.socket.on('SCENARIO_IN_PROGRESS', scenario =>
    {
      _this.scenario = scenario;
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
    this.socket.on('FRIEND_CONNECTION', id =>
    {
      _this.friendIds.push(id);
      console.log('connection ids', this.friendIds);
    });
    this.socket.on('FRIEND_DISCONNECTION', id =>
    {
      _this.friendIds = _this.friendIds.filter(friendId =>
                                               {
                                                 return friendId !== id;
                                               });
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
