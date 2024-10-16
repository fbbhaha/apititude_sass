module.exports = {
  presets: [
    '@vue/app'
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  },
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}