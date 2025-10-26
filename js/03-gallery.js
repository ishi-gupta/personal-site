/**
 * ==========================================================================
 * GALLERY - Photo Gallery Component
 * ==========================================================================
 * 
 * This file contains the PhotoGallery class that manages:
 * - Dynamic photo loading and display
 * - Seamless scrolling animation
 * - Gallery item creation and management
 */

class PhotoGallery {
  /**
   * Initialize the photo gallery
   * @param {HTMLElement} container - The gallery container element
   * @param {Array} photos - Array of photo file paths
   * @param {Object} config - Gallery configuration object
   */
  constructor(container, photos, config) {
    this.container = container;
    this.photos = photos;
    this.config = config;
    this.init();
  }

  /**
   * Initialize the gallery by creating the structure and starting animation
   */
  init() {
    this.createGalleryStructure();
    this.startScrollingAnimation();
  }

  /**
   * Create the gallery HTML structure with photos
   */
  createGalleryStructure() {
    this.container.innerHTML = `
      <div class="gallery-container">
        <div class="gallery-track">
          ${this.createPhotoItems()}
          ${this.createPhotoItems()} <!-- Duplicate for seamless loop -->
        </div>
      </div>
    `;
  }

  /**
   * Generate HTML for all photo items
   * @returns {string} HTML string of photo items
   */
  createPhotoItems() {
    return this.photos.map((photo, index) => `
      <div class="gallery-item">
        <img src="${photo}" alt="Photo ${index + 1}" loading="lazy">
      </div>
    `).join('');
  }

  /**
   * Start the scrolling animation with configured duration
   */
  startScrollingAnimation() {
    const track = this.container.querySelector('.gallery-track');
    if (track) {
      track.style.animationDuration = `${this.config.scrollDuration}s`;
    }
  }

  /**
   * Add a new photo to the gallery
   * @param {string} photoPath - Path to the new photo
   */
  addPhoto(photoPath) {
    this.photos.push(photoPath);
    this.createGalleryStructure();
    this.startScrollingAnimation();
  }

  /**
   * Remove a photo from the gallery by index
   * @param {number} index - Index of photo to remove
   */
  removePhoto(index) {
    if (index >= 0 && index < this.photos.length) {
      this.photos.splice(index, 1);
      this.createGalleryStructure();
      this.startScrollingAnimation();
    }
  }

  /**
   * Update gallery configuration
   * @param {Object} newConfig - New configuration object
   */
  updateConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    this.startScrollingAnimation();
  }
}
