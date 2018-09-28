var particleSystem = [];

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    //fullwindow canvas
    frameRate(30);
    colorMode(HSB, 360, 100, 100, 100);

}


function draw(){
    background(0);
    blendMode(SCREEN);
    
    for(var i=particleSystem.length-1; i>=0; i--){
        var p = particleSystem[i];
        if(p.areYouDeadYet()){
            particleSystem.splice(i, 1);
        }else{
            p.update();
            p.draw();
            
        }  
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

}


var Particle = function(position, velocity, hue){
    this.position = position.copy();
    this.velocity = velocity.copy();
    this.size = 10;
    this.lifeSpan = random(20, 100);
    this.hue = random(hue-15, hue+15);
    
    this.update = function(){
        this.lifeSpan--;
        this.position.add(velocity);
        
    }  
    
    this.draw = function(){
        noStroke();
        fill(this.hue, 100, 100);
        ellipse(this.position.x, 
                this.position.y,
                this.size,
                this.size);
        
        //Test comment
        
    }
    this.areYouDeadYet = function(){
        return this.lifeSpan <= 0;
    }
}

function createMightyParticles(){
    var hue = random(20, 300);//Random B values R and G are fixed
    for(var i=0; i<200; i++){
        var pos = createVector(mouseX, mouseY);//calls fuction create vector
        var vel = createVector(0,1);//calls create vector function
        vel.rotate(random(0, TWO_PI));
        vel.mult(random(1, 10));
        
        var newBorn = new Particle(pos, vel, hue);
        particleSystem.push(newBorn);
        
    }
    
}

function mouseClicked(){
    createMightyParticles();
}