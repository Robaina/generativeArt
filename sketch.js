/* Generative art sketch: a colorful N-Möbius strip
   Semidan robaina Esteve
*/
let bars = [];
<<<<<<< HEAD
let numberOfBars = 160;
let colorScaleLength = 60;
let speedFactor = 3e-4;
=======
let numberOfBars = 150;
let colorScaleLength = 50;
>>>>>>> 29e07e8f7e38cf57752ed884a8cd40f0d25c253f
let screenTouched = -1;
let colorSpeedSlider, angularSpeedSlider, numberOfBarsSlider

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  let minDistance = min(width, height);
  colorSpeedSlider = createSlider(5, 350, 60, 1);
  colorSpeedSlider.position(30, 20);
  colorSpeedSlider.style('width', str(0.15*minDistance) + 'px');
  angularSpeedSlider = createSlider(0, 10, 0, 0.5);
  angularSpeedSlider.position(30, 60);
  angularSpeedSlider.style('width', str(0.15*minDistance) + 'px');
  numberOfBarsSlider = createSlider(0, 300, 160);
  numberOfBarsSlider.position(30, 100);
  numberOfBarsSlider.style('width', str(0.15*minDistance) + 'px');

  colorScaleLength = colorSpeedSlider.value();
  // speedFactor = 1e-4*angularSpeedSlider.value();
  // numberOfBars = numberOfBarsSlider.value();

  rectMode(CENTER);
  colorMode(HSB, colorScaleLength);
  let minimumDistance = min(width, height);
  let radius = (1/4)*minimumDistance;
  let origin = createVector(width/2, height/2);
  let sliceSize = 2*Math.PI / numberOfBars;

  for (let n = 0; n < numberOfBars; n++) {
    let angle = n*sliceSize;
    let barPos = createVector(origin.x + radius*cos(angle), origin.y - radius*sin(angle));
<<<<<<< HEAD
    bars[n] = new Bar(barPos, n, barWidth=(5/16)*minimumDistance);
=======
    bars[n] = new Bar(barPos, angularSpeed(n), barWidth=(5/16)*minimumDistance, barHeight=0.01*minimumDistance);
>>>>>>> 29e07e8f7e38cf57752ed884a8cd40f0d25c253f
  }

};

function draw() {
  background('black');
  colorScaleLength = colorSpeedSlider.value();
  speedFactor = 1e-4*angularSpeedSlider.value();

  for (bar of bars) {
    if (screenTouched == -1) {
      bar.updateAngle(speedFactor);
    };
    bar.updateColor(colorScaleLength);
    bar.show();
  };

};

// objects
class Bar {

  constructor(pos, barNumber, barWidth, barHeight, barAngle, barColor) {
    this.pos = pos;
    this.barNumber = barNumber;
    this.barWidth = barWidth || 0.3*width;
    this.barHeight = barHeight || 0.01*height;
    this.barAngle = barAngle || 0;
    this.barColor = barColor || '#e2cc08';
  }

  updateAngle(speedFactor) {
    this.barAngle += speedFactor * (this.barNumber + 2*Math.PI);
  }

  updateColor(colorScaleLength) {
    let alpha = (this.barAngle / 2*Math.PI) % colorScaleLength;
    this.barColor = color(alpha, colorScaleLength, colorScaleLength);
  }

  show() {
    fill(this.barColor);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.barAngle);
    rect(0, 0, this.barWidth, this.barHeight);
    pop();
  }

}

// helper functions
function updateScreenEvent() {
  screenTouched *= -1;
}
