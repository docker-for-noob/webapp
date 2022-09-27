/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/tests/**/*.ts?(x)', '**/?(*.)+(test).ts?(x)'],
    testPathIgnorePatterns: ['/node_modules/'],
    globals: {'ts-jest': {diagnostics: false}},
    transform: {},
    collectCoverageFrom: [
        "src/core/domain/**/service/**/*.{ts,tsx}"
    ],
    coverageThreshold: {
        "src/core/domain/**/service/**/*.{ts,tsx}": {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        }
    }
}
;
