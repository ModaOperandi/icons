# @moda/icons

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![](https://img.shields.io/npm/v/@moda/icons/latest.svg)](https://www.npmjs.com/package/@moda/icons) [![](https://img.shields.io/circleci/build/gh/ModaOperandi/icons/main?token=63a4075a70ca69f3b373b215bc952cd0620c2279)](https://circleci.com/gh/ModaOperandi/icons)

Been here before? Visit the [click-to-copy](https://moda-om-icons.netlify.app/) documentation. First time? Keep reading.

## What is this?

This is a build pipeline for dealing with and packaging SVG icons into React components. It optimizes SVGs using SVGO, then publishes a package `@moda/icons` which exports each individual icon as a component. **By copying the import out of the [click-to-copy](https://moda-om-icons.netlify.app/) documentation you ensure you import only the icons you need.**

## Meta

- **State**: production
- **Point people**: @ModaOperandi/ecommerce-squad

## Getting started

```bash
npm install --save @moda/icons
```

Visit: [https://moda-om-icons.netlify.app/](https://moda-om-icons.netlify.app/) and click the desired icon to copy its `import` statement.

```tsx
import ShoppingBagIcon from "@moda/icons/shopping-bag-24";

// Use it as a normal React component

const Foo = () => (
  <>
    Checkout whats in my <ShoppingBagIcon />
  </>
);
```

By default all icons are sized according to their native dimensions. So the example above: `shopping-bag-24`, would be 24×24px by default. This can be overridden by passing in width and height props:

```tsx
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

```tsx
<ShoppingBagIcon color="#f00" />
```

## Adding an icon

The SVG you wish to add *must be outlined*.

Once you have an SVG you want to add, simply import it to [`src/svg`](/src/svg) using the naming convention of snake-cased name followed by the desired native size: `Arrow_Down_12.svg`.

#### Making Commits

We are using [semantic release](https://github.com/semantic-release/semantic-release) for this repo and [commitizen](https://github.com/commitizen/cz-cli) to help with formatting commits.

- Install the commitizen CLI with `npm install -g commitizen`
- To run through the CLI: stage your files to commit and run `git cz`.

## Documentation

A full listing of available icons, grouped by size, with a simple filtering interface [can be viewed here](https://moda-icons.netlify.app/).

### Previewing documentation

```bash
npm run local:preview
# ...
# => http://localhost:3000/
```

To unlink the local version of the library:

```
npm run local:restore
```

### Publishing documentation

Documentation is rebuilt and republished whenever there is a merge to `ModaOperandi/icons#main`.

-**Netlify deploy config** is located here: https://github.com/ModaOperandi/icons/blob/main/netlify.toml

-**Netlify site overview**: https://app.netlify.com/sites/moda-icons/overview

(settings specified in netlify.toml override any corresponding settings in the Netlify UI)

