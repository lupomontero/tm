const width = 200;
const height = 100;
const canvas = Object.assign(document.createElement('canvas'), {
  width,
  height,
});
const output = Object.assign(document.createElement('div'), {
  style: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    color: 'black',
  },
});

const ctx = canvas.getContext('2d');

const handleOrientation = (event) => {
  // let x = event.beta; // In degree in the range [-180,180)
  // let y = event.gamma; // In degree in the range [-90,90)
  const radians = event.beta * (Math.PI / 180);

  ctx.clearRect(0, 0, width, height);

  // Draw background circle
  ctx.arc(width / 2, height, height, 0, Math.PI * 2);
  // ctx.fillStyle = 'red';
  // ctx.fill();
  // ctx.strokeStyle = 'black';
  // ctx.lineWidth = 2;
  ctx.stroke();

  // Draw needle
  const pointX = (Math.sin(radians) * height) + (width / 2);
  const pointY = height - (Math.cos(radians) * height);

  ctx.beginPath();
  ctx.moveTo(width / 2, height);
  ctx.lineTo(pointX, pointY);
  ctx.stroke();

  output.textContent = `beta: ${event.beta} ${radians}\n`;
  // output.textContent += `gamma: ${y}\n`;

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  // if (x > 90) {
  //   x = 90;
  // }
  // if (x < -90) {
  //   x = -90;
  // }

  // // To make computation easier we shift the range of
  // // x and y to [0,180]
  // x += 90;
  // y += 90;

  // 10 is half the size of the ball
  // It centers the positioning point to the center of the ball
  // ball.style.left = `${(maxY * y) / 180 - 10}px`; // rotating device around the y axis moves the ball horizontally
  // ball.style.top = `${(maxX * x) / 180 - 10}px`; // rotating device around the x axis moves the ball vertically
};

document.body.appendChild(canvas);
document.body.appendChild(output);
window.addEventListener('deviceorientation', handleOrientation);
