ds<template>
    <div class='flex'>
        <canvas class="c" id="canvas" width="1200" height="875" ></canvas>
        <div class="main"> 
        <h1>HEROS</h1>
        <p><img src="../assets/img/heart.png" width="25" height="25">  HP : {{this.hp}} / {{this.maxhp}}</p>
        <p>LEVEL : {{this.level}}<br>XP: {{this.actualxp}}/{{this.xpMax}}</p> 
        <p>SCORE : {{this.score}}</p>
        <h1>ITEMS</h1>
        <div class="inventory"><div class="case" v-on:click="drinkpotionheal"><img id="imagepotionheal" :src="item1" width="50" height="50"></div><div class="case" v-on:click="drinkpotionbonus"><img id="imagepotionbonus" :src="item2" width="50" height="50"></div></div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'Display',
        props: { hp:null,
                 maxhp:null,
                 score:null,
                 level:null, 
                 actualxp:null,
                 xpMax:null,
                 item1:null,
                 item2:null,
                 drinkpotionheal: null,  
                 drinkpotionbonus:null,
                },     
}


</script>

<style scoped>

.flex {
    display:flex;
    justify-content:center;
    
}


.main{

    display:flex;
    flex-direction:column;
    justify-content: center;
    color:black;
    font-family: 'Fjalla One', sans-serif;
    background:center no-repeat url('../assets/img/backgroundhud.png');
    border-radius:5px;
    width:630px;
    height:875px;
    margin-right:0;
    
}
p {
    border-bottom:3px solid black;
    border-radius:30px;
    color:black;
    width:30%;
    margin:1% auto;
    font-size:2rem;
}

.inventory {
    display:flex;
    justify-content: center;
    
}
.case {
    border:3px solid black;
    border-radius:3px;
    margin-left:5%;
    margin-right:5%;
    width:50px;
    height:50px;
}

.c {
    border-radius:30%
}

h1 {
    font-size:3rem;
    margin-bottom:2%
}
</style>