module.exports = {
  "testEnvironment": "node",
  "testMatch": [
    "**/*.+(integration.test.ts)",
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "modulePaths": [
    "/"
  ],
  "resetMocks" : true,
  "resetModules" : true,
  "restoreMocks":true
}