# Test Your Knowledge - Quiz Application

A fun and interactive quiz app built with Next.js and React. Challenge yourself with 10 random general knowledge questions from a pool of 20 questions.

## Getting Started

You'll need Node.js 18 or higher installed on your machine.

Clone the repository and install dependencies:

```bash
git clone https://github.com/GokulChowdary7926/Quiz---Test-Your-Knowledge.git
cd Quiz---Test-Your-Knowledge
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:2026 in your browser to start the quiz.

For production builds:

```bash
npm run build
npm start
```

## Technologies Used

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons

## Features

The quiz randomly selects 10 questions from a pool of 20 general knowledge questions. Each question has 4 multiple choice options.

You can navigate between questions using the Previous and Next buttons, or use arrow keys on your keyboard. Press 1-4 to quickly select an answer.

The progress bar shows which questions you've completed (green), the current question (yellow), and upcoming questions (gray).

After completing all 10 questions, you'll see your score with an animated counter that counts up from 1% to your final score. The score display changes color based on your performance.

You can retry the same quiz or start a new test with different random questions.

The app is fully responsive and works on both desktop and mobile devices. It follows WCAG 2.1 accessibility guidelines with proper keyboard navigation and screen reader support.

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── quiz/
│       ├── QuizCard.tsx
│       └── QuizResults.tsx
└── data/
    └── quizData.ts
```

## Development

Run the linter:

```bash
npm run lint
```

The codebase uses TypeScript for type safety and follows clean code practices. All components are properly typed and there are no console logs or debug code in production.

## Time Spent

I spent approximately 7 hours on this project:
- Initial setup: 30 minutes
- Design implementation: 2 hours
- Quiz logic and state management: 1.5 hours
- Animations and transitions: 1 hour
- Accessibility features: 45 minutes
- Testing and bug fixes: 1 hour
- Code cleanup and documentation: 30 minutes

## Assumptions

This is a desktop-first design optimized for screens 1920px and above. All quiz data is stored client-side with no backend required. The app doesn't save progress between sessions, so each visit starts fresh.

## Author

Gokul Chowdary
