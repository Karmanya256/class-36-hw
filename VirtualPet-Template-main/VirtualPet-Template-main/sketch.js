var dog,sadDog,happyDog,happyDogImg,sadDogImg,database,food,foodStock;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background("green");
  if (food == undefined){
    textsize(20);
    fill("red")
    text("Note: press UP ARROW to feed Kai milk",50,50);
    text("Food Remanining: "+food,150,150);
  }
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDogImg)

    if(keyWentUp(UP+ARROW)){
      dog.addImage(happyDogImg);
    }
    if(food === 0){
      food = 20;
    }
  }
  drawSprites();
  }
function writeStock(x){
  if(x<0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    food:x
  });
}
function readStocks(data){
  food = data.val();
}

