/**
 * ==========================================================================
 * CONFETTI - Interactive Mouse Effect Component
 * ==========================================================================
 * 
 * This file contains the ConfettiEffect class that manages:
 * - Star particle creation and animation
 * - Mouse movement tracking
 * - Glow trail effects (currently disabled)
 * - Event handling for mouse and touch interactions
 */

class ConfettiEffect {
  /**
   * Initialize the confetti effect
   * @param {Object} config - Configuration object for the effect
   */
  constructor(config) {
    this.config = config;
    this.startTime = new Date().getTime();
    this.originPosition = { x: 0, y: 0 };
    this.last = {
      starTimestamp: this.startTime,
      starPosition: this.originPosition,
      mousePosition: this.originPosition
    };
    this.animationCount = 0;
    this.init();
  }

  /**
   * Initialize the effect by setting up event listeners
   */
  init() {
    this.setupEventListeners();
  }

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================

  /**
   * Generate random number between min and max (inclusive)
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number
   */
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Select random item from array
   * @param {Array} items - Array to select from
   * @returns {*} Random item from array
   */
  selectRandom(items) {
    return items[this.rand(0, items.length - 1)];
  }

  /**
   * Add unit to value
   * @param {number} value - Numeric value
   * @param {string} unit - Unit string (px, rem, etc.)
   * @returns {string} Value with unit
   */
  withUnit(value, unit) {
    return `${value}${unit}`;
  }

  /**
   * Convert value to pixels
   * @param {number} value - Numeric value
   * @returns {string} Value with px unit
   */
  px(value) {
    return this.withUnit(value, "px");
  }

  /**
   * Convert value to milliseconds
   * @param {number} value - Numeric value
   * @returns {string} Value with ms unit
   */
  ms(value) {
    return this.withUnit(value, "ms");
  }

  /**
   * Calculate distance between two points
   * @param {Object} a - First point {x, y}
   * @param {Object} b - Second point {x, y}
   * @returns {number} Distance between points
   */
  calcDistance(a, b) {
    const diffX = b.x - a.x;
    const diffY = b.y - a.y;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }

  /**
   * Calculate elapsed time between two timestamps
   * @param {number} start - Start timestamp
   * @param {number} end - End timestamp
   * @returns {number} Elapsed time in milliseconds
   */
  calcElapsedTime(start, end) {
    return end - start;
  }

  // ==========================================================================
  // DOM MANIPULATION
  // ==========================================================================

  /**
   * Append element to document body
   * @param {HTMLElement} element - Element to append
   */
  appendElement(element) {
    document.body.appendChild(element);
  }

  /**
   * Remove element from document body after delay
   * @param {HTMLElement} element - Element to remove
   * @param {number} delay - Delay in milliseconds
   */
  removeElement(element, delay) {
    setTimeout(() => {
      if (document.body.contains(element)) {
        document.body.removeChild(element);
      }
    }, delay);
  }

  // ==========================================================================
  // PARTICLE CREATION
  // ==========================================================================

  /**
   * Create a star particle at the specified position
   * @param {Object} position - Position object {x, y}
   */
  createStar(position) {
    const star = document.createElement("span");
    const color = this.selectRandom(this.config.colors);
    
    // Set star properties
    star.className = "star";
    star.textContent = "★";
    
    // Apply styling
    star.style.left = this.px(position.x);
    star.style.top = this.px(position.y);
    star.style.fontSize = this.selectRandom(this.config.sizes);
    star.style.color = `rgb(${color})`;
    star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
    star.style.animationName = this.config.animations[this.animationCount++ % 3];
    star.style.animationDuration = this.ms(this.config.starAnimationDuration);
    
    // Add to DOM and schedule removal
    this.appendElement(star);
    this.removeElement(star, this.config.starAnimationDuration);
  }

  /**
   * Create a glow point at the specified position
   * @param {Object} position - Position object {x, y}
   */
  createGlowPoint(position) {
    const glow = document.createElement("div");
    glow.className = "glow-point";
    glow.style.left = this.px(position.x);
    glow.style.top = this.px(position.y);
    
    this.appendElement(glow);
    this.removeElement(glow, this.config.glowDuration);
  }

  // ==========================================================================
  // EVENT HANDLING
  // ==========================================================================

  /**
   * Handle mouse movement events
   * @param {Event} e - Mouse event
   */
  handleOnMove(e) {
    const mousePosition = { x: e.clientX, y: e.clientY };
    
    // Initialize mouse position if needed
    if (this.last.mousePosition.x === 0 && this.last.mousePosition.y === 0) {
      this.last.mousePosition = mousePosition;
    }
    
    const now = new Date().getTime();
    const hasMovedFarEnough = this.calcDistance(this.last.starPosition, mousePosition) >= this.config.minimumDistanceBetweenStars;
    const hasBeenLongEnough = this.calcElapsedTime(this.last.starTimestamp, now) > this.config.minimumTimeBetweenStars;
    
    // Create star if conditions are met
    if (hasMovedFarEnough || hasBeenLongEnough) {
      this.createStar(mousePosition);
      this.last.starTimestamp = now;
      this.last.starPosition = mousePosition;
    }
    
    // Update mouse position
    this.last.mousePosition = mousePosition;
  }

  /**
   * Set up event listeners for mouse, touch, and scroll interactions
   */
  setupEventListeners() {
    // Mouse events
    window.onmousemove = (e) => this.handleOnMove(e);
    document.body.onmouseleave = () => {
      this.last.mousePosition = this.originPosition;
    };
    
    // Touch events (mobile)
    window.ontouchstart = (e) => this.handleOnMove(e.touches[0]);
    window.ontouchmove = (e) => this.handleOnMove(e.touches[0]);
    
    // Scroll events (more responsive on mobile)
    let scrollTimeout;
    window.onscroll = () => {
      // Create confetti at random positions during scroll
      if (Math.random() < 0.3) { // 30% chance on each scroll
        const randomX = Math.random() * window.innerWidth;
        const randomY = Math.random() * window.innerHeight;
        this.createStar({ x: randomX, y: randomY });
      }
      
      // Clear timeout and set new one
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Create a burst of confetti when scrolling stops
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            this.createStar({ x: randomX, y: randomY });
          }, i * 100);
        }
      }, 150);
    };
    
    // Click/tap events
    document.addEventListener('click', (e) => {
      this.createStar({ x: e.clientX, y: e.clientY });
    });
  }

  /**
   * Update configuration
   * @param {Object} newConfig - New configuration object
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Clean up event listeners and destroy the effect
   */
  destroy() {
    window.onmousemove = null;
    window.ontouchstart = null;
    window.ontouchmove = null;
    window.onscroll = null;
    document.body.onmouseleave = null;
    document.removeEventListener('click', this.handleClick);
  }
}
