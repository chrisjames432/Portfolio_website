

import { TWEEN } from '../three/examples/jsm/libs/tween.module.min.js';



export function tweenlookat(camera,objectA,objectB){





  var tween = new TWEEN.Tween(objectA.position)
  .to({ x: objectB.position.x, y: objectB.position.y, z: objectB.position.z }, 1000*3)
  .easing(TWEEN.Easing.Quadratic.InOut)
  .onUpdate(function() {
    camera.lookAt(objectA.position);
  })
  .start();




}







export function tweencamera(time, camera, endpos,la) {
  


       
         var from = { 
           x:camera.position.x, 
           y:camera.position.y,
           z:camera.position.z,
           rx: 0
       
         }
       
         var to   = {  
             x: endpos.x,
             y: endpos.y,
             z: endpos.z,
             rx:0
       
       
         }
 
       
       
      var thistween=  new TWEEN.Tween(from)
       
             .to(to,1000*time)
             .easing(TWEEN.Easing.Linear.None)
             .onUpdate(function(){
              camera.position.set(from.x, from.y,from.z);
              camera.lookAt(la.x,la.y,la.z)

         
                   
             }).start()
             
             .onComplete(function() {
              
               console.log('done!');
             
             });
             
           return thistween
              
    }



