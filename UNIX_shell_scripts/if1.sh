echo -n "word 1: "
read word1
echo -n "word 2: "
read word2

# Basic format for an if test
if test "$word1" = "$word2"
	then
		echo "Match"
fi
echo "End of program"