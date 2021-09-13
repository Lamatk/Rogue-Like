<template>
    <div>
        <Display  :hp="player.life" :maxhp="player.maxhp" :level="player.level" :score="score" :actualxp="player.actualxp" :xpMax="player.xpMax" :item1="item.potionHeal" :item2="item.potionBonusAttack" :drinkpotionheal="this.drinkHealPotion" :drinkpotionbonus="this.drinkHealBonusAttack"></Display>    
    </div>      
</template>



<script>
import { bus } from '../main.js'
   import Display from './Display.vue';
   export default {
        name: 'Player',
        data(){
            return {
                
                canvasDom:null,
                ctx : null,
                canvasWidth: 1200,
                canvasHeight: 875,
                i : 0,
                score:0,
                move : 0,
                activeMap: 0,
                block:0,

                player: 
                {   
                    type:
                    {   
                        dash: {
                            top: require("../assets/img/herotop.png"),
                        },

                        skin : 
                        {
                            top: require("../assets/img/herotop.png"),
                            down:require("../assets/img/herobottom.png"),
                            left: require("../assets/img/heroleft.png"),
                            right:require("../assets/img/heroright.png"),
                            checkTop : false,
                            checkBottom : false,
                            checkLeft : false,
                            checkRight : false,
                        }, 
                    },

                    positionX: 13,
                    positionY: 12,
                    maxhp:10,
                    life: 10,
                    level:1,
                    actualxp:0,
                    xpMax:100,

                    attack:
                    {
                        damage:1,
                        sound: require("../assets/sound/slash.wav"),
                        img: {
                             top :require("../assets/img/slashtop.png"),
                             down :require("../assets/img/slashdown.png"),
                             left :require("../assets/img/slashleft.png"),
                             right :require("../assets/img/slashright.png"),
                        },
                        isAttacking: false,
                    },
                    alive:true,
               
                },


                mob00 :{
                    
                    type : {
                        attack:
                        {
                            damage:1,
                            sound: require("../assets/sound/skeletonsound.wav"),
                            img: {
                             top :require("../assets/img/slashtopmob.png"),
                             down :require("../assets/img/slashdownmob.png"),
                             left :require("../assets/img/slashleftmob.png"),
                             right :require("../assets/img/slashrightmob.png"),
                                },
                        },
                        
                        skin : {
                            top: require("../assets/img/Skeletontop.png"),
                            down:require("../assets/img/Skeletondown.png"),
                            left: require("../assets/img/Skeletonleft.png"),
                            right:require("../assets/img/Skeletonright.png"),
                            checkTop : false,
                            checkBottom : false,
                            checkLeft : false,
                            checkRight : false,
                        },
                    },
                    positionX: 7,
                    positionY: 8,
                    aggro: false,
                    life: 10,
                    alive: true,
                    i:0,
                },

                mob01: {

                    type : {
                        attack:
                        {
                            damage:1,
                            sound: require("../assets/sound/zombieattack.wav"),
                             img: {
                             top :require("../assets/img/slashtopmob.png"),
                             down :require("../assets/img/slashdownmob.png"),
                             left :require("../assets/img/slashleftmob.png"),
                             right :require("../assets/img/slashrightmob.png"),
                                },
                        },
                        
                        skin : {
                            top: require("../assets/img/ZombieTop.png"),
                            down:require("../assets/img/ZombieBottom.png"),
                            left: require("../assets/img/ZombieLeft.png"),
                            right:require("../assets/img/ZombieRight.png"),
                            checkTop : false,
                            checkBottom : false,
                            checkLeft : false,
                            checkRight : false,
                        },
                    },
                    positionX: 10,
                    positionY: 17,
                    aggro: false,
                    life: 10,
                    alive: true,
                    i:0,

                },

                boss: {
                    type : {
                        attack:
                        {
                            damage:5,
                            sound: require("../assets/sound/skeletonsound.wav"),
                            img: {
                             top :require("../assets/img/slashtopmob.png"),
                             down :require("../assets/img/slashdown.png"),
                             left :require("../assets/img/slashleftmob.png"),
                             right :require("../assets/img/slashrightmob.png"),
                                },
                        },
                        
                        skin : {
                            top: require("../assets/img/Werewolftop.png"),
                            down:require("../assets/img/Werewolfdown.png"),
                            left: require("../assets/img/Werewolfleft.png"),
                            right:require("../assets/img/Werewolfright.png"),
                            checkTop : false,
                            checkBottom : false,
                            checkLeft : false,
                            checkRight : false,
                        },
                    },
                    positionX: 10,
                    positionY: 10,
                    aggro: false,
                    life: 30,
                    alive: true,
                    i:0,
                
                },
                
                box00 : {
                    alive:true,
                    life : 4,
                    positionX: 10,
                    positionY: 9,
                    aggro: false,
                    form: 3,
                    type: 
                    {
                        skin :
                        {      
                            top: require("../assets/img/box.png"),
                            down: require("../assets/img/box.png"),
                            left: require("../assets/img/box.png"),
                            right: require("../assets/img/box.png") 
                        }
                    },
                },
                    
               item : {
                   displayImgPotionHeal:null,
                   displayImgPotionBonus:null,
                   potionHeal : require("../assets/img/pt1.png"),
                   potionBonusAttack: require("../assets/img/pt2.png"),
                   isDrunkHeal:false,
                   isDrunkBonus:false,
                   sound:require("../assets/sound/drinkpotionsound.wav")

               },

                mobTab:[],
                

                map00 : {
                    collision :
                        [[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
                        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
                        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
                        [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
                        [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],

                    
                                   
                    background: require('../assets/img/Map00.jpg'),

                }

            }
        },
        
        components:
        {
            Display,    
        },

            
        mounted()
        {        
            this.initGame();
            this.playGame();
            document.addEventListener('keydown', this.keyboardEvent);
            document.addEventListener('click',this.attackHero)
            document.addEventListener('keydown', this.goPause); 
        },


        methods:
        {   
            initGame()
            {
                this.canvasDom  = document.querySelector("#canvas");
                this.canvasDom.width = this.canvasWidth;
                this.canvasDom.height= this.canvasHeight;
                this.ctx = this.canvasDom.getContext("2d");
                this.mobPath(this.mob00);
                this.mobPath(this.mob01);     
            },

            displayGame()
            {
                this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); 
                this.displayMap();
                this.displayEntity(this.player);
                this.displayEntity(this.mob00);
                this.displayEntity(this.mob01);
                this.displayEntity(this.box00);
                
                if(this.mob00.alive == false && this.mob01.alive == false && this.block == 0)
                {
                    this.block = 1,
                    this.mobPath(this.boss);
                    console.log("ah oué")
                    return this.block;
                }

                if(this.mob00.alive == false && this.mob01.alive == false)
                {
                    this.displayEntity(this.boss)
                }
                if(this.player.isAttacking == true)
                {
                    this.attackAnimation(this.player)
                }
                
                
            },

            displayMap()
            {
                let img = new Image();
                img.src = this.map00.background;
                this.ctx.drawImage(img, 0, 0, 1200,875);            
            },

            playGame()
            {
                this.displayGame();
                requestAnimationFrame(this.playGame);
            },


            entityPositionX(entity)
            {
                let entityX = (entity.positionX * 60) + 30; 
                return entityX
            },

            entityPositionY(entity)
            {
                let entityY = (entity.positionY * 43.75) + 21.875;
                return entityY
            },

            
            displayEntity(entity)
            {   
                if (entity.life <= 0)
                {
                    entity.alive = false;
                    entity.aggro = false;
                }

                if (entity.alive)
                {  

                    let img = new Image();

                    if (entity.type.skin.checkTop)
                    {
                        img.src = entity.type.skin.top;
                    }
                    else if (entity.type.skin.checkBottom)
                    {
                        img.src = entity.type.skin.down;
                    }
                    else if (entity.type.skin.checkLeft)
                    {
                        img.src = entity.type.skin.left;
                    }
                    else if (entity.type.skin.checkRight)
                    {
                        img.src = entity.type.skin.right;
                    }
                    else 
                    {
                        img.src = entity.type.skin.top;
                    }

                    if( entity != this.boss)
                    {
                        this.ctx.drawImage(img, this.entityPositionX(entity), this.entityPositionY(entity),50,50)
                    }
                    else
                    {
                        this.ctx.drawImage(img, this.entityPositionX(entity), this.entityPositionY(entity),75,75)
                    }
                    if(entity.form == 3)
                    {
                        this.map00.collision[entity.positionY][entity.positionX] = 3;
                    }
                    else if(entity == this.player)
                    {
                        this.map00.collision[entity.positionY][entity.positionX] = 2;
                    }
                    else
                    {
                        this.map00.collision[entity.positionY][entity.positionX] = entity;
                    }

                }
                
                else 
                {
                    this.map00.collision[entity.positionY][entity.positionX] = 1;
                }              
            },

            stop(entity,x,y)
            {
                if( this.map00.collision[entity.positionY + y][entity.positionX + x] == 1)
                {
                    let path = true;
                    this.map00.collision[entity.positionY][entity.positionX] = 1;
                    return path
                }
                let path = false;
                return path
            },

            moveUp(entity)
            {
                entity.type.skin.checkBottom = false;
                entity.type.skin.checkTop = true;
                entity.type.skin.checkLeft = false;
                entity.type.skin.checkRight = false;
                
                if (this.stop(entity,0,-1))
                {
                        entity.positionY -= 1;          
                } 
            },

            moveDown(entity)
            {
                
                entity.type.skin.checkBottom = true;
                entity.type.skin.checkTop = false;
                entity.type.skin.checkLeft = false;
                entity.type.skin.checkRight = false;
                
                if (this.stop(entity,0,1))
                {
                        entity.positionY += 1;          
                } 
            },

            moveLeft(entity)
            {
                entity.type.skin.checkBottom = false;
                entity.type.skin.checkTop = false;
                entity.type.skin.checkLeft = true;
                entity.type.skin.checkRight = false;

                if (this.stop(entity,-1,0))
                {
                        entity.positionX -= 1;          
                } 
            },        
               
            moveRight(entity)
            {
                entity.type.skin.checkBottom = false;
                entity.type.skin.checkTop = false;
                entity.type.skin.checkLeft = false;
                entity.type.skin.checkRight = true;


                if (this.stop(entity,1,0))
                {
                        entity.positionX += 1;          
                } 
            },

            keyboardEvent(e)
            {
                switch( e.code )
                {
                    case 'KeyA':
                        this.moveLeft(this.player);
                        break;
                    case 'KeyW':
                        this.moveUp(this.player);
                        break;
                    case 'KeyD':
                        this.moveRight(this.player);
                        break;
                    case 'KeyS':
                        this.moveDown(this.player);
                        break;
                    
                }
            },

            aggro(ennemy)
            {
                if(ennemy != this.boss)
                {
                    if(ennemy.positionY - 2  <= this.player.positionY && ennemy.positionY + 2 >= this.player.positionY && ennemy.positionX - 2  <= this.player.positionX && ennemy.positionX + 2 >= this.player.positionX)
                    {
                            ennemy.aggro = true;
                            console.log('ouioui et son gros taxi')
                            this.mobPursuit(ennemy);
                    }
                }
                else
                {
                     if(ennemy.positionY - 6  <= this.player.positionY && ennemy.positionY + 6 >= this.player.positionY && ennemy.positionX - 6  <= this.player.positionX && ennemy.positionX + 6 >= this.player.positionX)
                    {
                            ennemy.aggro = true;
                            console.log('ouioui et son gros taxi')
                            this.mobPursuit(ennemy);
                    }
                }
            },


            mobPursuit(ennemy) 
            {

                if( ennemy.aggro == true)
                {   
                    this.attackMob(ennemy)            
                    if(this.player.positionX > ennemy.positionX && this.move == 0)
                    {
                        if(this.map00.collision[ennemy.positionY][ennemy.positionX + 1] == 0 || this.map00.collision[ennemy.positionY][ennemy.positionX + 1] == 3)
                        {
                            this.mobResearch(ennemy,1,0);
                        }
                        else
                        {
                            this.moveRight(ennemy);
                        }
                    }
                    else if(this.player.positionX < ennemy.positionX && this.move == 0){
                        if(this.map00.collision[ennemy.positionY][ennemy.positionX - 1] == 0 || this.map00.collision[ennemy.positionY][ennemy.positionX - 1] == 3)
                        {
                            this.mobResearch(ennemy,-1,0);
                        }
                        else
                        {
                            this.moveLeft(ennemy);
                        }
                    }
                    else if(this.player.positionY < ennemy.positionY){
                        if(this.map00.collision[ennemy.positionY - 1][ennemy.positionX] == 0 || this.map00.collision[ennemy.positionY - 1][ennemy.positionX] == 3)
                            {
                                this.mobResearch(ennemy,0,-1);
                            }
                            else
                            {
                                this.moveUp(ennemy);
                                this.move = 0;
                            }
                    }
                    else if(this.player.positionY > ennemy.positionY){
                        if(this.map00.collision[ennemy.positionY + 1][ennemy.positionX] == 0 || this.map00.collision[ennemy.positionY + 1][ennemy.positionX] == 3)
                            {
                                this.mobResearch(ennemy,0,1);
                            }
                            else
                            {
                                this.moveDown(ennemy);
                                this.move = 0;
                            }
                    }
                    setTimeout(()=>
                        {
                            this.mobPursuit(ennemy)
                        },1000);
                }
                
            },
               

            mobPath(ennemy)
            {
                this.aggro(ennemy);     

                console.log('hihi');

                if(ennemy.aggro == false )
                {
                    if (ennemy.i <= 3)
                    {
                        setTimeout(this.moveUp(ennemy),10000);
                        setTimeout(()=>{
                            this.mobPath(ennemy)
                        },1000);
                        return ennemy.i++;
                    }
                    else if(ennemy.i > 3 && ennemy.i <= 6 )
                    {
                        setTimeout(this.moveDown(ennemy),10000);
                        setTimeout(()=>{
                            this.mobPath(ennemy)
                        },1000);
                        return ennemy.i++;
                    } 
                    else
                    {
                        setTimeout(()=>{
                            this.mobPath(ennemy)
                        },1000);
                        return ennemy.i = 0;
                    }  
                }              
            },

                attackHero()
                {
                    if (this.player.alive)
                    {
                    this.player.isAttacking = true;
                    
                    this.soundAttack(this.player);
                    if (this.player.type.skin.checkBottom)
                    {   
                        let target= this.map00.collision[this.player.positionY +1][this.player.positionX];

                        if(target == 3)
                        {
                            target = this.box00;
                        }
                        
                        console.log("Attaque en bas")
                        if(target.positionY == this.player.positionY + 1 && target.positionX == this.player.positionX && target.life > 0)
                        {
                            this.moveDown(target);

                            if( target.life <= this.player.attack.damage )
                            {
                                this.player.actualxp += 50;
                                if (this.player.actualxp == this.player.xpMax)
                                {
                                    this.player.level+=1;
                                    this.player.actualxp = 0;
                                    this.player.maxhp += 5;
                                    this.player.attack.damage+=1;
                                }
                            }

                            target.life-=this.player.attack.damage
                        }
                        
                    }
                    else if (this.player.type.skin.checkTop)
                    {

                        let target= this.map00.collision[this.player.positionY - 1][this.player.positionX];

                        if(target == 3)
                        {
                            target = this.box00;
                        }

                        if(target.positionY == this.player.positionY -1  && target.positionX == this.player.positionX && target.life > 0)
                        {
                            this.moveUp(target);
                            if( target.life <= this.player.attack.damage )
                            {
                                this.player.actualxp += 50;
                                if (this.player.actualxp == this.player.xpMax)
                                {
                                    this.player.level+=1;
                                    this.player.actualxp = 0;
                                    this.player.maxhp += 5;
                                    this.player.attack.damage+=1;
                                }
                            }
                            target.life-=this.player.attack.damage
                        }
                    }
                    else if (this.player.type.skin.checkLeft)
                    {
                        let target= this.map00.collision[this.player.positionY][this.player.positionX - 1];

                        if(target == 3)
                        {
                            target = this.box00;
                        }

                        if(target.positionX == this.player.positionX -1 && target.positionY == this.player.positionY && target.life > 0)
                        {
                            this.moveLeft(target);
                            if( target.life <= this.player.attack.damage )
                            {
                                this.player.actualxp += 50;
                                if (this.player.actualxp == this.player.xpMax)
                                {
                                    this.player.level+=1;
                                    this.player.actualxp = 0;
                                    this.player.maxhp += 5;
                                    this.player.attack.damage+=1;
                                }
                            }
                            target.life-=this.player.attack.damage
                        }
                    }
                    else if (this.player.type.skin.checkRight)
                    {

                        let target= this.map00.collision[this.player.positionY][this.player.positionX + 1];

                        if(target == 3)
                        {
                            target = this.box00;
                        }

                        if(target.positionX == this.player.positionX +1 && target.positionY == this.player.positionY && target.life > 0)
                        {
                            this.moveRight(target);
                            if( target.life <= this.player.attack.damage )
                            {
                                this.player.actualxp += 50;
                                if (this.player.actualxp == this.player.xpMax)
                                {
                                    this.player.level+=1;
                                    this.player.actualxp = 0;
                                    this.player.maxhp += 5;
                                    this.player.attack.damage+=1;
                                }
                            }
                            target.life-=this.player.attack.damage
                        }
                    }
                    this.player.attack.isAttacking = true;
                    }
                },

                attackMob(ennemy)
                {   
                        
                    console.log(this.player.positionY)
                            
                    if(this.player.positionY == ennemy.positionY +1   && ennemy.positionX == this.player.positionX && this.player.life > 0)
                    {
                        this.soundAttack(ennemy.type);
                        this.moveDown(this.player);
                        return console.log(this.player.life-=ennemy.type.attack.damage)
                    }
                    else if(this.player.positionY == ennemy.positionY -1   && ennemy.positionX == this.player.positionX && this.player.life > 0)
                    {
                        this.soundAttack(ennemy.type);
                        this.moveUp(this.player);
                        return console.log(this.player.life-=ennemy.type.attack.damage)
                    }
                    else if(this.player.positionX == ennemy.positionX -1   && ennemy.positionY == this.player.positionY && this.player.life > 0)
                    {
                        this.soundAttack(ennemy.type);
                        this.moveLeft(this.player);
                        return console.log(this.player.life-=ennemy.type.attack.damage)
                    }
                    else if(this.player.positionX == ennemy.positionX +1   && ennemy.positionY == this.player.positionY && this.player.life > 0)
                    {
                        this.soundAttack(ennemy.type);
                        this.moveRight(this.player);
                        return console.log(this.player.life-=ennemy.type.attack.damage)
                    }
                        
                    
                },
                attackAnimation(entity){
                    
                    let img = new Image();
                    if (entity.type.skin.checkTop)
                    {
                        img.src = entity.attack.img.top;
                        this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(entity)-30),(this.entityPositionY(entity)-80),128,128)
                    }
                    else if (entity.type.skin.checkBottom)
                    {
                        img.src = entity.attack.img.down;
                        this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(entity)-40),(this.entityPositionY(entity)+10),128,128)
                    }
                    else if (entity.type.skin.checkRight)
                    {
                        img.src = entity.attack.img.right;
                        this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(entity)+10),(this.entityPositionY(entity)-30),128,128)     
                    }
                    else if (entity.type.skin.checkLeft)
                    {
                        img.src = entity.attack.img.left;
                        this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(entity)-80),(this.entityPositionY(entity)-40),128,128)
                    }
                    this.player.isAttacking = false;

                },


                // dashAnimation(){
                //     let img = new Image();
                // if (this.player.type.skin.checkTop)
                // {

                //     img.src = this.player.attack.img.top;
                //     this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(this.player)-30),(this.entityPositionY(this.player)-80),128,128)
                // }
                // else if (this.player.type.skin.checkBottom)
                // {
                //     img.src = this.player.attack.img.down;
                //     this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(this.player)-40),(this.entityPositionY(this.player)+10),128,128)
                // }
                // else if (this.player.type.skin.checkRight)
                // {
                //     img.src = this.player.attack.img.right;
                //     this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(this.player)+10),(this.entityPositionY(this.player)-30),128,128)     
                // }
                // else if (this.player.type.skin.checkLeft)
                // {
                //     img.src = this.player.attack.img.left;
                //     this.ctx.drawImage(img,0,0,128,128,(this.entityPositionX(this.player)-80),(this.entityPositionY(this.player)-40),128,128)
                // }
                // },
            

                soundAttack(entity)
                {
                    let swordsound = new Audio()  
                    swordsound.src = entity.attack.sound
                    swordsound.play();
                },

                soundPotion(){
                    let potionsound = new Audio();
                    potionsound.src = this.item.sound
                    potionsound.play()
                },

                mobResearch(entity,x,y)
                {

                    
                    
                    if( x != 0 )
                    {
               

                        if(this.map00.collision[entity.positionY + y + 1][entity.positionX + x] == 1 && this.player.positionY >= entity.positionY || this.map00.collision[entity.positionY + y + 1][entity.positionX + x] == 2 && this.player.positionY >= entity.positionY)
                        { 
                            this.moveDown(entity);
                        
                        }
                        else if(this.map00.collision[entity.positionY + y - 1][entity.positionX + x] == 1 && this.player.positionY < entity.positionY || this.map00.collision[entity.positionY - y - 1][entity.positionX + x] == 2 && this.player.positionY < entity.positionY)
                        {
                            this.moveUp(entity); 
                        }
                        else
                        {
                            entity.aggro = false;                   
                        }
                    } 
                
                    if( y != 0 )
                    {        
                        if(this.map00.collision[entity.positionY + y][entity.positionX + x + 1] == 1)
                        {
                            this.moveRight(entity);  
                            this.move = 1;     
                        }
                        else if(this.map00.collision[entity.positionY + y][entity.positionX + x - 1] == 1 )
                        {
                            this.moveLeft(entity); 
                            this.move = 1;
                        }
                        else
                        {
                            entity.aggro = false;                  
                        }
                    }
                },
                drinkHealPotion(){

                    this.item.displayImgPotionHeal = document.querySelector("#imagepotionheal");
                    if(!this.item.isDrunkHeal)
                    {
                        this.soundPotion()
                        this.item.displayImgPotionHeal.style.display ="none" 
                        if (this.player.level == 1)
                        {
                        switch(this.player.life){
                            case 10: this.player.life+=0;
                            break;
                            case 9: this.player.life+=1;
                            break;
                            case 8: this.player.life+=2;
                            break;
                            case 7: this.player.life+=3;
                            break;
                            case 6: this.player.life+=4;
                            break;
                            default:this.player.life+=5;
                            break;
                        }
                        }

                        else if (this.player.level == 2)
                        {
                            switch(this.player.life){
                            case 15: this.player.life+=0;
                            break;
                            case 14: this.player.life+=1;
                            break;
                            case 13: this.player.life+=2;
                            break;
                            case 12: this.player.life+=3;
                            break;
                            case 11: this.player.life+=4;
                            break;
                            default:this.player.life+=5;
                            break;
                        }
                        }
                        this.item.isDrunkHeal = true;
                    }
                },


                drinkHealBonusAttack()
                {

                    this.item.imgpotionBonus = document.querySelector("#imagepotionbonus");
                    if(!this.item.isDrunkBonus)
                    {
                        this.soundPotion()
                        this.item.imgpotionBonus.style.display ="none" 
                        this.player.attack.damage+=1;
                        setTimeout(()=>{this.player.attack.damage-=1},10000);
                        this.item.isDrunkBonus = true;  
                    }
                    
                },

                goPause (space)
                {
                    const key = space.which;    
                    if (key === 32) {  
                        this.activecomponent = "pause";
                        bus.$emit('changeStateGame', 'pause');
                    }
                 },

             /*   dropItem(entity) {
                }*/
    
            // blibli(){
            // let arthur = this.player;
            // localStorage.setItem('player',JSON.stringify(arthur))

            
            // },

            // blabla(){
            // let arthurStorage = JSON.parse(localStorage.getItem('player'))
            // console.log(arthurStorage)
            // }
        }
    

        
   }  

</script>



