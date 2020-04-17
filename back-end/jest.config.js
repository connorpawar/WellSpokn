module.exports = {
  "testEnvironment": "node",
  "testMatch": [
    "**/*.+(unit.test.ts)",
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "modulePaths": [
    "<rootDir>"
  ],  
  "resetMocks" : true,
  "resetModules" : true,
  "restoreMocks":true
}