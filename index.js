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
        c.fillStyle ='rgba(255, 0, 0, 0)';
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
////////////////////////////////////// INIT LAYER /////////////////////////////////////////////
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

const Projectiles = []

class Projectile{
    constructor({position,velocity,radius}){
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        
    }

    draw(){
        c.beginPath();
        c.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
        c.fillStyle = 'red';
        c.fill();
        c.closePath();
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

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
            case ' ':
                console.log('Space is push !')
                Projectiles.push(new Projectile({
                    position:{
                        x:player.position.x + player.width/2,
                        y:player.position.y + player.height/2
                    },
                    velocity:{
                        x:5,
                        y:0
                    },
                    radius:5
                }));
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
////////////////////////////////////// KEYBOARD  ///////////////////////////////////////////
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
              console.log("colliding");
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
                ) {
              console.log("colliding");
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
              ) {
              console.log("colliding");
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
////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////Projectile/////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ANIMATE //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////



function animate(){
    window.requestAnimationFrame(animate);
    background.draw(); 
    
    boundaries.forEach(boundary => {
        boundary.draw()
    });
    
    player.draw();

    foreground.draw();
    tpBoundaries.forEach(tp_boundary => {
        tp_boundary.draw()
    });
    
    keyboard();

    Projectiles.forEach(new Projectile,index => {
    projectile.update();
    })
}


animate();


class Player{
    constructor(name, hp, atk, sprite){
            this.name = name;
            this.hp = hp;
            this.atk = atk;
            this.sprite = sprite;
            this.inventory = [];
    }

    attack(target){
            target.hp -= this.atk;
    }

    isAlive(){
            return this.hp > 0;
    }

    fight(target){
            while(this.isAlive() && target.isAlive()){
                    this.attack(target);
                    target.attack(this);
            }
    }

    addItem(item){
            this.inventory.push(item);
    }
}

class Target extends player{
    constructor(name, hp, atk, sprite){
            super(name, hp, atk, sprite);
    }

    attack(player)
    {
            player.hp -= this.atk;
    }

    isAlive(){
            return this.hp > 0;
    }

    fight(player){
            while(this.isAlive() && player.isAlive()){
                    this.attack(player);
                    player.attack(this);
            }
    }
}

class Item{
    constructor(name, effect){
            this.name = name;
            this.effect = effect;
    }

    use(target){
            target.hp += this.effect;
    }
}

potion = new item("potion", 10);

player1 = new player("player1", 100, 10,player );

target1 = new target("target1", 100, 10);