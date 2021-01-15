<template>
  <b-modal id="help-modal" ok-only size="xl">
    <h2>Guide d'utilisation</h2>

    <div>
      <h3>Commencer le jeu</h3>
      <div class="ml-4">
        <h4>Première fois ?</h4>
        <p>Si vous n'avez jamais joué sur unlock demo en ligne, cliquez sur l'image "tutoriel" sur l'interface</p>
      </div>
      <div class="ml-4">
        <h4>Déjà joué ?</h4>
        <p>Choisissez votre scénario en fonction de la difficulté souhaitée (voir nombre de cadenas
          <b-icon-lock-fill/>
           ), puis cliquez sur l'image.
        </p>
      </div>
    </div>

    <div>
      <h3>Choix de la difficulté</h3>
      <div>
        <p>
          Il existe trois niveaux de difficulté. <br> Pour un maximum d'amusement il est conseillé de bien choisir son niveau. Une partie trop complexe n'est jamais agréable. </p>
        <ul>
          <li>
            <b-icon-lock-fill/>
            <b-icon-lock/>
            <b-icon-lock/>
            Niveau débutant. Scénarii idéaux pour les personnes pas/peu familières avec les escape games
          </li>
          <li>
            <b-icon-lock-fill/>
            <b-icon-lock-fill/>
            <b-icon-lock/>
            Niveau avancé. Scénarii idéaux pour les personnes familières avec les escape games
          </li>
          <li>
            <b-icon-lock-fill/>
            <b-icon-lock-fill/>
            <b-icon-lock-fill/>
            Niveau difficile. Scénarii idéals pour les personnes très familières avec les escape games
          </li>
        </ul>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  name: 'GameHelpModal',
};
</script>

<style scoped>

</style>
