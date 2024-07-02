

import * as THREE from './three/build/three.module.js';
import { TWEEN } from './three/examples/jsm/libs/tween.module.min.js';
import * as ui from './ui.js';




import("./clickable.js").then((mod) => { mod.init_clickable(game,THREE); });



var game = {}

//#############################################################################################################

game.init_controlls = function () {


  game.controls = new OrbitControls(game.camera, game.renderer.domElement);
  game.controls.target = new THREE.Vector3(0, 6, 0);
  game.controls.maxPolarAngle = Math.PI / 2;
  game.controls.enableKeys = true;
  game.controls.keyPanSpeed = 80;
  game.enableDamping = true;

  game.controls.keys = {
    LEFT: 65, //56left arrow
    UP: 87, // up arrow
    RIGHT: 68, //222 right arrow
    BOTTOM: 83 // down arrow
  }

  game.controls.enabled = true;


}





game.init_lights = function () {

  // lights

  var light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 20, 0);
  game.scene.add(light);

  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 20, 10);
  game.scene.add(light);



}

//#############################################################################################################
//#############################################################################################################

export function crotate(stage , mesh){


  var cube = mesh
  let start = 0;
  let end = 2*Math.PI;
  let startrot = cube.rotation.y
  const duration = 1000; // 3 seconds
  let currentTime = 0;

    function animate() {
      
      currentTime += 1000/60;
      let x = currentTime/duration;
      cube.rotation.y =  start + x*(end - start);
      if(currentTime >= duration){
        currentTime = 0;
        delete game.animations[mesh.name]
        cube.rotation.y = startrot;
      }
   
   
    }




}




//#########################################################################################33
function createSkybox(skyboxImage) {
  const materialArray = [];
  const directions = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
  for (let i = 0; i < 6; i++) {
    materialArray.push(new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(`${skyboxImage}_${directions[i]}.png`),
      side: THREE.BackSide
    }));
  }
  const skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
  const skybox = new THREE.Mesh(skyboxGeo, materialArray);
  skybox.name='skybox'
  game.scene.add(skybox);
  let rotation = 0;
  let amount =0.0001;
  game.animations['skybox']=function(){

  
      
    
        rotation += amount;
        skybox.rotation.y = rotation;
        skybox.rotation.x = rotation;
   
   


  }




  return skybox;
}

//############################################################################################################
function getsize(obj){

  let boundingBox = new THREE.Box3().setFromObject(obj)
  let size = boundingBox.getSize() // Returns Vector3
  return size;
}

//############################################################################################################


function makediv(object){


  const div = document.createElement('div');
  div.style.position = 'absolute';
  div.innerHTML="test info";
  document.body.appendChild(div);
  
  
  function render() {
    // Calculate object's position in screen coordinates
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(object.matrixWorld);
    const screenCoords = vector.project(camera);
  
    // Position the div on the screen
    div.style.left = (screenCoords.x * 0.5 + 0.5) * window.innerWidth + 'px';
    div.style.top = (screenCoords.y * -0.5 + 0.5) * window.innerHeight + 'px';
  
    console.log('rendered')
    
  }

  
  game.animate['div1']=function(){


render();

  }


}





//#############################################################################################################
// clear the scene

game.clearscene = function () {

  // dispose geometries and materials in scene
  game.scene.traverse(function (o) {

    if (o.geometry) {
      o.geometry.dispose()
      console.log("dispose geometry ", o.geometry)
    }



    if (o.material) {
      if (o.material.length) {
        for (let i = 0; i < o.material.length; ++i) {
          o.material[i].dispose()
          console.log("dispose material ", o.material[i])
        }
      }
      else {
        o.material.dispose()
        console.log("dispose material ", o.material)
      }

    }

    game.scene.remove.apply(game.scene, game.scene.children);
    game.renderer.renderLists.dispose();

  })





}



//#############################################################################################################
//remove object

game.removeobject = function (name) {

  var object = game.scene.getObjectByName(name, true);
  if (object) {
    console.log('objeect found')
    var o = object;

    if (o.geometry) {
      o.geometry.dispose()
      console.log("dispose geometry ", o.geometry)
    }



    if (o.material) {
      if (o.material.length) {
        for (let i = 0; i < o.material.length; ++i) {
          o.material[i].dispose()
          console.log("dispose material ", o.material[i])
        }
      }
      else {
        o.material.dispose()
        console.log("dispose material ", o.material)
      }

    }


    game.scene.remove(o);
    game.renderer.renderLists.dispose();
    game.renderscene()


  } else { console.log('not found'); }


}




//#############################################################################################################
//load dynamic script

game.load_dynamic = function () {

  var btn = $('#btn3');
  btn.click(function () {

    btn.fadeOut(100).delay(100).fadeIn(100)
    console.log('LOADING DYNAMIC')


    $.getScript("./client/js/dynamic_script.js", function (data, textStatus, jqxhr) {
      console.log(textStatus); // Success
      console.log("Load was performed.");


    }).fail(function () {
      if (arguments[0].readyState == 0) {
        //script failed to load
        console.log('failed to load script')
      } else {
        //script loaded but failed to parse
        console.log(arguments[2].toString());
      }
    })


  })

}





























/*

function removeobj(objname, game) {

    var object = game.scene.getObjectByName(objname, true);
    if (object) {     game.scene.remove(object)    }


}





function getobjectdimensions(obj) {
    var box = new THREE.Box3().setFromObject(obj);
    var out = {}
    out.w = box.max.x - box.min.x;
    out.h = box.max.y - box.min.y;
    out.d = box.max.z - box.min.z;
    out.dat = box;
    return out;

}

*/