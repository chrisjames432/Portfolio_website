export class canvastext {
    constructor(thecanvas, width, height) {
      this.canvas = thecanvas;
      this.canvas.width = width;
      this.canvas.height = height;
      this.context = this.canvas.getContext('2d');
    }
  
    setText(text, x, y, maxWidth, lineHeight, font, color) {
      this.wrapText(text, x, y, maxWidth, lineHeight);
      this.context.font = font;
      this.context.fillStyle = color;
    }
  
    wrapText(text, x, y, maxWidth, lineHeight) {
      var words = text.split(' ');
      var line = '';
  
      for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = this.context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          this.context.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      this.context.fillText(line, x, y);
    }
  }
  
  //var canvasText = new CanvasText('canvas', 400, 400);
  //canvasText.setText('All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.', 60, 60, 400, 24, '15pt Calibri', '#333');
  