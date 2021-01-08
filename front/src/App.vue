<template>
  <div id="app">
    <Header/>
    <main>
      <Board/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Board  from '@/components/game/Board';
import Header from '@/components/Header';
import io     from 'socket.io-client';

export default {
  name: 'App', components: {
    Board, Footer, Header,
  }, data()
  {
    return { socket: io('localhost:3001') };
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

main
{
}

.grab
{
  cursor: grab;
}
</style>
