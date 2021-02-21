function loseGame() {
  alert("Thy has failed");
  gameState="over";
}
function winGame() {
  alert("Thy has Won");
  endLevel();
}
function endLevel() {frameCount=0; gameState="menu"; level++;}
function newLevel(){enemies=[]; projectiles=[]; frameCount=0; createEnemies(); hero.x=150;hero.y=75; gameState="play";
  switch (level) {
    case 1: levelone();break;
    case 2: leveltwo();break;
    case 3: levelthree();break;
    case 4: levelfour();break;
    case 5: levelfive();break;
    default: levelsixplus(); break;
    }
  createEnemies(); spawnSpeed*=1.2;
}
function increaseIntensity(arg) {
  for(i=0;i<arg;i++){randomArray(enemySpawners)[0].strength+=0.1;}
}
function levelone(){
}
function leveltwo() {
  hero.health+=Math.floor((hero.maxHealth-hero.health)/2); increaseIntensity(1); waveSpeed-=25; gameLength+=100; enemySpawners.forEach((spawner,i)=>{spawner.maxPower=15;})
}
function levelthree() {
  hero.health+=Math.floor((hero.maxHealth-hero.health)/2); increaseIntensity(2); waveSpeed-=25; gameLength+=200; enemySpawners.forEach((spawner,i)=>{spawner.maxPower=16;})
}
function levelfour() {
  hero.health+=Math.floor((hero.maxHealth-hero.health)/2); increaseIntensity(2); waveSpeed-=50; gameLength+=250; enemySpawners.forEach((spawner,i)=>{spawner.maxPower=18;})
}
function levelfive() {
  hero.health+=Math.floor((hero.maxHealth-hero.health)/2); increaseIntensity(3); gameLength+=500; enemySpawners.forEach((spawner,i)=>{spawner.maxPower=19;})
}
function levelsixplus() {hero.health+=Math.floor((hero.maxHealth-hero.health)/2); increaseIntensity(1); gameLength+=100; enemySpawners.forEach((spawner,i)=>{spawner.maxPower=level+15;})}

function createEnemies() {
  enemySpawners.forEach((spawner, i) => {
    spawner.maxPower+=1; spawner.power=spawner.maxPower; spawner.setenemies(); spawner.timer=0;
  });}
function randomArray(arr) {
  var selectedarr = Math.floor(Math.random()*arr.length);
  return [arr[selectedarr], selectedarr];
}
function cirColliding(x1,y1,r1,x2,y2,r2){
  var distanceX=x1-x2; var distanceY=y1-y2;
  var distance = Math.hypot(distanceX, distanceY);
  return distance <= r1+r2;

}
function getAngle(x1,y1,x2,y2) {
    var angle = Math.atan2(y1-y2,x1-x2);
    var xangle = Math.cos(angle);
    var yangle = Math.sin(angle);
    return {x:xangle, y:yangle}
}
function physics() {
  physicsObjects = [];physicsObjects = physicsObjects.concat(enemies);physicsObjects = physicsObjects.concat(enemySpawners);physicsObjects.push(hero);
  physicsObjects.forEach((item, index) => {
    physicsObjects.forEach((obj, num)=>{if (index != num){
      if(item.weight!=0||obj.weight!=0) {
      if(item.type==="enemy"&&obj.type==="hero"&&cirColliding(item.x,item.y,item.rad,obj.x,obj.y,obj.rad)){item.dealDamage();}
      if(item.type==="hero"&&obj.type==="enemy"&&cirColliding(item.x,item.y,item.rad,obj.x,obj.y,obj.rad)){obj.dealDamage();}
      while(cirColliding(item.x,item.y,item.rad,obj.x,obj.y,obj.rad)){
      var angle = getAngle(item.x,item.y,obj.x,obj.y);
      item.x+=angle.x*Math.abs(item.weight); item.y+=angle.y*Math.abs(item.weight);
      obj.x-=angle.x*Math.abs(obj.weight); obj.y-=angle.y*Math.abs(obj.weight);
    }}}});if (item.x<startx) {item.x=startx;}; if (item.x>endx) {item.x=endx;}; if (item.y<starty) {item.y=starty;}; if (item.y>endy) {item.y=endy;};});

}
// Defining Boundries for easy change and hero speed
let endx=300; let startx=0; let endy=150; let starty=0; let herospeed=0.75; let bulletspeed=1; let bulletsize=1; let enemyStrength=1;
//Declaring Varibles
var level = 1;
var waveSpeed = 2500;
var gameLength = 4000;
var spawnSpeed = 0.11;
let gameState = "play"; //States are play, over, and menu
let didDelete = false;
var xpos=0;
var ypos=0;
var hero;
var enemies = [];
var enemySpawners = [];
var projectiles = [];
var physicsObjects = [];
let frameCount = 0;
const h = window.innerHeight;
const w = window.innerWidth;
const canvas = document.getElementById("canvas");
canvas.style.width = w + "px";
canvas.style.height = h + "px";
const c = canvas.getContext("2d");
const healthdiv = document.getElementById("health");
function getmouse(e) {xpos = (e.clientX/window.innerWidth)*300; ypos = (e.clientY/window.innerHeight)*150;}
