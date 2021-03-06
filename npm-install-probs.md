# NPM Install Problems

## Notes on current setup
- Node v8.5.0 -> v9.3.0
- NPM v5.6.0

## `.DELETE` files

Tries to rename some file to that file w/ `.DELETE` appeneded to filename. However, getting `ENOENT` errors since file that npm is trying to rename doesn't exist during renaming

General outline:

```
npm ERR! enoent ENOENT: no such file or directory, rename '.../project/node_modules/package' -> '.../project/node_modules/.package.DELETE'
```
- depth of node_modules can vary as well (meaning it could be in the node_modules of a dependency)
- some type of race condition? Folder npm is trying to rename no longer exists

### Observations

- within `npm` source, `.DELETE` renaming happens in `finalize` action function [source](https://github.com/npm/npm/blob/5e426a78ca02d0044f8dd26e0c5f881217081cbd/lib/install/action/finalize.js#L23)
- more specifically, seems to be happening in `moveOldDestinationAway` function w/in same module
	- deletes package at `delpath (.package.DELETE)`
	- moves package to `delpath` <- HERE is where the `ENOENT` rename error seems to occur
- `moveOldDest...` used by `moveStagingToDestination`
	- checks if destination's clear
	- actually moves staging
- diff b/w recent project that's working and older project
  - recent - `sockjs-client` in top level of `node_modules`
  - older - `sockjs-client` NOT seen anywhere, not in top-level or inside `shoe` `node_modules`, of which it is a dependency

### Suspected causes?

- Could be related to `package-lock`?
- Happens after doing initial `npm install` then installing certain packages
	- currently not sure which ones cause this error
- dependencies that include `npm@4` as a dependency
- Often `sockjs` associated w/ this error
- Malwarebytes Anti-Ransomware

### Possible fixes?

- Some suggest recursively removing package-locks [source](https://github.com/npm/npm/issues/17444#issuecomment-369410616)
- `npm cache verify` [source](https://github.com/npm/npm/issues/17444#issuecomment-317361772)
- closing VS Code ???

### Action log

__Legend__
- npm install = i
- npm install \<pkg> = i \<pkg>
- error = x
- ok = o

__Actions__
1. i -> i -> o

2. i -> i react -> i vue -> o
	- non-FAT -> non-FAT

3. i -> i react -> i -D fat/wp-plugin-payload -> o, o, o
	- non-FAT -> FAT

4. i -> i -D fat/wp-plugin-payload -> i -D fat/wp-plugin-assets -> o, o, o
	- FAT -> FAT

5. i -> i -D fat/wp-plugin-payload -> i react -> o, o, o
	- FAT -> non-FAT

6. i -> i shoe -> o, o
7. i -> i sockjs-client -> o, o
8. i -> i -D FAT/wp-creative-server -> o

__with older project__
- got the error when installing react
