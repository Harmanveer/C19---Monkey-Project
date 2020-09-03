var backImage,backgr;
var monkey, monkey_running;
var ground,groundImage;

var foodGroup, bananaImage;
var obstaclesGroup, obstacleImage;
 
var gameOver;
var score=0;

function preload()
{
  backImage = loadImage("jungle2.jpg");
  
  monkey_running =                                     loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Bananas.png");
  
  obstacleImage = loadImage("stone.png");
  
  
}

function setup() 
{
  createCanvas(800,400);
  
  back = createSprite(400,120,800,400);
  back.addImage("backg", backImage);
  back.velocityX = -3;
  back.depth = -1;
  
  monkey = createSprite(100,350);
  monkey.addAnimation("moonkey", monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(400,400,800,10);
  ground.visible = false;
  
  obstaclesGroup = new Group();

  foodGroup = new Group();
}

function draw() 
{
  
  background(255);
  
  if (back.x < 300)
  {
    back.x = back.width/2;
  }
  
  spawnObstacles();
  spawnBananas();
  
  if(obstaclesGroup.isTouching(monkey))
    {
      monkey.scale = 0.2;
    }
    
    if(foodGroup.isTouching(monkey))
    {
      score = score + 2;
      foodGroup.destroyEach();
      
      switch(score)
      {
        case 10: monkey.scale = 0.22;
          break;
          
        case 20: monkey.scale = 0.24;
          break;
          
        case 30: monkey.scale = 0.26;
          break;
          
        case 40: monkey.scale = 0.28;
          break;
        
          default: break;
      }
    }
  
  //jump when the space key is pressed
    if(keyDown("space") && monkey.y >= 289)
    {
      monkey.velocityY = -12 ;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.6;
  
  monkey.collide(ground);
  
  drawSprites();
  
}

function spawnObstacles()
{
  if(frameCount % 120 === 0)
  {
    var stone = createSprite(800,370);
    stone.addImage(obstacleImage);
    stone.scale=0.2;
    stone.velocityX = -6;
    obstaclesGroup.add(stone);
  }
}

function spawnBananas()
{
  if(frameCount % 120 === 0)
  {
    var banana = createSprite(800,280);
    banana.y = random  (210,300);
    banana.addImage(bananaImage);
    banana.scale = 0.02;
    banana.velocityX = -6; 
    
    foodGroup.add(banana);
  }
}
