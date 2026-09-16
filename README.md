# Kaagaz PDF-Tools

Kaagaz PDF-Tools is a browser-based PDF toolkit focused on simple PDF work without requiring an account.

**Live website:**  
https://zyvron66-devlop.github.io/Kaagaz/

---

## About

Kaagaz provides PDF tools that run directly in the browser for supported operations.

The project is designed to keep the workflow simple and, where supported, process files locally in the user's browser instead of requiring a separate file-upload backend.

---

## Available Tools

### Merge
Combine multiple PDF files into one PDF.

### Split
Extract selected pages from a PDF into a new PDF.

### Compress
Optimize PDF structure to reduce file size where possible.

### Images → PDF
Create an A4 PDF from JPG or PNG images.

### Rotate
Rotate selected PDF pages by 90°, 180° or 270°.

### Delete Pages
Remove unwanted pages from a PDF.

### Watermark
Add a light text watermark to PDF pages.

### Page Numbers
Add page numbers to PDF pages.

### Crop
Crop PDF pages by their edges.

### Metadata
Edit PDF title, author, subject and keywords.

---

## Main Characteristics

- Browser-based PDF workflow
- No account required for the main tools
- Local processing for supported core operations
- Responsive layout for desktop and mobile
- Static deployment through GitHub Pages

---

## Technology

- Next.js 14.2.5
- React 18.3.1
- TypeScript 5.5.4
- Tailwind CSS 3.4.6
- pdf-lib 1.17.1
- GitHub Pages
- GitHub Actions

---

## Project Structure

```text
Kaagaz/
├── .github/
│   └── workflows/
│       └── nextjs.yml
├── components/
├── pages/
├── public/
│   ├── kaagaz-logo.png
│   └── sitemap.xml
├── styles/
├── .gitignore
├── next.config.js
├── package.json
└── README.md
