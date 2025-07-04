class LeanAngleGauge extends HTMLElement {
  constructor() {
    super();

    //
    this.min = 0;
    this.max = 0;

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
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 0);
        margin: 0;
        padding: 10px;
        background-color: var(--bg-transparent);
        font-size: 2em;
        border-radius: 10px;
      }

      </style>
    `;

    container.appendChild(this.canvas);
    container.appendChild(this.output);
    this.shadowRoot.appendChild(container);

    this.resize = this.resize.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
  }

  connectedCallback() {
    this.resize();
    window.addEventListener('resize', this.resize);

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', this.handleOrientation);
    } else {
      console.warn('DeviceMotionEvent is not supported.');
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('deviceorientation', this.handleOrientation);
  }

  resize() {
    setTimeout(() => {
      const width = Math.min(
        this.parentElement.clientWidth,
        this.parentElement.clientHeight,
      ) - 40; // Subtracting 40 for padding/margin
      const height = width / 2;

      Object.assign(this.canvas, { width, height });
    }); // Allow time for the DOM to settle
  }

  handleOrientation(event) {
    const isLandscape = screen.orientation.type.startsWith('landscape');
    const degrees = isLandscape ? event.beta : event.gamma; // gamma for landscape, beta for portrait
    const { width, height } = this.canvas;
    const isDarkMode = document.documentElement.getAttribute('data-color-scheme') === 'dark';

    if (degrees < this.min) {
      this.min = degrees;
    }
    if (degrees > this.max) {
      this.max = degrees;
    }

    this.ctx.clearRect(0, 0, width, height);

    // Draw background circle
    this.ctx.arc(height, height, height, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    this.ctx.fill();
    this.ctx.strokeStyle = (
      isDarkMode
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'
    );
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    const drawRadius = (angle, lineWidth) => {
      const radians = angle * (Math.PI / 180);
      const pointX = (Math.sin(radians) * height) + (width / 2);
      const pointY = height - (Math.cos(radians) * height);

      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(width / 2, height);
      this.ctx.lineTo(pointX, pointY);
      this.ctx.strokeStyle = (
        isDarkMode
          ? 'rgba(255, 255, 255, 0.5)'
          : 'rgba(0, 0, 0, 0.5)'
      );
      this.ctx.stroke();
      this.ctx.closePath();
    };

    // Draw min line
    drawRadius(this.min, 1);
    // Draw max line
    drawRadius(this.max, 1);
    // Draw needle
    drawRadius(degrees, 5);

    this.output.textContent = `${degrees?.toFixed(2) || '?'}°`;
  }
}

customElements.define('lean-angle-gauge', LeanAngleGauge);
