/*

THE GOAL: First Custom AI that will learn how to move towards a randomized goal location

*/
let creatingLines = false;

let names = ["Justin", "Karan", "Aidan", "Ant", "Dom", "Jacob", "Logan", "Tanav", "Kwak", "Gartner", "David", "Dhruv"]
let hairColors = ["Brown", "Blonde", "Red", "Black"]
let colors = [getTuple(0,0,0), getTuple(139,69,19), getTuple(255, 50, 71), getTuple(255, 255, 147), getTuple(205,0,255), getTuple(0,255,255), getTuple(171,255,0), getTuple(83,195,180)]

let goal;

let bg;

let currentPopulation = [];
let startingPopulation = 50;

function getTuple(val1, val2, val3){
    return [val1, val2, val3];
}

function pickName(){
    let rand = Math.floor(random(0,names.length));
    return names[rand];
}
function pickHairColor(){
    let rand = Math.floor(random(0, hairColors.length));
    return hairColors[rand];
}
function pickAge(){
    return Math.floor(random(10, 35));
}
// function pickHairColor(color){
//     switch(color){
//         case 'Brown':
//             return colors[1];
//         case 'Blonde':
//             return colors[3];
//         case 'Red':
//             return colors[2]
//         case 'Black':
//             return colors[0]
//     }
// }
function pickColor(){
    let rand = Math.floor(random(0, colors.length));

    return colors[rand];
}
// function pickColor(color){

//     switch(color){
//         case 'Brown':
//             return colors[1];
//         case 'Blonde':
//             return colors[3];
//         case 'Red':
//             return colors[2]
//         case 'Black':
//             return colors[0]
//     }
// }

function setup() {
  createCanvas(1500,950);
  frameRate(60);
  push();
  goal = createGoal();
  populate();
  pop();
  bg = loadImage('/assets/bg.jpg');
  
}
function randomMovement(p){
    p.pos.x += random(-1,1);
    p.pos.y += random(-1,1);
    fill(p.color);
    ellipse(p.pos.x, p.pos.y, 100, 100);
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text(p.name + ", " + p.age, p.pos.x, p.pos.y - 60);
}


function draw() {
    Update();

}

function Update(){
    background(bg);
    for(let i = 0; i < currentPopulation.length; i++){
        randomMovement(currentPopulation[i]);
    }
    goalUpdate();
}

function populate(){
    for(let i = 0; i < startingPopulation; i++){
        currentPopulation.push(createPerson());
    }
}

function goalUpdate(){
    fill(0,255,0);
    square(goal.pos.x, goal.pos.y, 100);
    fill(0);
    textSize(32);
    textAlign(CENTER);
    text('GOAL', goal.pos.x + 50, goal.pos.y + 60);
}

function createGoal(){
    let goal = new Goal();
    let posx = random(100,1400);
    let posy = random(100,850);
    goal.pos = createVector(posx, posy);
    return goal;
}

function createPerson(){
    let newPerson = new Person(pickAge(), pickName(), true, pickHairColor());
    console.log(newPerson.age + " " + newPerson.name + " " + newPerson.canDrive + " " + newPerson.hairColor);
    if(newPerson.age < 16){
        newPerson.canDrive = false;
    }
    let color = pickColor();
    console.log(colors[1]);
    newPerson.color = color;
    let posx = random(100,1400);
    let posy = random(100,900);
    while((goal.pos.x - posx <= 200 && goal.pos.x - posx >= -200) && (goal.pos.y - posy <= 200 && goal.pos.y - posy >= -200)){
        console.log("HEHEH" + goal.pos.x + " " + posx);
        if((goal.pos.x - posx <= 200 && goal.pos.x - posx >= -200)){
            posx = random(100,1400);
        }
        else if((goal.pos.y - posy <= 200 && goal.pos.y - posy >= -200)){
            posy = random(100,900);
        }
    }

    newPerson.pos = createVector(posx, posy);
    console.log(newPerson.age + " " + newPerson.name + " " + newPerson.canDrive + " " + newPerson.hairColor + " " + newPerson.pos);
    fill(0);
    text(newPerson.name + ", " + newPerson.age, newPerson.pos.x, newPerson.pos.y - 60);
    return newPerson;
}