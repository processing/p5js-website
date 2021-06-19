/*
 * @name 滑杆
 * @description 你需要在该范例中包含
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库</a>
 * 才能在你自己的项目中使用。<br><br>
 * 滑动滑杆来控制背景的 R, G, B 值。
 */
let rSlider, gSlider, bSlider;

function setup() {
  // 创建画布
  createCanvas(710, 400);
  textSize(15);
  noStroke();

  // 创建滑杆
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, 80);
}

function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);
  text('red', rSlider.x * 2 + rSlider.width, 35);
  text('green', gSlider.x * 2 + gSlider.width, 65);
  text('blue', bSlider.x * 2 + bSlider.width, 95);
}
