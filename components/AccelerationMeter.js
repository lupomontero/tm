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
        .x > span {
          background-color: blue;
        }
        .y > span {
          background-color: green;
        }
        .z > span {
          background-color: red;
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
    const { x = 0.5, y = 1, z = -0.5 } = event.acceleration;
    // const { x = 0.5, y = 1, z = -0.5 } = {};

    const percentX = Math.min(Math.abs((x * 100) / 1.5), 100);
    this.spanX.style.height = `${Math.round(percentX / 2)}%`;
    // this.spanX.textContent = `${x.toFixed(2)}`;
    this.spanX.style.transform = x < 0 ? 'rotate(180deg)' : 'none';

    const percentY = Math.min(Math.abs((y * 100) / 1.5), 100);
    this.spanY.style.height = `${Math.round(percentY / 2)}%`;
    this.spanY.style.transform = y < 0 ? 'rotate(180deg)' : 'none';

    const percentZ = Math.min(Math.abs((z * 100) / 1.5), 100);
    this.spanZ.style.height = `${Math.round(percentZ / 2)}%`;
    this.spanZ.style.transform = z < 0 ? 'rotate(180deg)' : 'none';
  }
}

customElements.define('acceleration-meter', AccelerationMeter);
