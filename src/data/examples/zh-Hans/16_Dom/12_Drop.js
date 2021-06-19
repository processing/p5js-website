/*
 * @name 拖放图片 (Drop)
 * @description 你需要在该范例中包含
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库</a>
 * 才能在你自己的项目中使用。<br><br>
 * 拖放图片至画布来显示。
 */

function setup() {
  // 创建画布
  const c = createCanvas(710, 400);
  background(100);
  // 当文件被拖放到画布上时，为其添加事件
  c.drop(gotFile);
}

function draw() {
  fill(255);
  noStroke();
  textSize(24);
  textAlign(CENTER);
  text('Drag an image file onto the canvas.', width / 2, height / 2);
  noLoop();
}

function gotFile(file) {
  // 如果是一个图片文件
  if (file.type === 'image') {
    // 创建一个图片 DOM 元素，但不显示出来
    const img = createImg(file.data).hide();
    // 将图片绘制到画布上
    image(img, 0, 0, width, height);
  } else {
    println('Not an image file!');
  }
}
