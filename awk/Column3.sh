#!/bin/bash
column=${1:-1}  # Gets the first value, or if not specified sets it -1
x=4
#awk '{print '$x'}'  # prints the value of x
#awk '{print $'$x'}'  # prints the column identified by x, or the 4th column
awk '{print $'$column'}'  # prints the column number passed in as a parameter
#awk '{print 7 + 10}'