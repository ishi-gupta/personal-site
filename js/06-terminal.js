/**
 * ==========================================================================
 * TERMINAL - Terminal Chat Interface Component
 * ==========================================================================
 * 
 * This file contains the TerminalChat class that manages:
 * - Chat message display and history
 * - User input handling
 * - LLM integration for personal assistant
 * - Terminal-style animations and effects
 */

class TerminalChat {
  /**
   * Initialize the terminal chat
   * @param {Object} config - Configuration object
   */
  constructor(config) {
    this.config = config;
    this.messages = [];
    this.isTyping = false;
    this.init();
  }

  /**
   * Initialize the chat interface
   */
  init() {
    this.setupElements();
    this.setupEventListeners();
    this.addWelcomeMessage();
  }

  /**
   * Set up DOM elements
   */
  setupElements() {
    this.messagesContainer = document.getElementById('chatMessages');
    this.inputField = document.getElementById('chatInput');
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !this.isTyping) {
        this.handleUserInput();
      }
    });

    this.inputField.addEventListener('focus', () => {
      this.inputField.classList.add('cursor-blink');
    });

    this.inputField.addEventListener('blur', () => {
      this.inputField.classList.remove('cursor-blink');
    });
  }

  /**
   * Add welcome message
   */
  addWelcomeMessage() {
    this.addMessage('system', 'Hello! I\'m your personal assistant for learning about Ishita. Ask me anything about her background, interests, or work!');
  }

  /**
   * Handle user input
   */
  async handleUserInput() {
    const userMessage = this.inputField.value.trim();
    if (!userMessage) return;

    // Add user message to chat
    this.addMessage('user', userMessage);
    this.inputField.value = '';

    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Get AI response
      const response = await this.getAIResponse(userMessage);
      this.hideTypingIndicator();
      this.addMessage('system', response);
    } catch (error) {
      this.hideTypingIndicator();
      this.addMessage('system', 'Sorry, I\'m having trouble connecting right now. Please try again later.');
      console.error('Chat error:', error);
    }
  }

  /**
   * Add a message to the chat
   * @param {string} type - Message type ('user' or 'system')
   * @param {string} text - Message text
   */
  addMessage(type, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = type === 'user' ? 'user@terminal:' : 'assistant@claude:';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = text;
    
    messageElement.appendChild(promptSpan);
    messageElement.appendChild(textSpan);
    
    this.messagesContainer.appendChild(messageElement);
    this.messages.push({ type, text, timestamp: Date.now() });
    
    // Scroll to bottom
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  /**
   * Show typing indicator
   */
  showTypingIndicator() {
    this.isTyping = true;
    const typingElement = document.createElement('div');
    typingElement.className = 'message system typing';
    typingElement.id = 'typingIndicator';
    
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'assistant@claude:';
    
    const textSpan = document.createElement('span');
    textSpan.className = 'text';
    textSpan.textContent = 'Thinking...';
    textSpan.classList.add('cursor-blink');
    
    typingElement.appendChild(promptSpan);
    typingElement.appendChild(textSpan);
    
    this.messagesContainer.appendChild(typingElement);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  /**
   * Hide typing indicator
   */
  hideTypingIndicator() {
    this.isTyping = false;
    const typingElement = document.getElementById('typingIndicator');
    if (typingElement) {
      typingElement.remove();
    }
  }

  /**
   * Get AI response (mock implementation)
   * @param {string} userMessage - User's message
   * @returns {Promise<string>} AI response
   */
  async getAIResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on keywords
    const responses = this.getMockResponses(userMessage);
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Get mock responses based on user input
   * @param {string} message - User message
   * @returns {Array<string>} Array of possible responses
   */
  getMockResponses(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('stanford') || lowerMessage.includes('school') || lowerMessage.includes('education')) {
      return [
        "Ishita is currently a masters student at Stanford University, studying Computer Science on the systems track. She completed her undergraduate degree in CS as well, focusing on systems programming.",
        "She's pursuing her masters at Stanford with a focus on computer systems. Her academic background is in computer science with a specialization in systems-level programming.",
        "At Stanford, Ishita is deepening her knowledge in computer systems and low-level programming. She's passionate about building efficient, scalable systems."
      ];
    }
    
    if (lowerMessage.includes('interest') || lowerMessage.includes('hobby') || lowerMessage.includes('surfing') || lowerMessage.includes('nature')) {
      return [
        "Ishita has a deep love for nature and outdoor activities. She's particularly passionate about surfing and enjoys spending time in the ocean. She believes in the importance of balancing technical work with outdoor adventures.",
        "When she's not coding, you'll find Ishita surfing, hiking, or exploring nature. She's an advocate for environmental conservation and sustainable living.",
        "Her interests include surfing, outdoor activities, and environmental conservation. She believes that time in nature is essential for creativity and mental well-being."
      ];
    }
    
    if (lowerMessage.includes('work') || lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('code')) {
      return [
        "Ishita is passionate about building things that matter. She focuses on systems programming and enjoys working on projects that have real-world impact.",
        "She's interested in creating efficient, scalable systems and building technology that makes a positive difference in people's lives.",
        "Her work philosophy centers around building meaningful technology. She's particularly drawn to systems that can handle real-world challenges and scale effectively."
      ];
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      return [
        "You can reach out to Ishita through the contact links in her portfolio. She's always interested in connecting with fellow developers and people working on interesting projects.",
        "Feel free to reach out if you'd like to collaborate or just chat about technology, surfing, or anything else! She's open to new opportunities and connections.",
        "Ishita is always happy to connect with like-minded people. Check out her contact information in the portfolio sections above."
      ];
    }
    
    // Default responses
    return [
      "That's an interesting question! Ishita is a masters student at Stanford studying CS on the systems track. She's passionate about building things that matter, surfing, and spending time in nature.",
      "Ishita combines her technical skills with a love for the outdoors. She's currently at Stanford working on systems programming while maintaining a healthy balance with surfing and environmental interests.",
      "She's a systems-focused computer scientist who believes in the power of technology to make a positive impact. When not coding, she's likely surfing or exploring nature.",
      "Ishita is passionate about both technology and the environment. She's building her career in computer systems while staying connected to nature through surfing and outdoor activities."
    ];
  }

  /**
   * Clear chat history
   */
  clearChat() {
    this.messages = [];
    this.messagesContainer.innerHTML = '';
    this.addWelcomeMessage();
  }

  /**
   * Get chat history
   * @returns {Array} Array of message objects
   */
  getChatHistory() {
    return this.messages;
  }
}
