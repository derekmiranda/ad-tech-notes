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

### classCallCheck definition
- ~151 b / instance 
- 24 instances x 151 b = __3.54 kb__

### createClass definition 
- ~561 b / instance
- 10 x 561 = __5.48 kb__
