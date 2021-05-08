//Create variables here 
var  dog, happyDog;

var database;
var foodS, foodStock;
var feed,addFood;
var foodObj;
var lastfeed;
var fedTime;
function preload()
{
  dogImg = loadImage("dogImg.png");
  dogImg1 = loadImage("dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(900,500);
  
  dog = createSprite(800,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed The Dog");
  feed.position(750,100);
   feed.mousePressed(feeddog);

   
  addFood=createButton("Add Food");
  addFood.position(900,100); 
  addFood.mousePressed(addFoods);

  foodObj=new Food();
    
}


function draw() {  
  background(46, 139, 87);
  
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastfeed=data.val();
  });
  //add styles here
  strokeWeight()
  stroke("red");
  
  text("Food Remaining:" + foodS, 250,480);


  fill (255,255,254);
  textSize(15);
  if(lastfeed>=12){
    text("lastfeed:"+lastfeed%12+"PM",350,30);

  }else if(lastfeed==0){
    text("lastfeed:12AM",350,30);
  }else{
    text("lastfeed:"+lastfeed+"AM",350,30);
  }
  drawSprites();
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS

  })


}
function feeddog(){
  dog.addImage(dogImg1);
  if(foodObj.getFoodStock()<=0)
  {
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  
  database.ref('/').update({
  Food: foodObj.getFoodStock(),
  FeedTime: hour()
})
 
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock (x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food: x 
  })
}

