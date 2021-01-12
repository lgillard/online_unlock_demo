<template>
  <header>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Tutoriel</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <!-- Left part -->
        <b-navbar-nav>
          <!-- TODO: use variable for boardgames box value -->
          <b-nav-text>Boite de jeu : Demo adventures</b-nav-text>
        </b-navbar-nav>

        <!-- Right part -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.search-cards-modal class="mr-4">
            <b-icon-search class="mr-3"/>
            <div class="d-inline">Rechercher une carte</div>
          </b-nav-item>
          <b-nav-item v-b-modal.help-modal v-b-tooltip.hover class="help h5 mb-2" title="Obtenir de l'aide">
            <b-icon-question-circle class="mr-3"/>
          </b-nav-item>
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
