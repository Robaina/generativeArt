/* Generative art sketch: a colorful N-Möbius strip
   Semidan Robaina Estevez
*/
const numberOfBars = 160;
const colorScaleLength = 60;
const speedFactor = 3e-4;
let screenTouched = false;
let bars = [];
let button = document.getElementById("start-button");

function setup() {

  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  rectMode(CENTER);
  colorMode(HSB, colorScaleLength);
  const minimumDistance = min(width, height);
  const radius = (1/4)*minimumDistance;
  const origin = createVector(width/2, height/2);
  const sliceSize = 2*Math.PI / numberOfBars;

  for (let n = 0; n < numberOfBars; n++) {
    let angle = n*sliceSize;
    let barPos = createVector(origin.x + radius*cos(angle), origin.y - radius*sin(angle));
    bars[n] = new Bar(barPos, n, barWidth=(5/16)*minimumDistance, barHeight=0.015*minimumDistance);
  }
};

function draw() {
  background('black');

  for (bar of bars) {
    if (screenTouched) {
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
  screenTouched = !screenTouched;
  button.innerHTML = "Pause";
  if (!screenTouched) {
    button.style['background-color'] = "rgb(208, 165, 37)";
  } else {
    button.style['background-color'] = "rgb(120, 120, 120)";
  }
}

function updateSize(){
  resizeCanvas(windowWidth, windowHeight);
  fullscreen();
}
