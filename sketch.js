var trex, trex_running, edges;
var groundImage,ground;
var invisibleGround
var cloud,cloudImage,cloudGroup
var obstacle1
var obstacle2
var obstacle3
var obstacle4
var obstacle5
var obstacle6
var obstacle,obstacleGroup
var score = 0
var PLAY = 1
var END = 0
var gameState = PLAY

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
}

function setup(){
    createCanvas(600,200);
    
    // creating trex
    trex = createSprite(50,180,20,50);
    trex.addAnimation("running", trex_running);
    edges = createEdgeSprites();
    
    //adding scale and position to trex
    trex.scale = 0.5;
    trex.x = 50

    invisibleGround = createSprite(300,200,600,10)
    invisibleGround.visible=false

    ground = createSprite(300,180,600,10)
    ground.addImage("ground", groundImage)
    
    cloudGroup = createGroup()
    obstacleGroup = createGroup()
  }


function draw(){
  //set background color 
  background(180);
  if(gameState===PLAY){
    ground.velocityX=-4

    score = score+Math.round(frameCount/60)

    if(keyDown("space")&&trex.y>=150){
      trex.velocityY = -10;
    }
    if(ground.x<=0){
      ground.x = ground.width/2
    }
    
    trex.velocityY = trex.velocityY + 0.5;

    
  if(frameCount%50===0){
    spawnCloud()
  }

  if(frameCount%80===0){
    spawnObstacles()
  }
  if(trex.isTouching(obstacleGroup)){
    gameState=END
  }
  }
  else if(gameState===END){
    ground.velocityX=0
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
  }

  text("SCORE: "+score,500,50)

  //logging the y position of the trex
  
  //jump when space key is pressed

  
  //stop trex from falling down
  trex.collide(invisibleGround)
 
  drawSprites();
}

function spawnCloud(){
cloud = createSprite(610,20,10,10)
cloud.velocityX=-4
cloud.y = Math.round(random(20,70))
cloud.addImage("cloud",cloudImage)
cloud.scale = 0.5
cloud.depth=trex.depth
trex.depth = trex.depth+1
cloud.lifetime = 600/4
cloudGroup.add(cloud)
}

function spawnObstacles(){
obstacle=createSprite(610,160,10,10)
obstacle.velocityX = -4
obstacle.lifetime=600/4
var rand =  Math.round(random(1,6));

switch(rand){
  case 1:
    obstacle.addImage("ob1",obstacle1);
    break;

  case 2:
    obstacle.addImage("ob2",obstacle2);
    break;

  case 3:
    obstacle.addImage("ob3",obstacle3);
    break;
  case 4:
    obstacle.addImage("ob4",obstacle4);
    break;

  case 5:
    obstacle.addImage("ob",obstacle5);
    break;

  case 6:
    obstacle.addImage("ob6",obstacle6);
    break;
  
      
}
obstacleGroup.add(obstacle)
obstacle.scale=0.5
}
   