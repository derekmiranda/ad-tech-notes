# Webpack 4 Mode Plugins

## Development
- Tooling for in browser debugging
- Fast incremental compilation for a fast development cycle
- Useful error messages at runtime

### NamedChunksPlugin & NamedModulesPlugin
- causes relative path of chunks/modules to be displayed when HMR enabled

## Production
- Small output size
- Fast code at runtime
- Omitting development-only code
- Not exposing source code or file paths
- Easy to use output assets
- __additional optimizations possible, but they would make the result more difficult to use__

### FlagDependencyUsagePlugin
- flags compilation modules for use w/ other optimization plugins??

### FlagIncludedChunksPlugin
- Adds chunk ids of chunks which are included in the chunk. This eliminates unnecessary chunk loads.

### ModuleConcatenationPlugin
- concatenates scope of all modules into one closure -> faster execution
- aka "scope hoisting"

### NoEmitOnErrorsPlugin
- skip emitting phase when errors while compiling
- ensures no assets are emitted that include errors

### OccurrenceOrderPlugin
- Order the modules and chunks by occurrence. This saves space, because often referenced modules and chunks get smaller ids.

- `preferEntry` If true, references in entry chunks have higher priority

### SideEffectsFlagPlugin
- flags modules that are side-effect free -> if not used, would not be included in output bundle??

### UglifyJsPlugin.
- minifies code
- TODO: figure out how production mode's Uglify is configured and how to configure it if need be

## Sources
- https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
- https://github.com/webpack/docs/wiki/internal-webpack-plugins