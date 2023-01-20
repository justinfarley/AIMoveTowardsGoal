function nextGeneration(){
    console.log("next gen");
    calculateFitness();
    gameTimer = 20;
    goal = createGoal();
    for(let i = 0; i < TOTAL; i++){
        currentPopulation[i] = pickOne();
    }
    savedPeople = [];
}
function pickOne(){
    var index = 0;
    var r = random(1);
    while(r > 0){
        r = r - savedPeople[index].fitness;
        index++;
    }
    index--;
    let person = savedPeople[index];
    let child = new Person(pickAge(), pickName(), true, pickHairColor(), person.brain);
    child.mutate(0.1);
    return child;
}
function calculateFitness(){
    let sum = 0;
    for(let person of savedPeople){
        sum+= person.score;
    }
    for(let person of savedPeople){
        person.fitness = person.score / sum;
    }
}
