/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  globals: { 'ts-jest': { diagnostics: false } },
  transform: {},
  coveragePathIgnorePatterns: [
    "./src/core/application",
    "./src/infrastructure",
    "coverage",
    "src/mocks",
    "src/tests",
    '/node_modules/'
  ],
  // TODO: add coverage with right path
  // coverageThreshold: {
  //   "./src/core/domain/dockerCompose/service": {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
};