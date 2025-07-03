const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const orientationOutput = Object.assign(document.createElement('pre'), {
  className: 'output',
});

const handleOrientation = (event) => {
  const isLandscape = screen.orientation.type.startsWith('landscape');
  const width = screen.width;
  const height = width / 2;

  Object.assign(canvas, { width, height });

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

  orientationOutput.textContent = `${degrees?.toFixed(2) || '?'}°`;
};

document.body.appendChild(canvas);
document.body.appendChild(orientationOutput);

window.addEventListener('deviceorientation', handleOrientation);
