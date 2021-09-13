<template>
<div class='commandes'>
    <h1>COMMANDES</h1>
    <p>Z --> DEPLACEMENT VERS LE HAUT</p>
    <p>Q --> DEPLACEMENT VERS LA GAUCHE</p>
    <p>S --> DEPLACEMENT VERS LE BAS</p>
    <p>D --> DEPLACEMENT VERS LA DROITE</p>
    <p>CLICK GAUCHE --> ATTAQUER</p>
    <p> ESPACE --> PAUSE </p>
    <button class="command-btn" id="return" type="button" v-on:click="returnMenu">Retour au menu</button>
</div>
</template>

<script>
import { bus } from '../main.js'
export default {
    name:'Commands',
    Props:
    {
        activecomponent : 
        {
             type: String
        }
    },
    methods: {
         returnMenu(){
        this.activecomponent = "startmenu";
        bus.$emit('changeStateGame', 'startmenu');
      },
    }
}
</script>

<style scoped>
.commandes{
    color:rgb(255, 255, 255);
    font-size:26px;
}

p{
    border: solid 3px rgb(46, 26, 223);
    border-radius: 5px;
    width:500px;
    padding:10px;
    margin:60px auto;
    background-color: rgb(88, 55, 55);
}
h1{
    color:brown
}
</style>