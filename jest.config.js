/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {},
  coveragePathIgnorePatterns: [
    "src/domain/imageReference/constants",
    "src/domain/imageReference/ports",
    "src/domain/imageReference/models",
    "src/domain/utils",
    "src/infrastructure",
    "coverage",
    "src/mocks",
    "src/tests",
    '/node_modules/'
  ],
  coverageThreshold: {
    "./src/domain/imageReference/service": {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};