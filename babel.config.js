module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      corejs: 3,
      modules: false,
      targets: {
        browsers: [
          'Android >= 7',
          'IOS >= 11',
          'Safari >= 11',
          'Chrome >= 49',
          'Firefox >= 31',
          'Samsung >= 5',
        ],
      },
    }],
    "@babel/preset-react" 
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import', 
  ],
};
