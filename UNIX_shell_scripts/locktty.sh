# Stops user from being able to use Ctrl-C or Ctrl-Z to break the script
trap '' 1 2 3 18
# Hides the keys that the user types (e.g., the password)
stty -echo
echo -n "Key:"
read key_1
echo
echo -n "Again:"
read key_2
echo
# Assigns null to key_3
key_3=
if [ "$key_1" = "$key_2" ]
  then
    # Clears the screen
    tput clear
    until [ "$key_3" = "$key_2" ]
    do
      read key_3
    done
  else
    echo "locktty: keys do not match" 1>&2
fi
# turns echo back on for typed keys
stty echo
    