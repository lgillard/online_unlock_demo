<template>
  <header>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>
        <div v-b-modal.quit-game-modal v-b-tooltip:hover class="mb-2 h2 d-inline-block power pointer" title="Quitter la partie">
          <b-icon-power/>
          <LeaveGameModal :socket="socket" @quitWithoutSave="quitWithoutSave" @saveAndQuit="saveAndQuit"/>
        </div>
        Tutoriel
      </b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <!-- Left part -->
        <b-navbar-nav>
          <!-- TODO: use variable for boardgames box value -->
          <b-nav-text>Boite de jeu : Demo Adventure</b-nav-text>
        </b-navbar-nav>

        <!-- Right part -->
        <b-navbar-nav class="ml-auto">
          <!-- Pick -->
          <b-nav-item v-b-modal.search-pick-modal class="mr-4">
            <b-icon-search class="mr-3"/>
            <div class="d-inline">Rechercher une carte</div>
            <PickModal :cards="pick" :scenario="scenario" :socket="socket"/>
          </b-nav-item>

          <!-- Discard -->
          <b-nav-item v-b-modal.search-discard-modal class="mr-4">
            <b-icon-trash class="mr-3"/>
            <div class="d-inline">Parcourir la défausse</div>
            <DiscardModal :cards="discard" :scenario="scenario" :socket="socket"/>
          </b-nav-item>

          <!-- Help -->
          <b-nav-item v-b-modal.help-modal v-b-tooltip.hover class="help h5 mb-2" title="Obtenir de l'aide">
            <b-icon-question-circle class="mr-3"/>
            <GameHelpModal/>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>

import DiscardModal   from '@/components/discardExplorer/DiscardModal';
import GameHelpModal  from '@/components/game/GameHelpModal';
import LeaveGameModal from '@/components/game/LeaveGameModal';
import PickModal      from '@/components/pickExplorer/PickModal';
import io             from 'socket.io-client';

export default {
  name:       'GameHeader', components: { LeaveGameModal, GameHelpModal, PickModal, DiscardModal }, props: {
    socket: io('localhost:3001'), pick: { default: () => [] }, discard: { default: () => [] }, scenario: { default: 'demo' },
  }, methods: {
    quitWithoutSave()
    {
      this.socket.emit('ABANDON_CURRENT_GAME');
    }, saveAndQuit()
    {
      // TODO: redirect to a page that show user his in progress scenario
    },
  },
};
</script>

<style scoped>
.power
{
  margin: inherit;
}
</style>
