module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-empty-function': 0,
        'react/no-unescaped-entities': 0,
        'react/prop-types': 0,
        'react/display-name': 0,
    },
};
