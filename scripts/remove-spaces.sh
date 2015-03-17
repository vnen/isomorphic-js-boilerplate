# Licensed under MIT

# Remove trailing spaces of lines in source files.
# This works if called in any path under a Git controlled repository
# (and, of course, have Git installed)
# NOTE: this will unstage the files because it changes them and
# that is default Git behavior.

set -e

# Got to root of the Git repo
cd $(git rev-parse --show-toplevel)

# Loop through Git controlled files (includes staged even if new)
for FILE in $(git ls-files)
do
  # Sed power to remove trailing spaces
  sed -i -r 's/[[:space:]]+$//' "$FILE"
done

# That's it
