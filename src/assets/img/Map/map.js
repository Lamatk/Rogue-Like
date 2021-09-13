let grid =
[[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],
[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true]];



//  Map = {
//     image = url(`images/Map00.jpg`),
//     collision =
//         [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
//         [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
//         [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],
//         [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
//         [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
//         [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
// }


// function stop(x,y){
//         if( collision[playerPositionY + y][playerPositionX + x] == false ){
//             return false
//         }
//         return true

//     };

// function playerPosition(){
//     playerPixelPositionX = (playerPositionX * 60) + 30; 
//     playerPixelPositionY = (playerPositionY * 43.75) + 21.875;
// };

// playerMovement:  function(e) {

//                 switch (e.code) {
//                     case 'ArrowRight':
//                         if (e.type == "keydown" && Map.stop(1,0))
//                             playerPositionX += 1;
//                             break;
                    
//                     case 'ArrowLeft':
//                         if (e.type == "keydown" && Map.stop(-1,0) )
//                             playerPositionX -=1;
//                             break;

//                     case 'ArrowUp':
//                         if(e.type == "keydown" && Map.stop(0,-1))
//                             playerPositionY -= 1;
//                             break;

//                     case 'ArrowDown':
//                         if(e.type == "keyDown" && Map.stop(0,1))
//                             playerPositionY += 1;
//                             break;
//                 }
//             };
    

