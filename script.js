/*
 * CPIT405 Lab 5 instructor demo (COMPLETED EXAMPLE).
 * Students should implement the requirements in their own Lab 3 CV,
 * rather than submit this instructor example as their work.
 */

// 1) Theme: modify a CSS class on the page.
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  themeToggle.textContent = dark ? '☀ Light Mode' : '☾ Dark Mode';
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
});

// 2) About: change a DOM property and update the button's label.
const aboutToggle = document.getElementById('about-toggle');
const aboutExtra = document.getElementById('about-extra');
aboutToggle.addEventListener('click', () => {
  aboutExtra.hidden = !aboutExtra.hidden;
  const expanded = !aboutExtra.hidden;
  aboutToggle.textContent = expanded ? 'Show Less −' : 'Show More +';
  aboutToggle.setAttribute('aria-expanded', String(expanded));
});

// 3) Dynamic projects: store data separately from the HTML structure.
const projects = [
  { title: 'Personal CV Website', category: 'web', description: 'A responsive personal CV created in CPIT405 using semantic HTML and CSS.', technologies: ['HTML', 'CSS'] },
  { title: 'Student Workshop Page', category: 'web', description: 'A clean registration page with accessible form fields and a flexible layout.', technologies: ['HTML', 'CSS'] },
  { title: 'JavaScript Course Profile', category: 'programming', description: 'Course data model using arrays, objects, functions, and conditional statements.', technologies: ['JavaScript'] },
  { title: 'Quiz Score Calculator', category: 'programming', description: 'A small JavaScript program that evaluates quiz scores and prints useful feedback.', technologies: ['JavaScript'] }
];

const projectsContainer = document.getElementById('projects-container');
const projectCount = document.getElementById('project-count');

function renderProjects(projectsToShow) {
  // Remove the existing cards to prevent duplicates when filters change.
  projectsContainer.replaceChildren();

  for (const project of projectsToShow) {
    const card = document.createElement('article');
    card.classList.add('project-card');

    const category = document.createElement('span');
    category.className = 'project-category';
    category.textContent = project.category;

    const heading = document.createElement('h3');
    heading.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    const technologies = document.createElement('div');
    technologies.className = 'project-tech';
    technologies.textContent = project.technologies.join(' · ');

    card.append(category, heading, description, technologies);
    projectsContainer.appendChild(card);
  }
  projectCount.textContent = `${projectsToShow.length} project${projectsToShow.length === 1 ? '' : 's'}`;
}

// 4) Filters: one data source + one reusable renderer.
const filterButtons = document.querySelectorAll('.project-filter');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedCategory = button.dataset.category;
    const visible = selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

    filterButtons.forEach((b) => {
      const active = b === button;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', String(active));
    });
    renderProjects(visible);
  });
});
renderProjects(projects);

// 5) Print the CV; print-specific CSS hides interactive controls.
document.getElementById('print-cv').addEventListener('click', () => window.print());
