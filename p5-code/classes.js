//FOR SCROLLING LAYERS OTHER THAN BG SCROLL----------------------------------------------------------------
class ScrollingLayer {
  constructor(imgs, speed, yAnchor, buffer, spacingOrOverlap, isOverlap = false) {
    this.imgs = imgs;
    this.speed = speed;
    this.yAnchor = yAnchor;
    this.buffer = buffer; // how far off-screen to spawn
    this.spacingVal = spacingOrOverlap; //gap or overlap?
    this.isOverlap = isOverlap;
    this.activeElements = [];
    
    //initial spawn
    /*this initial spawning mechanism is recommended
   by Gemini, so that when the canvas refreshes,
   the canvas would not be empty */ 

   /*while(condition) is a loop, the code 
   will be executed as long as the condition 
   is true*/
    let currentX = 0;
    while (currentX < width + this.buffer) {
      this.spawn(currentX);
      let last = this.activeElements[this.activeElements.length - 1];
      if (this.isOverlap) {
        currentX += last.w - this.spacingVal;
      } else {
        currentX += last.w + random(100, this.spacingVal); // spacingVal = max gap
      }
    }
  }

  spawn(xPos) {
    let img = this.imgs[floor(random(this.imgs.length))];
    this.activeElements.push({
      img: img,
      x: xPos,
      w: img.width,
      h: img.height
    });
  }

  updateAndDraw() {
    for (let i = this.activeElements.length - 1; i >= 0; i--) {
     let e = this.activeElements[i];
      //BOttom alignment
      image(e.img, e.x, this.yAnchor - e.h, e.w, e.h);
      e.x -= this.speed;

      //remove when out of screen
      if (e.x + e.w < -200) {
        this.activeElements.splice(i, 1);
      }
    }

    //spawn new ones
    let last = this.activeElements[this.activeElements.length - 1];
    if (last.x + last.w < width + this.buffer) {
      let nextX;
      if (this.isOverlap) {
        nextX = (last.x + last.w) - this.spacingVal;
      } else {
        nextX = last.x + last.w + random(50, this.spacingVal);
      }
      this.spawn(nextX);
    }
  }
}



//FOR BG SCROLLING---------------------------------------------------------------
class BGBuildingsScroll {
  constructor(img, speed, yPos, imgWidth, spacing) {
    this.img = img;
    this.speed = speed;
    this.y = yPos;
    this.w = imgWidth;
    this.spacing = spacing;
    this.x1 = 0; //anchor pos
  }

  updateAndDraw() {
    //clones pos
    let x2 = this.x1 + this.spacing;
    let x3 = x2 + this.spacing;

    //draw 3 intances
    image(this.img, this.x1, this.y, this.w, this.img.height);
    image(this.img, x2, this.y, this.w, this.img.height);
    image(this.img, x3, this.y, this.w, this.img.height);

    //anim
    this.x1 -= this.speed;

    //reset
    if (this.x1 <= -this.spacing) {
      this.x1 = 0;
    }
  }
}


//FOR VEHICLE -> RUNNING---------------------------------------------------------------
//similar to ditchStacking, but does not have init spawn, and instead of using random y pos, vehicle use a specific y anchor
class VehicleLayer {
  constructor(imgs, speed, yAnchor, spawnRate) {
    this.imgs = imgs;
    this.speed = speed;
    this.yAnchor = yAnchor;
    this.activeVehicles = [];
    this.nextSpawnTime = 0; 
    this.spawnRate = spawnRate;
    }

  updateAndDraw() {
    //spawn
    if (millis() > this.nextSpawnTime) {
      this.spawn();
      this.nextSpawnTime = millis() + random(1000, this.spawnRate);
    }

    //anim & draw
    for (let i = this.activeVehicles.length - 1; i >= 0; i--) {
      let v = this.activeVehicles[i];
      
      // ---POSITIONING + FLIP START---
      push();
      translate(v.x + v.w, this.yAnchor - v.h); 
      
      //flip horizontally
      scale(-1, 1); 

      image(v.img, 0, 0, v.w, v.h); 
      pop();
      // --- POSITIONING + FLIP END---
      

      //move right
      v.x += this.speed;


      //remove when out of screen
      if (v.x > width + 200) {
        this.activeVehicles.splice(i, 1);
      }
    }
  }

  spawn() {
    let img = this.imgs[randomInteger(0, this.imgs.length - 1)];
    this.activeVehicles.push({
      img: img,
      x: -500, 
      w: img.width,
      h: img.height
    });
  }
}


//FOR VEHICLE <- RUNNING---------------------------------------------------------------
//running in opposite way
class VehicleSecondLayer {
  constructor(imgs, speed, yAnchor, spawnRate) {
    this.imgs = imgs;
    this.speed = speed;
    this.yAnchor = yAnchor;
    this.activeVehicles = [];
    this.nextSpawnTime = 0;
    this.spawnRate = spawnRate;
  }

  updateAndDraw() {
    //spawn
    if (millis() > this.nextSpawnTime) {
      this.spawn();
      this.nextSpawnTime = millis() + random(1000, this.spawnRate);
    }

    //anim & draw
    for (let i = this.activeVehicles.length - 1; i >= 0; i--) {
      let v = this.activeVehicles[i];
      image(v.img, v.x, this.yAnchor - v.h, v.w, v.h);
      
      //move left
      v.x -= this.speed;

      //remove when out of screen
      if (v.x + v.w < -200) { 
        this.activeVehicles.splice(i, 1);
      }
    }
  }

  spawn() {
    let img = this.imgs[randomInteger(0, this.imgs.length - 1)];
    this.activeVehicles.push({
      img: img,
      x: width + 200, //spawn on the canvas right
      w: img.width,
      h: img.height
    });
  }
}


//FOR ROAD + FRAME SCROLLING---------------------------------------------------------------
//similar to BGbuilding, but simpler since my road & frame images are exactly identical to canvas width
class RoadScroll {
  constructor(img, speed, yPos) {
    this.img = img;
    this.speed = speed;
    this.y = yPos;
    this.w = 1920;
    this.x1 = 0;
    this.x2 = 1920;
  }

  updateAndDraw() {
    //draw 2 instances
    image(this.img, this.x1, this.y, this.w, this.img.height);
    image(this.img, this.x2, this.y, this.w, this.img.height);

    //pos update
    this.x1 -= this.speed;
    this.x2 -= this.speed;

    //teleport when out of screen
    if (this.x1 <= -this.w) {
      this.x1 = this.w;
    }
    if (this.x2 <= -this.w) {
      this.x2 = this.w;
    }
  }
}


//STACKING DITCH---------------------------------------------------------------
//similar to scrollingLayer, but use time (millis) instead of ruler 
class stackingDitch {
  constructor(imgs, speed, minY, maxY, minSpawnRate, maxSpawnRate, initialMin, initialMax) {
    this.imgs = imgs;
    this.speed = speed;
    this.minY = minY;
    this.maxY = maxY;
    this.minSpawnRate = minSpawnRate;
    this.maxSpawnRate = maxSpawnRate;
    this.activeElements = [];
    this.nextSpawnTime = 0;
    this.initialMin = initialMin;
    this.initialMax = initialMax;

    //init spawn
    let currentX = 0;
    while (currentX < width + 200) {
      let img = this.imgs[randomInteger(0, this.imgs.length - 1)];
      this.activeElements.push({
        img: img,
        x: currentX,
        y: random(this.minY, this.maxY),
        w: img.width,
        h: img.height
      });
      
      currentX += random(this.initialMin, this.initialMax ); 
    }
  }

  updateAndDraw() {
    //spawn
    if (millis() > this.nextSpawnTime) {
      this.spawn();
      this.nextSpawnTime = millis() + random(this.minSpawnRate, this.maxSpawnRate);
    }

    //anim & draw
    for (let i = this.activeElements.length - 1; i >= 0; i--) {
      let e = this.activeElements[i];
      image(e.img, e.x, e.y - e.h, e.w, e.h);
      e.x -= this.speed;

      if (e.x + e.w < -200) {
        this.activeElements.splice(i, 1);
      }
    }
  }

  spawn() {
    let img = this.imgs[randomInteger(0, this.imgs.length - 1)];
    this.activeElements.push({
      img: img,
      x: width + 200, 
      y: random(this.minY, this.maxY), 
      w: img.width,
      h: img.height
    });
  }
}


//CLOUDS---------------------------------------------------------------
//this is inspired by Web Bae's interactive particle system tutorial, however with modifications (adding similar mechanism like other scrolling layers to make it scroll, spawn and eliminate)
//Web Bae (22 May 2023) ‘Picture to Interactive Particle System with p5.js’ [video], Web Bae, YouTube website, accessed 24 March 2026. https://www.youtube.com/watch?v=_gz8FMduwRc
class Cloud {
  constructor(img, x, y, speed) {
    this.img = img;
    this.w = img.width;
    this.h = img.height;
    this.speed = speed;
    
    // Vectors for mouse interaction
    this.homePos = createVector(x, y);
    this.currentPos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.threshold = 300;
  }

  update() {
    this.homePos.x -= this.speed; // Drift left

    let mousePos = createVector(mouseX, mouseY);
    let distToMouse = p5.Vector.dist(this.currentPos, mousePos);

    if (distToMouse < this.threshold) {
      let awayVector = p5.Vector.sub(this.currentPos, mousePos);
      awayVector.setMag(2);
      this.vel.lerp(awayVector, 0.3);
    } else {
      let backVector = p5.Vector.sub(this.homePos, this.currentPos);
      if (backVector.mag() > 1) {
        backVector.setMag(0.5);
        this.vel.lerp(backVector, 0.05);
      } else {
        this.vel.mult(0);
      }
    }
    this.currentPos.add(this.vel);
  }

  display() {
    image(this.img, this.currentPos.x, this.currentPos.y);
  }
}

//CLOUD MANAGER---------------------------------------------------------------
//Similar to VehicleLayer
class CloudManager {
  constructor(imgs, minRate, maxRate) {
    this.imgs = imgs;
    this.minRate = minRate;
    this.maxRate = maxRate;
    this.activeClouds = [];
    this.nextSpawn = 0;
  }

  updateAndDraw() {
    //spawn
    if (millis() > this.nextSpawn) {
      this.spawn();
      this.nextSpawn = millis() + randomInteger(this.minRate, this.maxRate);
    }

    //draw & update
    for (let i = this.activeClouds.length - 1; i >= 0; i--) {
      let c = this.activeClouds[i];
      c.update();
      c.display();

      //remove when out of screen
      if (c.homePos.x + c.w < -100) {
        this.activeClouds.splice(i, 1);
      }
    }
  }

  spawn() {
    let img = random(this.imgs);
    let x = width + 100;
    let y = random(0, 130);
    let speed = random(0.2, 0.6);
    this.activeClouds.push(new Cloud(img, x, y, speed));
  }
}


//BACTERIA---------------------------------------------------------------
//interaction  is similar to cloud
class Bacteria {
  constructor(img, x, y) {
    this.img = img;
    this.w = img.width;
    this.h = img.height;

    this.homePos = createVector(x, y);
    this.currentPos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.threshold = 200; 
    
    this.angle = random(TWO_PI);
    this.rotationSpeed = random(-0.02, 0.02);
    
    this.age = 0;
    this.maxAge = random(600, 1000);
  }

  update() {
    this.age++;

    //update
    this.angle += this.rotationSpeed;

    //jitter anim
    let jitter = p5.Vector.random2D();
    jitter.mult(0.5); 
    this.vel.add(jitter);

    //interaction
    let mousePos = createVector(mouseX, mouseY);
    let distToMouse = p5.Vector.dist(this.currentPos, mousePos);

    if (distToMouse < this.threshold) {
      let awayVector = p5.Vector.sub(this.currentPos, mousePos);
      awayVector.setMag(2.5); 
      this.vel.lerp(awayVector, 0.2);
    } else {
      let backVector = p5.Vector.sub(this.homePos, this.currentPos);
      if (backVector.mag() > 1) {
        backVector.setMag(0.8);
        this.vel.lerp(backVector, 0.05);
      } else {
        this.vel.mult(0.95);
      }
    }

    this.currentPos.add(this.vel);
  }

  display() {
    push();
    translate(this.currentPos.x, this.currentPos.y);
    rotate(this.angle); 
    image(this.img, 0, 0); 
    pop();
  }

  isDead() {
    return this.age > this.maxAge; //check if bacteria is old enough
  }
}



//BACTERIA NETWORK---------------------------------------------------------------
//This class is the most complex class in the project which even controls other elements like sky, emotion box and fishing activity (using currentGrowthY)
//Since it is complex, Gemini has helped me in suggesting ways to develop this class when I was stuck
class BacteriaNetwork {
  constructor(imgs, minCount, maxCount, startY, endY, connectionDist) {
    this.imgs = imgs;
    this.minCount = minCount; 
    this.maxCount = maxCount;
    this.startY = startY;
    this.endY = endY;
    this.currentGrowthY = startY;
    this.connectionDist = connectionDist;
    this.particles = [];
    this.growthSpeed = 0.05; 
  }

  run() {
  //growth y reaching its roof
    if (this.currentGrowthY > this.endY) {
      this.currentGrowthY -= this.growthSpeed;
    }

   /* //bacteria instantly disappear all when reach max clicks
    if (clickCount >= maxClicks) {
      this.particles = []; 
      this.currentGrowthY = this.startY;
      return; //exit early so no new bacteria spawn until recovery start
    }*/ //IGNORE-old code for referencing


    
  //bacteria population
  let baseMax = map(this.currentGrowthY, this.startY, this.endY, this.minCount, this.maxCount); //map the amount of bacteria base on y growth
  let dynamicMax;

  if (clickCount >= maxClicks) {
    dynamicMax = 0;
    this.particles = []; //instanty eliminate all bacteria
    this.currentGrowthY = this.startY; //reset growth back to bottom
  } else {
    dynamicMax = map(clickCount, 0, maxClicks, baseMax, 0);//reduce bacteria base on click count
  }



  //spawn in new y if there is still room in dynamicMax
  //this is based on Gemini suggestion
  if (this.particles.length < dynamicMax) {
    //when recovering, spawn at the bottom of the screen
    let spawnX = random(width);
    let spawnY = 1080; 
    
    /*pass spawnY as the current position, 
    but its "homePos" remains within the original 
    network area (startY to currentGrowthY)*/
    let targetY = random(this.currentGrowthY, this.startY);
    let newBacteria = new Bacteria(random(this.imgs), spawnX, targetY);
    
    //override the starting position so it anims up from the bottom
    newBacteria.currentPos.y = 1080; 
    
    this.particles.push(newBacteria);
  }



  //update and draw particles
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.update();
    p.display();
    this.drawConnections(p, i);

    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
}



 //when bacteria particles are in a specific distance, draw a line between them
drawConnections(p, index) {
  for (let j = index - 1; j >= 0; j--) {
    let other = this.particles[j];
    let distance = dist(p.currentPos.x, p.currentPos.y, other.currentPos.x, other.currentPos.y);

    if (distance < this.connectionDist) {
      stroke("#232323");
      strokeWeight(2.5);
      line(p.currentPos.x, p.currentPos.y, other.currentPos.x, other.currentPos.y);
    }
  }
}
}



// SMALL BUBBLE---------------------------------------------------------------
class SmallBubble {
  constructor(imgs, x, y) {
    this.img = random(imgs);
    this.x = x;
    this.y = y;
    this.w = this.img.width;
    this.h = this.img.height;
    this.speed = random(1, 3);
    this.isClicked = false;
  }

  update() {
    this.y += this.speed;   
  }

  display() {
    image(this.img, this.x, this.y);
  }

  checkClick(mx, my) {// important
    let d = dist(mx, my, this.x + this.w/2, this.y + this.h/2);
    
    //check if mouse is in the area for clicking ( inside the bubble bounds)
    if (d < this.w / 2) {
      this.isClicked = true;
      return true;
    }
    return false;
  }
}


// BUBBLE MANAGER---------------------------------------------------------------
//for spawning, splicing bubbles, trigger thought anim
//it works like this: bubble is spawn -> then if I click the bubble, the method checkInteraction will be triggered: it creates new thought anim, splice the clicked bubble, then increase click count for bacteria network generation
class BubbleManager {
  constructor(bubbleImgs, thoughtSequences) {
    this.bubbleImgs = bubbleImgs;
    this.sequences = thoughtSequences;
    this.activeBubbles = [];
    this.activeThoughts = [];
  }

  trySpawn(x, y) {
  if (random(100) < 0.2) {  //0.2% spawn chance
    this.activeBubbles.push(new SmallBubble(this.bubbleImgs, x, y));
  }
}

update() {
  /* //clear all bubbles once the limit is hit, in case I need
  // if (clickCount >= maxClicks) {
  //   this.activeBubbles = [];
  // }*/

  for (let i = this.activeBubbles.length - 1; i >= 0; i--) {
    let b = this.activeBubbles[i];
    b.update();
    b.display();
    
    if (b.y < -100) {
      this.activeBubbles.splice(i, 1);
    }
  }

  for (let i = this.activeThoughts.length - 1; i >= 0; i--) {
    this.activeThoughts[i].updateAndDraw();
    if (this.activeThoughts[i].isDone) {
      this.activeThoughts.splice(i, 1);
    }
  }
}
   
 
  checkInteraction(mx, my) {
  let hit = false;
  for (let i = this.activeBubbles.length - 1; i >= 0; i--) { //loop through the bubbles array to check if any is clicked

    if (this.activeBubbles[i].checkClick(mx, my)) {//if clicked, trigger below

      this.activeThoughts.push(new ThoughtAnimation(this.sequences, 299, 19));

      this.activeBubbles.splice(i, 1);
      
      if (clickCount < maxClicks) {
        clickCount++;
      }
      hit = true; //important (click successfully)
    }
  }
  return hit;
}
}



// THOUGHT ANIMATION---------------------------------------------------------------
//I used gemini to help with the conditions in this class, somehow I get pretty confused when think about timing this way, even when it is just comparing 2 initials
class ThoughtAnimation {
  constructor(sequences, x, y) {
    this.frames = random(sequences); 
    this.x = x;
    this.y = y;
    this.currentFrame = 0;
    this.lastFrameTime = millis();
    this.isDone = false; //finished? 
    this.pauseDuration = 1000; 
    this.frameDuration = 70;  
    this.hasPlayedTear = false;
  }

  updateAndDraw() {
    if (this.isDone) return; //stop if finished

    let now = millis();
    let waitTime = (this.currentFrame === 0) ? this.pauseDuration : this.frameDuration;

    if (this.currentFrame === 0 && now - this.lastFrameTime > this.pauseDuration) { //check if pause duration is over, if yes then play paper tear sound
  if (!this.hasPlayedTear) {
    paperTearSound.play();
    this.hasPlayedTear = true;
  }
}

    if (now - this.lastFrameTime > waitTime) { //compares the current time to the last time the frame changed. If enough time has passed, it shows to the next image
      this.currentFrame++;
      this.lastFrameTime = now;
      
      //tracker for end
      if (this.currentFrame >= this.frames.length) {
        this.isDone = true; 
        return;
      }
    }

    image(this.frames[this.currentFrame], this.x, this.y);
  }
}



//BACTERIA RAW---------------------------------------------------------------
//simple random pos + random size image spawning
class BacteriaRaw {
  constructor(imgs, area) {
    this.img = random(imgs);
    this.x = area.x + random(area.w);
    this.y = area.y + random(area.h);
    
    this.lifespan = random(30, 60); 
    this.size = random(0.5, 0.8);  
  }

  update() {
    this.lifespan--; 
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.img.width * this.size, this.img.height * this.size);
    pop();
  }

  isFinished() {
    return this.lifespan <= 0;
  }
}


//BACTERIA RAW MANAGER---------------------------------------------------------------
//manage the bacteriaRaw upper. contrains its spawn area to 3 different spaces, and using other inits (mostly from bacteria network class) to update the bacteriaRaw behavior
class BacteriaRawManager {
  constructor(imgs) {
    this.imgs = imgs;
    this.particles = [];
    this.areas = [
      { x: 1598, y: 457, w: 140, h: 232 },
      { x: 1768, y: 482, w: 119, h: 207 },
      { x: 1603, y: 776, w: 274, h: 122 }
    ];
  }

  updateAndDraw() {
    //spawn
    if (clickCount < maxClicks) {

      //amount increases as bacteria grow higher (using currentGrowthY from Bacteria network)
      let currentMax = map(daBacteriaNetwork.currentGrowthY, daBacteriaNetwork.startY, daBacteriaNetwork.endY, 0, 40);
      
      if (this.particles.length < currentMax && random(1) > 0.8) {
        let selectedArea = random(this.areas);
        this.particles.push(new BacteriaRaw(this.imgs, selectedArea));
      }
    } else {//disappear by clear the array
      this.particles = [];
    }

    //life manage, using methods from bacteria raw
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      this.particles[i].display();
      if (this.particles[i].isFinished()) {
        this.particles.splice(i, 1);
      }
    }
  }
}