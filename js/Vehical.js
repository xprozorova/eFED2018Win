function Vehical() {
    this.speed = 0;
}
Vehical.prototype.move = function(speed) {
    this.speed++;
    console.log(this.speed);
};
Vehical.prototype.stop = function() {
    this.speed = 0;
    console.log("Транспортное средство остановилось");
};
function Bike() {
    Vehical.apply(this, arguments);
    this.wheelsCount = 2;
}

Bike.prototype = Object.create(Vehical.prototype);
Bike.prototype.constructor = Bike;

Bike.prototype.move = function(speed) {
    this.speed++;
    console.log("Вррруммм! ускорение" + this.speed + "км/ч");
};
function Car() {
    Vehical.apply(this, arguments);
    this.wheelsCount = 4;
    this.doorsCount = 4;
    this.openDoor = 0;
    this.closeDoor = 0;
}
Car.prototype.openDoor = function(openDoor) {
    if (openDoor < 4)
        this.openDoor += openDoor;
        console.log("Количество открытых дверей:" + this.openDoor)
};
Car.prototype.closeDoor = function(closeDoor) {
    if(closeDoor > 0)
        this.closeDoor -= closeDoor;
        console.log("Количество закрытых дверей" + this.closeDoor)
};
function MonsterTruck() {
    Vehical.apply(this, arguments);
    Car.apply(this, arguments);
    this.wheelsSize = 1;
}
MonsterTruck.prototype = Object.create(Car.prototype);
MonsterTruck.prototype.constructor = MonsterTruck;
MonsterTruck.prototype.openDoor = function() {
    setTimeout(Car.prototype.openDoor(this, arguments), 1000);
};
