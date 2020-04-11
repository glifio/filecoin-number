module.exports = {
  collectCoverageFrom: ['**/*.{js}', '!**/node_modules/**'],
  testPathIgnorePatterns: ['/node_modules/', '/module/', '/lib/', '/dist/'],
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
}
