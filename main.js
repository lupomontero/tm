const canvas = document.createElement('canvas');

const output = Object.assign(document.createElement('div'), {
  className: 'output',
});

const ctx = canvas.getContext('2d');

const handleOrientation = (event) => {
  const isLandscape = screen.orientation.type.startsWith('landscape');
  const width = screen.width;
  const height = width / 2;

  Object.assign(canvas, { width, height });

  // event.beta; // In degree in the range [-180,180)
  // event.gamma; // In degree in the range [-90,90)
  const degrees = isLandscape ? event.beta : event.gamma; // gamma for landscape, beta for portrait
  const radians = degrees * (Math.PI / 180);

  ctx.clearRect(0, 0, width, height);

  // Draw background circle
  ctx.arc(height, height, height, 0, Math.PI * 2);
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
  ctx.closePath();

  output.textContent = `beta: ${event.beta}°\n`;
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

// screen.orientation.addEventListener('change', (event) => {
//   const type = event.target.type;
//   const angle = event.target.angle;
//   console.log(`ScreenOrientation change: ${type}, ${angle} degrees.`);
// });
