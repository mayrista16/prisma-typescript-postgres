/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  "preset": "ts-jest",
  "testEnvironment": "node",
  "testMatch": ["**/*.test.ts"],
  "setupFilesAfterEnv": ['./jest.setup.ts'],
  "testSequencer": './customTestSequencer.js',
};