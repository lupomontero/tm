const acl = new Accelerometer({ frequency: 60 });
const gyro = new Gyroscope({ frequency: 60 });

const aclDiv = document.querySelector('.acl');
const gyroDiv = document.querySelector('.gyro');

const aclXDiv = aclDiv.querySelector('acl-x');
const aclYDiv = aclDiv.querySelector('acl-y');
const aclZDiv = aclDiv.querySelector('acl-z');

const gyroXDiv = gyroDiv.querySelector('gyro-x');
const gyroYDiv = gyroDiv.querySelector('gyro-y');
const gyroZDiv = gyroDiv.querySelector('gyro-z');

gyro.addEventListener("reading", () => {
  console.log(`Rotation around the X-axis ${gyro.x}`);
  console.log(`Rotation around the Y-axis ${gyro.y}`);
  console.log(`Rotation around the Z-axis ${gyro.z}`);
  gyroXDiv.textContent = gyro.x.toFixed(2);
  gyroYDiv.textContent = gyro.y.toFixed(2);
  gyroZDiv.textContent = gyro.z.toFixed(2);
});

acl.addEventListener("reading", () => {
  console.log(`Acceleration along the X-axis ${acl.x}`);
  console.log(`Acceleration along the Y-axis ${acl.y}`);
  console.log(`Acceleration along the Z-axis ${acl.z}`);
  aclXDiv.textContent = acl.x.toFixed(2);
  aclYDiv.textContent = acl.y.toFixed(2);
  aclZDiv.textContent = acl.z.toFixed(2);
});

acl.start();
