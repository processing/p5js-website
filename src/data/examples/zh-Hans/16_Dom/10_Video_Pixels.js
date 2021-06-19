/*
 * @name 视频像素
 * @frame 320,240
 * @description <p>加载一个视频，操纵其像素并绘制到画布上。
 * <p><em><span class="small"> 要在本地运行此范例，你需要至少一个视频文件和
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库，</a>
 * 并运行在<a href="https://github.com/processing/p5.js/wiki/Local-server">本地伺服器</a>上。</span></em></p>
 */
let fingers;

function setup() {
  createCanvas(320, 240);
  // 标明不同浏览器的多种格式
  fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  fingers.loop();
  fingers.hide();
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  fingers.loadPixels();
  const stepSize = round(constrain(mouseX / 8, 6, 32));
  for (let y = 0; y < height; y += stepSize) {
    for (let x = 0; x < width; x += stepSize) {
      const i = y * width + x;
      const darkness = (255 - fingers.pixels[i * 4]) / 255;
      const radius = stepSize * darkness;
      ellipse(x, y, radius, radius);
    }
  }
}
