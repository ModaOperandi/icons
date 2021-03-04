module.exports = {
  plugins: [
    'removeDimensions',
    'removeViewBox',
    'removeXMLNS',
    {
      name: 'removeAttrs',
      params: {attrs: '(fill|fill-rule)'}
    }
  ]
}