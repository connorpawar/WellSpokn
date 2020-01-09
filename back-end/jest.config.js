module.exports = {
    "roots": [
      "./test",
      "./src"
    ],  
    "testMatch": [
      "**/*.+(test.ts)",
    ],
    "transform": {
      "^.+\\.(ts)$": "ts-jest"
    },
  }