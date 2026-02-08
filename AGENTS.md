# AGENTS.md - Guidelines for AI Coding Agents

This document provides guidelines for AI coding agents working on this backend catalog project.

## Project Overview

This is a Node.js/Express backend API with TypeScript, using MongoDB/Mongoose for data persistence. The project uses ES modules and follows strict TypeScript conventions.

## Build, Lint, and Test Commands

### Build Commands
```bash
# Compile TypeScript to JavaScript
npx tsc

# Or compile with watch mode for development
npx tsc --watch
```

### Development Server
```bash
# Run the compiled server (after building)
node dist/index.js

# Run with ts-node for direct TypeScript execution
npx ts-node index.ts
```

### Test Commands
```bash
# Run all tests (currently no tests configured)
npm test

# Run tests with coverage (when configured)
npm test -- --coverage

# Run a single test file
npm test -- path/to/test/file.test.ts

# Run a specific test by name
npm test -- --testNamePattern="specific test name"
```

### Linting
```bash
# Check for linting errors (requires ESLint to be configured)
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

## Code Style Guidelines

### Imports and Modules

- Use **ES modules** (`import`/`export`) exclusively - the project has `"type": "module"` in package.json
- Use TypeScript's `import type` when importing types only to avoid runtime overhead
- Organize imports in the following order:
  1. Built-in Node.js/ES imports
  2. Third-party library imports
  3. Relative imports (using `./` or `../`)
- Use named exports for utilities and interfaces
- Use default exports for main classes and server configurations

```typescript
// Correct
import express, { type Application } from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import Server from "./server/config.js";

// Avoid
const express = require("express");
```

### TypeScript Configuration

- The project uses `strict: true` - enable all strict type checking flags
- Always define explicit types for function parameters and return values
- Use interfaces for object shapes and type aliases for unions/primitives
- Enable `noUncheckedIndexedAccess` for safer array/object access
- Use `verbatimModuleSyntax` for explicit module imports

### Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase | `class Server {}` |
| Interfaces | PascalCase | `interface Servidor {}` |
| Types | PascalCase | `type Port = number \| string` |
| Variables | camelCase | `const serverPort = 3000` |
| Constants | SCREAMING_SNAKE_CASE or camelCase | `const DEFAULT_PORT = 3000` |
| Files | kebab-case or PascalCase for classes | `server-config.ts` |
| Methods/Functions | camelCase | `startServer()` |

### Formatting and Style

- Use **2 spaces** for indentation (match existing codebase)
- Use **single quotes** for strings (consistent with Express/Node conventions)
- Use **semicolons** at the end of statements
- Add a space after commas in function calls and before opening braces
- Maximum line length: 100 characters (soft limit)
- Use trailing commas in multi-line objects and arrays

```typescript
// Correct
const server = new Server({
  host: 'localhost',
  port: 3000,
});

// Avoid
const server = new Server({host: 'localhost', port: 3000});
```

### Error Handling

- Use `try/catch` blocks with async/await operations
- Always log errors with descriptive messages using `console.error` or a logger
- Create custom error classes for domain-specific errors when needed
- Never swallow errors silently - at minimum log them
- Use proper HTTP status codes in API responses

```typescript
// Correct
try {
  await database.connect();
} catch (error) {
  console.error('Failed to connect to database:', error);
  throw new Error('Database connection failed');
}

// Avoid - silent failure
try {
  await database.connect();
} catch (error) {
  // nothing
}
```

### Async/Await Patterns

- Use `async/await` over raw promises for better readability
- Never mix callbacks with promises - stick to async/await
- Always handle promise rejections, never leave promises unhandled

```typescript
// Correct
async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.info('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}
```

### File Structure

```
project-root/
├── index.ts              # Entry point
├── db/
│   └── config.ts         # Database configuration
├── server/
│   └── config.ts         # Server setup and routes
├── public/               # Static files
├── dist/                 # Compiled output (generated)
└── node_modules/         # Dependencies
```

### API Response Patterns

- Use consistent response structures across all endpoints
- Include proper error messages in responses
- Use appropriate HTTP status codes (200, 201, 400, 404, 500, etc.)

```typescript
// Success response
res.status(200).json({
  success: true,
  data: responseData,
});

// Error response
res.status(500).json({
  success: false,
  error: 'Failed to process request',
});
```

### Environment Variables

- Never commit `.env` files or secrets to version control
- Use `process.env` for configuration
- Provide example `.env.example` file with all required variables
- Use sensible defaults for development

```typescript
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/catalog';
```

### Comments and Documentation

- Use JSDoc comments for public APIs and complex functions
- Write self-documenting code - avoid redundant comments
- Add comments for non-obvious business logic or workarounds
- Keep comments up to date when modifying code

### Git Commits

- Use conventional commit messages: `feat:`, `fix:`, `docs:`, `refactor:`
- Keep commits atomic and focused on a single change
- Write commit messages in English for consistency

```bash
feat: add product catalog API endpoints
fix: resolve database connection timeout issue
docs: update API documentation for v1
```

## Testing Guidelines

- Write unit tests for utility functions and controllers
- Use integration tests for API endpoints
- Follow the AAA pattern: Arrange, Act, Assert
- Keep tests isolated and independent
- Use meaningful test names that describe the behavior being tested

## Performance Considerations

- Use connection pooling for database connections
- Implement caching where appropriate
- Avoid blocking the event loop with synchronous file I/O in production
- Use compression middleware for API responses

## Security Best Practices

- Validate all user inputs on the server side
- Use CORS properly configured for specific origins
- Never expose sensitive information in error messages
- Use HTTPS in production environments
- Implement rate limiting for API endpoints
