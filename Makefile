# For details and other things you can do,
# see HOWTO.md

PACKAGE='@reach-sh/stdlib'

.PHONY: bump-version-and-publish
bump-version-and-publish:
	sbin/check-recent-commits.sh
	npm version prerelease --preid=rc
	npm publish --access=public --tag=rc
	npm dist-tag add $(PACKAGE)"@$$(npm view $(PACKAGE)@rc version)" latest
	git push
	git push --tags

.PHONY: finalize-patch
finalize-patch:
	npm version patch
	npm publish --access=public --tag=stable
	npm dist-tag add $(PACKAGE)"@$$(npm view $(PACKAGE)@stable version)" latest
	git push
	git push --tags

.PHONY: refresh
refresh:
	sbin/refresh.sh

.PHONY: ann
ann:
	@sbin/ann.sh
