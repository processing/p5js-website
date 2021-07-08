/*
 * @name 셰이더 유니폼
 * @description 유니폼(Uniform)을 통해 p5에서 셰이더로 정보를 전송합니다.
 * <br> p5.js로 셰이더를 사용하는 방법에 대해 더 알고 싶다면: <a href="https://itp-xstory.github.io/p5js-shaders/">p5.js Shaders</a>
 */

 // 이 변수는 셰이더 객체를 담습니다.
 let theShader;

 function preload(){
   // 셰이더 불러오기
   theShader = loadShader('assets/uniforms.vert', 'assets/uniforms.frag');
 }

 function setup() {
  // 셰이더를 작동하기 위해 WEBGL 모드가 필요합니다.
   createCanvas(400, 400, WEBGL);
   noStroke();
 }

 function draw() {
   // shader()는 활성화 셰이더를 theShader로 설정합니다.
   shader(theShader);

   // 마우스 + 데이터 수정 시간을 보내기에 앞서,
   // 해상도, 마우스, 시간을 셰이더에 보냅니다.
   // 이렇게 하면 셰이더에서 사용하기가 더 쉬워집니다.
   theShader.setUniform('resolution', [width, height]);
   theShader.setUniform('mouse', map(mouseX, 0, width, 0, 7));
   theShader.setUniform('time', frameCount * 0.01);

  // rect()함수로 화면에 기하 형상 추가하기
   rect(0,0,width, height);
 }
