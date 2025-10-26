/**
 * ==========================================================================
 * CONFIG - Site Configuration & Constants
 * ==========================================================================
 * 
 * This file contains all configuration settings for the site:
 * - Personal information
 * - Photo gallery settings
 * - Confetti effect parameters
 * - Animation timing and colors
 */

const SITE_CONFIG = {
  // Personal Information
  personal: {
    name: "ISHITA GUPTA",
    title: "Personal Portfolio",
    bio: "I'm a masters student at Stanford, studying CS on the systems track. I'm interested in nature, surfing, outdoor activities and building things that matter."
  },

  // Photo Gallery Configuration
  gallery: {
    photos: [
      "photos/05DEF2E2-B8E1-4B8E-8F07-8FBD9177D96A.JPG",
      "photos/12786F48-15E8-49E7-BAC5-5F43EAB49514.JPG", 
      "photos/1524DADF-EEC8-42F0-B5CD-CA243ED96BA9.JPG",
      "photos/BC3A784B-A174-40C9-B9BE-9F75B5B902DC.JPG",
      "photos/C12A9100-AB1A-4F8C-AF1D-59CE6F6F922C.JPG",
      "photos/F4BD14E1-5E12-4949-A20B-BDBF6EFF6B84.JPG"
    ],
    scrollDuration: 20, // seconds for full scroll cycle
    imageWidth: 250,
    imageHeight: 180,
    spacing: 0.8 // rem between images
  },

  // Confetti Effect Configuration
  confetti: {
    // Timing
    starAnimationDuration: 1500, // milliseconds
    minimumTimeBetweenStars: 100, // milliseconds
    minimumDistanceBetweenStars: 30, // pixels
    glowDuration: 75, // milliseconds
    maximumGlowPointSpacing: 10, // pixels

    // Visual Properties
    colors: [
      "255 179 71",  // Warm orange
      "255 107 157", // Bright pink
      "0 212 170",   // Turquoise
      "255 0 110",   // Hot magenta
      "0 217 255"    // Bright cyan
    ],
    sizes: ["2.5rem", "2rem", "1.5rem"], // Large, medium, small
    animations: ["fall-1", "fall-2", "fall-3"] // Animation class names
  }
};
