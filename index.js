const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'red';
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = './image/Ile_Prairie_LM.png';

const playerImage = new Image();
playerImage.src = './image/playerDown.png';

image.onload = () => {
    c.drawImage(image,-155, -135);
    c.drawImage(playerImage,0,0,playerImage.width/4,playerImage.height, canvas.width/2 - playerImage.width/4/2, canvas.height/2 - playerImage.height/2, playerImage.width/4, playerImage.height);
}




