const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'red';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './image/firstMap.png';

const playerImage = new Image();
playerImage.src = './image/playerDown.png';

class Sprite{
    constructor({position,velocity,image}){
        this.position = position
        this.image = image
    }

    draw(){
        c.drawImage(this.image,this.position.x,this.position.y);
    }
}

const background = new Sprite({position:{x:-950,y:-1750},image:image});

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

function animate(){
    window.requestAnimationFrame(animate);
    background.draw();
    c.drawImage(playerImage,0,0,playerImage.width/4,playerImage.height,canvas.width/2 - playerImage.width/4/2,canvas.height/2 - playerImage.height/2,playerImage.width/4,playerImage.height);

    if(key.z.pressed){
        background.position.y += 5;
    }else if(key.s.pressed){
        background.position.y -= 5;
    }else if(key.q.pressed){
        background.position.x += 5;
    }else if(key.d.pressed){
        background.position.x -= 5;
    }
    

}
animate();

window.addEventListener('keydown',(e) => {
    switch (e.key) {
        case 'z':
            key.z.pressed = true;
            break;
        case 'q':
            key.q.pressed = true;
            break;
        case 's':
            key.s.pressed = true;
            break;
        case 'd':
            key.d.pressed = true;
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
