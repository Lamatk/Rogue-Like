<template>
  <div id="app">
    <Startmenu v-if="activecomponent == 'startmenu'" ></Startmenu>
    <Player v-if ="activecomponent == 'game'"></Player>
    <Pause v-if ="activecomponent == 'pause'"></Pause>
    <Commands v-if ="activecomponent == 'commands'"></Commands>
  </div>
</template>

<script>

import Startmenu from './components/StartMenu.vue';
import Player from './components/Player.vue'
import { bus } from './main.js';
import Pause from './components/Pause.vue';
import Commands from './components/Commands.vue';
export default {
  name: 'App',
  components: {    

    Startmenu,
    Player,
     Pause,
     Commands,
  },

  data() {
    return {
        activecomponent: 'startmenu'
    }
  },

  created (){
    bus.$on('changeStateGame', (data) => {
      this.activecomponent = data;
    })
  }
}
</script>





<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color:black;
}

body {
  background-color:black;
}
</style>