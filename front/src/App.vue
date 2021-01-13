<template>
  <div id="app">
    <Header/>
    <main>
      <PickModal :cards="pick" :socket="socket"/>
      <DiscardModal :cards="discard" :socket="socket"/>
      <HelpModal/>
      <Board :cards="board" :socket="socket"/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import DiscardModal from '@/components/discardExplorer/DiscardModal';
import Footer       from '@/components/Footer';
import Board        from '@/components/game/Board';
import Header       from '@/components/Header';
import HelpModal    from '@/components/HelpModal';
import PickModal    from '@/components/pickExplorer/PickModal';
import io           from 'socket.io-client';

export default {
  name: 'App', components: {
    DiscardModal, PickModal, HelpModal, Board, Footer, Header,
  }, data()
  {
    return { socket: io('localhost:3001'), pick: { default: () => [] }, board: { default: () => [] }, discard: { default: () => [] } };
  }, mounted()
  {
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

.pointer
{
  cursor: pointer;
}
</style>
