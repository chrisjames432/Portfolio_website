import * as THREE from "../three/build/three.module.js";
import { OrbitControls } from "../three/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from '../three/examples/jsm/libs/tween.module.min.js';
import * as to from '../components/text_object.js'


////////////////////////////////////////////////////////////////////////////////////////////////////

export function NewStage() {
  var stage = {};
  stage.camera = null;
  stage.scene = null;
  stage.renderer = null;
  stage.animations = {};
  stage.loaded = false;
  stage.THREE = THREE;
  

  stage.init = function () {


    stage.camera = new THREE.PerspectiveCamera( 45,   window.innerWidth / window.innerHeight,1, 10000);
    stage.scene = new THREE.Scene();
    stage.scene.background = new THREE.Color(0x000000)//#343541  0xF2F2F2);
    stage.renderer = new THREE.WebGLRenderer({ antialias: true });
    stage.renderer.setPixelRatio(window.devicePixelRatio);
    stage.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("canvas-container").appendChild(stage.renderer.domElement);

   
    window.addEventListener("resize", function () {
      stage.camera.aspect = window.innerWidth / window.innerHeight;
      stage.camera.updateProjectionMatrix();
      stage.renderer.setSize(window.innerWidth, window.innerHeight);
      stage.render();
    });

    stage.render();

    
    stage.loaded = true;
  };

  stage.render = function () {
    stage.renderer.render(stage.scene, stage.camera);
  };

  ////////////////////////////////////////////

  stage.animate = function () {

    stage.render()
    for (var key in stage.animations) {
      if (typeof game.animations[key] === "function") {
        game.animations[key]();
      }
    }
    TWEEN.update();
    requestAnimationFrame(stage.animate);
  };

  //////////////////////////////////////////////
  stage.addanimation = function (name, dothis) {
    stage.animations[name] = dothis;
  };

  ///////////////////////////////////////
  stage.removeanimation = function (name) {
    delete stage.animations[name];
    console.log('Removed animation: '+ name)
  };



  stage.initcontrols = function(){

    const controls = new OrbitControls(stage.camera, stage.renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    controls.addEventListener("change", stage.render);


  }

  return stage;
}
