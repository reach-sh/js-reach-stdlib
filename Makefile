# For details and other things you can do,
# see HOWTO.md

PACKAGE='@reach-sh/stdlib'

.PHONY: bump-version-and-publish
bump-version-and-publish:
	sbin/check-recent-commits.sh
	echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
	npm version prerelease --preid=rc
	npm publish --access=public --tag=rc
	git push
	git push --tags

.PHONY: finalize-patch
finalize-patch:
	npm version patch
	npm publish --access=restricted --tag=stable
	npm dist-tag add $(PACKAGE)"@$$(npm view $(PACKAGE)@stable version)" latest
	git push
	git push --tags

.PHONY: refresh
refresh:
	sbin/refresh.sh

.PHONY: ann
ann:
	@sbin/ann.sh
