
import * as THREE from './three/build/three.module.js';
import * as zz from './functions.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import * as tweenfun from './components/tweenfun.js'





export function init_lights(stage) {

    // lights
    var scene = stage.scene;
    var THREE = stage.THREE;
    var light = new THREE.HemisphereLight(0xffffff, 0x444444);
    light.position.set(0, 20, 0);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 20, 10);
    //scene.add(light);

}



///////////////////////////////////////////////////////////////////////////////////

export function setCameraToMesh(mesh, camera, mult) {
    var box = new THREE.Box3().setFromObject(mesh);
    var size = box.getSize();
    var center = box.getCenter();

    var maxSize = Math.max(size.x, size.y, size.z);
    var fov = camera.fov * (Math.PI / 180);
    var distance = maxSize / 2 / Math.tan(fov / 2);


    var res = window.screen.width;
    if (res<=500){mult=mult+1.5}



    camera.position.copy(center).add(new THREE.Vector3(0, 0, distance * mult));
    camera.lookAt(center);
    //console.log(center)
    camera.updateProjectionMatrix();
}
//////////////////////////////////////////////////////////////


export function makeui(stage) {
    const scene = stage.scene;
    const THREE = stage.THREE;
    const cubes = [];
    const startPosition = new THREE.Vector3(0, 0, 0);
    var sizex = 50;
    var sizey = 25;
    var spacer = 1.1;
    var amounttomake = 1

    var thetext = "ChrisMcD.info \n  Full stack developer\n   Digital artist\n   🚀Project manager"

    for (let i = 0; i < amounttomake; i++) {
        var col = i % 5;
        var row = Math.floor(i / 5);
        var gui = new ct.guiboard('test', sizex, sizey);
        gui.addtoscene(stage);
        gui.set_position(startPosition.x + col * (sizex + spacer), startPosition.y + row * (sizey + spacer), startPosition.z + 1);
        gui.textinfo('CHRISMC.XYZ');
        cubes.push(gui);
        console.log(gui)
    }



    return cubes
}





///////////////////////////////////////////


export function grid(stage) {

    var grid = makegrid(stage)
    var item = zz.RandomArrayItem(grid);


}


///////////////////////







export function PlaneGrid(stage, plane) {

    var group = new THREE.Group();
    var psize = zz.getMeshSize(stage, plane)
    console.log(psize)
    var row = 0;
    var col = 0;
    var spacingx = psize.x;
    var spacingy = psize.y;
    var spacerx = zz.getRandomBetween(10, 100);;
    var spacery = psize.y * 0.25



    for (var i = 0; i < 100; i++) {
        console.log('gen pl ' + i)
        var clone = plane.clone();
        //plane.visible=false;
        clone.position.x = col * (spacingx + spacerx);
        clone.position.y = row * (spacingy + spacery);
        clone.position.z = zz.getRandomBetween(-50, 10);
        group.add(clone);

        col++;
        if (col % 10 === 0) {
            row++;
            col = 0;
        }
    }



    return group;
}


var fileNames = [
    "2sdiv67c",
    "3s4yjtuk",
    "4v895rt1",
    "7esgkwmq",
    "99h2n8up",
    "awta8gf9",
    "b5f58pqr",
    "d547zj5x",
    "j1e9oiin",
    "kwbqoq3t",
    "pbjqkilk",
    "w5zjl5kk"
   ];


    /////////////////////////////////////////////////////////////

  export  function makeimages(stage, animatef) {
  
  
  
  
        for (let i = 0; i < fileNames.length; i++) {
  
          zz.addWebPImageToPlane(stage, '../client/images/aiart/' + fileNames[i] + '.webp', function (theplane) {
  
            var ranx = zz.getRandomBetween(-800, 800)
            var rany = zz.getRandomBetween(-2000, 1000)
            var ranz = zz.getRandomBetween(-20, -25);
  

            //console.log(rany)
            theplane.position.set(ranx, rany, ranz)
            theplane.name = fileNames[i]
    
            animatef(theplane)
           // setCameraToMesh(theplane, stage.camera, 0.8)
        
  
  
            console.log(fileNames[i])
            if (fileNames[i]=='site1'){
            setCameraToMesh(theplane, stage.camera, 1.8)
          }
 
          });
  
  
  
  
  
        }
  
      }
  
      /////////////////////////////////////////////////////////
      function getPositionInFrontOfCamera(camera, distance) {
        return camera.position.clone().add(camera.getWorldDirection().multiplyScalar(distance));
      }
  
    /////////////////////////////////////////////////////////////

    export function updatecam(stage) {
       
        let oldobj = ''
        function run(stage) {

            let name = zz.RandomArrayItem(fileNames)
            let object = stage.scene.getObjectByName(name);
  
          if (object) {
 
  
            console.log('obj found')
            var dis = zz.getRandomBetween(0.6, 2);
            console.log(dis)
  
            var newpos = object.position.clone().add(new THREE.Vector3(0, 0, 400));
  
            console.log('twn')
            var tcam = tweenfun.tweencamera(10, stage.camera, newpos, object, object)
  
            tcam.onComplete(function () {
  
              console.log('done333!');
              setTimeout(function(){

                run(stage)

              },1000*2)
              
  
            });
          } else {
            console.log('no obj')
  
          }
  
        }
  
  
  //      setTimeout(function () { run(stage); }, 3000)
  
  
  
  
  
      }
  
      ///////////////////////////////////////////////////////////////////////
  
      export function setpos(stage, obj) {
  
        var THREE = stage.THREE;
        var camera = stage.camera;
  
  
        // fixed distance from camera to the object
        var dist = 100;
        var cwd = new THREE.Vector3();
  
        camera.getWorldDirection(cwd);
  
        cwd.multiplyScalar(dist);
        cwd.add(camera.position);
  
        obj.position.set(cwd.x, cwd.y, cwd.z);
        obj.setRotationFromQuaternion(camera.quaternion);
      }
  
  
      function loadui(stage) {
  
  
        var ui = makeui(stage);
        ui = ui[0]
        console.log(ui[0])
        ui.mesh.name = 'ui1'
        var dist = 50
        var s = 0.5
        ui.mesh.scale.set(s, s, s)
        var getpos = getPositionInFrontOfCamera(stage.camera, dist)
        //ui.set_position(getpos.x, getpos.y, getpos.z)
  
        setpos(stage, ui.mesh)
        console.log(getpos)
        console.log('------')
        console.log(stage.camera.position)
  
        stage.addanimation('ui', function () {
  
          getpos = getPositionInFrontOfCamera(stage.camera, dist)
          //  ui.set_position(getpos.x, getpos.y, getpos.z)
          setpos(stage, ui.mesh)
  
        });
  
  
      }
  

      ///////////////////////////////////////


      export function fadeDiv(divId, startOpacity, endOpacity, duration) {
        const div = document.getElementById(divId);
        div.style.backgroundColor = "rgba(0, 0, 0, " + startOpacity + ")";
        div.style.transition = "background-color " + duration + "s ease-out";
        setTimeout(function() {
          div.style.backgroundColor = "rgba(0, 0, 0, " + endOpacity + ")";
        }, 100);
      }
      




//////////////

 
export function makeplane(stage,  x, y, z, color){

  var THREE = stage.THREE
  var scene = stage.scene
  
      var planeGeometry = new THREE.PlaneGeometry(2, 2);
      var holeGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    
      var planeBSP = new ThreeBSP(planeGeometry);
      var holeBSP = new ThreeBSP(holeGeometry);
    
      var frameBSP = planeBSP.subtract(holeBSP);
    
      var frameGeometry = frameBSP.toGeometry();
      var frameMaterial = new THREE.MeshBasicMaterial({ color: color });
      var frame = new THREE.Mesh(frameGeometry, frameMaterial);
    
      frame.position.set(x, y, z);
    
      scene.add(frame);
    
      return frame;
  
  
  }
  
  
  
  
  
  
  export function loadblend(stage, file, onfinish){
  
  
  
   //LOAD GAME SCENE -----------------------------------------------  
   var loader = new GLTFLoader();
  
  
      var filename = ('./client/js/fbx/'+file);
      loader.load( filename, function (gltf) {
  
          var model = gltf.scene;
          var kids = gltf.scene.children;
          var e = 2;
          model.scale.set(e, e, e)
          stage.scene.add(gltf.scene);
          onfinish(model)
         
  
      });
  
  
  
  
  
  
  }
  
  
  //////////////////////////////////////////////////////////////////////////////////////////
  

  function fetchdata(){

    var url = 'https://faas-nyc1-2ef2e6cc.doserverless.co/api/v1/web/fn-3921ad97-6e91-47fd-96dd-dff1a20a8bb6/requests/rblx';

    
    fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  })
  .then(data => {
    // Do something with the data
    console.log(data);
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });




  }



  ///////////////////////////////////////////

  export function displayScreenResolution() {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var resolution = screenWidth + "x" + screenHeight;
  
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.backgroundColor = "white";
    div.style.padding = "10px";
  
    document.body.appendChild(div);
  
    setInterval(function() {
      div.innerHTML = "Screen Resolution: " + resolution;
    }, 1000);
  }
  

  




  /////////////////////


  export function getlv(stage){
var camera = stage.camera;
    var target = new THREE.Vector3(0, 0, 0);

    camera.position.set(0, 0, 5);
    camera.lookAt(target);
    
    var direction = target.clone().sub(camera.position).normalize();

    return direction;
  }




  ///////////////////////////////////////////

  export function makedev() {
    var screenWidth = window.screen.width;
    var screenHeight = window.screen.height;
    var resolution = screenWidth + "x" + screenHeight;
  
    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.backgroundColor = "white";
    div.style.padding = "10px";
  
    document.body.appendChild(div);
  
    setInterval(function() {
      div.innerHTML = "Screen Resolution: " + resolution;
    }, 1000);
  
  }
  
///////////////////////////////////////////////////////////


export function animateObjectToPosition(stage, object, targetPosition, duration) {
  var target = new THREE.Vector3().copy(targetPosition);
  
  var startTime = performance.now();
  var duration = (duration*1000) || 1000; // 1 second by default
  var ogpos = new THREE.Vector3().copy(object.position);

  var lerpname = 'lerp'+zz.getRandomBetween(1,100000)

  stage.addanimation(lerpname,function(){

  var elapsedTime = performance.now() - startTime;
    var progress = elapsedTime / duration;
    progress = Math.min(progress, 1);

    // Use the lerp method to smoothly change the object's position
    object.position.lerp(target, progress);

    // Check if the animation is finished
    if (progress >= 1){
      console.log('position reached');
      setTimeout(function(){
        object.position.copy(ogpos)

      },1000);
      stage.removeanimation(lerpname);
      return;
    }



  })
 

 
}




export function fadeInMesh(mesh) {
  // Set the initial opacity to 0
  mesh.material.opacity = 0;

  // Use Tween.js to gradually increase the opacity over 1 second
  var tween = new TWEEN.Tween({ opacity: 0 })
    .to({ opacity: 1 }, 1000)
    .onUpdate(function() {
      mesh.material.opacity = this.opacity;
    })
    .start();
}



