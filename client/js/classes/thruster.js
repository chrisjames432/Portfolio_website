export  class Thruster {



            constructor(stage, object) {
                this.object = object;
                this.thrust = 1;
                this.speed = 0;
                this.scene = stage.scene
                this.stage = stage
            }



            move(){

                const lookDirection = new THREE.Vector3();
                lookDirection.setFromMatrixColumn( this.object.matrixWorld, 2 );
                lookDirection.normalize();
                this.object.position.add(lookDirection.multiplyScalar(this.thrust));

            }


            rotate() {  this.object.rotation.x += THREE.Math.degToRad(5);}



            init_keys(){


            document.addEventListener("keydown", function (event) {
                       
                if (event.code === "KeyV") {   this.rotate();}
                if (event.code === "KeyB") {     this.speed=this.speed+0.01    }
        
                });



        }





    }
