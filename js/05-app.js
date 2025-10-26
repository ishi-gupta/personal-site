/**
 * ==========================================================================
 * APP - Main Application Controller
 * ==========================================================================
 * 
 * This file contains the main App class that:
 * - Initializes all components
 * - Manages the overall application state
 * - Provides public API for external control
 * - Handles component coordination
 */

class App {
  /**
   * Initialize the application
   */
  constructor() {
    this.config = SITE_CONFIG;
    this.components = {};
    this.init();
  }

  /**
   * Initialize the application by setting up the page and components
   */
  async init() {
    this.setupPage();
    await this.initializeComponents();
  }

  /**
   * Set up the page with personal information
   */
  setupPage() {
    // Set page title
    document.title = `${this.config.personal.name} - ${this.config.personal.title}`;
    
    // Update bio text if element exists
    const bioElement = document.querySelector('.section-description');
    if (bioElement) {
      bioElement.textContent = this.config.personal.bio;
    }
  }

  /**
   * Initialize all application components
   */
  async initializeComponents() {
    // Initialize Section Loader
    const contentContainer = document.querySelector('.main-content');
    if (contentContainer) {
      this.components.sections = new SectionLoader(contentContainer);
    }

    // Initialize Photo Gallery
    const galleryContainer = document.querySelector('.photo-gallery');
    if (galleryContainer) {
      this.components.gallery = new PhotoGallery(
        galleryContainer, 
        this.config.gallery.photos, 
        this.config.gallery
      );
    }

    // Initialize Confetti Effect
    this.components.confetti = new ConfettiEffect(this.config.confetti);
  }

  // ==========================================================================
  // PUBLIC API METHODS
  // ==========================================================================

  /**
   * Add a new photo to the gallery
   * @param {string} photoPath - Path to the new photo
   */
  addPhoto(photoPath) {
    if (this.components.gallery) {
      this.components.gallery.addPhoto(photoPath);
    }
  }

  /**
   * Remove a photo from the gallery by index
   * @param {number} index - Index of photo to remove
   */
  removePhoto(index) {
    if (this.components.gallery) {
      this.components.gallery.removePhoto(index);
    }
  }

  /**
   * Update confetti effect configuration
   * @param {Object} newConfig - New configuration object
   */
  updateConfettiConfig(newConfig) {
    if (this.components.confetti) {
      this.components.confetti.updateConfig(newConfig);
    }
  }

  /**
   * Update gallery configuration
   * @param {Object} newConfig - New configuration object
   */
  updateGalleryConfig(newConfig) {
    if (this.components.gallery) {
      this.components.gallery.updateConfig(newConfig);
    }
  }

  /**
   * Get current configuration
   * @returns {Object} Current site configuration
   */
  getConfig() {
    return this.config;
  }

  /**
   * Add a new section
   * @param {Object} sectionData - Section data object
   */
  addSection(sectionData) {
    if (this.components.sections) {
      this.components.sections.addSection(sectionData);
    }
  }

  /**
   * Remove a section by ID
   * @param {string} sectionId - ID of section to remove
   */
  removeSection(sectionId) {
    if (this.components.sections) {
      this.components.sections.removeSection(sectionId);
    }
  }

  /**
   * Update a section by ID
   * @param {string} sectionId - ID of section to update
   * @param {Object} newData - New section data
   */
  updateSection(sectionId, newData) {
    if (this.components.sections) {
      this.components.sections.updateSection(sectionId, newData);
    }
  }

  /**
   * Get all sections
   * @returns {Array} Array of section data
   */
  getSections() {
    return this.components.sections ? this.components.sections.getSections() : [];
  }

  /**
   * Clean up and destroy the application
   */
  destroy() {
    if (this.components.confetti) {
      this.components.confetti.destroy();
    }
    this.components = {};
  }
}

// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
  console.log('🎊 Ishita\'s Portfolio Site Initialized!');
});

// Make App class available globally for debugging
window.App = App;
