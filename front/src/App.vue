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
