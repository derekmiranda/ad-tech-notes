# Enabling Binary Imports in build modules

Currently: images/fonts enter from `.image-imports.js` and `.font-imports.js`

vvv

## Assets Plugin
At compiler's `emit` stage, passes objects w/ an "fbA" type a.k.a. __`image` and `font` metadata objects__ from `entries` key of object passed to `DM.payload.prepare()` in `webpack.config.js` on to...

vvv

## FBA Compiler
Stuffs all the binary stuff inside a .png