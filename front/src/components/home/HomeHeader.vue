<template>
  <header>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Bienvenue sur l'application Unlock Demo en ligne</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- Help -->
          <b-nav-item v-b-modal.help-modal v-b-tooltip.hover class="help h5 mb-2" title="Obtenir de l'aide">
            <b-icon-question-circle class="mr-3"/>
            <HelpModal/>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: 'HomeHeader',
};
</script>

<style scoped>

</style>
