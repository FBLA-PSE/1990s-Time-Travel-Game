var gameState = "start";
var score = 0;
var rover = createSprite(200,350,30,30);
rover.visible = false;

var pieces = [];
var slots = [];
var placed = [false,false,false]; 
var quizMessage = "";

pieces.push(createSprite(100,300,20,20));
pieces.push(createSprite(200,300,20,20));
pieces.push(createSprite(300,300,20,20));

slots.push(createSprite(120,120,35,35));
slots.push(createSprite(200,120,35,35));
slots.push(createSprite(280,120,35,35));

for(var i=0;i<pieces.length;i++){ pieces[i].shapeColor="blue"; }
for(var i=0;i<slots.length;i++){ slots[i].shapeColor="white"; }

var selectedPiece = null;
var rocks = [];
var missionFailed = false;
var finished = false;


var marsLevels = [
  [{x:50,y:150},{x:150,y:100},{x:300,y:200},{x:250,y:50},{x:100,y:220}],
  [{x:80,y:130},{x:200,y:80},{x:280,y:180},{x:180,y:220},{x:320,y:100}],
  [{x:60,y:200},{x:160,y:50},{x:300,y:150},{x:220,y:250},{x:100,y:80}],
  [{x:40,y:100},{x:140,y:200},{x:260,y:70},{x:300,y:220},{x:180,y:150}],
  [{x:70,y:180},{x:190,y:60},{x:250,y:200},{x:310,y:120},{x:120,y:250}]
];
var currentMarsLevel = 0;

function spawnRocks(level){
  rocks=[];
  for(var i=0;i<marsLevels[level].length;i++){
    var r=createSprite(marsLevels[level][i].x, marsLevels[level][i].y, 20,15);
    r.shapeColor="darkred";
    rocks.push(r);
  }
}

function drawRover(x,y){
  fill("gold");
  rect(x-12,y-5,24,10);
  fill("black");
  ellipse(x-12,y+8,10,10);
  ellipse(x+12,y+8,10,10);
  stroke("black");
  line(x,y-5,x,y-15);
  noStroke();
  fill("gray");
  rect(x-4,y-18,8,6);
}

function draw(){

  background("black");

  //start screen
  if(gameState=="start"){
    rover.visible=false;
    for(var i=0;i<pieces.length;i++){pieces[i].visible=false;}
    for(var i=0;i<slots.length;i++){slots[i].visible=false;}
    fill("white");
    textSize(30);
    text("1990s Time Travel Mission",25,150);
    textSize(18);
    text("Press SPACE to start",120,250);
    text("Made By: Preston, Elvin, Seiyon",80,190);

    if(keyWentDown("space")){
      gameState="hubbleIntro";
    }
  }

 //hubble fact screen
  if(gameState=="hubbleIntro"){
    background("black");

    fill("white");
    textSize(26);
    text("Level: Hubble Space Telescope",25,60);

    textSize(16);
    text("Launched in 1990 by NASA, the Hubble",30,120);
    text("Space Telescope is a 13.2-meter,",30,140);
    text("school-bus-sized observatory",30,160);
    text("orbiting 300 miles above Earth.",30,180);

    text("Press ENTER to begin",120,340);

    fill("gray");
    rect(170,230,60,20);
    fill("lightgray");
    rect(160,225,10,30);
    rect(230,225,10,30);
    fill("blue");
    rect(120,230,40,15);
    rect(240,230,40,15);
    fill("darkgray");
    rect(190,210,20,20);

    if(keyWentDown("enter")){
      gameState="hubble";
    }
  }

  // hubble telescope level
  if(gameState=="hubble"){
    background("black");

    fill("gray");
    stroke("red");
    strokeWeight(6);
    rect(40,70,320,80);

    fill("darkgray");
    stroke("blue");
    strokeWeight(6);
    rect(40,250,320,80);

    noStroke();

    fill("white");
    textSize(18);
    text("1990: Fix the Hubble Telescope",80,30);
    textSize(14);
    text("Drag the corresponding square to each slot",40,50);

    for(var i=0;i<pieces.length;i++){pieces[i].visible=true;}
    for(var i=0;i<slots.length;i++){slots[i].visible=true;}

    stroke("white");
    strokeWeight(2);
    for(var i=0;i<pieces.length;i++){
      line(pieces[i].x,pieces[i].y,slots[i].x,slots[i].y);
    }
    noStroke();

    for(var t=0;t<pieces.length;t++){
      if(pieces[t].visible){
        push();
        translate(pieces[t].x,pieces[t].y);
        fill("blue");
        rectMode(CENTER);
        pop();
      }
    }

    if(mouseWentDown("leftButton")){
      for(var i=0;i<pieces.length;i++){
        if(!placed[i] && pieces[i].overlapPoint(mouseX,mouseY)){
          selectedPiece=i;
          break;
        }
      }
    }

    if(mouseDown("leftButton") && selectedPiece!==null){
      if(!placed[selectedPiece]){
        pieces[selectedPiece].x=mouseX;
        pieces[selectedPiece].y=mouseY;
      }
    }

    if(mouseWentUp("leftButton")){
      selectedPiece=null;
    }

  for(var i=0;i<pieces.length;i++){
    if(!placed[i] && pieces[i].isTouching(slots[i])){
      placed[i] = true;
    }
  }
    var allInPlace=true;
    for(var i=0;i<placed.length;i++){
      if(!placed[i]){allInPlace=false;}
    }

    if(allInPlace){
      score+=10;
      gameState="quiz";

      for(var i=0;i<pieces.length;i++){pieces[i].remove();}
      for(var i=0;i<slots.length;i++){slots[i].remove();}
      pieces=[];
      slots=[];
    }
  }

  // quiz level
  if(gameState=="quiz"){
    background("gray");
    fill("white");
    textSize(18);
    text("1991: End of the Soviet Union",90,40);
    textSize(16);
    text("Which country declared independence in 1991?",60,120);
    text("Press 1: Ukraine",120,180);
    text("Press 2: Canada",120,210);
    text("Press 3: Brazil",120,240);
    text("Press 4: South Africa",120,270);
    text(quizMessage, 120, 290);
    text(score, 10,380);

    if(keyDown("1")){
      score+=10;
      gameState="marsIntro";
    }
    if(keyWentDown("2") || keyWentDown("3") || keyWentDown("4")){
      score-=10;
      quizMessage = "Wrong, -10 points, Try Again.";
    }
  }
//mars pathfinder fact screen
if(gameState=="marsIntro"){
  background("darkred");

  fill("white");
  textSize(26);
  text("Mission: Mars Pathfinder",25,60);

  textSize(16);
  text("NASA's Mars Pathfinder, which landed on July 4,",30,120);
  text("1997, was a landmark mission that safely delivered",30,140);
  text("the first-ever robotic rover.",30,160);

  text("Press ENTER to begin",120,340);

  fill("#c0c0c0");
  rect(170,220,60,25);
  fill("#333333");
  rect(165,245,10,10);
  rect(175,245,10,10);
  rect(215,245,10,10);
  rect(225,245,10,10);
  fill("#ffcc00");
  rect(150,215,20,10);
  rect(230,215,20,10);
  fill("#666666");
  rect(198,200,4,20);
  fill("#0000ff");
  ellipse(200,200,8,8);
  fill("#ff0000");
  rect(205,200,2,10);

  if(keyWentDown("enter")){
    gameState="mars";
    rover.visible=true;
    spawnRocks(currentMarsLevel);
  }
}

if(gameState=="mars"){
  background("brown");
  fill("white");
  text("1997: Mars Rover Mission - Level " + (currentMarsLevel+1),90,30);
  textSize(14);
  text("Reach the end!",140,50);
  text("Avoid the Craters!",25,300);

  if(!missionFailed && !finished){
    if(keyDown("left") && rover.x > 15) rover.x -= 4;
    if(keyDown("right") && rover.x < 385) rover.x += 4;
    if(keyDown("up") && rover.y > 0) rover.y -= 4;
    if(keyDown("down") && rover.y < 390) rover.y += 4;
  }

  drawRover(rover.x,rover.y);

  for(var i=0;i<rocks.length;i++){
    fill(rocks[i].shapeColor);
    ellipse(rocks[i].x,rocks[i].y,20,15);
    if(rover.isTouching(rocks[i])){
      missionFailed = true;
    }
  }

  if(missionFailed){
    background("red");
    textSize(28);
    text("Mission Failed",110,200);
    textSize(16);
    text("Press the reset button to start over",110,240);
  }

  if(rover.y<50 && !missionFailed){
    currentMarsLevel++;
    if(currentMarsLevel < marsLevels.length){
      rover.x = 200; rover.y = 350; 
      missionFailed=false;
      spawnRocks(currentMarsLevel);
    } else {
      gameState = "end";
    }
  }

  if(rocks.length==0){
    spawnRocks(currentMarsLevel);
  }
}

if(gameState=="end"){
  background("black");

  rover.visible=false;

  // remove crater sprites so they cannot appear
  for(var i=0;i<rocks.length;i++){
    rocks[i].remove();
  }
  rocks=[];

  fill("lime");
  textSize(32);
  text("You Escaped the 1990s!",40,180);

  fill("white");
  textSize(18);
  text("Final Score: " + score,130,230);
  text("Press the reset button to play again",95,270);
}

  fill("white");
  textSize(14);
  drawSprites();
}
