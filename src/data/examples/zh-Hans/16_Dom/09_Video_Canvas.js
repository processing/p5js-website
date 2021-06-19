/*
 * @name 视频画布
 * @description <p>加载多种格式的视频并绘制到画布。</p>
 * <p><em><span class="small"> 要在本地运行此范例，你需要至少一个视频文件和
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库，</a>
 * 并运行在<a href="https://github.com/processing/p5.js/wiki/Local-server">本地伺服器</a>上。</span></em></p>
 */
let fingers;

function setup() {
  createCanvas(710, 400);
  // 标明不同浏览器的多种格式
  fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  fingers.hide(); // 默认情况下，视频将显示为单独的 DOM 元素。
  // 隐藏并将其绘制到画布上 
}

function draw() {
  background(150);
  image(fingers, 10, 10); // 将视频帧绘制到画布上
  filter(GRAY);
  image(fingers, 150, 150); // 在画布上绘制第二个副本
}

function mousePressed() {
  fingers.loop(); // 将视频设置为循环播放并开始播放
}
