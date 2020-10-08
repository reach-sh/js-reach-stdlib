# prereq: npm is installed locally
# prereq: `npm login`

.PHONY: bump-version-and-publish
bump-version-and-publish:
	npm version prerelease --preid=rc
	npm publish --access public
	git push

# For more nuanced version changes
# See HOWTO.md


# prereq: you have built or pulled fresh
#   reachsh/stdlib docker images.
#   (If built, preferably from a clean git repo)
.PHONY: refresh
refresh:
	sbin/refresh.sh
