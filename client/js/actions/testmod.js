
import * as THREE from '../three/build/three.module.js';



    
    
        function addOrangeCube(stage) {
            const geometry = new THREE.BoxGeometry(10, 10, 10);
            const material = new THREE.MeshBasicMaterial({ color: 0xffa800 });
            const cube = new THREE.Mesh(geometry, material);
            cube.name='cube2'
            cube.position.set(20, 0, 0);
            stage.scene.add(cube);
            var rotation = 0.01
            var amount =-0.02

            stage.addanimation(cube.name , function(){


                rotation += amount;
                cube.rotation.x = rotation;



            })





            return cube
        }





var count = 0;
var mainstage ='na'

console.log('testmodule started')







setInterval(() => {
console.log(count,' from module')
console.log(mainstage)
count=count+1;
}, 1000);





export function run(stage){


console.log('default function ran')
console.log(stage)
mainstage=stage;
addOrangeCube(stage)


}




