const ball = document.querySelector(".ball");
const garden = document.querySelector(".garden");
const output = document.querySelector(".output");

const maxX = garden.clientWidth - ball.clientWidth;
const maxY = garden.clientHeight - ball.clientHeight;

function handleOrientation(event) {
  let x = event.beta; // In degree in the range [-180,180)
  let y = event.gamma; // In degree in the range [-90,90)

  output.textContent = `beta: ${x}\n`;
  output.textContent += `gamma: ${y}\n`;

  // Because we don't want to have the device upside down
  // We constrain the x value to the range [-90,90]
  if (x > 90) {
    x = 90;
  }
  if (x < -90) {
    x = -90;
  }

  // To make computation easier we shift the range of
  // x and y to [0,180]
  x += 90;
  y += 90;

  // 10 is half the size of the ball
  // It centers the positioning point to the center of the ball
  ball.style.left = `${(maxY * y) / 180 - 10}px`; // rotating device around the y axis moves the ball horizontally
  ball.style.top = `${(maxX * x) / 180 - 10}px`; // rotating device around the x axis moves the ball vertically
}

window.addEventListener("deviceorientation", handleOrientation);

// const acl = new Accelerometer({ frequency: 60 });
// const gyro = new Gyroscope({ frequency: 60 });

// const aclDiv = document.querySelector('.acl');
// const gyroDiv = document.querySelector('.gyro');

// const aclXDiv = aclDiv.querySelector('acl-x');
// const aclYDiv = aclDiv.querySelector('acl-y');
// const aclZDiv = aclDiv.querySelector('acl-z');

// const gyroXDiv = gyroDiv.querySelector('gyro-x');
// const gyroYDiv = gyroDiv.querySelector('gyro-y');
// const gyroZDiv = gyroDiv.querySelector('gyro-z');

// gyro.addEventListener("reading", () => {
//   console.log(`Rotation around the X-axis ${gyro.x}`);
//   console.log(`Rotation around the Y-axis ${gyro.y}`);
//   console.log(`Rotation around the Z-axis ${gyro.z}`);
//   gyroXDiv.textContent = gyro.x.toFixed(2);
//   gyroYDiv.textContent = gyro.y.toFixed(2);
//   gyroZDiv.textContent = gyro.z.toFixed(2);
// });

// acl.addEventListener("reading", () => {
//   console.log(`Acceleration along the X-axis ${acl.x}`);
//   console.log(`Acceleration along the Y-axis ${acl.y}`);
//   console.log(`Acceleration along the Z-axis ${acl.z}`);
//   aclXDiv.textContent = acl.x.toFixed(2);
//   aclYDiv.textContent = acl.y.toFixed(2);
//   aclZDiv.textContent = acl.z.toFixed(2);
// });

// acl.start();
