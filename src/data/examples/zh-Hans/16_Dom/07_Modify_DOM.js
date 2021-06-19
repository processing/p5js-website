/*
 * @name 修改 DOM
 * @frame 710,300
 * @description <p>你需要在该范例中包含 
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库</a>
 * 才能在你自己的项目中使用。<br><br>
 * 每次调用 draw() 函数时，创建 DOM 元素并修改其属性。</p>
 */
let dancingWords = [];

class DanceSpan {
  constructor(element, x, y) {
    element.position(x, y);
    this.element = element;
    this.x = x;
    this.y = y;
  }

  brownian() {
    this.x += random(-6, 6);
    this.y += random(-6, 6);
    this.element.position(this.x, this.y);
  }
}

function setup() {
  // 该段落是在主要代码旁创建的。
  // 为了区分创建元素和选择元素。
  // 被选择的元素不需要被 p5.js 创建，可以是纯 HTML. 
  createP(
    'I learn in this Letter, that Don Peter of Aragon, ' +
      ' comes this night to Messina'
  ).addClass('text').hide();

  // 这行抓取了刚创建的段落，
  // 但同时也抓了 HTML 页面中任何其他类为 "text" 的元素。
  const texts = selectAll('.text');

  for (let i = 0; i < texts.length; i++) {
    const paragraph = texts[i].html();
    const words = paragraph.split(' ');
    for (let j = 0; j < words.length; j++) {
      const spannedWord = createSpan(words[j]);
      const dw = new DanceSpan(spannedWord, random(600), random(200));
      dancingWords.push(dw);
    }
  }
}

function draw() {
  for (let i = 0; i < dancingWords.length; i++) {
    dancingWords[i].brownian();
  }
}
