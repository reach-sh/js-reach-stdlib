#!/bin/sh
set -ex

IMAGE=reachsh/stdlib:latest
docker run --entrypoint /bin/sh --volume "$(pwd):/cwd" "$IMAGE" \
  -c 'cp /stdlib/*.mjs /stdlib/package.json /stdlib/*.d.ts /cwd/'

rm tester.mjs ETH-test.mjs

git diff package.json
git checkout -- package.json

HASH="$(docker run --entrypoint /bin/sh "$IMAGE" -c 'echo $REACH_GIT_HASH')"
git commit -am "refresh -> reach-sh/reach-lang#$HASH"
