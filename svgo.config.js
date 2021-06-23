module.exports = {
  plugins: [
    'removeDimensions',
    'removeViewBox',
    'removeXMLNS',
    'removeTitle',
    'prefixIds',
    {
      name: 'removeAttributesBySelector',
      params: {
        selectors: [
          {
            selector:
              'svg > :not(mask):not([fill="white"]), svg > :not(mask) :not([fill="white"])',
            attributes: 'fill',
          }
        ],
      },
    },
  ],
};
