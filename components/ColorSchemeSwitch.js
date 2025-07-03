//
// https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark
//

class ColorSchemeSwitch extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
          background-color: transparent;
          border: none;
        }
      </style>
      <button id="toggle"></button>
    `;

    this.toggleColorScheme = this.toggleColorScheme.bind(this);
    this.handleColorSchemeChange = this.handleColorSchemeChange.bind(this);

    this.toggleButton = this.shadowRoot.querySelector('#toggle');
    this.toggleButton.addEventListener('click', this.toggleColorScheme);
  }

  connectedCallback() {
    this.setColorScheme(this.getDefaultColorScheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.handleColorSchemeChange);
  }

  disconnectedCallback() {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', this.handleColorSchemeChange);
  }

  handleColorSchemeChange(event) {
    const newColorScheme = event.matches ? 'dark' : 'light';
    console.log(`Color scheme changed to: ${newColorScheme}`);
  }

  getDefaultColorScheme() {
    return (
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );
  }

  setColorScheme(scheme) {
    document.documentElement.setAttribute('data-color-scheme', scheme);
    this.toggleButton.textContent = scheme === 'dark' ? '☀️' : '🌙';
  }

  toggleColorScheme() {
    const currentScheme = (
      document.documentElement.getAttribute('data-color-scheme')
      || this.getDefaultColorScheme()
    );

    this.setColorScheme(currentScheme === 'dark' ? 'light' : 'dark');
  }
}

customElements.define('color-scheme-switch', ColorSchemeSwitch);
