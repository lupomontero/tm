class AccelerationMeter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          width: 0;
          height: 0;
          border: 1px solid #ddd;
          border-radius: 50%;
          position: relative;
        }
        .axis {
          position: absolute;
          width: 2px;
          height: 100%;
          background-color: #ccc;
        }
        .x {
          bottom: 50%;
          left: 0;
          transform-origin: bottom center;
          transform: rotate(90deg);
        }
        .y {
          top: 0;
          left: 50%;
          transform-origin: bottom center;
        }
        .z {
          bottom: 14.5%;
          left: 14.5%;
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
      <div class="container">
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

    this.container = this.shadowRoot.querySelector('.container');
    this.spanX = this.shadowRoot.querySelector('.x > span');
    this.spanY = this.shadowRoot.querySelector('.y > span');
    this.spanZ = this.shadowRoot.querySelector('.z > span');

    this.resize = this.resize.bind(this);
    this.handleMotion = this.handleMotion.bind(this);
  }

  connectedCallback() {
    this.resize();
    window.addEventListener('resize', this.resize);

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.handleMotion);
    } else {
      console.warn('DeviceMotionEvent is not supported.');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('devicemotion', this.handleMotion);
  }

  resize() {
    const diameter = Math.min(
      this.parentElement.clientWidth,
      this.parentElement.clientHeight,
    ) - 60; // Subtracting 40 for padding/margin
    this.container.style.width = `${diameter}px`;
    this.container.style.height = `${diameter}px`;
  }

  handleMotion(event) {
    const { x, y, z } = event.acceleration;
    // const { x = 0.5, y = 1, z = -0.5 } = {};

    const isLandscape = screen.orientation.type.startsWith('landscape');

    const setAxisValue = (el, value) => {
      const max = 1.5; // Maximum value for the axis
      const percent = Math.min(Math.abs((value * 100) / max), 100);

      el.style.height = `${Math.round(percent / 2)}%`;
      // el.textContent = `${value.toFixed(2)}`;
      el.style.transform = value < 0 ? 'rotate(180deg)' : 'none';
    };

    setAxisValue(this.spanX, isLandscape ? y : x);
    setAxisValue(this.spanY, isLandscape ? x : y);
    setAxisValue(this.spanZ, z);
  }
}

customElements.define('acceleration-meter', AccelerationMeter);
