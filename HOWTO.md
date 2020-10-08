# js-reach-stdlib

The reach JS stdlib. This repo exists only for convenience when interacting with npm. See https://github.com/reach-sh/reach-lang for source.

Disclaimer: the instructions below are Dan's best guess based on limited experience with npm so far. Please update as necessary.

# How to update files

Prerequisites:

* You have built or pulled fresh reachsh/stdlib docker images. (If built, preferably from a clean git repo.)

```bash
make refresh
```

This creates a commit referencing the reach-lang hash it came from. The one found in the docker image.

Manually inspect the displayed package.json diff.
This is not automatically committed;
bring in changes manually as needed.
(Only the version line is expected to differ.)

# How to bump rc version and publish

This is probably the thing you should do 99% of the time, until we come up with a more principled version release policy.

RC releases precede the corresponding patch/minor/major release.

Prerequisites:

* npm is installed locally
* You are logged in to npm via `npm login`

```bash
make bump-version-and-publish
```

# How to publish patch version from current rc series

```bash
npm version patch
npm publish --access public
git push
```

# Other such npm nonsense

```bash
# start rc series for next patch/minor/major bump
# (pick one)
npm version prepatch --preid=rc
npm version preminor --preid=rc
npm version premajor --preid=rc
```
