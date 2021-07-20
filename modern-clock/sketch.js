function setup() {
     createCanvas(windowWidth, windowHeight);
     background(255, 0, 200);
     angleMode(DEGREES);
}

function windowResized() {
     resizeCanvas(windowWidth, windowHeight);
}

function draw(){
     background(0);
     translate(650,300);
     rotate(-90);

     //getting the current time
     let hr = hour();
     let mn = minute();
     let sc = second();
     
     //stroking seconds arc
     strokeWeight(15);
     stroke(255,100,150);
     noFill();
     let secondHand = map(sc,0,59,0,360);
     arc(0,0,400,400,0,secondHand);

     //stroking seconds hand
     push();
     rotate(secondHand);
     strokeWeight(5);
     stroke(255,100,150);
     line(0,0,125,0);
     pop();

     //stroking minutes arc
     stroke(150,100,255);
     let minuteHand = map(mn,0,59,0,360);
     arc(0,0,360,360,0,minuteHand);

     //stroking miuntes hand
     push();
     rotate(minuteHand);
     strokeWeight(10);
     stroke(150,100,255);
     line(0,0,130,0);
     pop();

     //stroking hours arc
     stroke(150,255,100);
     let hourHand = map(hr%12,0,12,0,360);
     arc(0,0,320,320,0,hourHand);

     //stroking hours hand
     push();
     rotate(hourHand);
     stroke(150,255,100);
     line(0,0,100,0);
     pop();
}
