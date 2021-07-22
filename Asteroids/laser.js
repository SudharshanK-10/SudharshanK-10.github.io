function Laser(ship_pos,ship_angle){
     this.pos = createVector(ship_pos.x,ship_pos.y);
     this.vel = p5.Vector.fromAngle(ship_angle);
     this.vel.mult(6);

     this.update = function(){
          this.pos.add(this.vel);
     }

     this.render = function(){
          push();
          stroke(255);
          strokeWeight(4);
          point(this.pos.x,this.pos.y);
          pop();
     }

     this.hits = function(asteroid){
          //dist(laser and center of asteroid) < radius --> doesn't hits else hits
          var d = dist(this.pos.x,this.pos.y,asteroid.pos.x,asteroid.pos.y);
          if(d < asteroid.r){
               //console.log('hits!');
               return true;
          }
          else {
               return false;
          }
     }

     this.offscreen = function(){
          if(this.pos.x > width || this.pos.x < 0) {
               return true;
          }

          if(this.pos.y > height || this.pos.y < 0){
               return true;
          }
          return false;
     }
}
