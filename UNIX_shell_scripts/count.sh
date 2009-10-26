#! /bin/bash
number=0
# less than
while [ "$number" -lt 10 ]
  do
    echo -n "$number"
    # arithmetic evaluation to increase the number by 1
    ((number += 1))
  done
echo