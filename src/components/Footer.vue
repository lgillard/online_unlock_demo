<template>
  <footer>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>
        <a href="https://www.spacecowboys.fr/">
          <img alt="Logo_SPACE_COWBOYS.png"
               src="https://static.wixstatic.com/media/59baa2_fe106c0eda7a480e9a1135d076a1f274~mv2_d_5016_5051_s_4_2.png/v1/fill/w_70,h_70,al_c,q_85,usm_0.66_1.00_0.01/Logo_SPACE_COWBOYS.webp"
               style="width: 56px; height: 56px; object-fit: cover;">
        </a>
      </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="https://www.spacecowboys.fr/">Retrouver d'autres jeux SPACE Cowboys</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <!-- Found other scenarii -->
        <b-nav-item href="https://www.spacecowboys.fr/unlock">
          <img alt="Trouver d'autres scénarii de jeu Unlock!"
               src="https://alloescape.fr/wp-content/uploads/2019/04/avis-jeu-soci%C3%A9t%C3%A9-escape-game-unlock-4.png"
               style="height: 56px; object-fit: cover;">
          Trouver d'autres scénarii de jeu Unlock!
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped>

</style>
