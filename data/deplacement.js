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