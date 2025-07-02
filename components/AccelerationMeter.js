class AccelerationMeter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .meter {
          width: 100px;
          height: 100px;
          border: 2px solid black;
          border-radius: 50%;
          position: relative;
        }
        .needle {
          width: 2px;
          height: 50px;
          background-color: red;
          position: absolute;
          top: 25px;
          left: 49px;
          transform-origin: bottom center;
        }
      </style>
      <div class="meter">
        <div class="needle"></div>
      </div>
    `;
    this.needle = this.shadowRoot.querySelector('.needle');
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
    const acceleration = event.acceleration;

    if (acceleration && acceleration.x !== null && acceleration.y !== null) {
      const value = Math.sqrt(acceleration.x ** 2 + acceleration.y ** 2);
      this.setAcceleration(value);
    }
  }

  setAcceleration(value) {
    const angle = value * 180; // Convert to degrees
    this.needle.style.transform = `rotate(${angle}deg)`;
  }
}

customElements.define('acceleration-meter', AccelerationMeter);
