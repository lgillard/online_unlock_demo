<template>
  <div id="app">
    <Header/>
    <main>
      TODO
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default {
  name: 'App', components: {
    Footer, Header,
  },
};
</script>

<style>
#app
{
  color:                   #2c3e50;
  font-family:             Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing:  antialiased;
  margin-top:              60px;
  -moz-osx-font-smoothing: grayscale;
  text-align:              center;
}
</style>
