<template>
  <div id="app">
    <header>
      <b-navbar toggleable="sm" type="light" variant="light">
        <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

        <b-navbar-brand>Tutoriel</b-navbar-brand>

        <b-collapse id="nav-text-collapse" is-nav>
          <b-navbar-nav>
            <!-- TODO: use variable for boardgames box value -->
            <b-nav-text>Boite de jeu : Demo adventures</b-nav-text>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <main>
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </main>
    <footer>TODO</footer>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App', components: {
    HelloWorld,
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
