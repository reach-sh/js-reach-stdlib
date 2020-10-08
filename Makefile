# For details and other things you can do,
# see HOWTO.md

.PHONY: bump-version-and-publish
bump-version-and-publish:
	npm version prerelease --preid=rc
	npm publish --access public
	git push --tags

.PHONY: refresh
refresh:
	sbin/refresh.sh
