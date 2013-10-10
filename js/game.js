// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 500;
document.body.appendChild(canvas);

// Background image - sky
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bluesky.png";

// Sprite image
var spriteReady = false;
var spriteImage = new Image();
spriteImage.onload = function () {
spriteReady = true;
};
spriteImage.src = "images/sprite.png";

// platform image
var platformReady = false;
var platformImage = new Image();
platformImage.onload = function () {
platformReady = true;
};
platformImage.src = "images/platform.png";

// Game objects
var sprite = {
	speed: 250
};
var platformsLanded = 0;
var platform = {};
 
// Controls and events
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the position of platform to bottom and sprite to center
var reset = function () {

	platform.x = 100;
	platform.y = 450;
	sprite.x = canvas.width / 2;
	sprite.y = canvas.height / 2;
};

var movePlatform = function () {

	//Move platform upwards
	platform.x =  (Math.random() * (canvas.width-100));
	platform.y = platform.y - (Math.random() * (canvas.height - 400));
};

var update = function (modifier) {
	if (38 in keysDown) { //up arrow
		sprite.y -= sprite.speed * modifier;
	}
	if (40 in keysDown) { // Down array
		sprite.y += sprite.speed * modifier;
	}
	if (37 in keysDown) { // Left
		sprite.x -= sprite.speed * modifier;
	}
	if (39 in keysDown) { // Right
		sprite.x += sprite.speed * modifier;
	}
    if (32 in keysDown) { // spacebar
	    sprite.y -= sprite.speed * modifier*4;
	}
	// If sprite lands on platform
	if ( sprite.x >= platform.x-20 && sprite.x<=(platform.x+165)
		 && sprite.y<=(platform.y - 20) && sprite.y >= (platform.y-40)
	){
		++platformsLanded; // increase score
		
		// Imitate a scroll, reset the positions when sprite reaches top of canvas & also landed on platform
		if (sprite.y>=0 && sprite.y <=100){
		    reset();
		 }
		 else{
			movePlatform();
		 }
	}
};

// Render on canvas
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}
	if (spriteReady) {
		ctx.drawImage(spriteImage, sprite.x, sprite.y);
	}
	if (platformReady) {
		ctx.drawImage(platformImage, platform.x, platform.y);
	}

	// Score = platforms landed
	ctx.fillStyle = "black";
	ctx.font = "20px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "bottom";
	ctx.fillText("Platforms cleared " + platformsLanded, 10, 490);
};

var drawClouds = function(){
   var radius = Math.floor(Math.random() * 30);
    for (i = 0; i <= 10; i++) {
    ctx.fillStyle = "black";
   ctx.strokeStyle = "rgb(" + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + "," + Math.floor(Math.random() * 255) + ")";
   ctx.lineWidth = "2";
   var x = 50 + Math.floor(Math.random() * 200);
   var y = 50 + Math.floor(Math.random() * 300);
     ctx.beginPath();
   ctx.arc(x,y,radius, x, Math.PI * 3);
   ctx.stroke();
   ctx.fill();
   }
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;
	update(delta / 1000);
	
	render();
	then = now;
};

reset();
drawClouds();
var then = Date.now();
setInterval(main, 1);   