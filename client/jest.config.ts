export {}
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
}
