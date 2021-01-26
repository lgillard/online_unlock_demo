<template>
  <b-modal id="help-modal" ok-only size="xl">
    <h1>Guide d'utilisation</h1>

    <details>
      <summary><h2>Commencer le jeu</h2></summary>
      <div class="ml-4">
        <h3>Première fois ?</h3>
        <p>Si vous n'avez jamais joué sur unlock demo en ligne, cliquez sur l'image "tutoriel" sur l'interface</p>
      </div>
      <div class="ml-4">
        <h3>Déjà joué ?</h3>
        <p>Choisissez votre scénario en fonction de la difficulté souhaitée (voir nombre de cadenas
          <b-icon-lock-fill/>
           ), puis cliquez sur l'image.
        </p>
      </div>
    </details>

    <details>
      <summary><h2>Jouer avec un/des amis</h2></summary>
      <div class="ml-4">
        <p>Si vous souhaitez jouer en équipe il vous suffit de modifier votre "code partie" afin d'avoir le même que vos amis. Ceux code se trouve en haut de la page.</p>
        <div>
          <p>
            <span class="font-weight-bold">Bonus :</span>
            Vous pouvez choisir le code que vous souhaitez. Cependant attention à ne pas prendre un mot trop générique pour ne pas vous retrouver dans la partie d'inconnus.
          </p>
        </div>
      </div>
    </details>

    <details>
      <summary><h2>Choix de la difficulté</h2></summary>
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
    </details>
  </b-modal>
</template>

<script>
export default {
  name: 'GameHelpModal',
};
</script>

<style scoped>
h2
{
  display:   inline;
  font-size: 2vw;
}

h3
{
  font-size: 1.5vw;
}
</style>
