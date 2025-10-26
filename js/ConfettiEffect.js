// Confetti Effect Component
export class ConfettiEffect {
  constructor(config) {
    this.config = config;
    this.start = new Date().getTime();
    this.originPosition = { x: 0, y: 0 };
    this.last = {
      starTimestamp: this.start,
      starPosition: this.originPosition,
      mousePosition: this.originPosition
    };
    this.count = 0;
    this.init();
  }

  init() {
    this.setupEventListeners();
  }

  // Utility functions
  rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  selectRandom = items => items[this.rand(0, items.length - 1)];
  withUnit = (value, unit) => `${value}${unit}`;
  px = value => this.withUnit(value, "px");
  ms = value => this.withUnit(value, "ms");

  calcDistance = (a, b) => {
    const diffX = b.x - a.x;
    const diffY = b.y - a.y;
    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  }

  calcElapsedTime = (start, end) => end - start;

  appendElement = element => document.body.appendChild(element);
  removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

  createStar = (position) => {
    const star = document.createElement("span");
    const color = this.selectRandom(this.config.colors);
    
    star.className = "star";
    star.textContent = "★";
    
    star.style.left = this.px(position.x);
    star.style.top = this.px(position.y);
    star.style.fontSize = this.selectRandom(this.config.sizes);
    star.style.color = `rgb(${color})`;
    star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
    star.style.animationName = this.config.animations[this.count++ % 3];
    star.style.animationDuration = this.ms(this.config.starAnimationDuration);
    
    this.appendElement(star);
    this.removeElement(star, this.config.starAnimationDuration);
  }

  createGlowPoint = (position) => {
    const glow = document.createElement("div");
    glow.className = "glow-point";
    glow.style.left = this.px(position.x);
    glow.style.top = this.px(position.y);
    
    this.appendElement(glow);
    this.removeElement(glow, this.config.glowDuration);
  }

  determinePointQuantity = (distance) => Math.max(
    Math.floor(distance / this.config.maximumGlowPointSpacing),
    1
  );

  createGlow = (last, current) => {
    const distance = this.calcDistance(last, current);
    const quantity = this.determinePointQuantity(distance);
    
    const dx = (current.x - last.x) / quantity;
    const dy = (current.y - last.y) / quantity;
    
    Array.from(Array(quantity)).forEach((_, index) => { 
      const x = last.x + dx * index; 
      const y = last.y + dy * index;
      this.createGlowPoint({ x, y });
    });
  }

  updateLastStar = (position) => {
    this.last.starTimestamp = new Date().getTime();
    this.last.starPosition = position;
  }

  updateLastMousePosition = (position) => this.last.mousePosition = position;

  adjustLastMousePosition = (position) => {
    if(this.last.mousePosition.x === 0 && this.last.mousePosition.y === 0) {
      this.last.mousePosition = position;
    }
  };

  handleOnMove = (e) => {
    const mousePosition = { x: e.clientX, y: e.clientY };
    
    this.adjustLastMousePosition(mousePosition);
    
    const now = new Date().getTime();
    const hasMovedFarEnough = this.calcDistance(this.last.starPosition, mousePosition) >= this.config.minimumDistanceBetweenStars;
    const hasBeenLongEnough = this.calcElapsedTime(this.last.starTimestamp, now) > this.config.minimumTimeBetweenStars;
    
    if(hasMovedFarEnough || hasBeenLongEnough) {
      this.createStar(mousePosition);
      this.updateLastStar(mousePosition);
    }
    
    // Glow effect disabled as requested
    // this.createGlow(this.last.mousePosition, mousePosition);
    
    this.updateLastMousePosition(mousePosition);
  }

  setupEventListeners() {
    window.onmousemove = e => this.handleOnMove(e);
    window.ontouchmove = e => this.handleOnMove(e.touches[0]);
    document.body.onmouseleave = () => this.updateLastMousePosition(this.originPosition);
  }

  // Method to update configuration
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
  }

  // Method to destroy the effect
  destroy() {
    window.onmousemove = null;
    window.ontouchmove = null;
    document.body.onmouseleave = null;
  }
}
