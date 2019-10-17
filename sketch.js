/* eslint-disable */

const ACCELERATION = 4;
const GRAVITY = 9.8;
let is_started = false;


const sketchProc = function (p) {
  const keys = [];
  let cando;
  let brickImg;
  let marioStanding;
  let marioMoving;
  let jerryStanding;

  const Mario = function (x, y, m) {
    this.x = x;
    this.y = y;
    this.img = marioStanding;
    this.sticks = 0;
    this.mass = m;
    this.xa = ACCELERATION;
    this.ya = 0;
    this.onGround = false;

    this.draw = function () {
      // p.fill(255, 0, 0);
      this.x = p.constrain(this.x, 0, p.width - 40);
      this.y = p.constrain(this.y, 0, p.height - 200);
      p.image(this.img, this.x, this.y, 64, 100);
      this.y -= this.ya;
      this.reduceYAcceleration();
    };

    this.hop = function () {
      if (this.onGround) {
        this.img = marioMoving;
        this.ya = 45;
        PickSound().play();
      }
    };

    this.reduceYAcceleration = function () {
      this.ya -= (GRAVITY * 0.3);
    };

    this.fall = function () {
      this.img = marioStanding;
      this.y += 5;
    };

    this.moveRight = function () {
      this.img = marioMoving;
      this.x += 5;
    };

    this.moveLeft = function () {
      this.img = marioMoving;
      this.x -= 5;
    };

    this.checkOnGround = function () {
      if (this.y <= p.height - 200) {
        this.onGround = false;
      } else {
        this.onGround = true;
        this.ya = 0;
      }
    };
  };

  const StartButton = function () {
    this.x = 761;
    this.y = 508;
    this.w = 200;

    this.is_clicked = function (x, y) {
      if (x >= this.x && x <= (this.x + this.w) && y >= this.y && y <= (this.y + this.w)) {
        is_started = true;
      }
    };
  };

  const Background = function (background_image, xVal, yVal) {
    this.x = xVal;
    this.y = yVal;
    this.acc = ACCELERATION;
    this.image = background_image;

    this.draw = function () {
      this.x -= this.acc;
      p.image(this.image, this.x, this.y);
      if (this.x === (xVal - 4448)) {
        this.x += 4448;
      }
    };
  };


  const Jerry = function (x, y) {
    this.x = x;
    this.y = y;

    this.draw = function () {
      this.x -= (ACCELERATION * 2);
      p.image(jerryStanding, this.x, this.y);
    };
  };

  processInput = function () {
    if (keys[37]) mario.moveLeft();
    if (keys[32]) mario.hop(); else mario.fall();
    if (keys[39]) mario.moveRight();
  };

  var mario = new Mario(30, 750, 3);
  const j1 = p.random(4448);
  const j2 = p.random(4448);
  const j3 = p.random(4448);
  const jerry1 = new Jerry(j1, 550);
  const jerry2 = new Jerry(j2, 550);
  const jerry3 = new Jerry(j3, 550);
  const start_button = new StartButton();
  let background;
  let background2;

  const brickXs = [];

  p.preload = function () {
    p.soundFormats('m4a');
    brickImg = p.loadImage("assets/jerry.png");
    marioStanding = p.loadImage("assets/standing.jpg");
    marioMoving = p.loadImage("assets/meseeks.jpg");
    start_screen = p.loadImage('assets/title.png');
    jumpSound = p.loadSound('assets/cando_audio.m4a');
    background_music = p.loadSound('assets/Background_music.mp3');
    canDo = p.loadSound('assets/mrs_mooseeks.m4a');
    fulfillMyPurpose = p.loadSound('assets/fulfill_my_purpose.m4a');
    hesTryin = p.loadSound("assets/Oooo He's Tryin.m4a");
    background_image = p.loadImage('assets/background.png');
    jerryStanding = p.loadImage('assets/jerry.png');
  };

  p.setup = function () {
    p.frameRate(30);
    const canvas = p.createCanvas(1000, 772.72);
    brickXs.push(background_image.width * 2);
    background = new Background(background_image, 0, 0);
    background2 = new Background(background_image, 4448, 0);
    p.createP('Press spacebar to jump.');
    p.createP('Press left & right arrow keys to move');
  };

  var PickSound = function () {
    return p.random([
      canDo,
      fulfillMyPurpose,
      hesTryin,
    ]);
  };

  p.draw = function () {
    if (!is_started) {
      if (!background_music.isPlaying()) {
        background_music.setVolume(0.5);
        background_music.play();
      }
      p.image(start_screen, 0, 0, p.width - 20, p.height - 20);

      if (p.mouseIsPressed) {
        start_button.is_clicked(p.mouseX, p.mouseY);
        background_music.stop();
      }
    } else {
      p.background(227, 254, 255);
      p.fill(130, 79, 43);
      p.rect(0, p.height * 0.90, p.width, p.height * 0.10);
      processInput();
      background.draw();
      background2.draw();
      mario.checkOnGround();
      mario.draw();
      jerry1.draw();
      jerry2.draw();
      jerry3.draw();
    }
  };

  p.keyPressed = function () {
    keys[p.keyCode] = true;
  };

  p.keyReleased = function () {
    keys[p.keyCode] = false;
  };
};


new p5(sketchProc, document.getElementById('canvasContainer'));
