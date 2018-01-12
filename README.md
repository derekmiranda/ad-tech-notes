# Some Outstanding Problems

## Babel (include node_modules) x webpack-rollup-loader
- Webpack Loader Config

```js
...
module: {
	rules: [
		// Rollup loader 
		{
			test: /build.js$/,
			use: [
				{
					loader: 'webpack-rollup-loader'
				}
			]
		},
		// Babel loader
		{
			test: /\.js$/,
			// exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					"presets": [
						[ "env", { "modules": false } ]
					],
					"plugins": [
						"transform-class-properties"
					]
				}
			}
		},
	]
}
...
```
- duplicate classCallCheck and createClass functions and calls (Babel? helper fns)
  - performance and size hit
- redefining `defineProperties` function as part of ES6 class Babel-ing within every transformed class

### Unused but included modules
- TzDate (import by DateFormatter)
- TextUtils (instantiated)
- NetUtils (inst.)
- DateFormatter (inst.)
- Timezone (import by DateFormatter)
- Velvet (not sure why in here?)
- Vector2D
- UISplitText

# 1/8/18 Rollup x Babel loader
- decided to do the Babel transform directly in the Webpack Rollup loader (source*)
- Decreased bundle size from __93.8kb__ to __66.1kb__
- keeps modules that should remain tree-shaken out
- doesn't seem to duplicate Babel helpers

## Still to solve
- However, would like a more elegant/clean way of achieving this, ideally purely thru Webpack config
- ~20kb above idle bundle size (~40-45 kb)
  - Removing Loader and other dependencies shared b/w build and index bundle could help bring that down