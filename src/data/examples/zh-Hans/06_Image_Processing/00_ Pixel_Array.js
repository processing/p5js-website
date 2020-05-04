/*
 * @name Pixel Array
 * @description Click and drag the mouse up and down to control the signal 
 * and press and hold any key to see the current pixel being read. 
 * This program sequentially reads the color of every pixel of an image 
 * and displays this color to fill the window.
 */

let img;
let direction = 1;
let signal = 0;

function setup() {
  createCanvas(640, 360);
  noFill();
  stroke(255);
  frameRate(30);
  img = loadImage('assets/sea.jpg');
}

function draw() {
  if (signal > img.width * img.height - 1 || signal < 0) {
    direction = direction * -1;
  }

  if (mouseIsPressed) {
    let mx = constrain(mouseX, 0, img.width - 1);
    let my = constrain(mouseY, 0, img.height - 1);
    signal = my * img.width + mx;
  } else {
    signal += 0.33 * direction;
  }

  let sx = int(signal) % img.width;
  let sy = int(signal) / img.width;
  if (keyIsPressed) {
    set(0, 0, img); // fast way to draw an image
    point(sx, sy);
    rect(sx - 5, sy - 5, 10, 10);
  } else {
    let c = img.get(sx, sy);
    background(c);
  }
}