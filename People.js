function mutate(x) {
    if (random(1) < 0.1) {
      let offset = randomGaussian() * 0.5;
      let newx = x + offset;
      return newx;
    } else {
      return x;
    }
  }
class Person{
    constructor(age, name, canDrive, hairColor, brain){
        this.age = age;
        this.name = name;
        this.canDrive = canDrive;
        this.hairColor = hairColor;
        this.skillLevel = random(-5,5);
        this.color = pickColor();
        this.pos = awayFromGoal();
        this.distanceToGoal = null;
        this.score = 0;
        this.fitness = 0;
        this.isMoving = false;
        if(brain){
            this.brain = brain.copy();
        }
        else{
        this.brain = new NeuralNetwork(4,4,4);
        }

    }

    think(goal){


        let inputs1 = [];
        let inputs2 = [];
        let inputs3 = [];
        let inputs4 = [];


        //inputs
        inputs1[0] = calculateDistanceFromGoal(this.pos.x, this.pos.y) / 1000;
        inputs1[1] = this.pos.y / 1000;
        inputs1[2] = goal.pos.x / 1000;
        inputs1[3] = goal.pos.y / 1000;

        inputs2[0] = this.pos.x / 1000;
        inputs2[1] = calculateDistanceFromGoal(this.pos.x, this.pos.y) / 1000;
        inputs2[2] = goal.pos.x / 1000;
        inputs2[3] = goal.pos.y / 1000;
        
        inputs3[0] = this.pos.x / 1000;
        inputs3[1] = calculateDistanceFromGoal(this.pos.x, this.pos.y) / 1000;
        inputs3[2] = goal.pos.x / 1000;
        inputs3[3] = goal.pos.y / 1000;

        inputs4[0] = calculateDistanceFromGoal(this.pos.x, this.pos.y) / 1000;
        inputs4[1] = this.pos.y / 1000;
        inputs4[2] = goal.pos.x / 1000;
        inputs4[3] = goal.pos.y / 1000;



        let output1 = this.brain.predict(inputs1);
        let output2 = this.brain.predict(inputs2);
        let output3 = this.brain.predict(inputs3);
        let output4 = this.brain.predict(inputs4);


        if(output1[0] > 0.5){
            this.moveUp();
            this.isMoving = true;
        }
        if(output2[1] > 0.5){
            this.moveDown();
            this.isMoving = true;
        }
        if(output3[2] > 0.5){
            this.moveRight();
            this.isMoving = true;
        }
        if(output4[3] > 0.5){
            this.moveLeft();
            this.isMoving = true;
        }
        if(output1[0] <= 0.5 && output2[1] <= 0.5 && output3[2] <= 0.5 && output4[3] <= 0.5){
            this.isMoving = false;
        }
        else if(output1[0] > 0.5 && output2[1] > 0.5 && output3[2] > 0.5 && output4[3] > 0.5){
            this.isMoving = false;
        }


    }
    moveUp(){
        this.pos.y -= 1;
    }
    moveDown(){
        this.pos.y += 1;
    }
    moveRight(){
        this.pos.x += 1;
    }
    moveLeft(){
        this.pos.x -= 1;
    }
    Update(){
        this.score++;
        if(!this.isMoving){
            this.score--;
        }
        this.think(goal);
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 100, 100);
        fill(0);
        textSize(32);
        textAlign(CENTER);
        goalUpdate(goal);
        text(this.name + ", " + this.age, this.pos.x, this.pos.y - 60);
        if(calculateDistanceFromGoal(this.pos.x, this.pos.y) >= 750){
            this.isMoving = false;
            savedPeople.push(currentPopulation.splice(currentPopulation.indexOf(this),1)[0]);
        }
        if(calculateDistanceFromGoal(this.pos.x, this.pos.y) <= 50){
            //reward
            this.score += 25;
            this.pos.x = 500;
            this.pos.y = 500;
            
        }

    
        if(currentPopulation.length == 0){
            nextGeneration();
        }
    
    }
}