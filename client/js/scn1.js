import * as THREE from './three/build/three.module.js';


var uniforms = {
    time: { value: 5 },
    resolution: { value: new THREE.Vector2() },
  };
  
  var vertexShader = `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `;
  
  var fragmentShader = `
    uniform float time;
    uniform vec2 resolution;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      vec3 color = vec3(1.0, 0.0, 0.0);
      color = color + vec3(1.0, 1.0, 1.0) * abs(sin(time + uv.x * uv.y));
      gl_FragColor = vec4(color, 1.0);
    }
  `;
  
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });
  



export function addcube(stage){


    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var cube = new THREE.Mesh(geometry, material);
    console.log('cube added')
    // Add the cube to your Three.js scene
    stage.scene.add(cube);
    return cube

}


