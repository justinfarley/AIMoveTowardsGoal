class Person{
    constructor(age, name, canDrive, hairColor, growthChance){
        this.age = age;
        this.name = name;
        this.canDrive = canDrive;
        this.hairColor = hairColor;
        this.growthChance = growthChance;
        this.currentPos = createVector(5,100);
        this.skillLevel = random(-5,5);
        this.color;
        this.pos = null;
        this.body = null;
    }
    clone(){
        return new Person(this.age, this.name, this.canDrive, this.hairColor, this.growthChance);
    }


}
class Brain{
    
}