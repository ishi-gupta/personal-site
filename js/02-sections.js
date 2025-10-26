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
        '02-work.json',
        '03-code.json',
        '04-startup.json',
        '05-explore.json',
        '06-languages.json',
        '07-move.json',
        '08-meditate.json',
        '09-chat.json'
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
      },
      {
        id: "code",
        number: "03",
        title: "code & research.",
        description: "I work on systems research projects that explore the intersection of technology and sustainability.",
        links: [
          { text: "research", href: "#research" },
          { text: "projects", href: "#projects" },
          { text: "github", href: "https://github.com/ishi-gupta" }
        ],
        cta: { text: "view research →", href: "#code" }
      },
      {
        id: "startup",
        number: "04",
        title: "building things that matter.",
        description: "I've co-founded several ventures focused on sustainability and education.",
        links: [
          { text: "circular economy startup", href: "#circular-economy" },
          { text: "edtech startup", href: "#edtech" },
          { text: "dora travel planner", href: "#dora" }
        ],
        cta: { text: "explore ventures →", href: "#startup" }
      },
      {
        id: "explore",
        number: "05",
        title: "exploring the world.",
        description: "Over the course of my life, I have lived in many beautiful countries and traveled to many more.",
        links: [
          { text: "places i've lived", href: "#places-lived" },
          { text: "travel stories", href: "#travel-stories" },
          { text: "cultural experiences", href: "#cultural-experiences" }
        ],
        cta: { text: "read more about where I have lived, worked and thrived →", href: "#explore" }
      },
      {
        id: "languages",
        number: "06",
        title: "learning languages.",
        description: "I'm passionate about learning new languages and immersing myself in different cultures through media.",
        links: [
          { text: "current languages", href: "#current-languages" },
          { text: "media i'm watching", href: "#media" },
          { text: "learning progress", href: "#progress" }
        ],
        cta: { text: "see my language journey →", href: "#languages" }
      },
      {
        id: "move",
        number: "07",
        title: "movement & adventure.",
        description: "I believe in the power of physical movement to connect us with nature and ourselves.",
        links: [
          { text: "triathlon", href: "#triathlon" },
          { text: "rock climbing", href: "#climbing" },
          { text: "surfing & freediving", href: "#water-sports" },
          { text: "pilates & yoga", href: "#mindful-movement" }
        ],
        cta: { text: "explore my adventures →", href: "#move" }
      },
      {
        id: "meditate",
        number: "08",
        title: "mindfulness & meditation.",
        description: "I've completed two transformative 10-day meditation camps that have deeply influenced my approach to life and work.",
        links: [
          { text: "10-day meditation camp #1", href: "#meditation-camp-1" },
          { text: "10-day meditation camp #2", href: "#meditation-camp-2" },
          { text: "daily practice", href: "#daily-practice" }
        ],
        cta: { text: "read about my meditation journey →", href: "#meditate" }
      }
    ];
  }

  /**
   * Render all sections to the container
   */
  renderSections() {
    this.container.innerHTML = this.sections.map(section => this.renderSection(section)).join('');
    
    // Initialize chat interface if chat section exists
    this.initializeChat();
  }

  /**
   * Initialize chat interface after sections are rendered
   */
  initializeChat() {
    const chatSection = this.container.querySelector('.chat-section');
    if (chatSection) {
      // Initialize chat functionality
      const terminalInput = chatSection.querySelector('.terminal-input');
      const chatOutput = chatSection.querySelector('.chat-output');
      
      if (terminalInput && chatOutput) {
        this.setupChatListeners(terminalInput, chatOutput);
      }
    }
  }

  /**
   * Set up chat event listeners
   * @param {HTMLElement} input - Chat input element
   * @param {HTMLElement} outputContainer - Chat output container
   */
  setupChatListeners(input, outputContainer) {
    // Handle Enter key press
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleChatMessage(input, outputContainer);
      }
    });

    // Set up dynamic cursor
    this.setupDynamicCursor(input);
  }

  /**
   * Set up dynamic cursor that moves with text
   * @param {HTMLElement} input - Input element
   */
  setupDynamicCursor(input) {
    const cursor = input.parentElement.querySelector('.dynamic-cursor');
    if (!cursor) return;

    // Create text measurement utility
    const textMeasurer = this.createTextMeasurer(input);
    
    const updateCursorPosition = () => {
      const text = input.value.substring(0, input.selectionStart);
      const promptWidth = this.measureTextWidth(textMeasurer, '>');
      const textWidth = this.measureTextWidth(textMeasurer, text);
      const cursorWidth = 8; // Width of our cursor rectangle
      
      // Position cursor after the text, accounting for prompt and cursor width
      const totalWidth = promptWidth + textWidth + cursorWidth;
      cursor.style.left = `${totalWidth}px`;
    };

    // Update cursor position on input events
    input.addEventListener('input', updateCursorPosition);
    input.addEventListener('keyup', updateCursorPosition);
    input.addEventListener('click', updateCursorPosition);
    input.addEventListener('focus', updateCursorPosition);

    // Initial position
    updateCursorPosition();
  }

  /**
   * Create a text measurement utility
   * @param {HTMLElement} input - Input element to match styling
   * @returns {HTMLElement} Hidden span for text measurement
   */
  createTextMeasurer(input) {
    const measurer = document.createElement('span');
    const inputStyles = window.getComputedStyle(input);
    
    // Copy all relevant font properties
    measurer.style.position = 'absolute';
    measurer.style.visibility = 'hidden';
    measurer.style.whiteSpace = 'pre';
    measurer.style.font = inputStyles.font;
    measurer.style.fontFamily = inputStyles.fontFamily;
    measurer.style.fontSize = inputStyles.fontSize;
    measurer.style.fontWeight = inputStyles.fontWeight;
    measurer.style.letterSpacing = inputStyles.letterSpacing;
    measurer.style.lineHeight = inputStyles.lineHeight;
    measurer.style.padding = '0';
    measurer.style.margin = '0';
    measurer.style.border = 'none';
    measurer.style.outline = 'none';
    
    input.parentElement.appendChild(measurer);
    return measurer;
  }

  /**
   * Measure the width of text using the measurer
   * @param {HTMLElement} measurer - Text measurement element
   * @param {string} text - Text to measure
   * @returns {number} Width in pixels
   */
  measureTextWidth(measurer, text) {
    // Replace spaces with non-breaking spaces for accurate measurement
    const normalizedText = text.replace(/ /g, '\u00A0');
    measurer.textContent = normalizedText;
    return measurer.offsetWidth;
  }

  /**
   * Handle chat message submission
   * @param {HTMLElement} input - Chat input element
   * @param {HTMLElement} outputContainer - Chat output container
   */
  handleChatMessage(input, outputContainer) {
    const message = input.value.trim();
    
    if (message) {
      // Add user message
      this.addChatLine(outputContainer, message, 'user');
      input.value = '';
      
      // Add bot response after delay
      setTimeout(() => {
        const response = this.generateChatResponse(message);
        this.addChatLine(outputContainer, response, 'bot');
      }, 500);
    }
  }

  /**
   * Add a line to the chat output
   * @param {HTMLElement} container - Chat output container
   * @param {string} content - Line content
   * @param {string} type - Line type ('user' or 'bot')
   */
  addChatLine(container, content, type) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'chat-line';
    
    if (type === 'user') {
      lineDiv.innerHTML = `> ${content}`;
    } else {
      lineDiv.innerHTML = content;
    }
    
    container.appendChild(lineDiv);
    
    // Scroll to bottom
    const chatSection = container.closest('.chat-section');
    if (chatSection) {
      chatSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }

  /**
   * Generate a chat response
   * @param {string} userMessage - User's message
   * @returns {string} Bot response
   */
  generateChatResponse(userMessage) {
    const responses = [
      `Thanks for asking about "${userMessage}"! I'm still learning about Ishita, but I'd love to help you find out more.`,
      `That's an interesting question about "${userMessage}"! Check out the sections above for more details.`,
      `I'm working on learning more about "${userMessage}". In the meantime, feel free to explore the sections above!`,
      `Great question about "${userMessage}"! I'm still being trained, but I can help you navigate the site.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Render a single section
   * @param {Object} section - Section data object
   * @returns {string} HTML string for the section
   */
  renderSection(section) {
    // Special handling for chat section
    if (section.isChat) {
      return this.renderChatSection(section);
    }

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
   * Render the chat section with interactive chat interface
   * @param {Object} section - Chat section data object
   * @returns {string} HTML string for the chat section
   */
  renderChatSection(section) {
    return `
      <section class="content-section chat-section" id="${section.id}">
        <div class="section-number">${section.number}</div>
        <h2 class="section-title">${section.title}</h2>
        
        <!-- Simple Chat Interface -->
        <div class="simple-chat">
          <div class="chat-output">
            <div class="chat-line">Hi! Ask me anything about Ishita.</div>
          </div>
          <div class="terminal-input-box">
            <div class="terminal-prompt">></div>
            <input type="text" class="terminal-input" placeholder="ask me anything..." />
            <div class="dynamic-cursor"></div>
          </div>
        </div>
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
