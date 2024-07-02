



//#######################################################################################################
// make objects clickable -------------------------
export function init_clickable(stage) {
  var game = stage;
  var THREE = stage.THREE;

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  game.renderer.domElement.addEventListener("click", function (event) {
    var renderer = game.renderer;
    var camera = game.camera;
    console.log('click')
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(game.clickable);
    if (intersects.length > 0) {
      var clickedObject = intersects[0].object;

      console.log(clickedObject.name + " clicked");

      if (clickedObject.onclick) {
        console.log("object has onclick");
        clickedObject.onclick();
      } else {
        console.log("no function for click");
      }

      // do something with the clicked object
    }
  });
}

//#####################################################################################3
// make a div at objects position 

export function makediv(stage, object, dothis) {
  const camera = stage.camera;

  const div = document.createElement("div");
  div.style.position = "absolute";
  div.style.border = "1px solid black";
  div.style.padding = "10px";
  div.innerHTML = "test info";
  document.body.appendChild(div);

  // Calculate object's position in screen coordinates
  const vector = new THREE.Vector3();
  vector.setFromMatrixPosition(object.matrixWorld);
  const screenCoords = vector.project(camera);

  // Position the div on the screen
  div.style.left = (screenCoords.x * 0.5 + 0.5) * window.innerWidth + "px";
  div.style.top = (screenCoords.y * -0.5 + 0.5) * window.innerHeight + "px";

  console.log("rendered");

  div.onclick = function () {
    dothis();

    div.remove();
  };
}




//#####################################################################################3
// --


export function setcam(cam,pos,lookat){

  var nc = pos
  var la = lookat
  cam.position.set(nc.x,nc.y,nc.z);
  cam.lookAt(la.x,la.y,la.z)

}

//#####################################################################################3
// --


export function positionCamera(camera, mesh, distance) {
  camera.position.set(mesh.position.x + distance, mesh.position.y-1, mesh.position.z+100);
  camera.lookAt(mesh.position);
}


//#####################################################################################3
// --


export function makestats(game) {

    var info = $('#info');
    var h = info.height() + 20;
    var thediv = $('<div>');
    thediv.css("position", "fixed");
    thediv.css('bottom', h + 'px');
    //thediv.css('width','100px');
    thediv.css('color', 'black');
    thediv.css('padding', '10px');
    thediv.css('border', '1px solid black');
    info.append(thediv);
  
  
    function configpos() {
      var pos = {}
      pos.x = Math.round(game.camera.position.x);
      pos.y = Math.round(game.camera.position.y);
      pos.z = Math.round(game.camera.position.z);
      return pos
  
    }
  
    thediv.html('cam info<br>' + zz.pre(configpos()));
  
    function update() {
  
  
      var mem = window.performance.memory
      thediv.html(zz.pre(mem) + '<br>cam info<br>' + zz.pre(configpos()));
  
  
  
    }
  
  
    game.animations['stats'] = update;
  
  
  
  
  
  
  
  }
  
  

//#####################################################################################3
// -- some simple functions


export function p(t) { console.log(t); };
export function getdata(json, dothis) { $.getJSON(json, function (result) { dothis(result); }); };
export function pre(data) { return "<pre>" + JSON.stringify(data, undefined, 2) + "</pre>" };

// mobile check 
export function checkmobile() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    console.log(check);
    return check;
};

export  function randnum (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }


//#####################################################################################3
// --

export function loadscript(script) {
    console.log('load script function');
    
    $.ajaxSetup({
      cache: false
    });
    
    $.getScript('client/js/'+script , function () {
    
    }).fail(function () {
      if (arguments[0].readyState == 0) {
        //script failed to load
      } else {
        //script loaded but failed to parse
        console.log(arguments[2].toString());
      }
    });
  
  
  }
  

//#################################################################################################################################################
// - numbe with commas?  
export function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }



export function RandomArrayItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

///////////////////////////////////////////////////////////


export function addGridHelper(stage) {
  var scene = stage.scene;
  var THREE = stage.THREE;
  var size = 10000;
  var divisions = size/10;
  var color1 = 0x0000ff;
  var color2 = 0xffffff;

  var gridHelper = new THREE.GridHelper( size, divisions, color1, color2 );
  scene.add( gridHelper );
}


///////////////////


export function addWebPImageToPlane(stage, imagefile,callback) {
  var THREE = stage.THREE;
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load(imagefile, function (texture) {
    var aspectRatio = texture.image.naturalWidth / texture.image.naturalHeight;
    var planeGeometry = new THREE.PlaneGeometry(200 * aspectRatio, 200);
    var planeMaterial = new THREE.MeshBasicMaterial({map: texture});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);

    stage.scene.add(plane);
    plane.position.z = 0;
    callback(plane)
  });
}


///////////////////
export function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}


export function getMeshSize(stage, mesh) {
  
  var box = new stage.THREE.Box3().setFromObject(mesh);
  var size = box.getSize();

  return size;
}



///////////////////////////////////////////////////


export function appendHTML(id) {
  const container = document.getElementById(id);

  const html = `
    <div id="title" class="col-12 text-center my-5">
      <h1 class="display-4">ChrisMC.XYZ</h1>
      <p class="lead">Project Manager, Full Stack Developer, Digital Artist, Digital Navigator</p>
    </div>
  `;
  container.style.marginTop = '300px;'
  container.insertAdjacentHTML('beforeend', html);
  
  var thediv = $('#title')
  thediv.hide()


  return thediv
}



export function toggleDiv(divId) {
  const $div = $('#' + divId);
  if ($div.is(':visible')) {
    $div.slideUp();
  } else {
    $div.slideDown();
  }
}
