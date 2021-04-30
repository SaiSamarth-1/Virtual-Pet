var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedFood;
var foodObj;
var feedTime, lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedFood=createButton("Feed the dog");
  feedFood.position(700,95);
  feedFood.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  feedTime = database.ref('FeedTime');
  feedTime.on('value', function (data) {
    lastFed = data.val()
  })

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here
  // fill(0);
  // textSize(15);
  if(lastFed>=12){
    fill(0);
    textSize(15);
    text("Last fed: " + lastFed + " PM", 350, 30);
  }
  else if(lastFed == 0){
    fill(0);
    textSize(15);
    text("Last fed: 12 AM", 350, 30);
  }
  else{
    fill(0);
    textSize(15);
    text("Last fed: " + lastFed + " AM", 350, 30);
  }

  console.log(lastFed);
  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStock = foodObj.getFoodStock();
  if(foodStock <= 0){
  foodObj.updateFoodStock(0);
  }
  else {
    foodObj.updateFoodStock(foodStock - 1)
  }
  database.ref('/').update({
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

