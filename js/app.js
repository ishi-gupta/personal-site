// Main Application
import { SITE_CONFIG } from './config.js';
import { PhotoGallery } from './PhotoGallery.js';
import { ConfettiEffect } from './ConfettiEffect.js';

class App {
  constructor() {
    this.config = SITE_CONFIG;
    this.init();
  }

  init() {
    this.setupPage();
    this.initializeComponents();
  }

  setupPage() {
    // Set page title
    document.title = `${this.config.name} - Personal Site`;
    
    // Update bio text
    const bioElement = document.querySelector('.info-panel p');
    if (bioElement) {
      bioElement.textContent = this.config.bio;
    }
  }

  initializeComponents() {
    // Initialize Photo Gallery
    const galleryContainer = document.querySelector('.photo-gallery');
    if (galleryContainer) {
      this.photoGallery = new PhotoGallery(
        galleryContainer, 
        this.config.photos, 
        this.config.gallery
      );
    }

    // Initialize Confetti Effect
    this.confettiEffect = new ConfettiEffect(this.config.confetti);
  }

  // Public methods for external control
  addPhoto(photoPath) {
    if (this.photoGallery) {
      this.photoGallery.addPhoto(photoPath);
    }
  }

  removePhoto(index) {
    if (this.photoGallery) {
      this.photoGallery.removePhoto(index);
    }
  }

  updateConfettiConfig(newConfig) {
    if (this.confettiEffect) {
      this.confettiEffect.updateConfig(newConfig);
    }
  }

  destroy() {
    if (this.confettiEffect) {
      this.confettiEffect.destroy();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
