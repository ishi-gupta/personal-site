/**
 * ==========================================================================
 * SECTIONS - Dynamic Section Loader Component
 * ==========================================================================
 * 
 * This file contains the SectionLoader class that manages:
 * - Loading section data from JSON files
 * - Rendering sections dynamically
 * - Managing section order and display
 */

class SectionLoader {
  /**
   * Initialize the section loader
   * @param {HTMLElement} container - Container element for sections
   * @param {string} sectionsPath - Path to sections folder
   */
  constructor(container, sectionsPath = 'sections/') {
    this.container = container;
    this.sectionsPath = sectionsPath;
    this.sections = [];
    this.init();
  }

  /**
   * Initialize by loading and rendering sections
   */
  async init() {
    await this.loadSections();
    this.renderSections();
  }

  /**
   * Load all section files from the sections directory
   */
  async loadSections() {
    try {
      // For now, we'll define the sections manually since we can't read directory contents
      // In a real implementation, you'd fetch from a server endpoint
      const sectionFiles = [
        '01-about.json',
        '02-work.json'
      ];

      this.sections = [];
      
      for (const file of sectionFiles) {
        try {
          const response = await fetch(`${this.sectionsPath}${file}`);
          if (response.ok) {
            const sectionData = await response.json();
            this.sections.push(sectionData);
          }
        } catch (error) {
          console.warn(`Failed to load section ${file}:`, error);
        }
      }

      // Sort sections by number to ensure correct order
      this.sections.sort((a, b) => a.number.localeCompare(b.number));
      
    } catch (error) {
      console.error('Error loading sections:', error);
      // Fallback to default sections
      this.sections = this.getDefaultSections();
    }
  }

  /**
   * Get default sections as fallback
   * @returns {Array} Default section data
   */
  getDefaultSections() {
    return [
      {
        id: "about",
        number: "01",
        title: "hey! i'm ishita.",
        description: "I'm a masters student at Stanford, studying CS on the systems track. I'm interested in nature, surfing, outdoor activities and building things that matter.",
        links: [
          { text: "bio", href: "#bio" },
          { text: "resume →", href: "#resume" },
          { text: "links", href: "#links" }
        ],
        cta: { text: "about me →", href: "#about" }
      },
      {
        id: "work",
        number: "02",
        title: "sometimes i share my work here.",
        description: "",
        links: [
          { text: "projects", href: "#projects" },
          { text: "research", href: "#research" }
        ],
        cta: { text: "all work →", href: "#work" }
      }
    ];
  }

  /**
   * Render all sections to the container
   */
  renderSections() {
    this.container.innerHTML = this.sections.map(section => this.renderSection(section)).join('');
  }

  /**
   * Render a single section
   * @param {Object} section - Section data object
   * @returns {string} HTML string for the section
   */
  renderSection(section) {
    const linksHtml = section.links.map(link => 
      `<a href="${link.href}" class="nav-link">${link.text}</a>`
    ).join('');

    const descriptionHtml = section.description ? 
      `<p class="section-description">${section.description}</p>` : '';

    return `
      <section class="content-section" id="${section.id}">
        <div class="section-number">${section.number}</div>
        <h2 class="section-title">${section.title}</h2>
        ${descriptionHtml}
        <nav class="section-nav">
          ${linksHtml}
        </nav>
        <a href="${section.cta.href}" class="cta-link">${section.cta.text}</a>
      </section>
    `;
  }

  /**
   * Add a new section
   * @param {Object} sectionData - Section data object
   */
  addSection(sectionData) {
    this.sections.push(sectionData);
    this.sections.sort((a, b) => a.number.localeCompare(b.number));
    this.renderSections();
  }

  /**
   * Remove a section by ID
   * @param {string} sectionId - ID of section to remove
   */
  removeSection(sectionId) {
    this.sections = this.sections.filter(section => section.id !== sectionId);
    this.renderSections();
  }

  /**
   * Update a section by ID
   * @param {string} sectionId - ID of section to update
   * @param {Object} newData - New section data
   */
  updateSection(sectionId, newData) {
    const index = this.sections.findIndex(section => section.id === sectionId);
    if (index !== -1) {
      this.sections[index] = { ...this.sections[index], ...newData };
      this.renderSections();
    }
  }

  /**
   * Get all sections
   * @returns {Array} Array of section data
   */
  getSections() {
    return this.sections;
  }

  /**
   * Get a specific section by ID
   * @param {string} sectionId - ID of section to get
   * @returns {Object|null} Section data or null if not found
   */
  getSection(sectionId) {
    return this.sections.find(section => section.id === sectionId) || null;
  }
}
