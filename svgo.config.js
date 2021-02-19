module.exports = {
  plugins: [
    'removeDimensions',
    'removeViewbox',
    'removeXMLNS',
    {
      name: 'removeAttrs',
      params: {attrs: '(fill|fill-rule)'}
    }
  ]
}