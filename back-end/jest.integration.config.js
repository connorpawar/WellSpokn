module.exports = {
  "testEnvironment": "node",
  "roots": [
    "./src/__test__",
  ],  
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