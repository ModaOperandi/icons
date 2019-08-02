# moda-icons

## Meta

- **State**: production
- **Point people**: [@dzucconi](https://github.com/dzucconi)

## Getting started

```bash
yarn add moda-icons
```

Visit: [modaoperandi.github.io/moda-icons](https://modaoperandi.github.io/moda-icons/) and click the desired icon to copy its `import` statement.

```javascript
import ShoppingBagIcon from "moda-icons/shopping-bag-24";

// Use it as a normal React component

const Foo = () => (
  <>
    Checkout whats in my <ShoppingBagIcon />
  </>
);
```

By default all icons are sized according to their native dimensions. So the example above: `shopping-bag-24`, would be 24×24px by default. This can be overriden by passing in width and height props:

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

Simply import your SVG to [`source/svg`](/source/svg) using the naming convention of snake-cased name followed by the desired native size: `Arrow_Down_12.svg`.

Running `yarn build` will automatically optimize the svg and create a corresponding React component for it. You can then increment the version in [`package.json`](package.json) and publish to NPM by running `yarn release`.

## Documentation

A full listing of available icons, grouped by size, with a simple filtering interface [can be viewed here](https://modaoperandi.github.io/moda-icons/).

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
