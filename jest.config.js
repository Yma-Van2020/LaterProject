module.exports = {
  preset: 'ts-jest',  // Use ts-jest for transforming TypeScript files
  testEnvironment: 'node',  // Specify the test environment as Node.js
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],  // Recognize these file extensions
  transformIgnorePatterns: ['<rootDir>/node_modules/'],  // Ignore node_modules
};
