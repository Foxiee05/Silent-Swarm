// **********************************************
// ****************INITIALIZATION*****************
// ***********************************************

//COLORS INIT-----------------------------------
let white = "#F7F7F7";
let black = "#232323";
let pink = "#FE98DF";
let brown = "#B95C04";
let yellow = "#FFDB2E";
let skin = "#FEED93";
let red = "#E43812";
let green = "#7ECF44";
let blue = "#35A8FF";
let darkBlue = "#0A0FA5";
let purple = "#A63EDF";
let darkPurple = "#98157B";
let darkGreen = "#263717";

//ROAD INIT-----------------------------------
let roadImg;
let roadSpeed = 6;
let roadLayer;

//FAR BUILDINGS INIT-----------------------------------
let farBuildingLayer;
let farBuildingImg;
let farBuildingX1 = 0; 
let farBuildingSpeed = 2; 
let farBuildingWidth = 1660;
let farBuildingOverlap = 205;
let farBuildingSpacing = farBuildingWidth - farBuildingOverlap; // 1455px

//MID BUILDINGS INIT-----------------------------------
let midBuildingLayer; 
let midBuildingImg;
let midBuildingX1 = 0; 
let midBuildingSpeed = 3; 
let midBuildingWidth = 1660;
let midBuildingOverlap = 205;
let midBuildingSpacing = midBuildingWidth - midBuildingOverlap; // 1455px

//HOUSE INIT-----------------------------------
let houseImages = [];
let activeHouses = [];
let scrollSpeed = 6;
let houseSpacing = 160;

//FAR TREES INIT-----------------------------------
let farTreeImages = [];
let activeFarTrees = [];
let farTreeSpeed = 4;

//MID TREES INIT-----------------------------------
let midTreeImages = [];
let activeMidTrees = [];
let midTreeSpeed = 6;

//VEHICLE INIT-----------------------------------
let bikerImages = [];
let bikerLayer;
let bikerSpeed = 7;

let bigVehicleImages = [];
let bigVehicleLayer;    
let bigVehicleSpeed = bikerSpeed - 4;


//FRONT TREES INIT-----------------------------------
let frontTreeImages = [];
let frontTreeLayer;


//FRAMES INIT-----------------------------------
let frameImg;
let framesLayer;
let frameSpeed = roadSpeed;


//BRICKS INIT-----------------------------------
let brickImages = [];
let brickDitchLayer;


//DIRT INIT-----------------------------------
let dirtImages = [];
let dirtLayer;


//SAND-BAGS INIT-----------------------------------
let sandBagImages;
let sandBagLayer;


//BUSHES INIT-----------------------------------
let bushImages = [];
let bushLayer;


//SIGNS INIT----------------------------------- 
let signImages = [];
let signLayer;


//CLOUDS INIT-----------------------------------
let cloudImages = [];
let cloudLayer;
let clouds


//BACTERIA INIT-----------------------------------
let bacteriaImages = [];
let myBacteriaNetwork;


//BUBBLE & THOUGHT INIT-----------------------------------
let bubbleImages = [];
let thoughtSequences = [];
let bubbleManager;


//BACTERIAL TRANSITIONING INIT-----------------------------------
let clickCount = 0;
let maxClicks = 6;
let currentRectColor;
let lastClickTime = 0;
let recoveryDelay = 10000;


//EMOTION BOX INIT----------------------------------- 
let boxImgs = [], emotionImgs = [], treeRootImgs = [], legImgs = [], grassImgs = [];

//variation tracker
let variationIndex = 0;

//instruction
let instructionBtnImg;
let instructionImg;
let showInstructions = false;


//BACTERIA RAW INIT-----------------------------------
let bacteriaRawImages = [];
let rawManager;


//FISHER AREA INIT-----------------------------------
let fisherAreaImg;
let fisherAngle = 0;

let fishermanImgs = [];
let trashImgs = [];
let fishImgs = [];
let activeFisherResult = null; //store current fish/trash
let fisherFrame = 0;



//SOUNDS INIT-----------------------------------
let clickSounds = [];
let paperTearSound, rollerSound, rewardSound, slimySound, cityAmbience, speakingNoise, successTone;
let isMuted = true;
let wasBacteriaPresent = false;



// **********************************************
// ****************** PRE-LOAD ********************
// ***********************************************
function preload() {
  roadImg = loadImage('assets/road-multi.png');

  frameImg = loadImage('assets/frame-multi.png');

  farBuildingImg = loadImage('assets/far-building.png');

  midBuildingImg = loadImage('assets/mid-building.png');
  

  //10 HOUSES------------------------------------------------
  for (let i = 1; i <= 10; i++) {
    houseImages.push(loadImage(`assets/house-${i}.png`));
  }

  //3 FAR TREES------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    farTreeImages.push(loadImage(`assets/far-tree-${i}.png`));
  }

  //3 MID TREES------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    midTreeImages.push(loadImage(`assets/mid-tree-${i}.png`));
  }
  
  //5 BIKERS------------------------------------------------
  for (let i = 1; i <= 5; i++) {
    bikerImages.push(loadImage(`assets/biker-${i}.png`));
  }

  //5 BIG VEHICLES------------------------------------------------
  for (let i = 1; i <= 5; i++) {
    bigVehicleImages.push(loadImage(`assets/bigVehicle-${i}.png`));
  }

  //4 FRONT TREES------------------------------------------------
  for (let i = 1; i <= 4; i++) {
    frontTreeImages.push(loadImage(`assets/front-tree-${i}.png`));
  }

  //2 BRICKS------------------------------------------------
  for (let i = 1; i <= 2; i++) {
    brickImages.push(loadImage(`assets/brick-${i}.png`));
  }

  //2 DIRT------------------------------------------------
  for (let i = 1; i <= 2; i++) {
    dirtImages.push(loadImage(`assets/dirt-${i}.png`));
  }

  sandBagImages = loadImage(`assets/sandBags.png`);

  //4 BUSHES------------------------------------------------
  for (let i = 1; i <= 4; i++) {
    bushImages.push(loadImage(`assets/bushes-${i}.png`));
  }
  

  //3 SIGNS------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    signImages.push(loadImage(`assets/sign-${i}.png`));
  }


  //4 CLOUDS------------------------------------------------
  for (let i = 1; i <= 4; i++) {
    cloudImages.push(loadImage(`assets/cloud-${i}.png`));
  }

  //5 BACTERIA------------------------------------------------
  for (let i = 1; i <= 5; i++) {
    bacteriaImages.push(loadImage(`assets/bacteria-${i}.png`));
  }


  //4 SMALL BUBBLES------------------------------------------------
  for (let i = 1; i <= 4; i++) {
    bubbleImages.push(loadImage(`assets/smallBubble-${i}.png`));
  }



  //6 THOUGHT SEQUENCES (each with 3 frames)------------------------------------------------
  for (let s = 1; s <= 6; s++) {
    let sequence = [];
    for (let f = 1; f <= 3; f++) {
      sequence.push(loadImage(`assets/thought-${s}.${f}.png`));
    }
    thoughtSequences.push(sequence);
  }


  //EMOTION BOX ASSETS------------------------------------------------
  for (let i = 1; i <= 3; i++) {
    boxImgs.push(loadImage(`assets/box-${i}.png`));
    emotionImgs.push(loadImage(`assets/emotion-${i}.png`));
    treeRootImgs.push(loadImage(`assets/treeRoot-${i}.png`));
    legImgs.push(loadImage(`assets/leg-${i}.png`));
    grassImgs.push(loadImage(`assets/grass-${i}.png`));
  }

  instructionBtnImg = loadImage('assets/instruction-button.png');
  instructionImg = loadImage('assets/instruction.png');



  //BACTERIA RAW------------------------------------------------
  for (let i = 1; i <= 5; i++) {
  bacteriaRawImages.push(loadImage(`assets/bacteriaRaw-${i}.png`));
}


  //FISHER AREA------------------------------------------------
  fisherAreaImg = loadImage('assets/fisherArea.png');

  for (let i = 1; i <= 2; i++) fishermanImgs.push(loadImage(`assets/fisherman-${i}.png`));
  for (let i = 1; i <= 4; i++) trashImgs.push(loadImage(`assets/trash-${i}.png`));
  for (let i = 1; i <= 4; i++) fishImgs.push(loadImage(`assets/fish-${i}.png`));


  //SOUNDS------------------------------------------------
  //click
  for (let i = 1; i <= 5; i++) {
    clickSounds.push(loadSound(`sounds/click-${i}.wav`));
  }

  //others
  paperTearSound = loadSound('sounds/paper-tear.wav');
  rollerSound = loadSound('sounds/fishing-rod-roller.wav');
  rewardSound = loadSound('sounds/reward-fishing.wav');
  slimySound = loadSound('sounds/slimy.wav');
  cityAmbience = loadSound('sounds/city-ambience.wav');
  speakingNoise = loadSound('sounds/speaking-noise.wav');
  successTone = loadSound('sounds/success-tone.wav');

}


// **********************************************
// ****************** SET UP ********************
// ***********************************************
function setup() {
  createCanvas(1920, 1080);

  //BLACK FILL RECT START----------------------------------------------------------------
  currentRectColor = color(black);


  //NEW ROAD----------------------------------------------------------------
  roadLayer = new RoadScroll(roadImg, roadSpeed, 605);


  //INITIAL SPAWNING FOR 2 BG BUILDINGS LAYER----------------------------------------------------------------
  farBuildingLayer = new BGBuildingsScroll(
    farBuildingImg, 
    farBuildingSpeed, 
    36, 
    farBuildingWidth, 
    farBuildingSpacing
  );
  
  midBuildingLayer = new BGBuildingsScroll(
    midBuildingImg, 
    midBuildingSpeed, 
    124, 
    midBuildingWidth, 
    midBuildingSpacing
  );


  //INITIAL SPAWNING FOR BUILDINGS, FAR TREES, AND MID TREES----------------------------------------------------------------
  //constructor(imgs, speed, yAnchor, buffer, spacingOrOverlap, isOverlap = false)
  farTreeLayer = new ScrollingLayer(farTreeImages, farTreeSpeed, 500, 1000, 1000, false);

  midTreeLayer = new ScrollingLayer(midTreeImages, midTreeSpeed, 615, 1000, 600, false);

  houseLayer = new ScrollingLayer(houseImages, roadSpeed, 615, 800, houseSpacing, true);
  
  frontTreeLayer = new ScrollingLayer(frontTreeImages, roadSpeed, 820, 1000, 500, false);

  

  //INITIAL SPAWNING FOR VEHICLES----------------------------------------------------------------
  bikerLayer = new VehicleLayer(bikerImages, bikerSpeed, 676, 4000);

  bikerSecondLayer = new VehicleSecondLayer(bikerImages, bikerSpeed + 10, 783, 4000);

  bigVehicleLayer = new VehicleLayer(bigVehicleImages, bigVehicleSpeed, 676, 8000);

  bigVehicleSecondLayer = new VehicleSecondLayer(bigVehicleImages, bigVehicleSpeed + 10, 783, 8000);



  //NEW FRAMES----------------------------------------------------------------
  /*using the same class with the road*/
  framesLayer = new RoadScroll(frameImg, frameSpeed, 748);


  //INITIAL SPAWNING FOR BRICKS----------------------------------------------------------------
  //constructor(imgs, speed, minY, maxY, minSpawnRate, maxSpawnRate, initialMin, initialMax)
  brickDitchLayer = new stackingDitch(brickImages, roadSpeed, 1000, 1010, 1000, 1100, 200, 400);


  //INITIAL SPAWNING FOR DIRT----------------------------------------------------------------
  dirtDitchLayer = new stackingDitch(dirtImages, roadSpeed, 895, 950, 700, 800, 100, 200);


  //INITIAL SPAWNING FOR SAND-BAGS----------------------------------------------------------------
  sandBagLayer = new stackingDitch([sandBagImages], roadSpeed, 850, 860, 100, 6000, 1000, 2000);

  
  //INITIAL SPAWNING FOR BUSHES----------------------------------------------------------------
  bushLayer = new stackingDitch(bushImages, roadSpeed, 900, 980, 500, 1500, 300, 700);


  //INITIAL SPAWNING FOR SIGNS----------------------------------------------------------------
  signLayer = new stackingDitch(signImages, roadSpeed, 830, 830, 10000, 10000, 1500, 1500);


  //NEW CLOUDS----------------------------------------------------------------
  clouds = new CloudManager(cloudImages, 20000, 22000);

  //init spawn
  for (let i = 0; i < 3; i++) {
    let img = cloudImages[randomInteger(0, cloudImages.length - 1)];
    clouds.activeClouds.push(new Cloud(img, random(width), random(0, 130), random(0.2, 0.6)));
  }


  //NEW BACTERIA----------------------------------------------------------------
  push();
  imageMode(CENTER);

  //constructor(imgs, minCount, maxCount, startY, endY, connectionDist)
  daBacteriaNetwork = new BacteriaNetwork(bacteriaImages, 80, 200, 976, 575, 150);
  pop();


  //NEW BUBBLE MANAGER----------------------------------------------------------------
  bubbleManager = new BubbleManager(bubbleImages, thoughtSequences);



  //BACTERIA RAW----------------------------------------------------------------
  rawManager = new BacteriaRawManager(bacteriaRawImages);



  //SOUNDS----------------------------------------------------------------
  cityAmbience.loop();
  cityAmbience.setVolume(0.5);

  speakingNoise.loop();
  speakingNoise.setVolume(0);

  slimySound.setVolume(1.5);
}




// **********************************************
// ****************** DRAW ********************
// ***********************************************
function draw() {
  //MUTE CONTROL---------------------------------------------------------------------------------------
  if (isMuted) {
    outputVolume(0); 
  } else {
    outputVolume(1);
  }



  //BACKGROUND----------------------------------------------------------------
  let bgCol;
  if (clickCount < maxClicks && daBacteriaNetwork.currentGrowthY <= 800) {

    let bgTransitionRate = map(daBacteriaNetwork.currentGrowthY, 800, 780, 0, 1); //map bacteria currentGrowthY to progression between 0 & 1. 800-> progress is 0, 780->progress is 1
    bgCol = lerpColor(color(white), color("#FF8C00"), constrain(bgTransitionRate, 0, 1));

  } else {
    bgCol = color(white);
  }
  background(bgCol);

  
  //BLACK FILL RECT----------------------------------------------------------------
  /*this recovery logic is fixed by Gemini*/

  // Only start the 10-second countdown if we reached the max state
  if (clickCount >= maxClicks) {
    if (millis() - lastClickTime > recoveryDelay) {
      // Begin the reset process
      if (frameCount % 10 === 0) { 
        clickCount--; 
      }
    }
  } 
  // NEW: Ensure that once recovery starts, it continues until clickCount is 0
  else if (clickCount > 0 && millis() - lastClickTime > recoveryDelay) {
    if (frameCount % 10 === 0) {
      clickCount--; 
    }
  }

  // COLOR TRANSITION (Lerp to Blue, then back to Black)
  let targetColor = color(blue);
  let transitionAmount = map(clickCount, 0, maxClicks, 0, 1);
  currentRectColor = lerpColor(color(black), targetColor, transitionAmount);

  fill(currentRectColor);
  noStroke();
  rect(0, 937, 1920, 143); // Rect returns to black as clickCount hits 0
 




  //BROWN FILL RECT----------------------------------------------------------------
  fill(brown);
  noStroke();
  rect(0, 800, 1920, 137);


  //ROAD SCROLLING----------------------------------------------------------------
  roadLayer.updateAndDraw();


//CLOUDS SCROLLING + INTERACTION----------------------------------------------------------------
  clouds.updateAndDraw();


 //FAR BUILDINGS SCROLLING----------------------------------------------------------------
 farBuildingLayer.updateAndDraw();


  //MID BUILDINGS SCROLLING----------------------------------------------------------------
  midBuildingLayer.updateAndDraw();


  //FAR TREES SCROLLING----------------------------------------------------------------
  farTreeLayer.updateAndDraw();


  //HOUSE SCROLLING----------------------------------------------------------------
  houseLayer.updateAndDraw();


  //MID TREES SCROLLING----------------------------------------------------------------
  midTreeLayer.updateAndDraw();


  //BIG VEHICLE -> SCROLLING----------------------------------------------------------------
  bigVehicleLayer.updateAndDraw();


  //BIKERS -> SCROLLING----------------------------------------------------------------
  bikerLayer.updateAndDraw();


  //BIKERS 2ND LAYER <- SCROLLING----------------------------------------------------------------
  bikerSecondLayer.updateAndDraw();


  //BIG VEHICLE 2ND LAYER <- SCROLLING----------------------------------------------------------------
  bigVehicleSecondLayer.updateAndDraw();


  //FRONT TREES SCROLLING----------------------------------------------------------------
  frontTreeLayer.updateAndDraw();


  //SIGNS SCROLLING + STACKING----------------------------------------------------------------
  signLayer.updateAndDraw();


  //FRAMES SCROLLING----------------------------------------------------------------
  framesLayer.updateAndDraw();


  //BRICKS SCROLLING + STACKING----------------------------------------------------------------
  brickDitchLayer.updateAndDraw();


  //DIRT SCROLLING + STACKING----------------------------------------------------------------
  dirtDitchLayer.updateAndDraw();


  //SAND-BAGS SCROLLING + STACKING----------------------------------------------------------------
  sandBagLayer.updateAndDraw();


  //BUSHES SCROLLING + STACKING----------------------------------------------------------------
  bushLayer.updateAndDraw();
  

 //FISHER AREA-----------------------------------------------------------------
  /*push();
    //move the drawing origin to the center of the image
    let centerX = -91 + (fisherAreaImg.width / 2);
    let centerY = -72 + (fisherAreaImg.height / 2);
  
    translate(centerX, centerY);
  
    //rotate
    rotate(fisherAngle);
    fisherAngle += 0.02; 
  
    //draw
    imageMode(CENTER);
    image(fisherAreaImg, 0, 0);
  pop();*/



  //FISHERMAN INTERACTION IN FISHER AREA-----------------------------------------------------------------
  //hover zone defining
  let isHoveringFisher = (mouseX >= 0 && mouseX <= 218 && 
    mouseY >= 0 && mouseY <= 218);
  
  //scale: 1.2 if hovering, 1.0 if not
  let fisherScale = isHoveringFisher ? 1.1 : 1.0;


  
  // --FISHER AREA---
  push();
  //move the drawing origin to the center of the image
  let fCenterX = -91 + (fisherAreaImg.width / 2);
  let fCenterY = -72 + (fisherAreaImg.height / 2);
  
  translate(fCenterX, fCenterY);

  //rotate
  rotate(fisherAngle);
  fisherAngle += 0.02; 
  
  //draw
  imageMode(CENTER);
  image(fisherAreaImg, 0, 0, fisherAreaImg.width * fisherScale, fisherAreaImg.height * fisherScale);
  pop();



  //---FISHERMAN ANIM ---
  push();
  if (isHoveringFisher) {
    if (frameCount % 20 === 0) fisherFrame = (fisherFrame + 1) % 2; //using modulo operator is condition to reduce the rate of frame switching (the frame only switch every 20 frames)
  } else {
    fisherFrame = 0;
  }
  
  //draw fisherman
  image(fishermanImgs[fisherFrame], 10, 16, 
        fishermanImgs[fisherFrame].width * fisherScale, 
        fishermanImgs[fisherFrame].height * fisherScale);
  pop();




  //OVERLAY TRANSITION----------------------------------------------------------------
  if (clickCount < maxClicks && daBacteriaNetwork.currentGrowthY <= 600) {
    push();
    blendMode(BURN);
    let burnRate = map(daBacteriaNetwork.currentGrowthY, 600, 575, 0, 1);
    let burnColor = lerpColor(color(255), color(darkBlue), constrain(burnRate, 0, 1));
    fill(burnColor);
    noStroke();
    rect(0, 0, width, height);
    pop();
  }
  


  //BACTERIA----------------------------------------------------------------
  daBacteriaNetwork.run();


  //BUBBLES & THOUGHTS SPAWNING + UPDATING--------------------------------------------------------------------------------------------
  bikerLayer.activeVehicles.forEach(v => bubbleManager.trySpawn(v.x, bikerLayer.yAnchor - v.h));
  bigVehicleLayer.activeVehicles.forEach(v => bubbleManager.trySpawn(v.x, bigVehicleLayer.yAnchor - v.h));
  
  bubbleManager.update();



  //EMOTION BOX--------------------------------------------------------------------------------------------------------------------- 
  //index tracker, deciding which ver of the image to show
  variationIndex = 0;


  //trans ONLY when bacteria are still growing
  if (clickCount < maxClicks) {
    if (daBacteriaNetwork.currentGrowthY <= 780) variationIndex = 1;
    if (daBacteriaNetwork.currentGrowthY <= daBacteriaNetwork.endY) variationIndex = 2;
  }

  //lerp cals
  let boxLerp0to1 = 0;
  let boxLerp1to2 = 0;

  if (clickCount < maxClicks) {
    boxLerp0to1 = map(daBacteriaNetwork.currentGrowthY, 800, 780, 0, 1);
    boxLerp1to2 = map(daBacteriaNetwork.currentGrowthY, 600, 575, 0, 1);
  }
  
  //contrains, for safety purpose
  boxLerp0to1 = constrain(boxLerp0to1, 0, 1);
  boxLerp1to2 = constrain(boxLerp1to2, 0, 1);

  //shaking
  let s = (variationIndex === 2) ? 2 : 0; 

  //draw box
  push();
  image(boxImgs[0], 1561, 0); 
  tint(255, boxLerp0to1 * 255);
  image(boxImgs[1], 1561, 0);
  
  // Only show the third box phase if we are in the "Burn" zone (this one is fixed by Gemini)
  if (clickCount < maxClicks && daBacteriaNetwork.currentGrowthY <= 600) {
    tint(255, boxLerp1to2 * 255);
    image(boxImgs[2], 1561, 0);
  }
  pop();

  //draw emotion, tree roots, legs, grass
  image(emotionImgs[variationIndex], 1586 + random(-s, s), 63 + random(-s, s));
  image(treeRootImgs[variationIndex], 1586 + random(-s, s), 366 + random(-s, s));
  image(legImgs[variationIndex], 1758 + random(-s, s), 365 + random(-s, s));
  image(grassImgs[variationIndex], 1592 + random(-s, s), 753 + random(-s, s));
  
  //instruction button

  /*let instructBtn;
    let scalar = 1;
   instructBtn.mouseOver(scalar = 1.1);
   instructBtn.mouseOut(scalar = 1);
   instructBtn = image(instructionBtnImg, 1594 * scalar, 958 * scalar);*/


  let btnX = 1594;
  let btnY = 958;
  let btnW = 293; 
  let btnH = 59;

  //this mouseOver event is fixed by Gemini
  if (mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH) {
   //hover
    image(instructionBtnImg, btnX - 16, btnY - 6, btnW * 1.1, btnH * 1.1);
  } else {
   //no hover
   image(instructionBtnImg, btnX, btnY, btnW, btnH);
  }




  //INSTRUCTION OVERLAY------------------------------------------------------------------------------------------------------

  if (showInstructions) {
    image(instructionImg, 361, 86);
  }



  //BACTERIA RAW----------------------------------------------------------------
  rawManager.updateAndDraw();



  //FISHER RESULT (FISH OR TRASH)----------------------------------------------------------------
  if (activeFisherResult) {
    //1 second checker to remove the image from the screen
    if (millis() - activeFisherResult.spawnTime > 1000) {
      activeFisherResult = null; 


    } else {
      // Draw the images only if the timer hasn't run out
      image(activeFisherResult.img, 108, 163);

      if (activeFisherResult.type === 'trash') {
        for (let p of activeFisherResult.rawParticles) {
          image(p.img, p.x, p.y, p.img.width * p.size, p.img.height * p.size);
        }
      }
    }
  }





  //SOUND------------------------------------------------------------------
  //--slimy---
  if (clickCount < maxClicks && mouseX < 1561 && mouseX < width && mouseY > daBacteriaNetwork.currentGrowthY && mouseY < height) { //conditions include: clickCount has not meet the max, mouseX needs to be on the left area (<1561), if mouse is under currentGrowthY of bacteria, and if the mouse is not off-bottom of the screen (for safety)
  if (!slimySound.isPlaying()) {
    slimySound.loop();
  }
  } else {
   slimySound.stop();
  }


//---speaking noise---
if (clickCount < maxClicks && daBacteriaNetwork.currentGrowthY < 650) {
  let speakVol = map(daBacteriaNetwork.currentGrowthY, 650, 575, 0, 1);
  speakingNoise.setVolume(constrain(speakVol, 0, 1));
} else {
  speakingNoise.setVolume(0);


 //---success tone---
let currentBacteriaCount = daBacteriaNetwork.particles.length;

//checker for if bacteria **PRESENTED** (>0) and now they are **NOT** (==0)
if (wasBacteriaPresent && currentBacteriaCount === 0) {

  //check if bacteria is fully disappeared (clickCount >= maxClicks)
  if (clickCount >= maxClicks) {
    successTone.play();
  }

}

//update tracker for next frame
wasBacteriaPresent = currentBacteriaCount > 0;
}



 
}