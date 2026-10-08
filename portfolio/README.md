# Səma Məmmədova — Portfolio

A responsive personal portfolio built with HTML, CSS, and vanilla JavaScript. The project includes a portfolio homepage, an interactive task list, and a university management dashboard demo.

The interface supports Azerbaijani, Turkish, English, and Russian. Visitors can switch languages from the language selector in the navigation. Their selection is saved in the browser and shared across the project pages.

## Pages

- **Portfolio** — introduction, skills, projects, education, certificates, and contact details.
- **Todo List** — add, complete, filter, and remove tasks. Task data is saved in the browser.
- **University Management System** — manage sample student records, grades, attendance, and academic reports.

## Features

- Four-language interface: Azerbaijani (`AZ`), Turkish (`TR`), English (`EN`), and Russian (`RU`).
- Language preference persists across page navigation and browser refreshes.
- Light and dark themes persist across pages.
- Todo tasks are stored locally in the browser.
- The university dashboard supports student creation and deletion, grade and attendance updates, live calculations, search, and reports.
- Responsive layouts for desktop and mobile screens.
- No framework, package manager, build step, or external backend is required.

User-entered task text and student names are treated as data and are kept as entered when the interface language changes. The university dashboard ships with sample student records for demonstration.

## Run locally

1. Download and extract the project files.
2. Keep the HTML, CSS, and JavaScript files together in the same directory.
3. Open `index.html` in a modern browser.
4. Use the project cards to open the Todo List and University Management System pages.

The project can also be hosted as a static website. Place `index.html` and the other project files in the web root of the chosen static host.

## Project structure

```text
.
├── index.html             # Portfolio homepage
├── style.css              # Homepage styles
├── script.js              # Homepage interactions and theme control
├── i18n.js                # Language selector and translations
├── todo.html              # Todo List page
├── todo.css               # Todo List styles
├── todo.js                # Todo List behavior and local data storage
├── universitet.html       # University dashboard page
├── universitet.css        # Dashboard styles
└── universitet.js         # Dashboard behavior and calculations
```

## Browser storage

The site uses `localStorage` in the visitor's browser. Data is stored separately for each browser and device.

- `portfolio-language` — selected interface language.
- `portfolio-theme` — selected light or dark theme.
- `sema-portfolio-todos` — Todo List tasks.
- `sema-university-system` — University dashboard student records.

Clearing browser storage removes these locally saved preferences and demo records.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- `Intl.DateTimeFormat` for locale-aware dates

## License

No license is currently specified. Contact the repository owner before reusing or redistributing this project.
