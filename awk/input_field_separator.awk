#!/usr/bin/awk -f
BEGIN {
  FS=":";
}
{
  print $5
}