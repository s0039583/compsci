let player,zombies,bullets, blood, ammoBox // variables for objects

let health, ammo, score // variables for display

let playing // boolean for playing or not 

let zombieImg, playerImg, bgImg,bulletImg, zombieFont //graphical parts

function setup() {
	new Canvas(800, 800);
	displayMode('centered');
	playing = true

	health = 100
	ammo = 100
	score = 0

	player = new Sprite()
	player.color = 'blue'
	player.collider = 'n'
	player.w = 313
	player.h = 206
	player.spriteSheet = playerImg
	player.addAnis({
		move: { row: 0, frames: 18 },
	});
	player.scale = 0.5
	player.w = 100
	player.h = 100

	zombies = new Group()
	zombies.color = 'red'
	zombies.w = 288
	zombies.h = 318
	zombies.spriteSheet = zombieImg
	zombies.addAnis({
		move: { row: 0, frames: 14 },
		attack: { row: 1, frames: 8 },
	});
	zombies.scale = 0.5
	zombies.w = 100
	zombies.h = 100

	bullets  = new Group()
	bullets.w = 6
	bullets.h = 10
	bullets.img = bulletImg

	blood = new Group()
	blood.radius = 2
	blood.color = 'red'
	blood.opacity = 0.5
	blood.life = 30
	blood.collider = 'n'

	ammoBox = new Group()
	player.overlaps(bullets)
	player.overlaps(blood)

	player.overlapping(zombies, loseHealth)

	setInterval(spawnZombie,2000)
}
function preload(){
	zombieImg = loadImage('zombieIm.png')
	playerImg = loadImage('playerImg.png')
	bgImg = loadImage('bgImg.png')
	bulletImg = loadImage('hand_gun_bullet.png')
	zombieFont = loadFont('zombie.ttf')
}

function update(){

	if(playing){
		move()
		moveZombie()
		shoot()
		for(b of bullets){
			for(z of zombies){
				if(b.collides(z)){
					b.remove()
					z.remove()
					score+=1
				}
			}
		}
		if(health <= 0){
			let name = prompt("Whats your name")
			playing=false
			
			//do highscores here
		}
	}
	else{
		// show highscores
	}
}
function draw() {
	if(playing){
		HUD()
	}

}

function spawnZombie(){
	if(playing){
		new zombies.Sprite(random(width),random(height))
	}
}
function move(){

	if(kb.pressing('a')){
	 	player.vel.x = -2
	 }
	 else if(kb.pressing('d')){
		player.vel.x = 2
	}
	else{
		player.vel.x = 0
	}
	 if(kb.pressing('w')){
		player.vel.y = -2
	}
	else if(kb.pressing('s')){
		player.vel.y = 2
	}
	else{
		player.vel.y = 0
	}
	player.rotateMinTo(mouse,10)
}
function moveZombie(){
	if(playing){
		for(z of zombies){
			z.rotation = z.angleTo(player)
			z.direction = z.rotation
			z.speed = 1
			z.changeAni('move')
		}
	}
}
function shoot(){
	if(playing){
		if(mouse.released()){
			let b = new bullets.Sprite(player.x,player.y)
			b.direction = b.angleTo(mouse)
			b.rotation = b.direction
			b.speed = 3
		}
	}
}

function HUD(){

	background(bgImg)
	textSize(30)
	textFont(zombieFont)
	text("HP: "+ floor(health),100,100)
	text("Score: "+ score,300,100)
	text("Ammo:" + ammo,500,100)

}

function loseHealth(p,z){
	health -=1
	let b = new blood.Sprite(p.x,p.y)
	b.vel.x = random(-1,1)
	b.vel.y = random(-1,1)

}

