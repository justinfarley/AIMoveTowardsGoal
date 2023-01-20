function nextGeneration(){
    calculateFitness();
    for(let i = 0; i < TOTAL; i++){
        goal = createGoal();
        currentPopulation[i] = pickOne();

    }
    savedPeople = [];
}
function pickOne(){

    let person = random(savedPeople);
    let child = new Person(pickAge(), pickName(), true, pickHairColor(), person.brain);
    child.mutate();
    return child;
}

function calculateFitness(){
    let sum = 0;
    for(let person of currentPopulation){
        sum+= person.score;
    }
    for(let person of currentPopulation){
        person.fitness = person.score / sum;
    }
}
