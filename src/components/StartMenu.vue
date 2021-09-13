<template>
    <div class="background">   
        <div class="menu">
            <h1>Rogue Like</h1>
            <img class="left" src="../assets/img/torche.gif" alt="torche">
            <img class="right" src="../assets/img/torche.gif" alt="torche">
            <button class="start-btn" id="start" type="button" v-on:click="changeActiveComponent">Démarrer la partie</button>
            <button class="start-btn" id="command" type="button" v-on:click="showCommands">Commandes</button>
           
            
        </div>
    </div>
</template>


<script>
    import { bus } from '../main.js'
    export default {
        name: 'Startmenu',
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

    showCommands (){
        this.activecomponent = "commands";
        bus.$emit('changeStateGame', 'commands');
    }
  }
    }
</script>


<style scoped>
.background {
    width:100%;
    height:1000px;
    background-color: black;
}

h1 {
    position:relative;
    top:100px;
    font-family: 'Sacramento', cursive;
    font-size:7rem;
    margin-bottom:5%;
    color:brown;
}

.menu {
    background:no-repeat center url('../assets/img/parchemin.png');
    display:flex;
    flex-direction:column;
    height:800px;  
}

.start-btn {
    width:30%;
    margin: 1% auto 2%;
    border:none;
    background-color:#e8e4d4;
    color:black;
    font-size:3rem;
    font-family: 'Sacramento', cursive;
    font-weight:600;
}


.start-btn:hover {
    color:red;
}

.start-btn:hover::after {
    
    background-image: url('../assets/img/plume-encre.png');
    background-size: 24px 20px;
    display: inline-block;
    width: 24px; 
    height: 20px;
    content:"";
    
}


.left {
    position:absolute;
    top:250px;
    width:25%;
}

.right {
    position:absolute;
    width:25%;
    top:250px;
    right:50px;
}
</style>