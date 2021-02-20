function Hero(x, y, radius, dx, dy) {
  this.timer=0; this.cooldown=80; this.spamRate=1; this.ammo = []; this.weight=0.9; this.health=200; this.maxHealth=200; this.damage=15;
  this.x = x; this.y = y; this.rad = radius; this.dx = dx; this.dy = dy; this.type = "hero";
  this.update = function() {this.move(); this.draw(); this.timer+=this.spamRate; if(this.timer>=this.cooldown){this.fire();this.timer-=this.cooldown;} if(this.health>this.maxHealth){this.health=this.maxHealth;}};
  this.draw = function() {c.fillStyle = "#F0F"; c.beginPath(); c.arc(this.x, this.y, this.rad, 0, 2 * Math.PI); c.fill();};
  this.accelerate = (e) => {
    switch (e.key) {
      case "ArrowLeft": this.dx = -herospeed; break;
      case "a": this.dx = -herospeed; break;
      case "ArrowRight": this.dx = herospeed; break;
      case "d": this.dx = herospeed; break;
      case "ArrowDown": this.dy = herospeed; break;
      case "s": this.dy = herospeed; break;
      case "ArrowUp": this.dy = -herospeed; break;
      case "w": this.dy = -herospeed; break;
    }};
  this.deccelerate = (e) => {
    switch (e.key) {
      case "ArrowLeft": if(this.dx < 0){this.dx = 0};break;
      case "a": if(this.dx < 0){this.dx = 0};break;
      case "ArrowRight": if(this.dx > 0){this.dx = 0};break;
      case "d": if(this.dx > 0){this.dx = 0};break;
      case "ArrowDown": if(this.dy > 0){this.dy = 0};break;
      case "s": if(this.dy > 0){this.dy = 0};break;
      case "ArrowUp": if(this.dy < 0){this.dy = 0};break;
      case "w": if(this.dy < 0){this.dy = 0};break;
    }};
  this.move = function() {
    this.x += this.dx; this.y += this.dy;
  }
  this.fire = function() {
    var angle = getAngle(xpos,ypos,this.x,this.y);
    var shotFired = new Projectile(this.x, this.y, angle.x, angle.y, bulletsize, this.damage, bulletspeed, 0.2);
    projectiles.push(shotFired);
  }
  window.addEventListener("keydown", this.accelerate);
  window.addEventListener("keyup", this.deccelerate);
}
