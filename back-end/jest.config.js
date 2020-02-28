module.exports = {
  "testEnvironment": "node",
  "testMatch": [
    "**/*.+(unit.test.ts)",
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