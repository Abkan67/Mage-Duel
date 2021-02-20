function Projectile(x, y, dx, dy, rad, dam, spd, kncbck/*knockback*/) {
  this.x=x; this.y=y;this.dx=dx;this.dy=dy;this.rad=rad;this.dam=dam;this.speed=spd;this.knockback=kncbck;
  this.draw = function() {
    c.fillStyle="#00F"; c.beginPath(); c.arc(this.x, this.y, this.rad, 0, 2*Math.PI); c.fill();
  }
  this.remove = function(i) {
     projectiles.splice(i, 1); didDelete = true;
   }
  this.update = function(index) {
    this.x+=(this.dx*this.speed); this.y+=(this.dy*this.speed);
    this.isColliding(index); this.isOffscreen(index); this.draw();
  }
  this.isOffscreen = function(index) {
    if(this.x<startx-20 || this.x>endx+20 || this.y<starty-20 || this.y>endy+20) {this.remove(index);};
  }
  this.isColliding = function(index) {
    var enemyhit = -1;
    var isItColliding = enemies.some((enemy)=>{
      enemyhit++;
      var xdist = this.x-enemy.x;
      var ydist = this.y-enemy.y;
      var dist = Math.hypot(xdist, ydist);
      return dist-enemy.rad-this.rad <= 0;
    });
    if(isItColliding) {this.remove(index); enemies[enemyhit].damage(this.dam);}

  }
}
