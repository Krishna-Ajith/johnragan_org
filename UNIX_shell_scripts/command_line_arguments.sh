echo "the name of this program is: $0"
# If entered using directory structure, then
echo "the name of this program is: $(basename $0)"

echo All arguments are $*
echo The number of arguments are $#