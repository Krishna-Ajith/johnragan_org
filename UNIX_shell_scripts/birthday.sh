# This redirects the internal file to be the standard input for the command.
# This is known as a here document
# birthday Jenny
# grep -i makes the search case-insensitive
grep -i "$1" <<+
Alex    June 22
Barbara February 3
Darlene May 8
Helen   March 13
Jenny   January 23
Nancy   June 26
+