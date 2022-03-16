/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|fbx)$': require.resolve(
      './src/__test__/__mock__/styleMock.js'
    ),
    '\\.(css|less)$': require.resolve('./src/__test__/__mock__/styleMock.js'),
    '\\FBXLoader$': require.resolve('./src/__test__/__mock__/styleMock.js')
  }
};
