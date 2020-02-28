module.exports = {
  "testEnvironment": "node",
  "roots": [
    "./src/__test__",
  ],  
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