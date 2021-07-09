/*
 * @name Noise2D
 * @frame 710,400 (optional)
 * @description Create a 2D noise with different parameters.
 */

let noise_val;
let noise_scale = 0.02;

function setup() {
  createCanvas(640, 360);
}

function drawNoise(x, y, w, h) {
  for (let pixel_y = y; pixel_y < y + h; pixel_y++) {
    for (let pixel_x = x; pixel_x < x + w; pixel_x++) {
      let noise_val =
        noise((mouseX + pixel_x) * noise_scale, (mouseY + pixel_y) * noise_scale) * 255;

      let index = 4 * (pixel_y * width + pixel_x);

      pixels[index]     = noise_val;
      pixels[index + 1] = noise_val;
      pixels[index + 2] = noise_val;
      pixels[index + 3] = 255;
    }
  }
}

function draw() {
  background(0);

  loadPixels();

  // Draw the left half of image
  noiseDetail(2, 0.2);
  drawNoise(0, 0, width / 2, height - 30);

  // Draw the right half of image
  noiseDetail(5, 0.5);
  drawNoise(width / 2, 0, width / 2, height - 30);

  updatePixels();

  //Show the details of two partitions
  textSize(18);
  fill(255, 255, 255);
  text("Noise2D with 2 octaves and 0.2 falloff", 10, 350);
  text("Noise2D with 5 octaves and 0.5 falloff", 330, 350);
}
