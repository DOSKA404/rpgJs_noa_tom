const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

window.onload = function() {
    var audio = new Audio('data/music.mp3');
    document.addEventListener("click", function() {
        audio.volume = 0.1;
        audio.play();
    });
}

let inGame = true;
let inShop = false;

class potion{
    constructor(){
        this.name = "potion";
        this.price = 10;
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
        this.price = 20;
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
let l =0;//sert a parcourir le tableau inventoryList dans selected
let selectedInventory = inventoryList[l];

const potion1= new potion();

const superPotion1= new SuperPotion();

let shopInventory= [potion1,superPotion1];
let o= 0;//sert a parcourir le tableau shopInventory dans selected
let selected = shopInventory[o];

let lifeMonster1= 90;
let lifeMonster2= 100;
let lifeMonster3= 110;

let j = 0;// pour verifier la mort du monstre 1
let i = 0;// pour verifier la mort du monstre 2
let k = 0;// pour verifier la mort du monstre 3

let element = document.getElementById('life')

let elementMonster1 = document.getElementById('monsterLife1')
let elementMonster2 = document.getElementById('monsterLife2')
let elementMonster3 = document.getElementById('monsterLife3')

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
    constructor({position,velocity,image,frames ={max:1}, sprites}){
        this.position = position
        this.image = image
        this.frames = {...frames, val:0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
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

        if (!this.moving) return 
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
////////////////////////////////////// INIT MONSTER3 ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

const monster3Map = [];
const monster3Boundaries = [];

for (let i=0; i<monster3.length; i+=100) {//changer le 100 si la taille de la map change
        monster3Map.push(monster3.slice(i,100 + i));
}

monster3Map.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol == '1225'){
                monster3Boundaries.push(new Boundary({position:{x:j * Boundary.width + offset.x,y:i * Boundary.height + offset.y }}));
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// INIT MERCHAND ///////////////////////////////////////
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

const foregroundImage = new Image();
foregroundImage.src = './data/Ile_1/foreground.png';

const monster1Image = new Image();
monster1Image.src = './data/Ile_1/monster1.png';

const monster2Image = new Image();
monster2Image.src = './data/Ile_1/monster2.png';

const monster3Image = new Image();
monster3Image.src = './data/Ile_1/monster3.png';

const playerDownImage = new Image();
playerDownImage.src = './data/playerSprite/playerDown.png';

const playerUpImage = new Image();
playerUpImage.src = './data/playerSprite/playerUp.png';

const playerLeftImage = new Image();
playerLeftImage.src = './data/playerSprite/playerLeft.png';

const playerRightImage = new Image();
playerRightImage.src = './data/playerSprite/playerRight.png';

const player = new Sprite({
    position:{
        x:canvas.width/2 - 192/4/2,
        y:canvas.height/2 - 68/2},
        image:playerDownImage,
        frames:{
            max:4
        },
        sprites:{
            up: playerUpImage,
            down: playerDownImage,
            left: playerLeftImage,
            right: playerRightImage,
        }
    })
const background = new Sprite({position:{x:offset.x,y:offset.y},image:image});
const foreground = new Sprite({position:{x:offset.x,y:offset.y},image:foregroundImage});
const spriteMonster1 = new Sprite({position:{x:offset.x,y:offset.y},image:monster1Image});
const spriteMonster2 = new Sprite({position:{x:offset.x,y:offset.y},image:monster2Image});
const spriteMonster3 = new Sprite({position:{x:offset.x,y:offset.y},image:monster3Image});

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
        money += 15;
    }
}

function checkLifeMonster3(){
    if (lifeMonster3 <= 0 && k == 0){
        k++
        money += 20;
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
    },
    a:{
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
        case 'a':
            key.a.pressed = true;
            lastKey = 'a';
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
        case 'a':
            key.a.pressed = false;
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
            }

            if (lifeMonster2 > 0){
                monster2Boundaries.forEach(monster2Boundary => {monster2Boundary.draw()});
            }

            if (lifeMonster3 > 0){
                monster3Boundaries.forEach(monster3Boundary => {monster3Boundary.draw()});
            }

            merchandBoundaries.forEach(merchandBoundary => {merchandBoundary.draw()});
            player.draw();

            if (lifeMonster1 > 0){
                spriteMonster1.draw();
            }

            if (lifeMonster2 > 0){
                spriteMonster2.draw();
            }

            if (lifeMonster3 > 0){
                spriteMonster3.draw();
            }

            foreground.draw();
            tpBoundaries.forEach(tp_boundary => {tp_boundary.draw()});
            
            checkLife();
            checkLifeMonster1();
            checkLifeMonster2();
            checkLifeMonster3();

            
        if (inGame==true){
            element.innerText = 'Life : ' + life + '/-/ Money : ' + money 
            shopElement.innerText = '';
            inventoryElement.innerText = '';
            selectedElement.innerText = '';
            if (lifeMonster1 > 0){
                elementMonster1.innerText = 'Life monster 1: ' + lifeMonster1;
            }else{
                elementMonster1.innerText = '';
            }
            if (lifeMonster2 > 0){
                elementMonster2.innerText = 'Life monster 2 : ' + lifeMonster2 ;
            }else{
                elementMonster2.innerText = '';
            }
            if (lifeMonster3 > 0){
                elementMonster3.innerText = 'Life monster 3 : ' + lifeMonster3 ;
            }else{
                elementMonster3.innerText = '';
            }
        }else if(inShop==true){
            let stringToPrint ="Bienvenue dans le shop// shop list:";
            for (let i = 0; i < shopInventory.length; i++) {
                stringToPrint = stringToPrint + shopInventory[i].name +', ';
            }
            shopElement.innerText = stringToPrint;
            selectedElement.innerText = 'selected : ' + selected.name;
            inventoryElement.innerText = '';
            elementMonster1.innerText = '';
            elementMonster2.innerText = '';
            elementMonster3.innerText = '';
            element.innerText = 'press a to buy // price : 10 potion , 20 super potion';
            console.log("dans le shop");

            
        }else if(inGame==false && inShop==false){
            shopElement.innerText = '';
            elementMonster1.innerText = '';
            elementMonster2.innerText = '';
            elementMonster3.innerText = '';
            let tmp = [];
            let stringToPrint ="inventory:";
            for (let i = 0; i < inventoryList.length; i++) {
                stringToPrint = stringToPrint + inventoryList[i].name +', ';
                tmp.push(inventoryList[i].name);
            }
            console.log("dans l'inventaire");
                selectedElement.innerText = 'selected : '+ tmp[l]
            element.innerText = 'press a to use the item selected';
            inventoryElement.innerText = stringToPrint;
        }
        keyboard();
    },25);
   
    
    
}

const movables = [background,foreground,spriteMonster1,spriteMonster2,spriteMonster3,...boundaries,...tpBoundaries,...monster1Boundaries,...monster2Boundaries,...monster3Boundaries,...merchandBoundaries];

animate();