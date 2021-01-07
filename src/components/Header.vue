<template>
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
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>

</style>
