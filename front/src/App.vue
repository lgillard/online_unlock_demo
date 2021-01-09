<template>
  <div id="app">
    <Header/>
    <main>
      <SearchCardsModal :cards="pick" :socket="socket"/>
      <Board :cards="board" :socket="socket"/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer           from '@/components/Footer';
import Board            from '@/components/game/Board';
import Header           from '@/components/Header';
import SearchCardsModal from '@/components/searchCards/SearchCardsModal';
import io               from 'socket.io-client';

export default {
  name: 'App', components: {
    SearchCardsModal, Board, Footer, Header,
  }, data()
  {
    return { socket: io('localhost:3001'), pick: { default: () => [] }, board: { default: () => [] } };
  }, mounted()
  {
    this.socket.on('CARD_INIT_REQUIRED', () =>
    {
      // TODO: explore scenario imgs to populate array
      this.pick = [{ x: 100, y: 100, name: 'start', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '69', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '42', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '46', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '16', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '35', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '25', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '48', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '69', isBack: true, position: 1 },
                   { x: 100, y: 100, name: '11', isBack: true, position: 1 }];
      this.socket.emit('INIT_STACK', this.pick);
    });
    this.socket.on('CARD_STACKS', data =>
    {
      this.board = data.cardsOnBoard;
      this.pick  = data.cardsOnPick;
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
</style>
