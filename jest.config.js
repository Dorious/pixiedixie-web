module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.svg$": "<rootDir>/__mocks__/dummy.js"
  },
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.js"
  ],
  unmockedModulePathPatterns: [
    "node_modules/react/",
    "node_modules/enzyme/"
  ]
};