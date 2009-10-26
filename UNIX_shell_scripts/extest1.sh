export cheese=american
bun=wheat
echo "in parent, cheese (which is exported) is $cheese and bun is $bun"
bash subtest1.sh
echo "after changes in child, cheese is still $cheese and bun is still $bun"