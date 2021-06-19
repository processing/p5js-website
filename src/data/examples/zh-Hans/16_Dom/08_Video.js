/*
 * @name 视频
 * @frame 710,250
 * @description <p>加载多种格式的视频并通过按钮来控制播放与暂停。
 * <p><em><span class="small"> 要在本地运行此范例，你需要至少一个视频文件和
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库</a>。</span></em></p>
 */
let playing = false;
let fingers;
let button;

function setup() {
  // 标明不同浏览器的多种格式
  fingers = createVideo(['assets/fingers.mov', 'assets/fingers.webm']);
  button = createButton('play');
  button.mousePressed(toggleVid); // 加上按钮监听器 (listener)
}

// 根据当前状态，播放或暂停视频
function toggleVid() {
  if (playing) {
    fingers.pause();
    button.html('play');
  } else {
    fingers.loop();
    button.html('pause');
  }
  playing = !playing;
}
