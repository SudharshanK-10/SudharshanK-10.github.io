var ship;
var asteroids = [];
var lasers = [];
var score = 0;
var b1,b2;
const Y_AXIS = 1;
const X_AXIS = 2;
var winner;
var count = 0;

function setup(){
     createCanvas(windowWidth-20,windowHeight-20);
     b1 = color(220);
     b2 = color(0);
     ship = new Ship();

     //score display
     score_disp = createDiv('SCORE = 0');
     score_disp.position(windowWidth-400, 30);
     score_disp.id = 'score';
     score_disp.style('color', 'white');
     score_disp.style('font-size','25px');
     textFont('Press Start 2P');

     for(var i=0;i<10;i++){
          asteroids.push(new Asteroid());
     }
}

function draw(){
     //background
     setGradient(0, 0, width, height, b1, b2, X_AXIS);
     score_disp.html('SCORE = '+ score);
     if(asteroids.length == 0){
          //winner
          winner = createDiv('YOU WON!');
          winner.position(windowWidth/3.9,windowHeight/2.3);
          winner.style('color','white');
          winner.style('font-size','80px');
          noLoop();
          return;
     }
     ship.render();
     ship.turn();
     ship.update();
     ship.edges();

     for(var i=0;i<asteroids.length;i++){
          if(ship.hits(asteroids[i])){
               count++;
               //console.log(count);

               //asteroid hit the ship
               //giving players some chance
               if(count > 100) {
                    setGradient(0, 0, width, height, b1, b2, X_AXIS);
                    score_disp.html('SCORE = '+ score);
                    winner = createDiv('YOU   HAVE BEEN HIT!');
                    winner.position(windowWidth/4.5,windowHeight/2.5);
                    winner.style('color','white');
                    winner.style('font-size','80px');
                    noLoop();
                    return;
               }
          }
          asteroids[i].render();
          asteroids[i].update();
          asteroids[i].edges();
     }

     for(var i=lasers.length-1;i>=0;i--){
          lasers[i].render();
          lasers[i].update();
          if(lasers[i].offscreen()){
               lasers.splice(i,1);
          }
          else {
          //collision detection
          for(var j=asteroids.length-1;j>=0;j--){
               if(lasers[i].hits(asteroids[j])){
                    if(asteroids[j].r > 10){
                         //if laser hits asteroid, add smaller asteroids in the same spot
                         var newAsteroids = asteroids[j].breakup();
                         //console.log(newAsteroids);
                         asteroids = asteroids.concat(newAsteroids);
                    }
                    //increase score
                    score += 100;
                    score_disp.html('SCORE = '+ score);

                    asteroids.splice(j,1);
                    lasers.splice(i,1);
                    break;
                    }
               }
          }
     }
}

//linear gradient function
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

//left and right key to change it's direction
function keyPressed(){
     if(key == ' '){
          lasers.push(new Laser(ship.pos,ship.heading));
     }
     if(keyCode == RIGHT_ARROW){
          ship.setRotation(0.1);
     }
     else if(keyCode == LEFT_ARROW){
          ship.setRotation(-0.1);
     }
     else if(keyCode == UP_ARROW){
          ship.isBoosting = true;
     }
}

function keyReleased(){
     ship.setRotation(0);
     ship.isBoosting = false;
}

function Ship(){
     this.pos = createVector(width/2,height/2);
     this.r = 20;
     this.heading = 0;
     this.rotation = 0;
     this.vel = createVector(0,0);
     this.isBoosting = false;

     this.hits = function(asteroid){
          var d = dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
          if(d<this.r+asteroid.r){
               return true;
          }
          else {
               return false;
          }
     }

     this.edges = function(){
          if(this.pos.x > width + this.r){
               this.pos.x = -this.r;
          }
          else if(this.pos.x < -this.r){
               this.pos.x = width + this.r;
          }

          if(this.pos.y > height + this.r){
               this.pos.y = -this.r;
          }
          else if(this.pos.y < -this.r){
               this.pos.y = height + this.r;
          }
     }

     this.update = function(){
          if(this.isBoosting){
               this.boost();
          }
          this.pos.add(this.vel);
          this.vel.mult(0.99); // a little friction
     }

     this.boost = function(){
          var force = p5.Vector.fromAngle(this.heading);
          force.mult(0.1);
          this.vel.add(force);
     }

     this.render = function(){
          push();
          translate(this.pos.x,this.pos.y);
          rotate(this.heading + PI/2);
          fill(255);
          stroke(255);
          triangle(-this.r,this.r,this.r,this.r,0,-this.r);
          pop();
     }

     this.setRotation = function(a){
          this.rotation = a;
     }

     this.turn = function(){
          this.heading += this.rotation;
     }
}
