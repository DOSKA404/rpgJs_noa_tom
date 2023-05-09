const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let inGame = true;
let inShop = false;

class potion{
    constructor(){
        this.name = "potion";
    }
    use(){
        life += 50;
        if(life > 100){
            life = 100;
        }
    }
}

class SuperPotion{
    constructor(){
        this.name = "SuperPotion";
    }
    use(){
        life += 100;
        if(life > 100){
            life = 100;
        }
    }
}

let life= 100;
let money= 0;
let inventoryList= [];

const potion1= new potion();
const potion2= new potion();
const potion3= new potion();
const potion4= new potion();
const potion5= new potion();

const superPotion1= new SuperPotion();
const superPotion2= new SuperPotion();

let shopInventory= [potion1,potion2,potion3,potion4,potion5,superPotion1,superPotion2];

let lifeMonster1= 90;
let lifeMonster2= 90;

let j = 0;// pour verifier la mort du monstre 1
let i = 0;// pour verifier la mort du monstre 2

let element = document.getElementById('life')

let elementMonster1 = document.getElementById('monsterLife1')
let elementMonster2 = document.getElementById('monsterLife2')

let inventoryElement = document.getElementById('inventory')
let shopElement = document.getElementById('shop')
let selectedElement = document.getElementById('selectedElement')

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
        this.frames = {...frames, val:0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
    }

    draw(){
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )


        if (this.frames.max > 1){
            this.frames.elapsed++
        }
        
        if (this.frames.elapsed % 10 === 0){
        if(this.frames.val < this.frames.max - 1)this.frames.val++
        else this.frames.val = 0
    }

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
////////////////////////////////////// INIT MONSTER1 ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const monster1Map = [];
const monster1Boundaries = [];

for (let i=0; i<monster1.length; i+=100) {//changer le 100 si la taille de la map change
        monster1Map.push(monster1.slice(i,100 + i));
}

monster1Map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
                monster1Boundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT MONSTER2 ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const monster2Map = [];
const monster2Boundaries = [];

for (let i=0; i<monster2.length; i+=100) {//changer le 100 si la taille de la map change
        monster2Map.push(monster2.slice(i,100 + i));
}

monster2Map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
                monster2Boundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT MERCHAND /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const merchandMap = [];
const merchandBoundaries = [];

for (let i=0; i<merchandCollision.length; i+=100) {//changer le 100 si la taille de la map change
    merchandMap.push(merchandCollision.slice(i,100 + i));
}

merchandMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1025'){
            merchandBoundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
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

const monster1Image = new Image();
monster1Image.src = './data/Ile_1/monster1.png';

const monster2Image = new Image();
monster2Image.src = './data/Ile_1/monster2.png';

const player = new Sprite({position:{x:canvas.width/2 - 192/4/2,y:canvas.height/2 - 68/2},image:playerImage,frames:{max:4}});
const background = new Sprite({position:{x:offset.x,y:offset.y},image:image});
const foreground = new Sprite({position:{x:offset.x,y:offset.y},image:foregroundImage});
const spriteMonster1 = new Sprite({position:{x:offset.x,y:offset.y},image:monster1Image});
const spriteMonster2 = new Sprite({position:{x:offset.x,y:offset.y},image:monster2Image});

function checkLife(){
    if (life <= 0){
        alert("Vous avez perdu");
        life = 100;
        document.location.reload();
        animate();
    }
}

function checkLifeMonster1(){
    if (lifeMonster1 <= 0 && j == 0){
        j++
        money += 10;
    }
}

function checkLifeMonster2(){
    if (lifeMonster2 <= 0 && i == 0){
        i++
        money += 10;
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
    },
    space:{
        pressed:false,
    },
    e:{
        pressed:false,
    }
}

let lastKey = '';

window.addEventListener('keydown',(p) => {
    switch (p.key) {
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
            key.space.pressed = true;
            lastKey = ' ';
            break;
        case 'e':
            key.e.pressed = true;
            lastKey = 'e';
            break;
    }
})

window.addEventListener('keyup',(p) => {
    switch (p.key) {
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
        case ' ':
            key.space.pressed = false;
            break;
        case 'e':
            key.e.pressed = false;
            break;
    }
})

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ANIMATE /////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

function animate(){
    setTimeout(() => {
        
            window.requestAnimationFrame(animate);
            background.draw(); 
            
            boundaries.forEach(boundary => {boundary.draw()});

            if (lifeMonster1 > 0){
                monster1Boundaries.forEach(monster1Boundary => {monster1Boundary.draw()});
                elementMonster1.innerText = 'Life monster 1: ' + lifeMonster1;
            }else{
                elementMonster1.innerText = '';
            }

            if (lifeMonster2 > 0){
                monster2Boundaries.forEach(monster2Boundary => {monster2Boundary.draw()});
                elementMonster2.innerText = 'Life monster 2 : ' + lifeMonster2 ;
            }else{
                elementMonster2.innerText = '';
            }

            merchandBoundaries.forEach(merchandBoundary => {merchandBoundary.draw()});
            player.draw();

            if (lifeMonster1 > 0){
                spriteMonster1.draw();
            }

            if (lifeMonster2 > 0){
                spriteMonster2.draw();
            }

            foreground.draw();
            tpBoundaries.forEach(tp_boundary => {tp_boundary.draw()});
            
            checkLife();
            checkLifeMonster1();
            checkLifeMonster2();

            element.innerText = 'Life : ' + life + '/-/ Money : ' + money 
            shopElement.innerText = '';
            inventoryElement.innerText = '';
            
        if(inShop==true){
            shopElement.innerText = "Bienvenue dans le shop// shop list:"+shopInventory;
            inventoryElement.innerText = '';
            console.log("dans le shop");
            
        }else if(inGame==false && inShop==false){
            shopElement.innerText = '';
            console.log("dans l'inventaire");
            inventoryElement.innerText = inventoryList;
        }
        keyboard();
    },20);
   
    
    
}

const movables = [background,foreground,spriteMonster1,spriteMonster2,...boundaries,...tpBoundaries,...monster1Boundaries,...monster2Boundaries,...merchandBoundaries];

animate();