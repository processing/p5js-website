/*
 * @name 输入框和按钮
 * @description 你需要在该范例中包含
 * <a href="http://p5js.org/reference/#/libraries/p5.dom"> p5.dom 库</a>
 * 才能在你自己的项目中使用。<br><br>
 * 输入文本并点击按钮查看它对画布的影响。
 */
let input, button, greeting;

function setup() {
  // 创建画布
  createCanvas(710, 400);

  input = createInput();
  input.position(20, 65);

  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(greet);

  greeting = createElement('h2', 'what is your name?');
  greeting.position(20, 5);

  textAlign(CENTER);
  textSize(50);
}

function greet() {
  const name = input.value();
  greeting.html('hello ' + name + '!');
  input.value('');

  for (let i = 0; i < 200; i++) {
    push();
    fill(random(255), 255, 255);
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}
