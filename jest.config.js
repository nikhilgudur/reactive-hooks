module.exports = {
  testEnvironment: 'jsdom', // Simulates a browser-like environment
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transpile TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'], // Recognized file extensions
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'], // Extend Jest matchers for Testing Library
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'], // Test file patterns
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
  },
  collectCoverage: true, // Enable coverage reporting
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Include TypeScript files in coverage
    '!src/**/*.d.ts', // Exclude declaration files
  ],
  coverageReporters: ['html', 'text'], // Generate HTML and text coverage reports
};
