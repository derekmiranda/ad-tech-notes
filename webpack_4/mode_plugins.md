# Webpack 4 Mode Plugins

## Development
- Tooling for in browser debugging
- Fast incremental compilation for a fast development cycle
- Useful error messages at runtime

### NamedChunksPlugin

## Production
- Small output size
- Fast code at runtime
- Omitting development-only code
- Not exposing source code or file paths
- Easy to use output assets
- __additional optimizations possible, but they would make the result more difficult to use__

### List of Plugins
FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.

## Sources
- https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a