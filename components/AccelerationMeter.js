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

    this.spanX.style.display = 'inline-block';
    this.spanX.style.height = '0%';
    this.spanX.style.width = '100%';
    this.spanX.style.position = 'absolute';
    this.spanX.style.bottom = '50%';
    this.spanX.style.left = '0';
    this.spanX.style.transformOrigin = 'bottom center';

    this.spanX.style.backgroundColor = 'blue';
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
    //   x: 0.9,
    //   y: 0.3,
    //   z: 0,
    // });
    this.setAcceleration(event.acceleration);
  }

  setAcceleration({ x, y, z }) {
    const percentX = x >= 1.5 ? 100 : Math.abs((x * 100) / 1.5);
    this.spanX.style.height = `${percentX / 2}%`;
    if (x < 0) {
      this.spanX.style.transform = 'rotate(180deg)';
    }
  }
}

customElements.define('acceleration-meter', AccelerationMeter);
