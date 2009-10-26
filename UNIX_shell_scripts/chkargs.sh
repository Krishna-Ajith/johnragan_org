# $# gives the number of arguments
# -eq compares two numbers
if test $# -eq 0
	then
		echo "You must supply at least one argument"
		# Leaves the program
		exit 1
fi
echo "Program running."