#!/usr/bin/awk -f
BEGIN {
  OFS=":"
}
{
  print NR, $3, $5, $7, $8, $9; # prints the line number
}
END {
  OFS=" "
  print "The number of fields is", NF;  # prints number of fields
}