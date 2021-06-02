#!/bin/sh
set -ex

git diff --exit-code || (echo '\n\n\nGit repo is not clean; please commit first.' && exit 1)

IMAGE=reachsh/stdlib:latest
rm -f *.mjs *.d.ts
rm -rf dist/
docker run --entrypoint /bin/sh --volume "$(pwd):/cwd" "$IMAGE" \
  -c 'cp /stdlib/*.mjs /stdlib/package.json /cwd/ && cp -r dist /cwd/dist && cp /stdlib/dist/types/* /cwd/'
  # -c 'cp /stdlib/*.mjs /stdlib/package.json /stdlib/*.d.ts /cwd/'


# rm tester.mjs ETH-test.mjs
rm version.mo{.d.ts,.mjs}

git diff package.json
git checkout -- package.json

HASH="$(docker run --entrypoint /bin/sh "$IMAGE" -c 'echo $REACH_GIT_HASH')"
# git add .
echo git commit -m "'refresh -> reach-sh/reach-lang@$HASH'"
