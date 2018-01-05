# Babel Loose Mode

- Transforms code akin to ES5 instead of ES6
- cleaner output but lacks ES6 specific edgecases
- Avoids using `defineProperties` Babel helper function and instead relies on simple assignment of properties on the prototype
	- with `defineProperties` function, class props are:
		- *configurable* - property descriptor may be changed and property may be deleted from obj
		- *not enumerable* by default unless expliclitly set - property won't show up during enumeration of object's properties
		- *writable* - value at key can be overwritten 
- still uses `classCallCheck` function -> makes sure `class`es are instantiated w/ `new` and not called as a function

## Sources

- [Babel docs](https://developit.github.io/babel-legacy-docs//docs/advanced/loose/): details how it differs in implementation from normal transpiling
- [2ality](http://2ality.com/2015/12/babel6-loose-mode.html): lists what specific edge cases to avoid w/ loose mode