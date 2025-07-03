class LeanAngleGauge extends HTMLElement {
  constructor() {
    super();

    const container = Object.assign(document.createElement('div'), {
      className: 'container',
    });

    this.canvas = Object.assign(document.createElement('canvas'), {
      width: 0,
      height: 0,
    });

    this.output = Object.assign(document.createElement('pre'), {
      className: 'output',
    });

    this.ctx = this.canvas.getContext('2d');

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
      .container {
        position: relative;
      }
      .output {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        margin: 0;
        padding: 10px;
        background-color: rgba(255, 255, 255, 0.8);
        color: black;
        font-size: 2em;
      }
      </style>
    `;

    container.appendChild(this.canvas);
    container.appendChild(this.output);
    this.shadowRoot.appendChild(container);

    this.handleOrientation = this.handleOrientation.bind(this);
  }

  connectedCallback() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation);
    } else {
      console.warn('DeviceMotionEvent is not supported.');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }

  handleOrientation(event) {
    const isLandscape = screen.orientation.type.startsWith('landscape');
    const width = this.parentElement.clientWidth - 40;
    const height = width / 2;

    Object.assign(this.canvas, { width, height });

    const degrees = isLandscape ? event.beta : event.gamma; // gamma for landscape, beta for portrait
    const radians = degrees * (Math.PI / 180);

    this.ctx.clearRect(0, 0, width, height);

    // Draw background circle
    this.ctx.arc(height, height, height, 0, Math.PI * 2);
    // ctx.fillStyle = 'red';
    // ctx.fill();
    // ctx.strokeStyle = 'black';
    // ctx.lineWidth = 2;
    this.ctx.stroke();

    // Draw needle
    const pointX = (Math.sin(radians) * height) + (width / 2);
    const pointY = height - (Math.cos(radians) * height);

    this.ctx.beginPath();
    this.ctx.moveTo(width / 2, height);
    this.ctx.lineTo(pointX, pointY);
    this.ctx.stroke();
    this.ctx.closePath();

    this.output.textContent = `${degrees?.toFixed(2) || '?'}°`;
  }
}

customElements.define('lean-angle-gauge', LeanAngleGauge);
