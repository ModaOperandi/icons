"use strict";

const path = require("path");
const { upperFirst, camelCase, kebabCase, last } = require("lodash");
const { transform } = require("@babel/core");

const getTransformedSourceCode = originalSource =>
  transform(originalSource, {
    presets: ["@babel/preset-react"]
  }).code;

const getSVGContent = source =>
  // Get the contents of the optimized SVG
  // by trimming leading and tailing <svg> tags
  source.slice(source.indexOf(">") + 1).slice(0, -6);

const DEFAULT_CONTAINER_STYLES = {
  display: "inline-block",
  position: "relative",
  verticalAlign: "bottom"
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

const getReactSource = ({ componentName, svgPaths, size }) => {
  return getTransformedSourceCode(`
    import React from 'react';

    const ${componentName} = ({ color = 'currentcolor', height = '${size}px', width = '${size}px', ...rest }) => {
      return (
        <div style={{ ...${JSON.stringify(
          DEFAULT_CONTAINER_STYLES
        )}, height, width }} { ...rest }>
          <svg style={{ ...${JSON.stringify(
            DEFAULT_SVG_STYLES
          )}, fill: color }} viewBox="0 0 ${size} ${size}">
            ${svgPaths}
          </svg>
        </div>
      );
    };

    ${componentName}.displayName = '${componentName}';

    export default ${componentName};
  `);
};

const getPackageJsonSource = ({ version }) => `{
  "name": "@moda/icons",
  "version": "${version}",
  "peerDependencies": {
    "react": ">=16.2.0"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org"
  }
}`;

const getIndexSource = ({ iconFiles }) =>
  getTransformedSourceCode(`
    export const ICONS = ${JSON.stringify(
      iconFiles.map(({ fileName, componentName, size }) => ({
        fileName,
        componentName,
        size
      }))
    )};

    ${iconFiles
      .map(
        ({ filepath, componentName }) =>
          `export { default as ${componentName} } from './${filepath}';`
      )
      .join("\n")}
  `);

const packageIcons = ({ svgs, version }) => {
  const iconFiles = svgs.map(svg => {
    const name = path.basename(svg.path).replace(".svg", "");
    const size = parseInt(last(name.split("_")), 10);

    if (!(size > 1)) {
      throw new Error(`${name} size is invalid`);
    }

    const componentName = `${upperFirst(camelCase(name))}`;
    const svgPaths = getSVGContent(svg.source);
    const source = getReactSource({ componentName, svgPaths, size });
    const fileName = kebabCase(componentName);

    return {
      filepath: `${fileName}.js`,
      source,
      size,
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
      filepath: "index.js",
      source: getIndexSource({ iconFiles })
    },
    ...iconFiles
  ];
};

module.exports = packageIcons;
