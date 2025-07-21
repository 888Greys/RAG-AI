# Contributing to Internal Knowledge Base

Thank you for your interest in contributing to the Internal Knowledge Base project! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm, yarn, or pnpm
- Git
- A code editor (VS Code recommended)

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/internal-knowledge-base.git
   cd internal-knowledge-base
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables** (see README.md)
5. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Guidelines

### Code Style

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the existing ESLint configuration
- **Prettier**: Code is automatically formatted
- **Naming**: Use descriptive variable and function names

### Component Guidelines

- **React Components**: Use functional components with hooks
- **File Structure**: Keep components in `/components` directory
- **Styling**: Use Tailwind CSS classes
- **Accessibility**: Ensure components are accessible

### API Guidelines

- **Route Handlers**: Use Next.js App Router API routes
- **Error Handling**: Implement proper error handling
- **Authentication**: Protect routes that require authentication
- **Validation**: Validate input data with Zod

## 📝 Commit Guidelines

### Commit Message Format

Use the following format for commit messages:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

### Examples

```bash
feat(chat): add message reactions
fix(auth): resolve login redirect issue
docs(readme): update installation instructions
style(components): improve button styling
refactor(api): optimize database queries
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features and bug fixes
- Use Jest and React Testing Library
- Aim for good test coverage
- Test both happy paths and error cases

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the bug
3. **Expected behavior**
4. **Actual behavior**
5. **Environment details** (OS, browser, Node.js version)
6. **Screenshots** if applicable

### Bug Report Template

```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Browser: [e.g., Chrome, Firefox, Safari]
- Node.js version: [e.g., 18.17.0]
- npm version: [e.g., 9.6.7]

## Additional Context
Any other context about the problem.
```

## 💡 Feature Requests

When requesting features, please include:

1. **Clear description** of the feature
2. **Use case** - why is this feature needed?
3. **Proposed solution** (if you have one)
4. **Alternative solutions** considered
5. **Additional context**

### Feature Request Template

```markdown
## Feature Description
A clear description of the feature you'd like to see.

## Problem/Use Case
What problem does this feature solve? What's the use case?

## Proposed Solution
How would you like this feature to work?

## Alternative Solutions
What other solutions have you considered?

## Additional Context
Any other context, screenshots, or examples.
```

## 🔄 Pull Request Process

### Before Submitting

1. **Create an issue** first (for significant changes)
2. **Fork the repository** and create a feature branch
3. **Write tests** for your changes
4. **Update documentation** if needed
5. **Run tests** and ensure they pass
6. **Check code style** with ESLint

### Pull Request Guidelines

1. **Clear title** describing the change
2. **Detailed description** of what was changed and why
3. **Link to related issues**
4. **Screenshots** for UI changes
5. **Test instructions** for reviewers

### Pull Request Template

```markdown
## Description
Brief description of the changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Changes Made
- List of changes made
- Another change
- etc.

## Testing
- [ ] Tests pass locally
- [ ] Added new tests for changes
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Code is commented where necessary
- [ ] Documentation updated
- [ ] Tests added/updated
```

## 📚 Documentation

### Types of Documentation

- **README.md**: Project overview and setup
- **API Documentation**: Document API endpoints
- **Component Documentation**: Document React components
- **Code Comments**: Explain complex logic

### Documentation Guidelines

- **Clear and concise**: Write for your audience
- **Examples**: Include code examples
- **Up-to-date**: Keep documentation current
- **Accessible**: Use simple language

## 🏗️ Architecture Guidelines

### Project Structure

```
├── ai/                 # AI configuration and middleware
├── app/               # Next.js app router
├── components/        # Reusable React components
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── tests/            # Test files
```

### Key Principles

- **Separation of Concerns**: Keep different functionalities separate
- **Reusability**: Create reusable components and utilities
- **Performance**: Optimize for speed and efficiency
- **Accessibility**: Ensure the app is accessible to all users
- **Security**: Follow security best practices

## 🤝 Community Guidelines

### Code of Conduct

- **Be respectful** and inclusive
- **Be constructive** in feedback
- **Be patient** with newcomers
- **Be collaborative** and helpful

### Getting Help

- **GitHub Discussions**: For questions and discussions
- **GitHub Issues**: For bug reports and feature requests
- **Documentation**: Check existing documentation first

## 🎉 Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **Release Notes**: Major contributions mentioned
- **GitHub**: Contributor graphs and statistics

Thank you for contributing to the Internal Knowledge Base project! 🚀