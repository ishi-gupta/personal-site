// Photo Gallery Component
export class PhotoGallery {
  constructor(container, photos, config) {
    this.container = container;
    this.photos = photos;
    this.config = config;
    this.init();
  }

  init() {
    this.createGallery();
    this.startAnimation();
  }

  createGallery() {
    // Create gallery structure
    this.container.innerHTML = `
      <div class="gallery-track">
        ${this.createPhotoItems()}
        ${this.createPhotoItems()} <!-- Duplicate for seamless loop -->
      </div>
    `;
  }

  createPhotoItems() {
    return this.photos.map((photo, index) => `
      <div class="gallery-item">
        <img src="${photo}" alt="Photo ${index + 1}" loading="lazy">
      </div>
    `).join('');
  }

  startAnimation() {
    const track = this.container.querySelector('.gallery-track');
    track.style.animationDuration = `${this.config.scrollDuration}s`;
  }

  // Method to add new photos dynamically
  addPhoto(photoPath) {
    this.photos.push(photoPath);
    this.createGallery();
    this.startAnimation();
  }

  // Method to remove photos
  removePhoto(index) {
    this.photos.splice(index, 1);
    this.createGallery();
    this.startAnimation();
  }
}
