# Lecture 02 – Semantic HTML & Structure

## 1. What I implemented this lecture
- Structured the portfolio using semantic HTML elements (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Added a skip link for keyboard and screen reader accessibility
- Used `<figure>` and `<figcaption>` for images and embedded media
- Added an embedded YouTube video using `<iframe>`
- Created an Areas of Interest section with grouped lists
- Added a footer with social media links using proper `<a>` elements

---

## 2. Semantic decisions I made (REQUIRED)

### Decision 1
- **Element(s) used:** `<section>` and `<article>`
- **Where in the page:** Portfolio/Works section and Areas of Interest section
- **Why this element is semantically correct:** `<section>` groups thematically related content under a heading. `<article>` is used inside because each project and interest group is self-contained and independently meaningful — more descriptive than a plain `<div>`.

### Decision 2
- **Element(s) used:** `<figure>` and `<figcaption>`
- **Where in the page:** Around images and the embedded YouTube `<iframe>`
- **Why this element is semantically correct:** `<figure>` semantically associates a media element with its caption, telling browsers and assistive technologies that the image/video and its description belong together.

### Decision 3
- **Element(s) used:** `<footer>` with `<nav>` and `aria-label`
- **Where in the page:** Bottom of the page for social links
- **Why this element is semantically correct:** `<footer>` marks end-of-page content. Wrapping links in `<nav aria-label="Social media links">` creates a navigational landmark that screen readers can identify and jump to directly.

---

## 3. Accessibility considerations
- **Skip link** (`<a href="#main">Skip to content</a>`): Lets keyboard users bypass the header and jump straight to main content.
- **Alt text on all images**: Every `<img>` has a descriptive `alt` attribute for screen readers.
- **Correct heading hierarchy** (`h1` → `h2` → `h3`): Only one `<h1>` exists; headings descend logically for screen reader navigation.
- **Semantic landmarks** (`<header>`, `<main>`, `<nav>`, `<footer>`): Allow assistive technologies to jump between major page regions.
- **`title` attribute on iframe**: Lets screen readers announce what the media element contains.

---

## 4. What I learned
- The difference between semantic elements and generic containers like `<div>`
- How `<figure>` and `<figcaption>` associate media with descriptions
- How heading hierarchy affects accessibility and document structure
- Why skip links matter for keyboard-only users

---

## 5. What I still need to improve
- Replace placeholder images with real project screenshots
- Expand the portfolio with more completed projects
- Add more detailed project descriptions

---

## 6. Notes about AI usage (if any)
- **Tool used:** Claude (Anthropic)
- **What I accepted as-is:** Initial HTML structure and README template
- **What I modified manually:** Personal details, project descriptions, social media links, and interest content