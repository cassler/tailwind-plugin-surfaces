# @cassler/tailwind-plugin-surfaces

This plugin add a `.box-*` utility class for quickly applying a "surface style" to elements. This works exactly the same as `.bg-*` while also configuring the containers `backgroundColor` and `borderColor`, as well as the `color` rule for child headings, body and captions.

<img width="1729" alt="image" src="https://user-images.githubusercontent.com/140459/181508876-5476ebc6-8c30-44e2-afeb-f65bf855e226.png">


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
| `.box-blue-800` | <img width="288" alt="image" src="https://user-images.githubusercontent.com/140459/181513284-a808222b-4b13-4c8f-bec4-63fadac26173.png"> |
| `.box-blue-100` | <img width="285" alt="image" src="https://user-images.githubusercontent.com/140459/181513320-0bbb5ae3-0040-41fa-a715-76e05450e80b.png"> |
| `.box-slate-700` | <img width="284" alt="image" src="https://user-images.githubusercontent.com/140459/181513476-bad43f92-315f-4976-94cd-dce4037e0eff.png"> |
| `.box-indigo-700` | <img width="284" alt="image" src="https://user-images.githubusercontent.com/140459/181513528-807acf44-9fa0-40ed-bbe7-2dca2b5957b6.png"> | 
| `.box-yellow-200` | <img width="287" alt="image" src="https://user-images.githubusercontent.com/140459/181513567-aab13d03-120a-4ce4-bbc3-67fe6337369c.png"> |


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

