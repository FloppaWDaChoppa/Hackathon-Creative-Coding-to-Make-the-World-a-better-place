window.addEventListener('load', function(){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width=1280;
  canvas.height=720;
  let enemies = [];
  let score = 0;
  let newScore = 0;
  let highScore = score;
  let gameOver = false;
  
  class InputHandler {
    constructor(){
      this.keys = [];
      //Uses lexical scope to take arrow inputs and makes sure the inputs aren't already in the array

     window.addEventListener('keydown', e => {
      if (( e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' || 
            e.key ==='ArrowLeft' || 
            e.key === 'ArrowRight')
            && this.keys.indexOf(e.key) === -1){
          this.keys.push(e.key);
        }
        //console.log(e.key, this.keys)
       //console.log(input)
      });
      //Once one of the four arrows are no longer being pressed down, they are removed from the array
      window.addEventListener('keyup', e => {
        if (e.key === 'ArrowDown' || 
            e.key === 'ArrowUp' || 
            e.key ==='ArrowLeft' || 
            e.key === 'ArrowRight'){
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
        if (gameOver && e.key === 'Enter'){
          score = 0;
          location.reload();
         /* handleEnemies();
          displayStatusText(context)
          animate(timeStamp)*/
        }
      });
    }
  }
  
  class Player {
    constructor(gameWidth, gameHeight){
      //Turns game width and game height into usable arguments
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 180;
      this.height = 100;
      this.x = 200;
      this.y = gameHeight/2 -100;
      this.image = document.getElementById('playerImage')
      this.speed = 15;
      this.speedY = 15;
    } //Makes the entire rectangle white
    draw(context){ 
      /*context.strokeStyle = 'white';
      context.strokeRect(this.x, this.y /*+ 13, this.width, this.height);
      context.fill();*/
      context.drawImage(this.image,this.x - 52,this.y-25);
    }//When updating the rectangles position, move it right one pixel
    update(input, enemies){
      //collision detection
      enemies.forEach(enemy => {
  
        if (this.x < enemy.x + enemy.width &&
           this.x + this.width > enemy.x &&
           this.y < enemy.y + enemy.height &&
           this.y + this.height > enemy.y) {
          gameOver = true;
        }
      })
      //horizontal movement
      if (input.keys.indexOf("ArrowRight")  > -1 && input.keys.length < 2) {
        this.speed = 8;
      }  else if(input.keys.indexOf("ArrowLeft") > -1 && input.keys.length < 2) {
        this.speed = -8;
      } else if (input.keys.indexOf("ArrowUp") > -1 && input.keys.length < 2) {
        this.speedY = -8;
      } else if (input.keys.indexOf("ArrowDown") > -1 && input.keys.length < 2) {
        this.speedY = 8;
      }  
      else {
        this.speed = 0, this.speedY = 0;
      }
       this.x += this.speed; 
      if (this.x < 0) this.x = 0;
      else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
      else if (this.y < 0) this.y = 0;
      else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;
      // Vertical Movement
      this.y += this.speedY;
    }
  }

  class Background {
    constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.image= document.getElementById('backgroundImage')
      this.x = 0;
      this.y = 0;
      this.width = 6400;
      this.height = 800;
      this.speed = 10;
    }
    draw(context){
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    update(){
      this.x -= this.speed;
      if (this.x < 0 - this.width) this.x = 0;
    }
  }
  
  class Enemy1 {
    constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 90;
      this.height = 60;
      this.image = document.getElementById("enemyImage1")
      this.x = this.gameWidth;
      this.y = this.gameHeight - ((Math.random() * (this.gameHeight - this.height)) + this.height);
      this.speed = 8;
      this.markedForDeletion = false;
    }
    draw(context){
     /* context.strokeStyle = 'white';
      context.strokeRect(this.x, this.y, this.width, this.height);*/
      context.drawImage(this.image, this.x - 20, this.y - 25, this.width + 60, this.height + 50);
    }
    update(){
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
      score++;
      }
    }
  }
  
  class Enemy2 {
    constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 90;
      this.height = 60;
      this.image = document.getElementById("enemyImage2")
      this.x = this.gameWidth;
      this.y = this.gameHeight - ((Math.random() * (this.gameHeight - this.height)) + this.height);
      this.speed = 10 + (score / 10);
      this.markedForDeletion = false;
    }
    draw(context){
     /* context.strokeStyle = 'white';
      context.strokeRect(this.x, this.y, this.width, this.height);*/
      context.drawImage(this.image, this.x - 20, this.y - 25, this.width + 60, this.height + 50);
    }
    update(){
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
      score++;
      }
    }
  }
  
  class Enemy3 {
    constructor(gameWidth, gameHeight){
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 200;
      this.height = 150;
      this.image = document.getElementById("enemyImage3")
      this.x = this.gameWidth;
      this.y = this.gameHeight - ((Math.random() * (this.height)) + this.height);
      this.speed =  6;
      this.markedForDeletion = false;
    }
    draw(context){
     /* context.strokeStyle = 'white';
      context.strokeRect(this.x, this.y, this.width, this.height);*/
      context.drawImage(this.image, this.x - 20, this.y - 25, this.width + 60, this.height + 50);
    }
    update(){
      this.x -= this.speed;
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
      score++;
      }
    }
  }
  
  function handleEnemies(deltaTime){
    if (enemyTimer > enemyInterval){
      enemies.push(new Enemy1(canvas.width, canvas.height));
      enemies.push(new Enemy2(canvas.width, canvas.height));
      enemies.push(new Enemy3(canvas.width, canvas.height/6));
      //enemies.push(new )
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach(enemy => {
      enemy.draw(ctx);
      enemy.update();
    });
    enemies = enemies.filter(enemy => !enemy.markedForDeletion)
  }

  function displayStatusText(context){
    let newScore = score
    this.image = document.getElementById("gameOverImage")
    context.fillStyle = 'yellow';
    context.font = '30px Helvetica';
    context.fillText('Score: ' + score, 20, 50);
    if (gameOver){
      if (newScore >= score) {
        highScore = newScore
      } else {
        highScore = score
      }
      context.drawImage(this.image, 0, 0, 1280, 720)
      context.textAlign = 'center';
      context.fillStyle = 'yellow';
      context.font = '45px Helvetica'
      context.fillText('GAME OVER! \r\n Your highscore is ' + highScore + '\r\nClick enter to try again.', canvas.width/2, canvas.height/2)
    }
  }

  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 1000;

function animate(timeStamp){
  //Time stamp is generated from requestAnimationFrame(animate);
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  //Only shows the most recent frame
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //Draws the new position of the player infinitely
  background.draw(ctx);
  background.update()
  //background.update()
  player.draw(ctx);
  player.update(input, enemies);
  handleEnemies(deltaTime);
  //Score display
  displayStatusText(ctx);
  if (!gameOver)requestAnimationFrame(animate);
}
  //Calls the function to draw all the sprites
  animate(0);
});