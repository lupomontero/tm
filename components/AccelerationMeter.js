class AccelerationMeter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .meter {
          width: 80px;
          height: 80px;
          border: 1px solid #ddd;
          border-radius: 50%;
          position: relative;
        }
        .axis {
          position: absolute;
          width: 2px;
          height: 80px;
          background-color: #ccc;
        }
        .x {
          bottom: 39px;
          left: 0px;
          transform-origin: bottom center;
          transform: rotate(90deg);
        }
        .y {
          top: 0px;
          left: 39px;
          transform-origin: bottom center;
        }
        .z {
          bottom: 10px;
          left: 10px;
          transform-origin: bottom center;
          transform: rotate(45deg);
        }
        .axis > span {
          display: inline-block;
          width: 100%;
          height: 0%;
          position: absolute;
          bottom: 50%;
          left: 0;
          transform-origin: bottom center;
        }
      </style>
      <div class="meter">
        <div class="x axis">
          <span></span>
        </div>
        <div class="y axis">
          <span></span>
        </div>
        <div class="z axis">
          <span></span>
        </div>
      </div>
    `;
    this.spanX = this.shadowRoot.querySelector('.x > span');
    this.spanY = this.shadowRoot.querySelector('.y > span');
    this.spanZ = this.shadowRoot.querySelector('.z > span');

    // this.spanX.style.bottom = '50%';
    // this.spanX.style.left = '0';
    // this.spanX.style.transformOrigin = 'bottom center';

    this.spanX.style.backgroundColor = 'blue';
    this.spanY.style.backgroundColor = 'green';
    this.spanZ.style.backgroundColor = 'red';
  }

  connectedCallback() {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion.bind(this));
    } else {
      console.warn('DeviceMotionEvent is not supported.');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('devicemotion', this.handleMotion.bind(this));
  }

  handleMotion(event) {
    // this.setAcceleration({
    //   x: -1.3,
    //   y: -0.3,
    //   z: -0.5,
    // });
    this.setAcceleration(event.acceleration);
  }

  setAcceleration({ x, y, z }) {
    const percentX = Math.min(Math.abs((x * 100) / 1.5), 100);
    this.spanX.style.height = `${Math.round(percentX / 2)}%`;
    this.spanX.textContent = `${x.toFixed(2)}`;
    if (x < 0) {
      this.spanX.style.transform = 'rotate(180deg)';
    }

    const percentY = Math.min(Math.abs((y * 100) / 1.5), 100);
    this.spanY.style.height = `${Math.round(percentY / 2)}%`;
    // this.spanY.textContent = `${y.toFixed(2)}`;
    if (y < 0) {
      this.spanY.style.transform = 'rotate(180deg)';
    }

    const percentZ = Math.min(Math.abs((z * 100) / 1.5), 100);
    this.spanZ.style.height = `${Math.round(percentZ / 2)}%`;
    // this.spanZ.textContent = `${z.toFixed(2)}`;
    if (z < 0) {
      this.spanZ.style.transform = 'rotate(180deg)';
    }
  }
}

customElements.define('acceleration-meter', AccelerationMeter);
