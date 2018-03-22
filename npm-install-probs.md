# NPM Install Problems

## Notes on current setup
- Node v8.5.0
- NPM v5.6.0

## `.DELETE` files

Tries to rename some file to that file w/ `.DELETE` appeneded to filename. However, getting `ENOENT` errors since file that npm is trying to rename doesn't exist during renaming
- some type of race condition?

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
