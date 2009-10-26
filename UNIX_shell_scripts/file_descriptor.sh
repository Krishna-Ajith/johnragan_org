# set input file descriptor 3 to if1.sh
exec 3< if1.sh

# set output file descriptor 4 to some file
exec 4> output.out

# We are setting file descriptor 5 to be standard input (though we won't use it)
exec 5<&0

cat <&3 >&4
# close these descriptors
exec 3<&-
exec 4<&-