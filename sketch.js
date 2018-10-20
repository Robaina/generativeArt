/* Generative art sketch: a colorful N-Möbius string
   Semidan robaina Esteve
*/
let bars = [];
let numberOfBars = 150;
let colorScaleLength = 250;
let screenTouched = -1;

function setup() {

  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  colorMode(HSB, colorScaleLength);
  let minimumDistance = min(width, height);
  let radius = (1/4)*minimumDistance;
  let origin = createVector(width/2, height/2);
  let sliceSize = 2*Math.PI / numberOfBars;

  for (let n = 0; n < numberOfBars; n++) {
    let angle = n*sliceSize;
    let barPos = createVector(origin.x + radius*cos(angle), origin.y - radius*sin(angle));
    bars[n] = new Bar(barPos, angularSpeed(n), barWidth=(5/16)*minimumDistance);
  }

};

function draw() {
  background('black');

  for (bar of bars) {
    if (screenTouched == -1) {
      bar.updateAngle();
    };
    bar.color = updateColor(bar.barAngle);
    bar.show();
  };

};

// objects
class Bar {

  constructor(pos, angularSpeed, barWidth, barHeight, barAngle, color) {
    this.pos = pos;
    this.barWidth = barWidth || 0.3*width;
    this.barHeight = barHeight || 0.01*height;
    this.barAngle = barAngle || 0;
    this.angularSpeed = angularSpeed;
    this.color = color || '#e2cc08';
  }

  updateAngle() {
    this.barAngle += this.angularSpeed;
  }

  show() {
    fill(this.color);
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.barAngle);
    rect(0, 0, this.barWidth, this.barHeight);
    pop();
  }

}

// helper functions
function angularSpeed(n) {
  return 3e-4 * (n + 2*Math.PI)
}

function updateScreenEvent() {
  screenTouched *= -1;
}

function updateColor(barAngle) {
  let alpha = (barAngle / 2*Math.PI) % colorScaleLength;
  return color(alpha, colorScaleLength, colorScaleLength)
}
