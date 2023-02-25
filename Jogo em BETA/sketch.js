var bg,bgImg;
var player, shooterImg, shooter_shooting;
var backgroundmusic;
var zombie, zombieImg, zombieGroup;

var saude, saudeImg;
//sprites que vão simbolizar a vida
var vidas;

var vida1Img, vida2Img, vida3Img, vida4Img, vida5Img;

var bullet, bulletGroup;

//linhas
var linhaTorta1, linhaTorta2;

var life = 4;

var bullets = 5; //numero de tiros

//3 estados (gameplay que será jogando, "win" quando ganhar e "lose" quando perder)
var gameState = "gameplay"
var gameState = "win"
var gameState = "lose"


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  
  backgroundmusic = loadSound("assets/backgroundmusic.mp3");

  zombieImg = loadImage("assets/zombie.png");

  winmusic = loadSound("assets/win.mp3");

  losemusic = loadSound("assets/lose.mp3");

  vida1Img = loadImage("assets/heart_1.png");

  vida2Img = loadImage("assets/heart_2.png");

  vida3Img = loadImage("assets/heart_3.png");
  
  vida4Img = loadImage("assets/heart_4.png");

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.8
  

  //criando o sprite do jogador
  player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
  player.addImage(shooterImg)
  player.scale = 0.5
  player.debug = true
  player.setCollider("rectangle",0,0,300,300)
  
  //criar duas linhas tortas para colocar um limite na estrada
  linhaTorta1 = line(width/2,0,0,height);
  player.collide(linhaTorta1);
  linhaTorta1.visible = false;

  linhaTorta2 = line(width/2,0,width,height);
  player.collide(linhaTorta2);
  linhaTorta2.visible = false;

  //um limite para a2 horizontal da estrada
  

  //depois é só você colocar essas linhas no visible = false


  
   //criando sprites para representar vidas restantes
       //criando sprites para representar vidas restantes
    vidas.createSprite(displayWidth-150,40,20,20);
    vidas.visible = true;
    vidas.addImage("vida1",vida1Img);
    vidas.addImage("vida2",vida2Img);
    vidas.addImage("vida3",vida3Img);
    vidas.addImage("vida4",vida4Img);
    vidas.scale = 0.4;

   



}

function draw() {
  background(0); 

  if (!backgroundmusic.isPlaying()) { 
    backgroundmusic.play(); 
    backgroundmusic.setVolume(0.1); 
  }

if(gameState === "gameplay")
{

    //aparecer as vidas 
    /*if(life === 5)
    {vida1.visible = true} 
   // if(life === 4{qause tudo vai ser true mas a ultima vai ser false} .... ate a ultima )  
*/


if(life === 4)
  {
    vidas.changeImage("vida1",vida1Img);
  }


  if(life===3)
  {
    vidas.changeImage("vida2",vida2Img);
  } 

  }
  if(life===2)
  {
     vidas.changeImage("vida1",vida3Img);
  }
  
  if(life===1)
  {
    vidas.changeImage("vida1",vida4Img);
  }
   
  
  if(life ===0)
  {
    gameState = "lose";
  }
  
    if(score === 10000)
    {
      gameState = "win"
      //text("")
      text("Você venceu !")


      //tocar um som
      if(!winmusic.isPlaying()) 
      {
        winmusic.play();
        winmusic.setVolume(0.1);
      }
    }

      //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
    if(keyDown("UP_ARROW")||touches.length>0)
    {
      player.y = player.y-15
      player.scale=player.scale -0.005;
    }

    if(keyDown("DOWN_ARROW")||touches.length>0)
    {
    player.y = player.y+15
    player.scale=player.scale+0.005;
    }
    
    if(keyDown("RIGHT_ARROW")||touches.length>0){
      player.x = player.x+15
    }
    
    if(keyDown("LEFT_ARROW")||touches.length>0){
      player.x = player.x-15
    }


    //solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
    if(keyWentDown("space")){
      bullet= createSprite(150, width/2, 50,20);
      bullet.scale=0.12;
      bullet.velocityX= 7;

        
      bulletGroup.add(bullet);
      player.depth = bullet.depth
      player.depth = player.depth+2
      player.addImage(shooter_shooting)
      bullets = bullets-1
      explosionSound.play();

    }

    //o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
    else if(keyWentUp("space"))
    {
      player.addImage(shooterImg)

    }

    //reduzir a vida
    if (zombieGroup.isTouching(player))
    {
      if(!losemusic.isPlaying); {
        losemusic.play();
        losemusic.setVolume(0.1);
      }
    }
    for(var  i = 0; zombieGroup.length; i++)
    {

      if(zombieGroup[i].isTouching(player))
      {
        if(zombieGroup[i].isTouching(player))
        {
          zombieGroup.destroy[i].destroy();
        }
        
        life = life-1;
      }
    }
      
    criarZombies();

  



drawSprites();





}





//crie os zumbis aqui *-*
function criarZombies()
{
    if(frameCount%60 === 0)
    {
      
      //sprite do zombie
      zombie = createSprite(displayWidth-1150);
      zombie.addImage(zombieImg);
      zombie.scale = 0.5;
      zombie.debug = true;
      zombie.setCollider("rectangle",0,0,300,300);
      zombieGroup.add(zombie);
      zombie.velocityX = -3;
      zombie.lifetime = 400; //tempo de vida

    }


}