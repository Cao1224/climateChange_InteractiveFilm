// title setting
let font;
let fontSize = 45;
let x, y;

// fish in the Ocean
let riverSound;
let particles = [];
let waterLevel;
let fishImages = [];
let fishObjects = [];


// wave
let wave = 0;
let sizeWave = 0;

let spacing = 16;
let waveW;
let degree = 0;
let waveH = 50;
let period = 500;
let up;
let heightList;

let leaf_uploading = [];
let leafs = [];
let plastic_uploading = [];
let plastics = [];

// sound setting
let thunderSound;
let narratorSound;
let waveSound;
let ai_rising;
let warSound;
let crowd_laughing;
let babyCry;
let moreCry;
let sosSound;


let sound0Playing = false;
let soundTransitionPlay = false;
let sound1Playing = false;
let sound2Playing = false;
let sound3Playing = false;
let soundEndPlaying = false;
let narratorSoundPlay = false;

// earthquake
let buildings = [];
let breakIntoPieces = []


// last part
let textLines = 0;
let currentLine = 0;
let lineStartTime = 0;
let typingSpeed = 60;

let blood = [];
let bloodList = [];




function preload() {
  font = loadFont('Waterlily Script.ttf');

  fishImages[0] = loadImage("river_part/fish1.png");
  fishImages[1] = loadImage("river_part/fish2.png");
  fishImages[2] = loadImage("river_part/fish3.png");
  fishImages[3] = loadImage("river_part/fish4.png");
  fishImages[4] = loadImage("river_part/fish5.png");
  
  leaf_uploading[0] = loadImage("leaf/leaf1.png");
  leaf_uploading[1] = loadImage("leaf/leaf2.png");
  leaf_uploading[2] = loadImage("leaf/leaf3.png");
  leaf_uploading[3] = loadImage("leaf/leaf4.png");
  leaf_uploading[4] = loadImage("leaf/leaf5.png");
  leaf_uploading[5] = loadImage("leaf/leaf6.png");
  leaf_uploading[6] = loadImage("leaf/leaf7.png");
  
  plastic_uploading[0] = loadImage('plastic/plastic1.png');
  plastic_uploading[1] = loadImage('plastic/plastic2.png');
  plastic_uploading[2] = loadImage('plastic/plastic3.png');
  plastic_uploading[3] = loadImage('plastic/plastic4.png');
  plastic_uploading[4] = loadImage('plastic/plastic5.png');
  
  soundFormats('wav', 'mp3', 'm4a');
  riverSound = loadSound('fish in river.mp3');
  thunderSound = loadSound('thunder.wav');
  waveSound = loadSound('wave.mp3');
  earthquakeSound = loadSound('earthquake.mp3');
  ai_rising = loadSound("ai_rising.m4a");
  crowd_laughing = loadSound('crowd_laughing.mp3');
  textLines = loadStrings('ai_rising.txt');
  warSound = loadSound("war.mp3");
  narratorSound = loadSound('narrator.m4a');
  babyCry = loadSound('baby-crying.mp3');
  moreCry = loadSound('moreCry.m4a');
  sosSound = loadSound('sos.m4a');
}

function setup() {
  createCanvas(500, 300);
  textFont(font);
  x = width / 2;
  y = height / 2;
  
  waveW = width + 16
  up = (TWO_PI / period) * spacing;
  heightList = new Array(floor(waveW / spacing));
  
  for (let i = 0; i < 30; i++) {
    let building = {x: random(width), 
                    y: height - random(75, 200), 
                    width: random(50, 200), 
                    height: random(75, 350), 
                    color: color(random(255), random(255), random(255)), 
                    isShaking: false, shakeOffSet: 0};
    buildings.push(building);
  }

  for (let i = 0; i < 150; i++) {
    particles.push(new Particle(random(width), random(height), random(1, 8), color(63, 122, 181)));
  }
  
  for (let i = 0; i < 15; i++) {
    let fishImg = random(fishImages);
    let moveSpeed = random(1,3);
    fishObjects.push(new Fish(fishImg, random(width), random(height), moveSpeed));
  }
  
  for (let i = 0; i < 50; i++) {
    let leave_image = random(leaf_uploading);
    let leaf = {image: leave_image,
                x: random(width),
                y: random(-200, -100),
                size: random(20, 50),
                objectSpeed: random(1,3)}
    leafs.push(leaf);
    }
  
  for (let i = 0; i < 20; i++) {
    let plasticImage = random(plastic_uploading);
    let plastic = {image: plasticImage, 
                  x: random(width),
                  y: random(-200, -100),
                  size: random(30, 60),
                  objectSpeed: random(1,2)}
    plastics.push(plastic);
  }
  
  for (let i = 0; i < 70; i++) {
    let x = random(width);
    let y = random(height);
    let bloodSize = random(5, 50);
    let moveSpeed = random(2, 5);
    let bloodColor = color(random(['#DC143C', '#CC1100', '#800000', '#8B0000', '#660000']));
    blood.push({x, y, bloodSize, moveSpeed, bloodColor});
  }
}

function draw() {
  if (sound0Playing) {
    background(134,180, 188);

    
    for (let i = 0; i < particles.length; i++) {
      particles[i].display();
      particles[i].move();
    }

    for (let i = 0; i < fishObjects.length; i++) {
      fishObjects[i].display();
      fishObjects[i].move();
    }
    
    let t = frameCount / 100;
    wave = sin(t);
    sizeWave = sin(t + PI/2)
    fontSize = map(sizeWave, -1, 1, 35, 50);
    textSize(fontSize);
    textAlign(CENTER,CENTER);
    let offset = map(wave, -1, 1, -fontSize, fontSize);
    let hue = map(sin(t + PI), -1, 1, 0, 360);
    fill(hue, 100, 100);
    text("Chromatic Cataclysm", x, y+offset);

  }
  
  
  if (soundTransitionPlay) {
    drawBackground();
    
    if (frameCount % 10 == 0) {
      let startX = random(0, width);
      let startY = 0;
      let endX = random(0, width);
      let endY = height;
      let thickness = random(2, 5);
      
      stroke(253, 208, 35);
      drawLightning(startX, startY, endX, endY, thickness);
    }
  }
  
  if (sound1Playing) {
    let backgroundColor = map(sin(frameCount / 50), -1,1,0,255);
    background(255, backgroundColor, 0);

    callWave();
    readerWave();

    for (let i = 0; i < leafs.length; i++) {
      let leaf = leafs[i];
      image(leaf.image, leaf.x, leaf.y, leaf.size, leaf.size);

      leaf.y += leaf.objectSpeed;

      if (leaf.y > height) {
        leaf.y = random(-200, -100);
        leaf.x = random(width);
      }
    }
    
    for (let i = 0; i < plastics.length; i++) {
      let plastic = plastics[i];
      image(plastic.image, plastic.x, plastic.y, plastic.size, plastic.size);
      
      plastic.y += plastic.objectSpeed;
      
      if (plastic.y > height) {
        plastic.y = random(-200, -100);
        plastic.x = random(width);
      }
    }
    
    if (soundTransitionPlay) {
      if (frameCount % 20 == 0) {
        let startX = random(0, width);
        let startY = 0;
        let endX = random(0, width);
        let endY = height;
        let thickness = random(2, 5);

        stroke(253, 208, 35);
        drawLightning(startX, startY, endX, endY, thickness);
      }
    }
  }  
  
  if (sound2Playing) {
    background(237, 41, 57);
    for (let i = 0; i < buildings.length; i++) {
      let building = buildings[i];
      if (building.isShaking) {
        building.shakeOffSet = random(-5, 5);
        if (abs(building.shakeOffSet) > 4) {
          let piecesCanvas = createGraphics(building.width, building.height);
          piecesCanvas.background(255);
          piecesCanvas.stroke(0);
          piecesCanvas.strokeWeight(2);
          piecesCanvas.fill(building.color);
          for (let x = 0; x < building.width; x += 10) {
            for (let y = 0; y < building.height; y+= 10) {
              let pieceX = x + random(-5, 5);
              let pieceY = y + random(-5, 5);
              let pieceWidth = random(5, 15);
              let pieceHeight = random(5, 15);
              piecesCanvas.rect(pieceX, pieceY, pieceWidth, pieceHeight);
            }
          }
          breakIntoPieces.push({x: building.x, y: building.y, piecesCanvas: piecesCanvas});
          buildings.splice(i, 1);
        }
      }

      translate(building.shakeOffSet, 0);
      stroke(0);
      strokeWeight(2);
      fill(building.color);
      rect(building.x, building.y, building.width, building.height);
      triangle(building.x - 10, building.y, building.x + building.width / 2, building.y - 30, building.x + building.width + 10, building.y);
      
    }
    
    for (let i = 0; i < breakIntoPieces.length; i++) {
      let breakPiece = breakIntoPieces[i];
      image(breakPiece.piecesCanvas, breakPiece.x, breakPiece.y);
    }
    
  }
  
  if (sound3Playing) {
    background(0)
    textSize(35);
    textAlign(LEFT, TOP);
    lineStartTime = millis();
    
    let words = textLines.join(' ').split(' ');
    let x = 10;
    let y = 10;
    let line1 = "";
    for (let i = 0; i < words.length; i++) {
      let testLine = line1 + words[i] + ' ';
      if (textWidth(testLine) > width - 20) {
        fill(255);
        text(line1, x, y);
        line1 = words[i] + ' ';
        y += 30;
      } else {
        line1 = testLine;
      }
    }
    fill(255);
    text(line1, x, y);
    }
  
  if (soundEndPlaying) {
    background(0);
    noStroke();
    
    for (let i = 0; i < blood.length; i++) {
      let splatter = blood[i];
      
      splatter.x += splatter.moveSpeed;
      if (splatter.x > width) {
        splatter.x = 0;
      }
      
      fill(splatter.bloodColor);
      ellipse(splatter.x, splatter.y, splatter.bloodSize, splatter.bloodSize);
    }
    
    if (frameCount % 30 == 0) {
      let x = random(width);
      let y = random(height);
      let bloodSize = random(5, 50);
      let moveSpeed = random(2, 8);
      let bloodColor = color(random(['#DC143C', '#CC1100', '#800000', '#8B0000', '#660000']));
      blood.push({x, y, bloodSize, moveSpeed, bloodColor});
    }
    
    for (let i = blood.length - 1; i >= 0; i--) {
      let splatter = blood[i];
      if (splatter.x > width * 2) {
        blood.splice(i, 1);
      }
    }
    
    for (let i = bloodList.length - 1; i >= 0; i--) {
      bloodList[i].update();
      if (bloodList[i].r < 0) {
        bloodList.splice(i, 1);
        continue;
      }
      bloodList[i].draw();
    }
  }
}

function callWave() {
  degree += 0.02;
  let x = degree;
  for (let i = 0; i < heightList.length; i++) {
    heightList[i] = sin(x) * waveH;
    x += up;
  }
}

function readerWave() {
  noStroke();
  let waveColor = map(sin(frameCount / 100), -1, 1, 0, 255);
  fill(waveColor,waveColor,waveColor);
  for (let j = 0; j < heightList.length; j++) {
    rect(j * spacing, height / 2 + heightList[j], spacing, height)
  }
}

// mousePressed() occurs when the usser presses the mouse button. 
function mousePressed() {
  if (!sound0Playing) {
    riverSound.play();
    sound0Playing = true;
  }
  else if(!soundTransitionPlay) {
    riverSound.stop();
    thunderSound.play();
    narratorSound.play();
    narratorSound.setVolume(1.0);
    soundTransitionPlay = true;
  }
  else if (!sound1Playing) {
    thunderSound.play();
    waveSound.play();
    sound1Playing = true;
  } else if (!sound2Playing) {
    thunderSound.stop();
    waveSound.stop();
    earthquakeSound.play();
    sound2Playing = true;
  } else if (!sound3Playing) {
    thunderSound.stop();
    earthquakeSound.stop();
    ai_rising.play();
    crowd_laughing.play();
    ai_rising.setVolume(0.8);
    sound3Playing = true;
    lineStartTime = millis();
  }
  else if (!soundEndPlaying) {
    crowd_laughing.stop();
    ai_rising.stop();
    narratorSound.stop();
    
    warSound.play();
    warSound.setVolume(0.3);
    
    babyCry.play();
    babyCry.setVolume(0.2);
    
    moreCry.play();
    moreCry.setVolume(0.6);
    
    
    soundEndPlaying = true;
  }
}

// mouseClicked() occurs when the user presses and releases the mouse button.
function mouseClicked() {
  if (soundEndPlaying && frameCount % 50 == 0) {
    sosSound.play();
  }
}

function keyPressed() {
  if (keyCode == RIGHT_ARROW) {
    let randomFish = fishObjects[floor(random(fishObjects.length))];
    randomFish.moveSpeed = random(5,10);
  }
  if (keyCode == SHIFT) {
    if (buildings.length > 0) {
      let building = random(buildings);
      building.isShaking = true;
    }
    else {
      let building = {x: random(width), 
                    y: height - random(75, 200), 
                    width: random(50, 150), 
                    height: random(75, 300), 
                    color: color(random(255), random(255), random(255)), 
                    isShaking: true, shakeOffSet: 0};
    buildings.push(building);
    }
  }
}

function mouseReleased() {
  bloodList.push(new BloodFlow(mouseX, mouseY, random(5, 10)));
}

class Particle {
  constructor(x, y, speed, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
  }
  
  display() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, 10, 10);
  }
  
  move() {
    this.x += this.speed;
    if (this.x > width) {
      this.x = 0;
      this.y = random(height);
    }
  }
}

class Fish {
  constructor(img, x, y, moveSpeed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.moveSpeed = moveSpeed;
  }
  
  display() {
    image(this.img, this.x, this.y, 50, 50);
  }

  move() {
    this.x += this.moveSpeed;
    if (this.x > width) {
      this.x = 0;
      this.y = random(height);
    }
  }
}

class BloodFlow {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.startRadius = r;
    this.maxSpeed = map(r, 5, 10, 3, 6);
  }
  
  update() {
    this.y += map(this.r, this.startRadius, 0, this.maxSpeed, 0);
    this.x += random(-0.5, 0.5);
    this.r -= 0.05;
  }
  
  draw() {
    fill('#CC1100');
    circle(this.x, this.y, this.r * 2);
  }
}

function drawLightning(startX, startY, endX, endY, thickness) {
  let points = [{x: startX, y: startY}];
  for (let i = 0; i < 20; i++) {
    let point = {x: lerp(startX, endX, i / 10) + random(-30, 30),
                y: lerp(startY, endY, i / 10) + random(-30, 30)};
    points.push(point);
  }
  points.push({x: endX, y: endY});
  
  strokeWeight(thickness);
  for (let i = 0; i < points.length - 1; i++) {
    line(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
  }
}

function drawBackground() {
  for (var i = 0; i < 500; i++) {
    stroke(i-255, 30, 50);
    line(0, i, width, i);
  }
}



