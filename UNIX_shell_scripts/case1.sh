echo -n "Enter A, B, or C: "
read letter
case "$letter" in
  a|A)
    echo "You entered A"
    # ;; is how you end the case statement
    ;;
  b|B)
    echo "You entered B"
    ;;  
  c|C)
    echo "You entered C"
    ;;
  [1-9])
    echo "You entered a number between 1 and 9"
    ;;
  ??)
    echo "You entered two characters"
    ;;
  *)
    echo "You did not enter a value which matched"
    ;;
esac