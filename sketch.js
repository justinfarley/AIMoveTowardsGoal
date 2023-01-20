/*

THE GOAL: First Custom AI that will learn how to move towards a randomized goal location

*/

const SCREENX = 1500;
const SCREENY = 950;

let creatingLines = false;

let names = ["Justin", "Karan", "Aidan", "Ant", "Dom", "Jacob", "Logan", "Tanav", "Kwak", "Gartner", "David", "Dhruv"]
let hairColors = ["Brown", "Blonde", "Red", "Black"]
let colors = [getTuple(0,0,0), getTuple(139,69,19), getTuple(255, 50, 71), getTuple(255, 255, 147), getTuple(205,0,255), getTuple(0,255,255), getTuple(171,255,0), getTuple(83,195,180), getTuple(208,98,108),
    getTuple(185,195,208), getTuple(25,2,98)]


let goal;
let qTable;
let bg;

let savedPeople = [];
let currentPopulation = [];
let TOTAL = 50;

let state;

let actions;



function getAllPositionsOfPeople(){
    let posses = [];
    for(let i = 0; i < currentPopulation.length; i++){
        posses.push((currentPopulation[i].pos.x, currentPopulation[i].pos.y));
    }
    return posses;
}

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
  createCanvas(SCREENX,SCREENY);
  frameRate(60);
  push();
  goal = createGoal();
  goalUpdate();
  populate();
  pop();
  bg = loadImage('/assets/bg.jpg');
}

function draw() {
    background(bg)
    goalUpdate();
    for(let i = 0; i < currentPopulation.length; i++){
        currentPopulation[i].Update();
    }
}


function offscreen(p){
    if (p.pos.x > SCREENX + 100 || p.pos.x < -SCREENX - 100 || p.pos.y > SCREENY + 100 || p.pos.y < -SCREENY - 100) {
      return true;
    } else {
      return false;
    }
}

function calculateDistanceFromGoal(posx, posy){
    let x1 = goal.pos.x;
    let x2 = posx;
    let y1 = goal.pos.y;
    let y2 = posy;

    let xForm = Math.pow((x2 - x1), 2);
    let yForm = Math.pow((y2 - y1), 2);

    let distance = Math.sqrt(xForm + yForm)

    return distance;
}

function populate(){
    for(let i = 0; i < TOTAL; i++){
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
    return newPerson;
}
function awayFromGoal(){
    let posx = random(100,1400);
    let posy = random(100,900);
    while((goal.pos.x + 50 - posx <= 200 && goal.pos.x + 50 - posx >= -200) && (goal.pos.y + 60 - posy <= 200 && goal.pos.y + 60 - posy >= -200)){
        console.log("HEHEH" + goal.pos.x + 50 + " " + posx);
        if((goal.pos.x - posx <= 200 && goal.pos.x + 50 - posx >= -200)){
            posx = random(100,1400);
        }
        else if((goal.pos.y + 60 - posy <= 200 && goal.pos.y + 60 - posy >= -200)){
            posy = random(100,900);
        }
    }
    return createVector(posx, posy);
}