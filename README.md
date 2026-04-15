# Quick-MCQ

A quiz app for Sharma Tuitions. Built with React + Vite.

## Topics Covered
- Arrays
- Strings
- C++
- HTML
- CSS
- JavaScript
- React
- Computer Fundamentals

## Running Locally

### Prerequisites
- Node.js 18+ installed

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```

Then open http://localhost:5173 in your browser.

### Other commands

```bash
npm run build    # Build for production (outputs to dist/)
npm run preview  # Preview the production build locally
```

## Project Structure

```
quick-mcq/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Entry point
    ├── App.jsx               # Root component & screen routing
    ├── index.css             # Global styles
    ├── data/
    │   └── questions.js      # All 205 questions + helper functions
    └── components/
        ├── NameScreen.jsx    # Name entry screen
        ├── TopicScreen.jsx   # Topic selection screen
        ├── QuizScreen.jsx    # Quiz / question screen
        └── ResultScreen.jsx  # Results & answer review screen
```

## Customising

- **Add questions:** Edit `src/data/questions.js` — follow the existing format.
- **Add topics:** Add to the `TOPICS` array in `src/data/questions.js`.
- **Change footer text:** Edit the footer in `src/App.jsx`.
- **Change number of questions per quiz:** Change `.slice(0, 10)` in `getQuizQuestions()`.
