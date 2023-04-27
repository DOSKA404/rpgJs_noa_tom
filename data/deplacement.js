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

if (keys.z.pressed){
    background.position.y = background.position.y + 3
    
}


window.addEventListener('keydown'), (e) => {
    switch (e.key) {
        case 'z':
            keys.w.pressed = true;
            break;
        case 'q':
            keys.a.pressed = true;
            break;
        case 's':
            keys.s.pressed = true;
            break;
        case 'd':
            keys.d.pressed = true;
            break;
    }
}

window.addEventListener('keyup'), (e) => {
    switch (e.key) {
        case 'z':
            keys.w.pressed = false;
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
}

function animate (
    window.requestAnimationFrame(animate);

)

if ()


class Sprite {
    constructor(position, velocity, image){
        this.position = position;
        this.velocity = velocity;
        this.image = image;
    }
}

draw () {
    c.drawImage(this.image,this.position.x ,this.position.y);
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    image: image
})
