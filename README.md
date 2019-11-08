# @moda/icons

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![](https://img.shields.io/npm/v/@moda/icons/latest.svg)](https://www.npmjs.com/package/@moda/icons) [![](https://img.shields.io/circleci/build/gh/ModaOperandi/icons/master?token=63a4075a70ca69f3b373b215bc952cd0620c2279)](https://circleci.com/gh/ModaOperandi/icons)

## Meta

- **State**: production
- **Point people**: [@dzucconi](https://github.com/dzucconi)

## Getting started

```bash
yarn add @moda/icons
```

Visit: [modaoperandi.github.io/icons](https://modaoperandi.github.io/icons/) and click the desired icon to copy its `import` statement.

```javascript
import ShoppingBagIcon from "@moda/icons/shopping-bag-24";

// Use it as a normal React component

const Foo = () => (
  <>
    Checkout whats in my <ShoppingBagIcon />
  </>
);
```

By default all icons are sized according to their native dimensions. So the example above: `shopping-bag-24`, would be 24×24px by default. This can be overridden by passing in width and height props:

```javascript
<ShoppingBagIcon width="2em" height="2em" />
```

Color is set using the `currentcolor` prop so icons are the same color as their parent div. This provides a simple way to change the fill color.

```scss
.ParentContainer {
  color: black;
  &:hover {
    color: red;
  }
}
```

Alternatively this can be set using a prop:

```javascript
<ShoppingBagIcon color="#f00" />
```

## Adding an icon

Simply import your SVG to [`src/svg`](/src/svg) using the naming convention of snake-cased name followed by the desired native size: `Arrow_Down_12.svg`.

This library is built using [semantic-release](https://github.com/semantic-release/semantic-release). `git add .` your changes and run `git cz` to kick off the [commitizen workflow](https://github.com/commitizen/cz-cli). Push to a feature branch and let a bot version and publish the package for you.

## Documentation

A full listing of available icons, grouped by size, with a simple filtering interface [can be viewed here](https://modaoperandi.github.io/icons/).

### Editing documentation

Ensure the library is reloaded:

```bash
cd example
yarn refresh
```

Start the development server:

```bash
yarn start # => http://localhost:3000/
```

Documentation is rebuilt and republished whenever there is a merge to `ModaOperandi/icons#master`.
