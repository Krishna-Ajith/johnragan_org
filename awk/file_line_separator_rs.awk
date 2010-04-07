#!/usr/bin/awk -f
BEGIN {
  # change the record separator from newline to nothing
    RS=""
  # change the field separator from whitespace to newline
    FS="\n"
}
{
  # print the second and third line of the file (only works if file is up to 100 lines since only up to 100 fields)
  OFS="\n";
  print $2, $3;
}