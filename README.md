# @moda/icons

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![](https://img.shields.io/npm/v/@moda/icons/latest.svg)](https://www.npmjs.com/package/@moda/icons) [![](https://img.shields.io/circleci/build/gh/ModaOperandi/icons/master?token=63a4075a70ca69f3b373b215bc952cd0620c2279)](https://circleci.com/gh/ModaOperandi/icons)

## Meta

- **State**: production
- **Point people**: [@dzucconi](https://github.com/dzucconi)

## Getting started

```bash
yarn add @moda/icons
```

Visit: [https://moda-icons.netlify.com](https://moda-icons.netlify.com/) and click the desired icon to copy its `import` statement.

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

#### Making Commits

We are using [semantic release](https://github.com/semantic-release/semantic-release) for this repo and [commitizen](https://github.com/commitizen/cz-cli) to help with formatting commits.

- Install the commitizen CLI with `yarn global add commitizen`
- To run through the CLI: stage your files to commit and run `git cz`.

## Documentation

A full listing of available icons, grouped by size, with a simple filtering interface [can be viewed here](https://moda-icons.netlify.com/).

### Previewing documentation

```bash
yarn local:preview
# ...
# => http://localhost:3000/
```

To unlink the local version of the library:

```
yarn local:restore
```

### Publishing documentation

Documentation is rebuilt and republished whenever there is a merge to `ModaOperandi/icons#master`.
