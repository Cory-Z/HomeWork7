import { LitElement, html, css } from 'lit';

const goalData = [
  { name: 'No Poverty', color: '#e5243b', image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href },
  { name: 'Zero Hunger', color: '#dda63a', image: new URL('../lib/svgs/goal-2.svg', import.meta.url).href },
  { name: 'Good Health and Well-being', color: '#4c9f38', image: new URL('../lib/svgs/goal-3.svg', import.meta.url).href },
  { name: 'Quality Education', color: '#c5192d', image: new URL('../lib/svgs/goal-4.svg', import.meta.url).href },
  { name: 'Gender Equality', color: '#ff3a21', image: new URL('../lib/svgs/goal-5.svg', import.meta.url).href },
  { name: 'Clean Water and Sanitation', color: '#26bde2', image: new URL('../lib/svgs/goal-6.svg', import.meta.url).href },
  { name: 'Affordable and Clean Energy', color: '#fcc30b', image: new URL('../lib/svgs/goal-7.svg', import.meta.url).href },
  { name: 'Decent Work and Economic Growth', color: '#a21942', image: new URL('../lib/svgs/goal-8.svg', import.meta.url).href },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925', image: new URL('../lib/svgs/goal-9.svg', import.meta.url).href },
  { name: 'Reduced Inequalities', color: '#dd1367', image: new URL('../lib/svgs/goal-10.svg', import.meta.url).href },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24', image: new URL('../lib/svgs/goal-11.svg', import.meta.url).href },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e', image: new URL('../lib/svgs/goal-12.svg', import.meta.url).href },
  { name: 'Climate Action', color: '#3f7e44', image: new URL('../lib/svgs/goal-13.svg', import.meta.url).href },
  { name: 'Life Below Water', color: '#0a97d9', image: new URL('../lib/svgs/goal-14.svg', import.meta.url).href },
  { name: 'Life on Land', color: '#56c02b', image: new URL('../lib/svgs/goal-15.svg', import.meta.url).href },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d', image: new URL('../lib/svgs/goal-16.svg', import.meta.url).href },
  { name: 'Partnerships for the Goals', color: '#19486a', image: new URL('../lib/svgs/goal-17.svg', import.meta.url).href }
];

export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .color-only {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.goal = '1';
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    if (this.goal === 'all' || this.goal === 'circle') {
      this._currentSrc = new URL(`./lib/svgs/goal-${this.goal}.svg`, import.meta.url).href;
      this.alt =
        this.goal === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._currentSrc = new URL(`./lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
  }

  render() {
    // Ensure that the current source and alt text are defined before rendering
    const currentSrc = this._currentSrc || ''; // Fallback to an empty string if _currentSrc is undefined
    const altText = this.label || this.alt || 'Sustainable Development Goal'; // Fallback to a default alt text
  
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }
  
    return html`
      <img
        src="${currentSrc}"
        alt="${altText}"
        loading="lazy"
        fetchpriority="low"
      />
    `;
  }
}

customElements.define('un-sdg', UnSdg);