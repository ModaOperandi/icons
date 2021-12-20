"use strict";

const path = require("path");
const { transform } = require('@svgr/core');
const { upperFirst, camelCase, kebabCase, last } = require("lodash");

const DEFAULT_CONTAINER_STYLES = {
  position: "relative"
};

const DEFAULT_SVG_STYLES = {
  position: "absolute",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  width: "100%",
  height: "100%"
};

const getReactSource = ({ componentName, svgSource, width, height }) => {
  const svgAsJsx = transform.sync(svgSource, {
    expandProps: false,
    svgProps: {
      style: `{svgStyle}`,
      viewBox: `0 0 ${width} ${height}`
    },
    template: ({jsx}) => jsx
  });

  return `
    import * as React from 'react';

    const ${componentName} = ({ color = 'currentcolor', height = '${height}px', width = '${width}px', ...rest }) => {
      const svgStyle: React.CSSProperties = {...${JSON.stringify(DEFAULT_SVG_STYLES)}, fill: color};

      return (
        <div style={{ ...${JSON.stringify(DEFAULT_CONTAINER_STYLES)}, height, width }} { ...rest }>
          ${svgAsJsx}
        </div>
      );
    };

    ${componentName}.displayName = '${componentName}';

    export default ${componentName};
  `;
};

const getPackageJsonSource = ({ version }) => `{
  "name": "@moda/icons",
  "version": "${version}",
  "peerDependencies": {
    "react": ">=16.2.0"
  },
  "main": "index.js",
  "types": "index.d.ts",
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  }
}`;

const getIndexSource = ({ iconFiles }) =>
  `
    export const ICONS = ${JSON.stringify(
      iconFiles.map(({ fileName, componentName, size, width, height }) => ({
        fileName,
        componentName,
        size,
        width,
        height
      }))
    )};

    ${iconFiles
      .map(
        ({ fileName, componentName }) =>
          `export { default as ${componentName} } from './${fileName}';`
      )
      .join("\n")}
  `;

const packageIcons = ({ svgs, version }) => {
  const iconFiles = svgs.map(svg => {
    const name = path.basename(svg.path).replace(".svg", "");
    const size = last(name.split("_"));
    const sizes = size.split("x");

    let width, height;

    if (sizes.length === 2) {
      [width, height] = sizes.map(n => parseInt(n, 10));
    } else {
      width = height = parseInt(sizes[0], 10);
    }

    if (!(width > 1 && height > 1)) {
      throw new Error(`${name} width or height is invalid`);
    }

    const componentName = `${upperFirst(camelCase(name))}`;
    const source = getReactSource({ componentName, svgSource: svg.source, width, height });
    const fileName = kebabCase(componentName);

    return {
      filepath: `${fileName}.tsx`,
      source,
      size,
      width,
      height,
      componentName,
      fileName
    };
  });

  return [
    {
      filepath: "package.json",
      source: getPackageJsonSource({ version })
    },
    {
      filepath: "index.ts",
      source: getIndexSource({ iconFiles })
    },
    ...iconFiles
  ];
};

module.exports = packageIcons;
