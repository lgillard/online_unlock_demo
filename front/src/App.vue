<template>
  <div id="app">
    <Header/>
    <main>
      <SearchCardsModal :cards="pick" :socket="socket"/>
      <Board :socket="socket"/>
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
    return { socket: io('localhost:3001'), discard: { default: () => [] }, pick: { default: () => [] }, board: { default: () => [] } };
  }, mounted()
  {
    this.socket.on('CARD_INIT_REQUIRED', () =>
    {
      // TODO: explore scenario imgs to populate array
      this.pick = [{ x: 100, y: 100, name: 'start', isBack: true },
                   { x: 100, y: 100, name: '69', isBack: true },
                   { x: 100, y: 100, name: '42', isBack: true },
                   { x: 100, y: 100, name: '46', isBack: true },
                   { x: 100, y: 100, name: '16', isBack: true },
                   { x: 100, y: 100, name: '35', isBack: true },
                   { x: 100, y: 100, name: '25', isBack: true },
                   { x: 100, y: 100, name: '48', isBack: true },
                   { x: 100, y: 100, name: '69', isBack: true },
                   { x: 100, y: 100, name: '11', isBack: true }];
      this.socket.emit('INIT_STACK', this.pick);
    });
    this.socket.on('CARD_STACKS', data =>
    {
      this.board   = data.cardsOnBoard;
      this.pick    = data.cardsOnPick;
      this.discard = data.cardsOnDiscard;
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
