/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const dataCanvas = document.getElementById("canvas1");
const dataCtx = canvas.getContext('2d');
dataCanvas.width = window.innerWidth;
dataCanvas.height = window.innerHeight;

let gameOver = false;

let score = 0;


setInterval(()=>{
    if (!gameOver) {
        score++;
    }
},1000);

function movingSound() {
    const y = new Audio("Moving Sound.mp3");
    y.play();
}

function UI() {
    ctx.save();
    ctx.font = "50px Impact";
    
    ctx.textAlign = 'left';
    ctx.fillStyle = 'black';
    ctx.fillText("Score: " + score, 50, 75);
    ctx.fillStyle = 'yellow';
    ctx.fillText("Score: " + score, 55, 80);
    
    if (gameOver) {
        let one;
        let two;
        if (score < 30) {
            one = "CRUSHED!";
            two = "YOUR SCORE IS " + score;
        }
        else if (score >= 30 && score < 50) {
            one = "YOU PLAYED BETTER!!";
            two = "EXCELLENT PLAYING!";
        }
        else if (score >= 50 && score < 100) {
            one = "WONDERFUL PLAYING!!!";
            two = "GOOD JOB!!";
        }
        else{
            one = "MASTER!!!!";
            two = "YOU PLAYED REALLY GOOD!!!";
        }
        ctx.textAlign = 'center';
        ctx.fillText(one, canvas.width/2, canvas.height/2 - 20);
        ctx.font = "25px Impact";
        ctx.fillText(two, canvas.width/2, canvas.height/2 + 80);
    }
    ctx.restore();

}


class Player{
    constructor(){
        this.spriteDiameter = 802;
        this.diameter = this.spriteDiameter/10;
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speed = 20;
        this.image = new Image();
        this.image.src = `Star Player.png`;
        this.deletion = false;
        this.notMoveable = 
        (this.y < 0) || 
        (this.y > canvas.height - this.diameter) || 
        (this.x < 0 - this.diameter) || 
        (this.x > canvas.width - this.diameter);
    }
    update(event){
        if (event.type === 'keypress') {
            switch (event.key) {
                case "w":
                    if (this.y > 0) {
                        this.y -= this.speed;
                        this.draw();
                    } else{
                        this.y = 0;
                        this.draw();
                    }
                    break;
                case "a":
                    if (this.x > 0) {
                        this.x -= this.speed;
                        this.draw();
                    } else{
                        this.x = 0;
                        this.draw();
                    }
                    break;
                case "s":
                    if (this.y < (canvas.height - this.diameter)) {
                        this.y += this.speed;
                        this.draw();
                    } else {
                        this.y = (canvas.height - this.diameter);
                        this.draw();
                    }
                    break;
                case "d":
                    if (this.x < (canvas.width - this.diameter)) {
                        this.x += this.speed;
                        this.draw();
                    } else{
                        this.x = (canvas.width - this.diameter);
                        this.draw();
                    }
                    break;
            }
        }
        else if (event.type === 'click') {
            if (event.x < window.innerWidth/2 && event.y < window.innerHeight/2) {
                this.x -= this.speed;
                this.y -= this.speed;
            }
            else if (event.x > window.innerWidth/2 && event.y < window.innerHeight/2) {
                this.x += this.speed;
                this.y -= this.speed;
            }
            else if (event.x < window.innerWidth/2 && event.y > window.innerHeight/2) {
                this.x -= this.speed;
                this.y += this.speed;
            }
            else if (event.x > window.innerWidth/2 && event.y > window.innerHeight/2) {
                this.x += this.speed;
                this.y += this.speed;
            }
        }
        else{
            alert("something is wrong in ur version");
        }
    }
    draw(){
        ctx.drawImage(this.image,0, 0, this.spriteDiameter, this.spriteDiameter, this.x, this.y, this.diameter, this.diameter);
    }
    checkCollisions(block1, block2, boolean){
        if (boolean === true) {
            return(
                block1.x < block2.x + block2.diameter &&
                block1.x + block1.diameter > block2.x &&
                block1.y < block2.y + block2.diameter &&
                block1.y + block1.diameter > block2.y
            );
        }
        else{
            return false;
        }
    }
}
const player = new Player();
window.addEventListener('keypress', (e) => {
    player.update(e);
    movingSound();
});
window.addEventListener('click', (e) => {
    player.update(e);
    movingSound();
})
let gameOverSound = true;
function lose() {
    blocks.forEach((block) => {
        if(player.checkCollisions(block, player, gameOverSound)){
            gameOver = true;
            if (gameOverSound) {
                const x = new Audio("gameOverMusic.wav");
                x.play();
                gameOverSound = false;
            }
        };
    })
}

let blocks = [];
let createBlockTime = 0;
let blockInterval = Math.random() * 1750 + 500;
let lastTime = 0;
class Block{
    constructor(){
        this.spriteDiameter = 401;
        this.sizeModifier = Math.random() * 0.2 + 0.1;
        this.diameter = this.spriteDiameter * this.sizeModifier;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.diameter);
        this.speed = Math.random() * 4 + 1;
        this.image = new Image();
        this.randomImage = Math.floor(Math.random() * 4) + 1;
        this.image.src = `Metal Wall Game Background-0${this.randomImage}.png`;
        this.deletion = false;
        this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
    }
    update(){
        this.x -= this.speed; 
        if (this.x < 0 - this.diameter) {
            this.deletion === true;
        }
    }
    draw(){
        dataCtx.fillStyle = this.color;
        dataCtx.fillRect(this.x, this.y, this.diameter, this.diameter);
        ctx.drawImage(this.image,0, 0, this.spriteDiameter, this.spriteDiameter, this.x, this.y, this.diameter, this.diameter);
    }
}

function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    createBlockTime += deltaTime;
    if (!gameOver) {
        if (createBlockTime > blockInterval) {
            blocks.push(new Block());
            blockInterval = Math.random() * 2000 + 500;
            createBlockTime = 0;
            blocks.sort(function(a,b){
                return a.diameter - b.diameter;
            })
        }
    }
    UI();
    [...blocks].forEach((block) => {
        block.update();
    });
    [...blocks].forEach((block) => {
        block.draw();
    });
    blocks = blocks.filter(object => !object.deletion);
    
    player.draw();
    lose();

    requestAnimationFrame(animate);
}
animate(0);