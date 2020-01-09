module.exports = {
    "roots": [
      "./src/__test__",
    ],  
    "testMatch": [
      "**/*.+(test.ts)",
    ],
    "transform": {
      "^.+\\.(ts)$": "ts-jest"
    },
  }