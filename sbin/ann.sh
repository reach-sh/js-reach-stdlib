#! /bin/sh

IMAGE=reachsh/stdlib:latest
export git_hash="$(docker run --entrypoint /bin/sh "$IMAGE" -c 'echo $REACH_GIT_HASH')"
export js_version="$(npm info . version)"
export version="$(echo $js_version | cut -f 1 -d '-')"

mo sbin/ann.txt
