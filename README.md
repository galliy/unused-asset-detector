#  Unused Asset Detector

A simple and effective CLI tool to detect and optionally delete unused static assets in a frontend codebase.

---

##  Objective

This tool scans your project for static assets like images, fonts, and stylesheets, and checks whether they are actually being referenced in your code. If not, it lists them and optionally deletes them — helping keep your project clean and optimized.

---

## Features

-  Detects unused assets in formats: `.png`, `.jpg`, `.jpeg`, `.svg`, `.gif`, `.woff`, `.woff2`, `.ttf`, `.css`, `.scss`
-  Scans code files: `.js`, `.ts`, `.jsx`, `.tsx`, `.html`, `.css`, `.scss`
-  Terminal report showing total, used, and unused assets
-  Optional prompt to delete unused assets
-  Easy to run as a CLI or npm script

---

## Setup & Installation

1. Clone or download the repository  
2. Install dependencies:

```bash
npm install
```

3. Open `scan-assets.js` and update the following lines to match your project paths:

```js
const assetFolder = 'C:/your-project-path/src/assets';
const projectFolder = 'C:/your-project-path/src';
```

---

## How to Run

Use this command to run the tool:

```bash
npm run unused:scan
```

###  You’ll Get:
- List of all unused assets  
- A summary  
- An optional prompt to delete them

---

## Example Output

```
 Unused Asset Detector Started...

 Scanning for asset files...
  - Found 1 .png files
  - Found 1 .svg files
 Found 2 asset files.

 Scanning for asset references in source files...
 Found 1 used asset references.

 Unused Assets Report:
• unused.svg

 Summary:
Total Assets: 2
Used Assets: 1
Unused Assets: 1

  Do you want to delete 1 unused asset(s)? (Y/n)
```

---

##  npm Script

```json
"scripts": {
  "unused:scan": "node scan-assets.js"
}
```

---

##  Folder Structure (Example)

```
your-frontend-project/
├── src/
│   ├── assets/
│   │   ├── logo.png
│   │   └── unused.svg
│   ├── index.html
│   └── ...
```

---

##  Built With

- Node.js
- [Chalk](https://www.npmjs.com/package/chalk) – for colored terminal output
- [Inquirer](https://www.npmjs.com/package/inquirer) – for interactive prompts
-  Glob](https://www.npmjs.com/package/glob) – for file searching

---

##  Author

**Galvin Richardson V**
