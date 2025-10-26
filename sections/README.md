# Sections System

This folder contains JSON files that define the content sections for the website. Each section is automatically loaded and rendered by the SectionLoader component.

## How to Add a New Section

1. Create a new JSON file with the naming pattern: `XX-name.json` (where XX is a two-digit number for ordering)

2. Use this JSON structure:

```json
{
  "id": "unique-section-id",
  "number": "03",
  "title": "Your section title here.",
  "description": "Optional description text. Leave empty string if not needed.",
  "links": [
    {
      "text": "link text",
      "href": "#link-target"
    }
  ],
  "cta": {
    "text": "call to action →",
    "href": "#cta-target"
  }
}
```

## Example Section Files

- `01-about.json` - About section
- `02-work.json` - Work/portfolio section

## Section Properties

- **id**: Unique identifier for the section
- **number**: Display number (used for ordering and display)
- **title**: Main heading text
- **description**: Optional paragraph text (can be empty string)
- **links**: Array of navigation links
- **cta**: Call-to-action link object

## Managing Sections via JavaScript

You can also manage sections programmatically:

```javascript
// Add a new section
window.app.addSection({
  id: "contact",
  number: "03",
  title: "get in touch.",
  description: "Feel free to reach out!",
  links: [
    { text: "email", href: "mailto:ishita@example.com" },
    { text: "linkedin", href: "https://linkedin.com/in/ishita" }
  ],
  cta: { text: "contact me →", href: "#contact" }
});

// Update a section
window.app.updateSection("about", {
  title: "hey! i'm ishita gupta."
});

// Remove a section
window.app.removeSection("work");

// Get all sections
console.log(window.app.getSections());
```
