console.log("surface_gui.js loaded")
import * as THREE from '../three/build/three.module.js';



export function wrapText2(canvas, text) {
    var ctx = canvas.getContext("2d");
    ctx.font = "24px Arial";
    var textWidth = ctx.measureText(text).width;
    var lineHeight = 30;
    var lines = [];
    var line = "";
    var words = text.split(" ");
    for (var i = 0; i < words.length; i++) {
      var word = words[i];
      var wordWidth = ctx.measureText(word).width;
      if (ctx.measureText(line + word).width < textWidth) {
        line += word + " ";
      } else {
        lines.push(line);
        line = word + " ";
      }
      if (i == words.length - 1) {
        lines.push(line);
      }
    }
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 20, 20 + i * lineHeight);
    }
  }
  





  function wrapText (context, text, x, y, maxWidth, lineHeight) {
    
    var words = text.split(' '),
        line = '',
        lineCount = 0,
        i,
        test,
        metrics;

    for (i = 0; i < words.length; i++) {
        test = words[i];
        metrics = context.measureText(test);
        while (metrics.width > maxWidth) {
            // Determine how much of the word will fit
            test = test.substring(0, test.length - 1);
            metrics = context.measureText(test);
        }
        if (words[i] != test) {
            words.splice(i + 1, 0,  words[i].substr(test.length))
            words[i] = test;
        }  

        test = line + words[i] + ' ';  
        metrics = context.measureText(test);
        
        if (metrics.width > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
            lineCount++;
        }
        else {
            line = test;
        }
    }
            
    context.fillText(line, x, y);
}




function wt(canvas,text, maxwidth){
var canvas =  canvas
var ctx = canvas.getContext('2d')
ctx.font = '12px/1.3 arial, sans-serif';
ctx.fillStyle = 'white';  
wrapText(ctx, text, 10, 10, maxwidth, 18);

}



function PIXEL_RATIO() {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
};

function createHiDPICanvas(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
}



//-----------------------------------------------------------------------------------------------------

export function guiboard(guiname, xsize, ysize) {

    this.canvas = createHiDPICanvas(1000, 1000, 2);
    this.ctx = this.canvas.getContext("2d")
    this.texture = new THREE.Texture(this.canvas);
    this.material = [];
    this.material.push(new THREE.MeshBasicMaterial({ color: 'black' }));
    this.material.push(new THREE.MeshBasicMaterial({ color: 'black' }));
    this.material.push(new THREE.MeshBasicMaterial({ color: 'black' }));
    this.material.push(new THREE.MeshBasicMaterial({ color: 'black' }));
    this.material.push(new THREE.MeshBasicMaterial({ map: this.texture }));
    this.material.push(new THREE.MeshBasicMaterial({ color: 'black' }));

    this.geometry = new THREE.BoxGeometry(xsize, ysize, 0.01);
    //this.bufferGeometry = new THREE.BufferGeometry().fromGeometry(this.geometry);
    this.surfacegui = new THREE.Mesh(this.geometry, new THREE.MeshFaceMaterial(this.material));
    this.surfacegui.name = guiname;

    var mult = 6
    this.canvas.width = xsize * mult;
    this.canvas.height = ysize * mult;
    console.log(this.canvas.width, ' ',this.canvas.height)
    //set background color and border
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //  this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.surface = this.surfacegui;
    //return this.surfacegui;

    this.mesh = this.surfacegui
}



guiboard.prototype.addtoscene = function (stage) {

    stage.scene.add(this.surfacegui);

}


guiboard.prototype.set_position = function (x, y, z) {

    this.surfacegui.position.set(x, y, z);
  


}



guiboard.prototype.set_text = function (text, x, y) {
    var ctx = this.ctx
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.font = "bold 40px Arial";
    ctx.textAlign = 'center';
    ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
    this.texture.needsUpdate = true;
   


    

}


guiboard.prototype.basicinit = function () {

    this.set_position(0, 10, 0);
    this.set_text('hello', 100, 50);
   
    



}


//-----------------------------------------------------------------------------------------
guiboard.prototype.removefromscene = function () {


    for(i=0;i<6;i++){
    this.material[i].dispose();
    }
    this.geometry.dispose();
    this.texture.dispose()
    
    this.surfacegui.remove();
   
    console.log('surface gui remove function')


}



//-------------------------------------------------------------------------------------------------
guiboard.prototype.clickfunction = function (fun) {

    var gui = this.surfacegui

    this.surfacegui.on('click', function(ev) {    
        console.log(gui.name+' was clicked');
        gui.visible = false;
        if(fun){fun()}
        setTimeout(function(){gui.visible=true;},500)
     });

}

function addBorderToCanvas(canvas) {
    var context = canvas.getContext('2d');
    var width = canvas.width;
    var height = canvas.height;
  
    context.fillStyle = "black";
    context.fillRect(0, 0, width, 1);
    context.fillRect(0, height - 5, width, 5);
    context.fillRect(0, 5, 5, height - 10);
    context.fillRect(width - 5, 5, 5, height - 10);
}

//-----------------------------------------------------------------------------------------------------
function addBorder(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    var padding = 25
    var stk = 1
    var width = canvas.width - padding-stk
    var height = canvas.height - padding - stk
    var pd = padding/2
    ctx.strokeRect(pd,pd,width ,height );
  }


//-----------------------------------------------------------------------------------------------------

  function setGradient(canvas) {
    var ctx = canvas.getContext("2d");
  
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, "#0f0c29");
    gradient.addColorStop(0.5, "#302b63");
    gradient.addColorStop(1, "#24243e");
  
    // Fill the canvas with gradient
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  

//-----------------------------------------------------------------------------------------------------

guiboard.prototype.textinfo = function(name){

    var canvas = this.canvas;
    var ctx = this.ctx;
    var txt = this.texture;
 
        
        //set background color and border
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeRect(0, 0, canvas.width, canvas.height);

      //  addBorderToCanvas(canvas)

     // setGradient(canvas)

        addBorder(canvas)
        //make coin name
        var ypos = 50;
        var spacer = 40;


        function makeboldtext(text) {
            ctx.fillStyle = "black";
            ctx.font = "bold 30px Arial";
            ctx.textAlign = 'center';
            ctx.fillText(text, canvas.width / 2, canvas.height/2);
            ypos = ypos + spacer;

        }


        function makesmalltext(text) {
            ctx.fillStyle = "black";
            ctx.font = "14pt Arial";
            ctx.textAlign = 'left';
            ctx.fillText(text, canvas.width / 2, ypos - 30);
            ypos = ypos + spacer;



        }



        makeboldtext(name)
       // makesmalltext('This is my info')

        //wrapText(canvas,'This is a long text that will wrap around to a new line. This is a long text that will wrap around to a new line.')

     
       // wt(canvas, name, canvas.width)

        txt.needsUpdate = true;

   

    



}







