# js-reach-stdlib
The reach JS stdlib. This repo exists only for convenience when interacting with npm. See https://github.com/reach-sh/reach-lang for source.

Disclaimer: the instructions below are Dan's best guess based on limited experience with npm so far. Please update as necessary.

# How to update files

```bash
sbin/refresh.sh
```

This creates a commit referencing the reach-lang hash it came from. The one found in the docker image.

Manually inspect the displayed package.json diff
This is not automatically committed;
bring in changes manually as needed.

# How to bump rc version and publish

RC releases precede the corresponding patch/minor/major release.

```bash
npm version prerelease --preid=rc
npm publish --access public
```

# How to publish patch version from current rc series

```bash
npm version patch
npm publish --access public
```

# Other such npm nonsense

```bash
# start rc series for next patch/minor/major bump
npm version prepatch --preid=rc
npm version preminor --preid=rc
npm version premajor --preid=rc
```
