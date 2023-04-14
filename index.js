const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1920
canvas.height = 1080

c.fillStyle = 'red';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './image/Ile_Prairie_LM.png';
console.log(image);

const playerImage = new Image();
playerImage.src = './image/player.png';

image.onload = () => {
    c.drawImage(image, 0, 0);
    c.drawImage(playerImage, -300, -300);
    }


