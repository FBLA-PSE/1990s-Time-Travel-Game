

var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":[],"propsByKey":{}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var gameState = "start";
var score = 0;
var rover = createSprite(200,350,30,30);
rover.visible = false;


var pieces = [];
var slots = [];
var placed = [false,false,false]; 
var quizMessage = "";

//Purpose: This adds the hubble telescope pieces for level 1 
function setHubble(){
  pieces.push(createSprite(100,300,20,20));
  pieces.push(createSprite(200,300,20,20));
  pieces.push(createSprite(300,300,20,20));

  slots.push(createSprite(120,120,35,35));
  slots.push(createSprite(200,120,35,35));
  slots.push(createSprite(280,120,35,35));


  for(var i=0;i<pieces.length;i++){ pieces[i].shapeColor="blue"; }
  for(var i=0;i<slots.length;i++){ slots[i].shapeColor="white"; }

}

var selectedPiece = null;
var rocks = [];
var missionFailed = false;
var finished = false;


//Purpose: sets the location of the craters for the mars levels
var marsLevels = [
  [{x:50,y:150},{x:150,y:100},{x:300,y:200},{x:250,y:50},{x:100,y:220},{x:20,y:250}],
  [{x:80,y:130},{x:200,y:80},{x:280,y:180},{x:180,y:220},{x:320,y:100},{x:250,y:120}],
  [{x:60,y:200},{x:10,y:50},{x:320,y:150},{x:220,y:250},{x:100,y:80},{x:180,y:180}],
  [{x:40,y:100},{x:140,y:200},{x:260,y:70},{x:340,y:220},{x:180,y:150}, {x:360,y:80}],
  [{x:70,y:180},{x:190,y:60},{x:250,y:200},{x:310,y:120},{x:120,y:250}, {x:380,y:160}]
];
var currentMarsLevel = 0;

function spawnRocks(level){
  //rocks=[];
  for(var i=0;i<marsLevels[level].length;i++){
    var r=createSprite(marsLevels[level][i].x, marsLevels[level][i].y, 20,15);
    r.shapeColor="darkred";
    rocks.push(r);
  }
}

//AI Usage (ChatGPT 3.24.26)
//AI used for customizing our sprites to add higher quality 
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
setHubble();
function draw(){

  background("black");

  // This establishes our start screen
  if(gameState=="start"){
    rover.visible=false;
    for(var i=0;i<pieces.length;i++){pieces[i].visible=false;}
    for(var  
    x=0;x<slots.length;x++){slots[x].visible=false;}
    
    fill("lightgrey");
    for(var i=0;i<100;i++){
      rect(randomNumber(0,400),randomNumber(0,400),6,6);
    };
    stroke("grey");
    strokeWeight(10);
    rect(5,110,390,160);
    noStroke();
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
    text("Press ENTER to continue",120,340);

    fill("gray");
    rect(170,250,60,20);
    fill("lightgray");
    rect(160,245,10,30);
    rect(230,245,10,30);
    fill("blue");
    rect(120,250,40,15);
    rect(240,250,40,15);
    fill("darkgray");
    rect(190,230,20,20);

    if(keyWentDown("enter")){
      gameState="hubbleMission";
    }
  }
  
  
  if(gameState=="hubbleMission"){
    background("black");

    fill("white");
    textSize(26);
    text("Level: Hubble Space Telescope",25,60);
    textSize(16)
    var jamesMilton = createSprite(50,150);
    jamesMilton.setAnimation("James_Milton");
    jamesMilton.scale = 0.3;
    drawSprites();
    text("My name is James Milton Heflin Jr.",100,90);
    text("I was the head of the command center",100,110);
    text("during the famous hubble telescope",100,130);
    text("repair of 1993 which involved",100,150);
    text("multiple spacewalks!",100,170);
    text("Your current mission is to bring back the",100,190);
    text("floating parts to the station.",100,210);
    text("Press SHIFT to begin",120,340);

    fill("gray");
    rect(170,250,60,20);
    fill("lightgray");
    rect(160,245,10,30);
    rect(230,245,10,30);
    fill("blue");
    rect(118,250,42,15);
    rect(240,250,40,15);
    fill("darkgray");
    rect(190,230,20,20);
    jamesMilton.destroy();
    
    if(keyWentDown("shift")){
      gameState="hubble";
      
    }
  }
  // Hubble Space Telescope Level 1
  if(gameState=="hubble"){
    
    background("black");
    fill("lightgrey");
    noStroke();
    for(var i=0;i<100;i++){
      rect(randomNumber(0,400),randomNumber(0,400),6,6);
    }
    
    fill("gray");
    rect(80,80,240,80);
    
    fill("lightgray");
    rect(50,75,30,90);
    rect(320,75,30,90);
    fill("blue");
    rect(0,100,50,45);
    rect(350,100,50,45);
    fill("darkgray");
    rect(172,21,60,60);
    noStroke();

    fill("white");
    textSize(18);
    text("1990: Fix the Hubble Telescope",80,360);
    textSize(14);
    text("Drag the corresponding square to each slot",75,380);

    for(var y=0;y<pieces.length;y++){pieces[y].visible=true;}
    for(var z=0;z<slots.length;z++){slots[z].visible=true;}

    stroke("white");
    strokeWeight(2);
    for(var b=0;b<pieces.length;b++){
      line(pieces[b].x,pieces[b].y,slots[b].x,slots[b].y);
    }
    noStroke();

    for(var t=0;t<pieces.length;t++){
      if(pieces[t].visible){
        push();
        translate(pieces[t].x,pieces[t].y);
        fill("blue"); 
        pop();
      }
    }

    if(mouseWentDown("leftButton")){
      for(var a=0;a<pieces.length;a++){
        if(!placed[a] && pieces[a].overlapPoint(mouseX,mouseY)){
          selectedPiece=a;
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

  for(var c=0;c<pieces.length;c++){
    if(!placed[c] && pieces[c].isTouching(slots[c])){
      placed[c] = true;
    }
  }
    var allInPlace=true;
    for(var d=0;d<placed.length;d++){
      if(!placed[d]){allInPlace=false;}
    }

    if(allInPlace){
      score+=10;
      gameState="quizInfo1";

      for(var e=0;e<pieces.length;e++){pieces[e].remove();}
      for(var f=0;f<slots.length;f++){slots[f].remove();}
      pieces=[];
      slots=[];
    }
  }

  // quiz level
  if(gameState=="quizInfo1"){
    background("black");
    fill("white");
    textSize(18);
    text("1991: End of the Soviet Union",90,40);
    var USSR = createSprite(210,78);
    USSR.setAnimation("USSRFlag");
    USSR.scale = 0.4;
    drawSprites();
    textSize(16);
    text("The Soviet Union was a large conglomeration of ",30,120);
    text("15 Republics that all believed in communisitic ",30,140);
    text("idiologies. It was shortened to the USSR. In the ",30,160);
    text("year 1991, the Soviet Union officially fell ",30,180);
    text("and seperated into multiple different countries.",30,200);
    text("The USSR mainly consisted of the countries that ",30,220);
    text("neighbor current day Russia.",30,240);
    text("Press SPACE to continue",120,340);
    USSR.destroy();
    if(keyDown("space")){
      gameState="quiz1";
    }
  }
  
  if(gameState=="quiz1"){
    background("gray");
    fill("white");
    textSize(18);
    text("1991: End of the Soviet Union",90,40);
    var USSR = createSprite(210,78);
    USSR.setAnimation("USSRFlag");
    USSR.scale = 0.4;
    drawSprites();
    textSize(16);
    text("Which country declared independence in 1991?",40,120);
    text("Press Key 1: Ukraine",100,180);
    text("Press Key 2: Canada",100,210);
    text("Press Key 3: Brazil",100,240);
    text("Press Key 4: South Africa",100,270);
    text("Press Key Shift: Go back to Info Page", 100, 300);
    text(quizMessage, 120, 360);
    text(score, 10,380);
    USSR.destroy();
    if(keyDown("1")){
      score+=10;
      quizMessage ="";
      gameState="quizInfo2";
    }
    if(keyWentDown("2") || keyWentDown("3") || keyWentDown("4")){
      score-=10;
      quizMessage = "Wrong, -10 points, Try Again.";
    }
    if(keyWentDown("shift")){
      gameState="quizInfo1";
    }
  }
  
  // quiz level
  if(gameState=="quizInfo2"){
    background("black");
    fill("white");
    textSize(18);
    text("Racial Freedom!",120,40);
    var SA = createSprite(210,78);
    SA.setAnimation("SAFlag");
    SA.scale = 0.1;
    var NM = createSprite(50,160);
    NM.setAnimation("Nelson_Mandela");
    NM.scale = 0.4;
    drawSprites();
    textSize(16);
    text("Hi! My name is Nelson Mandela. I am ",80,120);
    text("a famous anti-apartied politician and ",80,140);
    text("former president of South Africa. I was ",80,160);
    text("arrested in 1962 for breaking travel",80,180);
    text("restrictions created by a pro-apartied regime.",80,200);
    text("I was held for trial and sentenced to life in",80,220);
    text("prison. I was eventually freed in the 1990s!",80,240);
    text("Press ENTER to continue",120,340);
    text(score, 10,380);
    SA.destroy();
    NM.destroy();
    if(keyDown("enter")){
      gameState="quiz2";
    }
    
  }
  if(gameState=="quiz2"){
    background("gray");
    fill("white");
    textSize(18);
    text("Racial Freedom!",140,40);
    var SA = createSprite(210,78);
    SA.setAnimation("SAFlag");
    SA.scale = 0.1;
    drawSprites();
    textSize(16);
    text("When did Nelson Mandela get freed from prison?",30,120);
    text("Press Key 1: July 18th, 1989",100,180);
    text("Press Key 2: June 3rd, 1995",100,210);
    text("Press Key 3: February 11th, 1990",100,240);
    text("Press Key 4: March 27th, 2000",100,270);
    text("Press Key Shift: Go back to Info Page", 100, 300);
    text(quizMessage, 120, 360);
    text(score, 10,380);
    SA.destroy();
    if(keyDown("3")){
      score+=10;
      gameState="marsIntro";
    }
    if(keyWentDown("2") || keyWentDown("1") || keyWentDown("4")){
      score-=10;
      quizMessage = "Wrong, -10 points, Try Again.";
    }
    if(keyWentDown("shift")){
      gameState="quizInfo2";
    }
  }
// Mars Pathfinder Fact Screen
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
// Mars rover level
if(gameState=="mars"){
  background("brown");
  fill("white");
  text("1997: Mars Rover Mission - Level " + (currentMarsLevel+1),90,30);
  textSize(14);
  text("Reach the end!",140,50);
  text("Avoid the Rocks!",190,370);
  text("Press Arrow Keys to Move",190,390);

  if(!missionFailed && !finished){
    if(keyDown("left") && rover.x > 15) rover.x -= 4;
    if(keyDown("right") && rover.x < 385) rover.x += 4;
    if(keyDown("up") && rover.y > 0) rover.y -= 4;
    if(keyDown("down") && rover.y < 390) rover.y += 4;
  }

  drawRover(rover.x,rover.y);
  rover.visible = false;
  for(var g=0;g<rocks.length;g++){
    fill(rocks[g].shapeColor);
    ellipse(rocks[g].x,rocks[g].y,20,15);
    if(rover.isTouching(rocks[g])){
      missionFailed = true;
    }
  }
  //Establishes the ending of the game
  if(missionFailed){
    clearRocks();
    background("red");
    textSize(28);
    text("Mission Failed",110,200);
    textSize(16);
    text("Press the R Key to start over",110,240);
    if (keyWentDown("r")){
      gameState = "start";
      score = 0;
      missionFailed=false;
      placed = [false, false, false];
      currentMarsLevel=0;
      setHubble();
      clearRocks();
      rover.x=200;
      rover.y=350;
      rover.visible=false;
    }
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

  if(rocks.length==0 && gameState == "mars" && !missionFailed){
    spawnRocks(currentMarsLevel);
  }
}

if(gameState=="end" && !missionFailed){
  clearRocks();
  rover.visible=false;
  fill("lightgrey");
  noStroke(); 
  for(var i=0;i<100;i++){
      rect(randomNumber(0,400),randomNumber(0,400),6,6);
  }
  stroke("grey");
  strokeWeight(10);
  rect(5,140,390,160);
  noStroke();
  fill("lime");
  textSize(32);
  text("You Escaped the 1990s!",40,180);

  fill("white");
  textSize(18);
  text("Final Score: " + score,135 ,230);
  text("Press the refresh button to play again",65,270);
  
  
}

if (gameState !== "end" && !missionFailed) {
  drawSprites();

  }
}

function clearRocks(){
  for (var i = 0; i < rocks.length; i++) {
  rocks[i].visible = false;
  rocks[i].destroy();
  rocks[i].remove();
  }
  rocks = [];
  
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
