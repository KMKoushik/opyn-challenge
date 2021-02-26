module.exports = {
  purge: [
    '**/*.html',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      colors: {
        'green-1000': '#062218',
        'green-900': '#083324',
        'green-800': '#0e553c',
        'green-700': '#116647',
        'green-600': '#16885f',
        'green-500': '#1caa77',
        'green-400': '#33b385',
        'green-300': '#49bb92',
        'green-200': '#60c4a0',
        'green-100': '#77ccad',
      },
    },
  },
  variants: {
    backgroundColor: ['hover', 'focus', 'disabled'],
  },
  plugins: [],
};
