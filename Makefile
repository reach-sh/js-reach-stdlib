# For details and other things you can do,
# see HOWTO.md

PACKAGE='@reach-sh/stdlib'

.PHONY: bump-version-and-publish
bump-version-and-publish:
	npm version prerelease --preid=rc
	npm publish --access=public --tag=rc
	npm dist-tag add $(PACKAGE)"@$$(npm view $(PACKAGE)@rc version)" latest
	git push
	git push --tags

.PHONY: refresh
refresh:
	sbin/refresh.sh
