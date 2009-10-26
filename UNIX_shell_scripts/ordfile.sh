if test $# -eq 0
	then
		echo "You must supply at least one argument"
		exit 1
fi

# This does some file testing.  Here are the options:
# -d  Exists and is a directory file
# -e  Exists
# -f  Exists and is an ordinary file (not a directory)
# -r  Exists and is readable
# -s  Exists and has a size greater than 0 bytes
# -w  Exists and is writable
# -x  Exists and is executable

if test -f "$1"
  then
    echo "$1 is an ordinary file in the working directory"
  else
    echo "$1 is NOT an ordinary file in the working directory"
fi