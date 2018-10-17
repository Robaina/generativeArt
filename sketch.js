/* A generative art sketch
   Semidan robaina Esteve
*/
let bars = [];
let numberOfBars = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  let radius = 0.3*min(width, height);
  let origin = createVector(width/2, height/2);
  let sliceSize = 2*Math.PI / numberOfBars;

  for (let n = 0; n < numberOfBars; n++) {
    let angle = n*sliceSize;
    let barPos = createVector(origin.x + radius*cos(angle), origin.y - radius*sin(angle));
    bars[n] = new Bar(barPos, angularSpeed1(n));
  }
};

function draw() {
  background(51);
  for (bar of bars) {
    bar.show();
  }
  };


// objects
class Bar {

  constructor(pos, angularSpeed, barWidth, barHeight, barAngle, color) {
    this.pos = pos;
    this.barWidth = barWidth || 0.3*width;
    this.barHeight = barHeight || 0.01*height;
    this.barAngle = barAngle || 0;
    this.angularSpeed = angularSpeed || 0.005*Math.PI;
    this.color = color || '#e2cc08';
  }

  show() {
    fill(this.color);
    this.barAngle += this.angularSpeed;
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.barAngle);
    rect(0, 0, this.barWidth, this.barHeight);
    pop();
  }

}

// helper functions
function angularSpeed0() {
  return(0.005*2*Math.PI)
}

function angularSpeed1(n) {
  return n*0.00001*2*Math.PI;
}

function angularSpeed2(n) {
  return 0.0005*n + 0.001*2*Math.PI;
}

function angularSpeed3(n) {
  return 0.0005*(n % (numberOfBars/2)) + 0.001*2*Math.PI;
}

function angularSpeed4(n) {
  return random(0, 0.001)*2*Math.PI;
}

function angularSpeed5(n, numberOfBars) {
  middlePoint = numberOfBars / 2;
  modulator = middlePoint - abs(middlePoint - n);
  return 0.00005*modulator*2*Math.PI

}
