for index in 1 2 3 4 5 6 7 8 9 10
  do
      if [ $index -lt 3 ] ; then
        echo "continue"
        continue
      fi
    echo $index
    # greater than
    if [ $index -ge 8 ] ; then
      echo "break"
      break
    fi
  done