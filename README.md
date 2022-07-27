# @cassler/tailwind-plugin-surfaces

This plugin add a `.box-*` utility class for quickly applying a "surface style" to elements. This works exactly the same as `.bg-*` while also configuring the containers `backgroundColor` and `borderColor`, as well as the `color` rule for child headings, body and captions.

- Uses your theme colors.
- Dynamically apply text styles based on computed contrast.
- Simple text hierarchy styling defaults.

### Install

`pnpm add @cassler/tailwind-plugin-elements` 

### Configure plugin

```js
// tailwind.config.js
module.exports = {
   // ...your config
   plugins: [
     require('@cassler/tailwind-plugin-surfaces')
   ]
}
```

### Usage

```jsx
<div className='box-blue-800'>
   <h3>My Heading</h3>
   <p>Box content</p>
   <small>Fine print</small>
</div>
```

### Demos 

| Example Class | Output |
| ----- | --- |
| `.box-blue-800` | <img width="342" alt="image" src="https://user-images.githubusercontent.com/140459/181387285-469bc92d-e091-4737-8d52-478b69878f4d.png"> |
| `.box-blue-100` | <img width="335" alt="image" src="https://user-images.githubusercontent.com/140459/181387322-eb80351c-743e-4c3b-bfc3-74efb959f318.png"> |
| `.box-gray-200` | <img width="340" alt="image" src="https://user-images.githubusercontent.com/140459/181387411-f703cbb0-b229-4ced-a328-42dff68956c1.png"> |
| `.box-green-100` | <img width="342" alt="image" src="https://user-images.githubusercontent.com/140459/181387673-3febc528-a23a-473c-b659-68e6cd1fabec.png"> | 
| `.box-green-600` | <img width="335" alt="image" src="https://user-images.githubusercontent.com/140459/181387704-aeb6102d-2731-495b-b2fd-1e3c78a904db.png"> |


### Full CSS Output 

To use `.box-blue-100` is equal to:

```css
.my-item { 
  background-color: theme(colors.blue.100); 
  border-color: theme(colors.blue.400);
  color: theme(colors.blue.900);
}
.my-item h1,
.my-item h2,
.my-item h3,
.my-item h4,
.my-item h5,
.my-item h6 {
  color: theme(colors.black)
}
.my-item caption, 
.my-item small,
.my-item footer {
  color: theme(colors.blue.700)
}
```

#### Convert from vanilla Tailwind

```diff
- <div className={dark ? 'bg-blue-800 text-blue-50' : 'bg-blue-50 text-blue-900'}>
-   <h3 className={dark ? 'text-white' : 'text-black'}>
-      My heading
-   </h3>
-   <p className={dark: ? 'text-blue-50' : 'text-blue-900'}>
-      Box content
-   </p>
-   <small class={dark ? 'text-blue-200' : 'text-blue-700'}>
-      Fine print
-   </small>
- </div>
+ <div className={dark ? 'box-blue-800' : 'box-blue-50'}>
+   <h3>My Heading</h3>
+   <p>Box content</p>
+   <small>Fine print</small>
+ </div>
```

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

#### Setup Files

This is the folder structure we set up for you:

```txt
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Named Exports

Per Palmer Group guidelines, [always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.

## Including Styles

There are many ways to ship styles, including with CSS-in-JS. TSDX has no opinion on this, configure how you like.

For vanilla CSS, you can include it at the root directory and add it to the `files` section in your `package.json`, so that it can be imported separately by your users and run through their bundler's loader.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).
