<template>
  <div id="app">
    <Header/>
    <main>
      <SearchCardsModal :cards="this.pick" :socket="socket"/>
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
    return { socket: io('localhost:3001'), discard: { default: [] }, pick: { default: [] }, board: { default: [] } };
  }, mounted()
  {
    this.socket.on('CARD_INIT_REQUIRED', () =>
    {
      // TODO: explore scenario imgs to populate array
      this.pick = ['69',
                   '42',
                   '46',
                   '11',
                   '48',
                   '16',
                   '35',
                   '25',
                   '16',
                   'start'];
      this.socket.emit('INIT_STACK', this.pick);
    });
    this.socket.on('CARD_STACKS', ({ cardsOnBoard, cardsOnPick, cardsOnDiscard }) =>
    {
      this.discard = cardsOnDiscard;
      this.board   = cardsOnBoard;
      this.pick    = cardsOnPick;
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
