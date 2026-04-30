module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/fixtures/'],
  collectCoverageFrom: [
    'runtime/**/*.js',
    '!runtime/index.js'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  verbose: true
};