<template>
  <div>
    <h1>MENU PAUSE</h1>
    <button class="pause-btn" id="resume" type="button" v-on:click="changeActiveComponent">Reprendre la partie</button>
    <button class="pause-btn" id="return" type="button" v-on:click="returnMenu">Retour au menu</button>
  </div>
</template>

<script>
import { bus } from '../main.js'
export default {
    name: 'Pause',
    props: {
            activecomponent : {
                type: String
            }

        },
        methods: {
      changeActiveComponent (){
          this.activecomponent = "game";
          bus.$emit('changeStateGame', 'game');
      },

      returnMenu(){
        this.activecomponent = "startmenu";
        bus.$emit('changeStateGame', 'startmenu');
      },
   }
}
</script>

<style scope>

button{
  color:black;
  background-color: burlywood;
  width:300px;
  height: 100px;
  border: 2px solid brown;
  border-radius: 10px;
  font-size:22px;
}
</style>