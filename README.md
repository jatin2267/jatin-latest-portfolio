# Jatin Sharma — Modern Developer Portfolio & Build Pipeline

> A performance-focused, dark-themed personal portfolio website equipped with an automated asset-minification and code-obfuscation build pipeline.

---

## Features

- **Modern Dark-Mode Aesthetic**: Contemporary developer interface featuring sleek dark theme variables, subtle glowing accents, and glassmorphic navigation.
- **Interactive UI Components**:
  - Full-screen animated loading spinner ring that dismisses on window load.
  - Sticky glassmorphic navbar with active scroll-spy navigation highlighting.
  - Responsive mobile drawer navigation with smooth slide-in toggling.
  - Interactive project showcase cards with hover elevations and direct repository links.
  - Clean contact form with input validation.
- **Automated Node.js Build Pipeline (`build.js`)**:
  - **HTML Minification**: Minifies whitespace, eliminates comments, and condenses boolean attributes via `html-minifier-terser`.
  - **CSS Optimization**: Compresses and cleans stylesheet rules using `clean-css` (Level 2 optimizations).
  - **JavaScript Protection**: Obfuscates and minifies client logic using `javascript-obfuscator` (control flow flattening, string array encoding, hexadecimal naming).
  - **Asset Distribution**: Automatically mirrors images and packages production-ready assets into a self-contained `dist/` directory.

---

## Tech Stack

- **Frontend**: HTML5, CSS3 (CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism), Vanilla JavaScript (ES6+)
- **Build & Optimization Tooling**: Node.js, `html-minifier-terser`, `clean-css`, `javascript-obfuscator`
- **Typography & Icons**: Google Fonts (Playfair Display, Inter, Caveat), FontAwesome 6 CDN

---

## Project Structure

```plaintext
jatin-latest-portfolio/
├── css/
│   └── style.css                      # Master stylesheet with dark theme variables, responsive grids, and UI states
├── img/
│   └── about-img.jpeg                 # High-resolution author portrait image
├── js/
│   └── main.js                        # Client-side script for preloader, scroll-spy, mobile navigation, and UI events
├── build.js                           # Node.js automated production compilation and minification pipeline
├── index.html                         # Source HTML document with semantic sections, meta tags, and font imports
└── README.md                          # Project documentation
```

---

## How to Install and Run

### Option 1: Run the Source Directly
No compilation is required to view or edit the source:
1. Clone the repository:
   ```bash
   git clone https://github.com/jatin2267/jatin-latest-portfolio.git
   cd jatin-latest-portfolio
   ```
2. Open `index.html` in your web browser, or run a local server:
   ```bash
   npx serve .
   ```

### Option 2: Build the Production Distribution (`dist/`)
To build the minified and obfuscated production bundle:
1. Ensure [Node.js](https://nodejs.org/) is installed.
2. Install the build dependencies:
   ```bash
   npm install html-minifier-terser clean-css javascript-obfuscator
   ```
3. Run the build script:
   ```bash
   node build.js
   ```
4. The production-ready files will be generated in `dist/`:
   ```plaintext
   dist/
   ├── css/style.css
   ├── img/
   ├── js/main.js
   └── index.html
   ```

---

## Screenshots

> _Screenshots placeholder: Add previews of the dark-mode hero section, skills matrix, and project showcase cards here._

```markdown
![Portfolio Preview](img/about-img.jpeg)
```

---

## Author

- **Jatin** — [@jatin2267](https://github.com/jatin2267)
