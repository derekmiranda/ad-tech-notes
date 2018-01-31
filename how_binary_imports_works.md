# How Binary Imports Works

## Config
- Within the Rollup-Babel loader for `build.js`, I've added the following options:
	- `deployManager`: The DeployManager instance shared by all of our other plugins. This will store the binary imports found by Rollup.
	- `fbaTypes`: An array of FBA type metadata objects, following this schema:
		- `type`: The string representing the appropriate FBA type, as used by `fba-compiler`
			- either "fbAf", "fbAi", "fbAc" 
		- `include`: An array of minimatch patterns describing the types of files that match `type`
			- for example, for images (type "fbAi"), the `include` array would be something like: `['**/*.png', '**/*.jpg']` 
		- `exclude`: An optional array of minimatch patterns to exclude
	- The `rollup-plugin-url` instance enabling Rollup's ability to compile binary files will also need the `forImageManager` option set to `true`, which will export the name used to pull the image from `ImageManager`
		- This plugin was forked so that I could add that new option. It should work the way the original plugin does if `forImageManager` is `false` or unset

## Deploy Manager
- added methods onto `payload` object for updating and getting stored binary assets
	- stores assets in the format `{ chunkType, path }`, according to `fba-compiler`
		- `chunkType`: the types mentioned above, under `type` description
		- `path`: absolute path to the original asset
	- `addBinaryAsset`: stores asset in private `binaryAssetsStore` array
	- `getBinaryAssets`: returns `binaryAssetsStore`

## Rollup Babel Loader
- As Rollup takes in file requests while traversing imports, the loader funnels binary assets (according to the `fbaTypes` option) to `DeployManager.payload`

## Assets Plugin
- Will now take the stored binary assets from `DeployManager` and pass them to FBA Compilation