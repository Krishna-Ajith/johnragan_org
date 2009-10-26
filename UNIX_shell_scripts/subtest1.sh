export cheese=american
echo "in child, cheese (which was exported from parent) is $cheese and bun (not set) is $bun"
bun=speckled
cheese=swiss
echo "in child, we set to bun to $bun and cheese to $cheese"