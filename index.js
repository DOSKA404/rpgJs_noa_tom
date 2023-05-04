const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const offset = {x:-1170,y:-1625}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT MAIN CLASS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

class Boundary {//create collision or tp bloc
    static width = 48
    static height = 48
    constructor({ position }) {
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw() {
        c.fillStyle ='rgba(255, 0, 0, 0.5)';
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class Sprite{//create player sprite or background
    constructor({position,velocity,image,frames ={max:1}}){
        this.position = position
        this.image = image
        this.frames = frames

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
    }

    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
            );
    }
}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// EVENT LISTENER //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const key={
    z:{
        pressed:false,
    },
    q:{
        pressed:false,
    },
    d:{
        pressed:false,
    },
    s:{
        pressed:false,
    }
}

let lastKey = '';

window.addEventListener('keydown',(e) => {
    switch (e.key) {
        case 'z':
            key.z.pressed = true;
            lastKey = 'z';
            break;
        case 'q':
            key.q.pressed = true;
            lastKey = 'q';
            break;
        case 's':
            key.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            key.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

window.addEventListener('keyup',(e) => {
    switch (e.key) {
        case 'z':
            key.z.pressed = false;
            break;
        case 'q':
            key.q.pressed = false;
            break;
        case 's':
            key.s.pressed = false;
            break;
        case 'd':
            key.d.pressed = false;
            break;
    }
})



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// MAP 1 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT COLLISIONS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const collisionsMap = [];
const boundaries = [];

for (let i=0; i<collisions.length; i+=100) {//changer le 100 si la taille de la map change
    collisionsMap.push(collisions.slice(i,100 + i));
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
            boundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT TP /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const tpMap = [];
const tpBoundaries = [];

for (let i=0; i<tp.length; i+=100) {//changer le 100 si la taille de la map change
    tpMap.push(tp.slice(i,100 + i));
}

tpMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1026'){
            tpBoundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT LAYER //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

c.fillStyle = 'blue';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './data/Ile_1/map.png';

const playerImage = new Image();
playerImage.src = './data/playerSprite/playerDown.png';

const foregroundImage = new Image();
foregroundImage.src = './data/Ile_1/foreground.png';

const player = new Sprite({position:{x:canvas.width/2 - 192/4/2,y:canvas.height/2 - 68/2},image:playerImage,frames:{max:4}});
const background = new Sprite({position:{x:offset.x,y:offset.y},image:image});
const foreground = new Sprite({position:{x:offset.x,y:offset.y},image:foregroundImage});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// KEYBOARD/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const movables = [background,foreground,...boundaries,...tpBoundaries];

function keyboard(){

    let moving = true;

    if(key.z.pressed && lastKey === 'z'){
        for(const boundary of boundaries){
            if(player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y+5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y+5) + boundary.height
                ){
                moving = false;
                break;
            }
        }
          
        if(moving){
            for(const movable of movables){
                movable.position.y += 7;
            }
        }
    }else if(key.s.pressed && lastKey === 's'){
        for (const boundary of boundaries) {
            if (player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y-5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y-5) + boundary.height
                ){
                moving = false;
                break;
            }
          }
        if (moving){
            movables.forEach(movable => {movable.position.y -= 7});
        }
        
    }else if(key.q.pressed && lastKey === 'q'){
        for (const boundary of boundaries) {
            if (
                player.position.x + player.width >= boundary.position.x + 5 &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= boundary.position.x + 5 + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                ){
                moving = false;
                break;
            }
          }
        if (moving){
            movables.forEach(movable => {movable.position.x += 7});
        }
        
    }else if(key.d.pressed && lastKey === 'd'){
        for(const boundary of boundaries){
            if(player.position.x + player.width >= (boundary.position.x-5) &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= (boundary.position.x-5) + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (moving){
            movables.forEach(movable => {movable.position.x -= 7});
        }
       
    }
}
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ANIMATE  ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function firstIsland(){
        window.requestAnimationFrame(firstIsland);
        background.draw(); 
        
        boundaries.forEach(boundary => {boundary.draw()});
        tpBoundaries.forEach(tp_boundary => {tp_boundary.draw()});
    
        player.draw();
        foreground.draw();
        
        keyboard();
       
    }

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// MAP 2 ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT COLLISIONS /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const collisionsMap2 = [];
const boundaries2 = [];

for (let i=0; i<collisions2.length; i+=100) {//changer le 100 si la taille de la map change
    collisionsMap2.push(collisions2.slice(i,100 + i));
}

collisionsMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
            boundaries2.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT TP /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const tpMap2 = [];
const tpBoundaries2 = [];

for (let i=0; i<tp.length; i+=100) {//changer le 100 si la taille de la map change
    tpMap2.push(tp.slice(i,100 + i));
}

tpMap2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1026'){
            tpBoundaries2.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT LAYER //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

c.fillStyle = 'blue';
c.fillRect(0, 0, canvas.width, canvas.height);

const image2 = new Image();
image2.src = './data/Ile_2/map.png';

const playerImage2 = new Image();
playerImage2.src = './data/playerSprite/playerDown.png';

const foregroundImage2 = new Image();
foregroundImage2.src = './data/Ile_2/foreground.png';

const player2 = new Sprite({position:{x:canvas.width/2 - 192/4/2,y:canvas.height/2 - 68/2},image:playerImage2,frames:{max:4}});
const background2 = new Sprite({position:{x:offset.x,y:offset.y},image:image2});
const foreground2 = new Sprite({position:{x:offset.x,y:offset.y},image:foregroundImage2});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// KEYBOARD/////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const movables2 = [background2,foreground2,...boundaries2,...tpBoundaries2];

function keyboard2(){

    let moving = true;

    if(key.z.pressed && lastKey === 'z'){
        for(const boundary of boundaries2){
            if(player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y+5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y+5) + boundary.height
                ){
                moving = false;
                break;
            }
        }
          
        if(moving){
                movables2.forEach(movable => {movable.position.y += 7});
        }
    }else if(key.s.pressed && lastKey === 's'){
        for (const boundary of boundaries2) {
            if (player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y-5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y-5) + boundary.height
                ){
                moving = false;
                break;
            }
          }
        if (moving){
            movables2.forEach(movable => {movable.position.y -= 7});
        }
        
    }else if(key.q.pressed && lastKey === 'q'){
        for (const boundary of boundaries2) {
            if (
                player.position.x + player.width >= boundary.position.x + 5 &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= boundary.position.x + 5 + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                ){
                moving = false;
                break;
            }
          }
        if (moving){
            movables2.forEach(movable => {movable.position.x += 7});
        }
        
    }else if(key.d.pressed && lastKey === 'd'){
        for(const boundary of boundaries2){
            if(player.position.x + player.width >= (boundary.position.x-5) &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= (boundary.position.x-5) + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                ){
                console.log("colliding");
                moving = false;
                break;
            }
        }
        if (moving){
            movables2.forEach(movable => {movable.position.x -= 7});
        }
       
    }
}





////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ANIMATE  ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function secondIsland(){
        window.requestAnimationFrame(secondIsland);
        background.draw(); 
        
        boundaries2.forEach(boundary => {boundary.draw()});
        tpBoundaries2.forEach(tp_boundary => {tp_boundary.draw()});
    
        player.draw();
        foreground.draw();
        
        keyboard2();
       
    }

    firstIsland();