/*
 * @name 视频捕捉
 * @frame 710,240
 * @description <p>
 * 从网络摄像头中捕捉视频，并在画布上加上反向滤镜显示出来。
 * 请注意：在默认情况下，捕捉文件也会显示出来。你可以取消 capture.hide() 那行的注释来隐藏文件。<br><br>
 * <em><span class="small"> 要在本地运行此范例，你需要至少一个视频文件和
 * <a href="http://p5js.org/reference/#/libraries/p5.dom">p5.dom 库，</a>
 * 并运行在<a href="https://github.com/processing/p5.js/wiki/Local-server">本地伺服器</a>上。</span></em></p>
 */
let capture;

function setup() {
  createCanvas(390, 240);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  //capture.hide();
}

function draw() {
  background(255);
  image(capture, 0, 0, 320, 240);
  filter(INVERT);
}
