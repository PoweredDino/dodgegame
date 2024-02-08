/**@type {HTMLCanvasElement} */
window.addEventListener('load', function(){
    function isMobile() {
        const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        return true//regex.test(navigator.userAgent);
    }

    const sizeModifiering = Math.max(window.innerWidth, window.innerHeight);
    const averageSize = sizeModifiering/2000;
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const dataCanvas = document.getElementById("canvas1");
    const dataCtx = canvas.getContext('2d');
    dataCanvas.width = window.innerWidth;
    dataCanvas.height = window.innerHeight;

    const ArrowUp = {
        image: new Image(),
        x: canvas.width - (sizeModifiering/30) * 7,
        y: canvas.height - sizeModifiering/10
    }
    const ArrowDown = {
        image: new Image(),
        x: canvas.width - (sizeModifiering/30) * 3,
        y: canvas.height - sizeModifiering/10
    }
    const ArrowRight = {
        image: new Image(),
        x: (sizeModifiering/30) * 4,
        y: canvas.height - sizeModifiering/10
    }
    const ArrowLeft = {
        image: new Image(),
        x: (sizeModifiering/30),
        y: canvas.height - sizeModifiering/10
    }
    ArrowUp.image.src = "ArrowUp.png"
    ArrowDown.image.src = "ArrowDown.png"
    ArrowLeft.image.src = "ArrowLeft.png"
    ArrowRight.image.src = "ArrowRight.png"

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
    function retrySound() {
        const g = new Audio("retrySound.mp3");
        g.play();
    }
    class InputHandler {
        constructor(){
            this.keys = [];
            if (isMobile()) {
                window.addEventListener('mousedown', (e) => {
                    if (e.x > ArrowDown.x && e.x < ArrowDown.x + (averageSize * 100) && e.y > ArrowDown.y && e.y < ArrowDown.y + (averageSize * 100)){
                        this.keys.push("ArrowDown");
                    }
                    if (e.x > ArrowLeft.x && e.x < ArrowLeft.x + (averageSize * 100) && e.y > ArrowLeft.y && e.y < ArrowLeft.y + (averageSize * 100)){
                        this.keys.push("ArrowLeft");
                    }
                    if (e.x > ArrowRight.x && e.x < ArrowRight.x + (averageSize * 100) && e.y > ArrowRight.y && e.y < ArrowRight.y + (averageSize * 100)){
                        this.keys.push("ArrowRight");
                    }
                    if (e.x > ArrowUp.x && e.x < ArrowUp.x + (averageSize * 100) && e.y > ArrowUp.y && e.y < ArrowUp.y + (averageSize * 100)){
                        this.keys.push("ArrowUp");
                    }
                })
                window.addEventListener('mouseup', (e) => {
                    if (e.x > ArrowDown.x && e.x < ArrowDown.x + (averageSize * 100) && e.y > ArrowDown.y && e.y < ArrowDown.y + (averageSize * 100)){
                        this.keys.splice(this.keys.indexOf("ArrowDown"), 1);
                    }
                    if (e.x > ArrowLeft.x && e.x < ArrowLeft.x + (averageSize * 100) && e.y > ArrowLeft.y && e.y < ArrowLeft.y + (averageSize * 100)){
                        this.keys.splice(this.keys.indexOf("ArrowLeft"), 1);
                    }
                    if (e.x > ArrowRight.x && e.x < ArrowRight.x + (averageSize * 100) && e.y > ArrowRight.y && e.y < ArrowRight.y + (averageSize * 100)){
                        this.keys.splice(this.keys.indexOf("ArrowRight"), 1);
                    }
                    if (e.x > ArrowUp.x && e.x < ArrowUp.x + (averageSize * 100) && e.y > ArrowUp.y && e.y < ArrowUp.y + (averageSize * 100)){
                        this.keys.splice(this.keys.indexOf("ArrowUp"), 1);
                    }
                })
            } else{
                window.addEventListener('keydown', (e) => {
                    if ((   e.key === "ArrowDown" ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowLeft" ||
                            e.key === "ArrowRight")
                            && this.keys.indexOf(e.key) === -1) {
                        this.keys.push(e.key);
                    }
                })
                window.addEventListener('keyup', (e) => {
                    if (    e.key === "ArrowDown" ||
                            e.key === "ArrowUp" ||
                            e.key === "ArrowLeft" ||
                            e.key === "ArrowRight") {
                        this.keys.splice(this.keys.indexOf(e.key), 1);
                    }
                    
                })
            }
        }
    }
    const input = new InputHandler()
    class Player{
        constructor(){
            this.spriteDiameter = 802;
            this.diameter = (this.spriteDiameter/10) * averageSize;
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.speed = 25 * averageSize;
            this.image = new Image();
            this.image.src = `Player.png`;
            this.deletion = false;
        }
        update(/*event*/){
            //if (isMobile()) {
                
            //} else{
                let moveable;
                if (input.keys.includes("ArrowUp")) {
                    if (this.y > 0) {
                        this.y -= this.speed
                    }
                    else{
                        this.y = 0
                    }
                }
                if (input.keys.includes("ArrowDown")) {
                    if (this.y < canvas.height - this.diameter) {
                        this.y += this.speed
                    }
                    else{
                        this.y = canvas.height - this.diameter
                    }
                }
                if (input.keys.includes("ArrowRight")) {
                    if (this.x < canvas.width - this.diameter) {
                        this.x += this.speed
                    }
                    else{
                        this.x = canvas.width - this.diameter
                    }
                }
                if (input.keys.includes("ArrowLeft")) {
                    if (this.x > 0) {
                        this.x -= this.speed
                    }
                    else{
                        this.x = 0
                    }
                };
            //}
            /*
            if (event.type === 'click') {
                if (event.x < window.innerWidth/2 && event.y < window.innerHeight/2) {
                    if (this.x > 0 && this.y > 0) {
                        this.x -= this.speed;
                        this.y -= this.speed;
                        if (this.x < 0) {
                            this.x = 0;
                        }
                        else if (this.y < 0) {
                            this.y = 0;
                        }
                    }
                    
                }
                else if (event.x > window.innerWidth/2 && event.y < window.innerHeight/2) {
                    if (this.x < canvas.width - this.diameter && this.y > 0) {
                        this.x += this.speed;
                        this.y -= this.speed;
                        if (this.x > canvas.width - this.diameter) {
                        this.x = canvas.width - this.diameter;
                        }
                        else if (this.y < 0) {
                            this.y = 0;
                        }
                    }
                    
                }
                else if (event.x < window.innerWidth/2 && event.y > window.innerHeight/2) {
                    if (this.x > 0 && this.y < canvas.height - this.diameter) {
                        this.x -= this.speed;
                        this.y += this.speed;
                        if (this.x < 0) {
                            this.x = 0;
                        }
                        else if (this.y > canvas.height - this.diameter) {
                            this.y = canvas.height - this.diameter;
                        }
                    }
                }
                else if (event.x > window.innerWidth/2 && event.y > window.innerHeight/2) {
                    
                    if (this.x < canvas.width - this.diameter && this.y < canvas.height - this.diameter) {
                        this.x += this.speed;
                        this.y += this.speed;
                        if (this.x > canvas.width - this.diameter) {
                            this.x = canvas.width - this.diameter;
                        }
                        else if (this.y > canvas.height - this.diameter) {
                            this.y = canvas.height - this.diameter;
                        }
                    }
                }
            }
        */
        }
        draw(){
            ctx.drawImage(
                this.image, 
                0, 
                0, 
                this.spriteDiameter, 
                this.spriteDiameter, 
                this.x, 
                this.y, 
                this.diameter, 
                this.diameter
            );
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
    let gameOverSound = true;
    function lose() {
        blocks.forEach((block) => {
            if(player.checkCollisions(block, player, gameOverSound)){
                gameOver = true;
                block.deletion = true;
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
            this.diameter = (this.spriteDiameter * this.sizeModifier) * averageSize;
            this.x = canvas.width;
            this.y = Math.random() * (canvas.height - this.diameter);
            this.speed = Math.random() * (averageSize * 5) + (averageSize * 2);
            this.speedX = this.speed;
            this.speedY = Math.random() * this.speed - this.speed;
            this.image = new Image();
            this.randomImage = Math.floor(Math.random() * 4) + 1;
            this.image.src = `Metal Wall Game Background-0${this.randomImage}.png`;
            this.deletion = false;
            this.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`
        }
        update(){
            this.x -= this.speedX;
            if (this.x < 0 - this.diameter) {
                this.deletion === true;
            }

            this.y += this.speedY;
            if (this.y < 0 || this.y > canvas.height - this.diameter) {
                this.speedY *= -1;
            }
        }
        draw(){
            dataCtx.fillStyle = this.color;
            dataCtx.fillRect(this.x, this.y, this.diameter, this.diameter);
            ctx.drawImage(this.image,0, 0, this.spriteDiameter, this.spriteDiameter, this.x, this.y, this.diameter, this.diameter);
        }
    }
    class Retry{
        constructor(){
            this.image = new Image();
            this.image.src = "Retry.png";
            this.spriteDiameter = 500;
            this.diameter = this.spriteDiameter * averageSize/5;
            this.x = (canvas.width - this.diameter) - this.diameter/2;
            this.y = this.diameter/2;
        }
        update(){
            score = 0;
            blocks = [];
            lastTime = 0;
            gameOver = false;
            player.x = canvas.width/2;
            player.y = canvas.height/2;
            gameOverSound = true;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            dataCanvas.width = window.innerWidth;
            dataCanvas.height = window.innerHeight;
            retrySound();
        }
        draw(){
            ctx.drawImage(this.image, 0, 0, this.spriteDiameter, this.spriteDiameter, this.x, this.y, this.diameter, this.diameter);
        }
    }
    const retry = new Retry();
    window.addEventListener('click', (e) => {
        //retry
        if (e.x > retry.x && e.x < retry.x + retry.diameter && e.y > retry.y && e.y < retry.y + retry.diameter) {
            retry.update();
        }
    })
    function UI() {
        const fontSize = averageSize * 75;
        const fontFamily = 'Protest Guerrilla';
        ctx.save();
        ctx.font = fontSize + "px " + fontFamily;
        
        ctx.textAlign = 'left';
        ctx.fillStyle = 'black';
        ctx.fillText("Score: " + score, (averageSize/26) + 50, (averageSize/26) + 75);
        ctx.fillStyle = 'yellow';
        ctx.fillText("Score: " + score, (averageSize/26) + 55, (averageSize/26) + 80);
        
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
            ctx.font = fontSize/2 + "px " + fontFamily;
            ctx.fillText(two, canvas.width/2, canvas.height/2 + 80);
        }
        ctx.restore();
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

        
        player.update();
        player.draw();
        lose();

        retry.draw();

        if (isMobile()) {
            const diameter = averageSize * 100
            ctx.drawImage(ArrowLeft.image, 0, 0, 500, 500, ArrowLeft.x, ArrowLeft.y, diameter, diameter)
            ctx.drawImage(ArrowRight.image, 0, 0, 500, 500, ArrowRight.x, ArrowRight.y, diameter, diameter)
            ctx.drawImage(ArrowUp.image, 0, 0, 500, 500, ArrowUp.x, ArrowUp.y, diameter, diameter)
            ctx.drawImage(ArrowDown.image, 0, 0, 500, 500, ArrowDown.x, ArrowDown.y, diameter, diameter)
        }
        
        requestAnimationFrame(animate);
    }
    animate(0);
    setInterval(() => {
        if (input.keys.length !== 0) {
            movingSound()
        }
        else{
            return
        }
    }, 500)
})
