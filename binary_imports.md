# Enabling Binary Imports in build modules

# What I need to do
- Prevent wrb-loader from cutting off dependency graph
- Get distributed image imports into compilations _modules graph
	- However: applying Rollup's image plugin prevents the image from going inside the graph...
	- OPTIONS:
		1. Try to get modules fed thru url-loader before rollup-babel-loader
			- I think would add it to the compilation's _modules
			- allow using Webpack loader instead of Rollup plugin
		2. Try to add image imports manually to _modules

- Route image/font imports to:
	- Payload Plugin (?) so it can put that images' binary data into the FBA 

# Current Process

Currently: images/fonts enter from `.image-imports.js` and `.font-imports.js`

vvv

## Payload Plugin

In method, `refreshPaylodStore` (happens on compiler's `emit` stage):
- looks for the `.image/font-imports` module w/in the Webpack `compilation` instance
- updates image and font entries in `DM.payload.store` w/ `.image/font-imports`' dependencies found in Webpack compilation
	- attaches img/font dependencies to entries in `DM.payload.store`
- if there are payloads, updates settings w/ compiled asset

vvv

## Assets Plugin
At compiler's `emit` stage, passes objects w/ an "fbA" type a.k.a. __`image` and `font` metadata objects__ from `entries` key of object passed to `DM.payload.prepare()` in `webpack.config.js` on to...

vvv

## FBA Compiler

Stuffs all the binary stuff inside a .png
- `compile` calls `prepareNewChunks()` if any FBA assets - collects `packAsset(type, path)` promises
- once all packing promises resolved:
	- determineImageDimensions()
	- buildPng()
- `packAssets(type, path) => Promise<undefined>`
	- upon reading file at `path`, packs:
		- fileNameSize
		- fileName
		- data
		- (all as `Buffers`)
	- ...into one `Buffer` called `fullAsset`
	- then calls `packNewChunk(type, fullAsset)`
- `packNewChunk` - processes assets a bit more then pushes onto list of Buffers to put into .png

# Regarding dynamic images from external sources
- These are dynamic images you'd add w/ `ImageManager.addToLoad(url)`
- These images need to be added before ad starts

# Questions

- How can I route distributed image/font imports to the Payload/Assets Plugin?
- Where are the .image/font-imports' dependencies pulled and put into the Assets Plugin?
- How are images added to ImageManager w/o explicit addToLoad calls in build.js?
	- *PrepareCore loads FBA images*
