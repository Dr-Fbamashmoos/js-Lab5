# Lab 5 — CV 2.0: Make Your CV Interactive

**CPIT 405 — JavaScript Part 3: Document Object Model (DOM)**  
**Type:** Individual practical lab · **Marks:** 10 · **Suggested time:** One lab session + completion at home if needed

> **Use your own CV from Lab 3. Do not create a new CV website.** In Lab 3, you designed it with HTML and CSS. In this lab, you will add useful visitor-facing features with JavaScript DOM. You will receive instructions and method hints, **not a complete JavaScript solution**.

## 1. Learning outcomes

By the end of the lab, you should be able to:

- Select elements with `getElementById()`, `querySelector()`, or `querySelectorAll()`.
- Respond to user actions with `addEventListener()`.
- Modify element content and CSS classes with `textContent` and `classList`.
- Create and insert elements using `createElement()` and `appendChild()`.
- Organize project data in an array of objects, then display it dynamically.
- Build a useful, responsive CV that can be published through GitHub Pages.

## 2. Before you start — Use your existing CV

1. Open the **same CV website that you created in Lab 3** in VS Code.
2. Keep your existing HTML, CSS, CV sections, and visual design. You may add the few controls and element identifiers described below.
3. Create a new file named **`script.js`**, next to your existing `index.html` and `style.css` files. If you already have a script file, you can extend it.
4. Link your JavaScript file before the closing `</body>` tag:

   ```html
   <script src="script.js"></script>
   ```

5. Run your own CV using Live Server. Open **Inspect → Console**, then check that your JavaScript file loads without errors.
6. Add a short comment above each task in `script.js`, such as `// Task 1 — Theme Switcher`.

**Suggested file structure:**

```text
my-cv/
├── index.html        ← Your existing CV
├── style.css         ← Your existing CSS (you may extend it)
└── script.js         ← New file: your DOM code
```

**GitHub recommendation:** You may continue updating the same CV repository so you keep one professional CV URL. Commit the work for Lab 5 separately so the changes are traceable. If you want to preserve the Lab 3 version, make a copy of that repository first. Do not rebuild the page from scratch.

## 3. HTML hooks — Add only what your page needs

The `id` and `class` values below are **suggested identifiers** to make the instructions consistent. You may adapt them to your CV as long as the corresponding JavaScript selectors are correct.

| Purpose | Suggested HTML hook | Location |
|:--|:--|:--|
| Switch theme | `<button id="theme-toggle" type="button">` | Header / navigation |
| Toggle extra About text | `<button id="about-toggle" type="button">` | About Me section |
| Additional About text | `<p id="about-extra" hidden>` | About Me section |
| Show dynamically generated projects | `<div id="projects-container"></div>` | Existing Projects section |
| Select project category | `class="project-filter" data-category="web"` | Projects filter buttons |
| Print / save CV | `<button id="print-cv" type="button">` | Header / contact area |
| Hide controls when printing | `class="no-print"` | Interactive controls |

**Important:** Keep the content of your original CV. For Task 3, replace only the **static project cards**, not the entire Projects section, with the `projects-container` placeholder. Tasks 3 and 4 share the same project data and container.

## Task 1 — Theme Switcher **(2 marks)**

**Goal:** Allow visitors to switch your CV between **Light Mode** and **Dark Mode**.

**Steps:**

1. Add a button to your CV with `id="theme-toggle"` and a label such as **Dark Mode**.
2. In `style.css`, define a second set of styles when the body has the class `.dark-mode`. Make sure text, backgrounds, links, and cards remain readable.
3. In `script.js`, select the button using a DOM selector.
4. Register a click event using `addEventListener()`.
5. When clicked, toggle the class `dark-mode` on the page's `<body>` using `classList.toggle()`.
6. Update the button label so visitors know which mode they can switch to next.

**Expected behavior:** Clicking the button changes the page theme instantly. Clicking it again restores the original theme. No page refresh is needed.

**Method hints:** `getElementById()`, `addEventListener()`, `document.body`, `classList.toggle()`, `textContent`.

## Task 2 — Show More / Show Less **(1.5 marks)**

**Goal:** Keep the About Me section concise while allowing visitors to read more.

**Steps:**

1. Keep a short introduction visible in your existing **About Me** section.
2. Place extra details in a separate element, such as `<p id="about-extra" hidden>...</p>`.
3. Add a button with `id="about-toggle"` and initial text **Show More**.
4. Use JavaScript to respond when the button is clicked.
5. Show or hide the extra content by modifying its `hidden` property (or by toggling a CSS class).
6. Change the button label between **Show More** and **Show Less** based on the current state.

**Expected behavior:** Additional About Me text appears and disappears, and the button label updates correctly.

**Method hints:** `querySelector()`, `addEventListener()`, `.hidden`, `.textContent`.

## Task 3 — Dynamic Project Cards **(3 marks)**

**Goal:** Display your project cards using **JavaScript data and DOM creation** instead of manually writing every project card in HTML.

**Steps:**

1. In your existing Projects section, add a container with `id="projects-container"`.
2. Remove or comment out the **old hard-coded project cards** from that container; do not remove the Projects heading or section.
3. In `script.js`, create an array named `projects` containing **at least two project objects** from **two categories**: `web` and `programming`. Projects from this course are acceptable.
4. Each project should have a title, category, brief description, and technologies. You may add a working URL if available.
5. Create a reusable function named `renderProjects(projectsToShow)`.
6. Inside that function, clear any previously rendered project cards so repeated calls do **not** duplicate them.
7. Loop through the supplied projects; for each project, use `document.createElement()` to create an `<article>` and the child elements needed to display its content.
8. Use `textContent` to fill elements, and `appendChild()` to add them to the card and then to `#projects-container`.
9. Add the class `project-card` to your generated `<article>` so it can reuse your existing CV styling.
10. Call the rendering function to display **all** projects when the page first loads.

**Suggested data structure (data example only, not a solution):**

```js
const projects = [
  {
    title: "My Personal CV",
    category: "web",
    description: "A responsive CV created with HTML and CSS.",
    technologies: ["HTML", "CSS"],
    url: "" // Optional: insert a real URL you own
  }
  // Add at least one more project in the "programming" category
];
```

**Expected behavior:** Projects are displayed as cards when the CV loads. Cards are created by JavaScript from data. Updating a project object in `script.js` and publishing the updated file changes the corresponding project card for all visitors.

**Method hints:** arrays, objects, `for...of`, `createElement()`, `textContent`, `appendChild()`, `classList.add()`, `remove()`.

**Safety:** Use `textContent` for project titles and descriptions. Do not insert untrusted user input directly through `innerHTML`.

## Task 4 — Filter Projects **(2 marks)**

**Goal:** Let visitors view projects by category without reloading the page.

**Steps:**

1. Add three filter buttons **above** the project cards: **All**, **Web**, and **Programming**.
2. Give all three buttons the class `project-filter`.
3. Add a `data-category` attribute to each button with the corresponding value: `all`, `web`, or `programming`.
4. Use `querySelectorAll()` to select the filter buttons and register click listeners.
5. When a button is clicked, read its category using `dataset.category`.
6. Use your array of projects with a loop and a condition (`if`) to decide which projects should be shown. You may use `.filter()` **if you already know it**, but it is not required for this lab.
7. Call the **same `renderProjects(...)` function from Task 3** with the selected projects. Avoid creating a separate hard-coded project list.
8. Indicate the active filter through a CSS class such as `.active`.

**Expected behavior:** **All** displays every project. **Web** displays only projects whose category is `web`. **Programming** displays only `programming` projects. Repeated switching does not duplicate cards.

**Method hints:** `querySelectorAll()`, `addEventListener()`, `dataset.category`, `for...of`, `if`, `classList`.

## Task 5 — Print / Save CV as PDF **(1.5 marks)**

**Goal:** Let visitors print your CV or save it as a PDF directly from their browser.

**Steps:**

1. Add a **Print / Save as PDF** button with `id="print-cv"`.
2. Add a click event listener in your JavaScript file.
3. When clicked, call the browser's print dialog using `window.print()`.
4. In `style.css`, add a `@media print` block to make the CV print-friendly.
5. Hide navigation, filter buttons, theme controls, and the print button when printing; using a shared class such as `.no-print` is recommended.
6. Ensure text is readable on a white background and project details are visible in print.
7. Check the output using **Print Preview**. Choose **Save as PDF** if available in your browser.

**Expected behavior:** The print dialog opens, and the printed/PDF CV excludes unnecessary controls while keeping the profile, education, skills, and projects readable.

**Method hints:** `getElementById()`, `addEventListener()`, `window.print()`, `@media print`.

## 4. Important limitations

- **No backend or database is needed.** This is a client-side DOM exercise.
- Interactive features work for anyone who opens your published CV. A visitor can switch themes, filter projects, and print the page.
- Visitor interactions do **not** permanently change your published files.
- To permanently edit your CV text, projects, or design, update your source files and push the changes to GitHub. GitHub Pages then serves the updated version.
- **Do not build an admin login panel** or attempt to save changes to GitHub using `innerHTML` or `localStorage` for this lab.

## 5. Assessment rubric — 10 marks

| Task | Marks |
|:--|--:|
| Task 1 — Theme Switcher | 2 |
| Task 2 — About Me Toggle | 1.5 |
| Task 3 — Dynamic Project Cards | 3 |
| Task 4 — Project Filter | 2 |
| Task 5 — Print / Save as PDF | 1.5 |
| **Total** | **10** |

## 6. Final checklist

- [ ] I used the **same CV from Lab 3**, not a new template.
- [ ] My `script.js` is correctly linked and has no uncaught Console errors.
- [ ] Light/Dark Mode can be toggled repeatedly.
- [ ] About Me extra text can be shown and hidden.
- [ ] Project cards are generated from JavaScript objects.
- [ ] There are at least two projects in two categories.
- [ ] All/Web/Programming filters work without duplicate cards.
- [ ] Print Preview hides controls and preserves useful CV content.
- [ ] My CV works correctly when published to GitHub Pages.
- [ ] I used only information I am comfortable publishing publicly.

## 7. Submission on Blackboard

Submit **both** links:

1. **GitHub Repository URL** — the source code for your updated CV.
2. **GitHub Pages URL** — the live, working CV where all five features can be tested.

**Do not submit the instructor's lab-instructions page as your own CV URL.** Your submission should point to your personal CV website.

### Optional challenge (no additional marks)

Use `.closest('.project-card')` to highlight the project card containing a clicked **Highlight Project** control, or use `.parentElement` and `.children` to inspect the DOM tree in the Console. This connects to DOM tree traversal from Part 3.
