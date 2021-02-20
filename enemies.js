function enemySpawner(x, y, rad, rate) {
  this.x=x; this.y=y; /*Power determines how much power of enemies it can spawn*/this.power=0; this.maxPower=13; this.rate=rate; this.upNext=[]; this.timer=0; this.rad=rad; this.weight=0.03; this.type="spawner"; this.strength=1/*Determines how strong its enemies are*/;
  this.update = function() {
    this.draw(); if(this.upNext.length > 0){this.spawnSet();}
  }
  this.draw = function() {
    c.fillStyle="#FFA500"; c.beginPath(); c.arc(this.x, this.y, this.rad, 0, Math.PI*2); c.fill()
  }
  this.setenemies = function() {for (i=0; i+1<this.power;) {var selectedenemy=randomArray(this.enemypowerlevels)[0]; if(selectedenemy[1]<=this.power) {i+=selectedenemy[1]; this.upNext.push(selectedenemy);}}}
  this.spawnSet = function() {
    var willSpawn=randomArray(this.upNext); this.timer += this.rate; if (this.timer >= willSpawn[0][1]*5) {willSpawn[0][0](); this.timer-=willSpawn[0][1]; this.upNext.splice(willSpawn[1],1);}
  }
  this.newZombie = () => {enemies.push(new enemyLibrary.Zombie(this.x,this.y,0,0,1*enemyStrength*this.strength));}
  this.newImp = () => {enemies.push(new enemyLibrary.Imp(this.x,this.y,0,0,1*enemyStrength*this.strength));}
  this.newCharger = () => {enemies.push(new enemyLibrary.Charger(this.x, this.y,0,0,1*enemyStrength*this.strength))}
  this.newTotem = () => {enemies.push(new enemyLibrary.Totem(this.x, this.y,0,0,1*this.strength))}
  this.newHealer = () => {enemies.push(new enemyLibrary.Healer(this.x,this.y,0,0,1*enemyStrength*this.strength))}
  this.enemypowerlevels = [[this.newZombie, 2], [this.newImp,7], [this.newImp,7], [this.newImp,7], [this.newCharger,9], [this.newTotem, 11], [this.newTotem, 11], [this.newHealer, 9], [this.newHealer, 9]];
}
const enemyLibrary = {
  Zombie: function(x,y,dx,dy,strength) {
    this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.speed=(0.5*strength);this.health=strength*10; this.rad=4; this.whenToChangeTrajectoryTimer=120; this.trajectoryTimer=0; this.weight=1.4; this.type="enemy";
    this.update = function(index) {this.move();this.draw(); if(this.health<=0){this.remove(index)}};
    this.draw = function() {c.fillStyle = "#D98847"; c.beginPath(); c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI); c.fill();};
    this.damage = function(dam) {this.health-=dam;};
    this.dealDamage = function() {hero.health-=1;};
    this.move = function() {this.x+=this.dx; this.y+=this.dy; this.trajectoryTimer+=1; if (this.trajectoryTimer>=this.whenToChangeTrajectoryTimer){this.trajectoryTimer=0; this.changeTrajectory();};};
    this.changeTrajectory = function() {
      var offSet = Math.random()*10-5
      var angle = getAngle(hero.x+offSet,hero.y-offSet,this.x,this.y);
      this.dx=(angle.x)*this.speed;
      this.dy=(angle.y)*this.speed;
    };
    this.remove = function(index) {didDelete=true; enemies.splice(index,1); hero.health+=5;}
    this.changeTrajectory();
  },
  Imp: function(x,y,dx,dy,strength) {
    this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.rad=3.6-strength/5; this.health=10+strength*6; this.weight=2.5; this.type="enemy";
    this.update = function(index) {this.move();this.draw(); if(this.health<=0){this.remove(index)}}
    this.move = function(){this.x+=this.dx;this.y+=this.dy; var angle=getAngle(hero.x,hero.y,this.x,this.y); this.dx+=angle.x/150; this.dy+=angle.y/150;}
    this.draw = function(){c.fillStyle="#ef103d"; c.beginPath(); c.arc(this.x,this.y,this.rad,0,2*Math.PI); c.fill();}
    this.damage = function(dam){this.health-=dam;};
    this.dealDamage = function(){hero.health-=3;}
    this.remove = function(index) {didDelete=true; enemies.splice(index,1); hero.cooldown-=1;}
  },
  Charger: function(x,y,dx,dy,strength) {
    this.spd=strength/4;this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.rad=4+strength/2;this.weight=0.2;this.type="enemy";this.health=30+strength*10;this.stateTimer=0;this.isCharging=false;//States are charge, where he charges up as a cooldown; and attack, where he moves forward really fast.
    this.update=function(index) {this.stateTimer+=1;this.move();this.draw(); if(this.health<=0 && !this.isCharging){this.remove(index)} this.didCollide();};
    this.move = function(){if(this.isCharging){this.x+=this.dx;this.y+=this.dy;} if(!this.isCharging && this.stateTimer%300===180){this.changeTrajectory();} if(this.stateTimer%300===0){this.isCharging=false;}};
    this.changeTrajectory = function() {this.isCharging=true; var angle=getAngle(hero.x+Math.random()*6,hero.y,this.x,this.y+Math.random()*2-3); this.dx=angle.x*(4+this.spd);this.dy=angle.y*(4+this.spd);}
    this.draw = function() {c.fillStyle="#EF5011"; c.beginPath(); c.arc(this.x,this.y,this.rad,0,2*Math.PI); c.fill();}
    this.damage = function(dam){this.health-=dam;};
    this.dealDamage = function(){if(this.isCharging){hero.health-=2; hero.x+=(this.dy)*1.5; hero.y+=(this.dx)*1.2;}}
    this.remove = function(index) {didDelete=true; enemies.splice(index,1); bulletsize*=1.05;}
    this.didCollide = function() {if(this.x<=startx||this.x>=endx){this.dx*=-1.1;} if(this.y>=endy||this.y<=starty){this.dy*=-1.1}}
  },
  Totem: function(x,y,dx,dy,strength) {
    this.x=x+Math.random()*50-25;this.y=y+Math.random()*50-25;this.dx=dx;this.dy=dy;this.weight=0.08;this.type="construct";this.health=4*(4+strength); this.rad=5; this.strengthIncrease=0.1+strength/10; enemyStrength+=this.strengthIncrease;
    this.update=function(index) {this.draw(); if(this.health<=0){this.remove(index);}}
    this.draw=function(){c.fillStyle="#0ADD30"; c.beginPath(); c.arc(this.x,this.y,this.rad,0,1.5*Math.PI); c.fill();}
    this.damage = function(dam){this.health-=dam;};
    this.dealDamage = function(){};
    this.remove = function(index){didDelete=true; enemies.splice(index,1); enemyStrength-=this.strengthIncrease; hero.damage+2;};
  },
  Healer: function(x,y,dx,dy,strength){
    this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.weight=1.1;this.type="healer";this.health=20+(strength)*6; this.rad=4; this.phaseTimer=0; this.speed=strength; this.healSize=15+strength; this.targetY=0;this.targetX=0;
    this.update = function(index){
      var phase = this.phaseTimer%100; if(phase === 0){this.changeTrajectory();} if(phase>0&&phase<90){this.move();} if(phase>=95){this.heal();}
      this.draw(); if(this.health<=0){this.remove(index);} this.phaseTimer++;}
    this.move = function(){ var angle=getAngle(this.targetX,this.targetY,this.x,this.y); this.dx=(angle.x)*this.speed; this.dy=(angle.y)*this.speed;this.x+=this.dx;this.y+=this.dy;};
    this.draw = function(){c.fillStyle="#DCB354"; c.beginPath(); c.arc(this.x,this.y,this.rad,0,2*Math.PI); c.fill();};
    this.damage = function(dam) {this.health-=dam;};
    this.dealDamage = function() {};
    this.changeTrajectory = function() {var count=0;this.targetX=0;this.targetY=0;physicsObjects.forEach((item,i)=>{if(item.type=="enemy"){this.targetX+=item.x;this.targetY+=item.y;count++;}});this.targetX/=enemies.length;this.targetY/=enemies.length;};
    this.heal = function() {enemies.forEach((item, i) => {if(cirColliding(item.x,item.y,item.rad,this.x,this.y,this.healSize)&&item.type=="enemy"){item.health+=1;}});
    c.beginPath();c.arc(this.x, this.y, this.healSize, 0, 2 * Math.PI);c.stroke();
    };
    this.remove = function(index) {didDelete=true; enemies.splice(index,1); hero.maxHealth+=10;}
  },
};
