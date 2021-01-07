<template>
  <div id="app">
    <Header/>
    <main>
      <Card/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Card   from '@/./components/game/Card';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default {
  name: 'App', components: {
    Card, Footer, Header,
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
  padding: 10vh;
}

.card-size
{
  height: 450px;
  width:  270px;
}

.grab
{
  cursor: grab;
}
</style>
