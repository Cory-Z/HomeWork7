import { LitElement, html, css } from 'lit';

// Data for the 17 SDGs with their name, color, and image
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

// Define the `UnSdg` custom element class
export class UnSdg extends LitElement {
  
  // Define the properties for the component
  static get properties() {
    return {
      goal: { type: String, reflect: true },    
      label: { type: String },                 
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true }, 
      _currentSrc: { type: String },            
      alt: { type: String },                    
    };
  }

  // Define the styles for the component
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

  // Constructor to initialize default values
  constructor() {
    super();
    this.goal = '1';           
    this.label = '';            
    this.alt = null;            
    this.colorOnly = false;     
    this._currentSrc = null;    
  }

  // This method runs when the component is updated with new properties
  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();   
    }
  }

  // Method to update the image source and alt text based on the current goal
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
        // Ensure goal is between 1 and 17, then set the source and alt text
        this._currentSrc = new URL(`./lib/svgs/goal-${goalNumber}.svg`, import.meta.url).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`; 
      }
    }
  }

  // Render the component based on the state
  render() {
    const currentSrc = this._currentSrc || ''; 
    // Fallback to Sustainable Development Goal if neither label or alt are set
    const altText = this.label || this.alt || 'Sustainable Development Goal';

    if (this.colorOnly) {
      // Render color-only mode with the background color based on the goal
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }

    // Render the img element with lazy loading and low fetch priority
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

// Define the custom element so it can be used in HTML as <un-sdg>
customElements.define('un-sdg', UnSdg);