function Asteroid(pos,r){
     if(!pos) {
          this.pos = createVector(random(width),random(height));
     }
     else {
          this.pos = pos.copy();
     }

     if(r){
          this.r = r * 0.5;
     }
     else {
          this.r = random(20,50);
     }
     this.vel = p5.Vector.random2D();
     this.total = floor(random(5,10));
     this.offset = [];

     for(var i=0;i<this.total;i++){
          this.offset[i] = random(-this.r*0.5,this.r*0.5);
     }

     this.update = function(){
          this.pos.add(this.vel);
     }

     this.breakup = function(){
          var newA = [];
          newA[0] = new Asteroid(this.pos,this.r);
          newA[1] = new Asteroid(this.pos,this.r);
          return newA;
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

     this.render = function(){
          push();
          stroke(255);
          fill(145, 168, 149);
          translate(this.pos.x,this.pos.y);
          //ellipse(0,0,this.r * 2);

          beginShape();
          //creating random polygons
          for(var i=0;i<this.total;i++){
               var angle = map(i,0,this.total,0,TWO_PI);
               //making the asteroids more rugged, by offsetting the x-coordinate
               var r = this.r + this.offset[i];
               var x = r * cos(angle);
               var y = r * sin(angle);
               vertex(x,y);
          }
          endShape(CLOSE);
          pop();
     }
}
