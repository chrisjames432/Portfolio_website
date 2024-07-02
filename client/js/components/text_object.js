
import * as THREE from '../three/build/three.module.js';


export function make_text(stage, size, tval, xpos, ypos, zpos, ry) {


    var scene = stage.scene;
    var THREE = stage.THREE;

    var loader = new THREE.FontLoader();
    loader.load('./client/js/fonts/helvetiker_regular.typeface.json', function (font) {

        var xMid, text;
        var textShape = new THREE.BufferGeometry();
        var color = 'black';
        var matLite = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 1,
            side: THREE.DoubleSide
        });
        var message = tval;
        var shapes = font.generateShapes(message, size, 1);
        var geometry = new THREE.ShapeGeometry(shapes);
        geometry.computeBoundingBox();
        //console.log(geometry.boundingBox);
        xMid = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        geometry.translate(xMid, 0, 0);
        // make shape ( N.B. edge view not visible )
        textShape.fromGeometry(geometry);
        text = new THREE.Mesh(textShape, matLite);
        text.position.x = xpos;
        text.position.y = ypos;
        text.position.z = zpos;
        text.rotation.x = ry;



        scene.add(text);

    });




}








//-----------------------------------------------------------------------



export class TextObject {
    constructor(stage, message, color = 0x006699) {
      this.scene = stage.scene;
      this.color = color;
      this.loader = new THREE.FontLoader();
      this.material = new THREE.MeshBasicMaterial({
        color: this.color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
      });
  
      var game = this;
      this.loader.load(
        "./client/js/fonts/helvetiker_regular.typeface.json",
        (font) => {
          this.font = font;
          this.setMessage(message);
        }
      );
    }
  
    setMessage(message) {
      const shapes = this.font.generateShapes(message, 40);
      const geometry = new THREE.ShapeGeometry(shapes);
      geometry.computeBoundingBox();
      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);
      this.text = new THREE.Mesh(geometry, this.material);
      this.text.position.z = -10;
      this.scene.add(this.text);
    }
  
    updateMessage(message) {
      this.scene.remove(this.text);
      this.setMessage(message);
    }
  
    setPosition(x, y, z) {
      this.text.position.set(x, y, z);
    }
  }
  

  