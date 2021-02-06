<template>
  <header>
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand>Demo Unlock en ligne</b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <!-- Party code -->
          <b-nav-item>
            <div class="row">
              <label class="col-6 m-auto" for="party-code">Code partie :</label>
              <b-form-input id="party-code" v-model="partyCode" class="col-6" @keydown="partyCodeKeyDown" @keyup="partyCodeKeyUp"/>
            </div>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <!-- Help -->
          <b-nav-item v-b-tooltip.hover class="help h5 mb-2" title="Obtenir de l'aide" @click="emitHomeHelp">
            <b-icon-question-circle animation="cylon-vertical" class="mr-3"/>
            <HomeHelpModal/>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import HomeHelpModal from '@/components/home/HomeHelpModal';

export default {
  name:       'HomeHeader', components: { HomeHelpModal }, props: { socket: { required: true } }, data()
  {
    return { partyCode: '', typingTimer: null, doneTypingInterval: 3000 };
  }, mounted()
  {
    const tempCode = localStorage.getItem('PARTY_CODE');
    if (tempCode !== undefined && tempCode !== null)
    {
      this.partyCode = tempCode;
    }
    else
    {
      this.partyCode = this.generateCode();
    }
    this.updPartyCode();
  }, methods: {
    emitHomeHelp()
    {
      this.$emit('openHomeHelp');
    }, generateCode()
    {
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let charactersLength = characters.length;
      for (var i = 0; i < 7; i ++)
      {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }, partyCodeKeyUp()
    {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.updPartyCode, this.doneTypingInterval);
    }, partyCodeKeyDown()
    {
      clearTimeout(this.typingTimer);
    }, updPartyCode()
    {
      this.socket.emit('UPD_PARTY_CODE', { newPartyCode: this.partyCode, saveParty: false });
      localStorage.setItem('PARTY_CODE', this.partyCode);
    },
  },
};
</script>

<style scoped>

</style>
