module.exports = {
	testEnvironment: 'node',
	roots: ['src'],
	testMatch: ['**/*.spec.ts'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	moduleNameMapper: {
		'^@/(.*)$': './src/$1',
	},
	testEnvironment: 'jest-environment-jsdom',
};
