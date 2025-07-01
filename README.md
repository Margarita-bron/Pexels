# Pexels

### Project Description

**Pexels** is a single page app that clones some of the pages on the Pexels website (https://www.pexels.com/) using only images.

### Technologies Used

- **Vite** — project bundler (dev + build modes)
- **TypeScript** — strongly typed programming language
- **ESLint** — code linting and style checking
- **Prettier** — automatic code formatting
- **Husky** + lint-staged — Git hooks for code quality checks before commits
- **React** — state management library for applications
- **React-Redux** — connects Redux and React, allowing React components to interact with the Redux store

### Getting Started

1. **Clone the repository**
   `[git clone https://github.com/litelp/Pexels.git](https://github.com/Margarita-bron/Pexels.git)`
   `cd Pexels`
2. **Install dependencies**
   `npm install`
3. **Start the development server**
   `npm run dev`
4. **Build the project**
   `npm run build`

### Available Scripts

| **Script**            | **Description**                                         |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Run the development server                              |
| `npm run build`       | Build the project for production                        |
| `npm run lint`        | Run ESLint to check code style and issues               |
| `npm run format`      | Format code using Prettier                              |
| `npm run prepare`     | Setup Git hooks via Husky                               |
| `npm run lint-staged` | Run configured linters on staged files via lint-staged  |
