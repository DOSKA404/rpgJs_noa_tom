const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

const collisionsMap = [];
for (let i=0; i<collisions.length; i+=100) {//changer le 100 si la taille de la map change
    collisionsMap.push(collisions.slice(i,100 + i));
}

class Boundary {
    static width = 48
    static height = 48
    constructor({ position }) {
      this.position = position
      this.width = 48
      this.height = 48
    }
  
    draw() {
      c.fillStyle ='rgba(255, 0, 0, 0)';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  }

const boundaries = [];
const offset = {x:-1170,y:-1625}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
            boundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

c.fillStyle = 'blue';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './image/map.png';

const playerImage = new Image();
playerImage.src = './image/playerDown.png';

class Sprite{
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

const player = new Sprite({position:{x:canvas.width/2 - 192/4/2,y:canvas.height/2 - 68/2},image:playerImage,frames:{max:4}});
const background = new Sprite({position:{x:offset.x,y:offset.y},image:image});

const movables = [background,...boundaries];

function animate(){
    window.requestAnimationFrame(animate);
    background.draw();
    boundaries.forEach(boundary => {
        boundary.draw()
    });
    player.draw();

   
    let moving = true;
    if(key.z.pressed && lastKey === 'z'){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if( player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y+5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y+5) + boundary.height
                // rectangularCollision({player: player, bloc: {...boundary, position:{x:boundary.position.x, y:boundary.position.y +7}}})
                ){
                console.log("colliding");
               moving = false;
               break
            }
        }
        if (moving){
            movables.forEach(movable => {movable.position.y += 7});
        }
    }else if(key.s.pressed && lastKey === 's'){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if( player.position.x + player.width >= boundary.position.x &&
                player.position.y + player.height >= (boundary.position.y-5) &&
                player.position.x <= boundary.position.x + boundary.width &&
                player.position.y <= (boundary.position.y-5) + boundary.height
                // rectangularCollision({player: player, bloc: {...boundary, position:{x:boundary.position.x, y:boundary.position.y +7}}})
                ){
                console.log("colliding");
               moving = false;
               break
            }
        }
        if (moving){
            movables.forEach(movable => {movable.position.y -= 7});
        }
        
    }else if(key.q.pressed && lastKey === 'q'){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if( player.position.x + player.width >= (boundary.position.x+5) &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= (boundary.position.x+5) + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                // rectangularCollision({player: player, bloc: {...boundary, position:{x:boundary.position.x, y:boundary.position.y +7}}})
                ){
                console.log("colliding");
               moving = false;
               break
            }
        }
        if (moving){
            movables.forEach(movable => {movable.position.x += 7});
        }
        
    }else if(key.d.pressed && lastKey === 'd'){
        for(let i=0; i < boundaries.length; i++){
            const boundary = boundaries[i];
            if( player.position.x + player.width >= (boundary.position.x-5) &&
                player.position.y + player.height >= boundary.position.y &&
                player.position.x <= (boundary.position.x-5) + boundary.width &&
                player.position.y <= boundary.position.y + boundary.height
                // rectangularCollision({player: player, bloc: {...boundary, position:{x:boundary.position.x, y:boundary.position.y +7}}})
                ){
                console.log("colliding");
               moving = false;
               break
            }
        }
        if (moving){
            movables.forEach(movable => {movable.position.x -= 7});
        }
       
    }
}
animate();

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
