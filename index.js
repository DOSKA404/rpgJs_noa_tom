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

image.onload = () => {
    c.drawImage(image,-950, -1750);
    c.drawImage(playerImage,0,0,playerImage.width/4,playerImage.height, canvas.width/2 - playerImage.width/4/2, canvas.height/2 - playerImage.height/2, playerImage.width/4, playerImage.height);
}


class Sprite {
    constructor(position, velocity, image){
        this.position = position;
        this.image = image;
    }

    draw () {
        c.drawImage(this.image,this.position.x ,this.position.y);
    }
}


const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: image
})

const keys = {
    z: {
        pressed: false,
    },
    q: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
};

function animate (){
    window.requestAnimationFrame(animate);
    background.draw()
    c.drawImage(playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - playerImage.width/4/2,
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4, playerImage.height)

    if (keys.z.pressed && lastKey === 'z')background.position.y += 3
    else if (keys.s.pressed && lastKey === 's')background.position.y -= 3
    else if (keys.d.pressed && lastKey === 'd')background.position.x += 3
    else if (keys.q.pressed && lastKey === 'q')background.position.x -= 3

}

animate();


window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'z':
            keys.w.pressed = true;
            lastKey = 'z';
            break;
        case 'q':
            keys.a.pressed = true;
            lastKey = 'q';
            break;
        case 's':
            keys.s.pressed = true;
            lastKey = 's';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'z':
            keys.w.pressed = false;
            console.log('z has been pressed')
            break;
        case 'q':
            keys.a.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
})



