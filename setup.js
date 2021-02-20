function setup() {
  document.addEventListener("mousemove", getmouse);
  hero = new Hero(150, 75, 3.2, 0, 0);
  enemySpawners.push(new enemySpawner((endx-startx)/4, (endy-starty)/3, 4, spawnSpeed));
  enemySpawners.push(new enemySpawner((endx-startx)*(3/4), (endy-starty)/3, 4, spawnSpeed));
  enemySpawners.push(new enemySpawner((endx-startx)/4, (endy-starty)*(3/4), 4, spawnSpeed));
  enemySpawners.push(new enemySpawner((endx-startx)*(3/4), (endy-starty)*(3/4), 4, spawnSpeed));
  createEnemies();
  animate();
}
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);
  frameCount+=1;
  healthdiv.innerHTML = "Health: "+hero.health+"/"+hero.maxHealth+"<br>Time: "+String(gameLength-frameCount);
  if(gameState==="play") {
  enemySpawners.forEach((spawner, i) => {spawner.update();});
  hero.update();
  for (var i = 0; i < projectiles.length; i++) {projectiles[i].update(i); if(didDelete) {i--;}; didDelete=false;}
  for (i=0; i<enemies.length; i++) {enemies[i].update(i); if(didDelete){i--}; didDelete=false;};
  physics();
  if(frameCount%waveSpeed===0){createEnemies();}
  if(hero.health<=0){loseGame();}
  if(frameCount>=gameLength) {winGame();}
  }
  if(gameState==="menu") {
    if(frameCount>=200){newLevel();}
    c.font = "50px Arial"; c.fillText("Level "+level,65,135);
  }
}

setup();
