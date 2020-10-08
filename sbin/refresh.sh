#!/bin/sh
set -ex

docker run --entrypoint /bin/sh --volume $(pwd):/cwd reachsh/stdlib:latest \
  -c 'cp /stdlib/*.mjs /stdlib/package.json /stdlib/*.d.ts /cwd/'

rm tester.mjs ETH-test.mjs

git diff package.json
git checkout -- package.json
