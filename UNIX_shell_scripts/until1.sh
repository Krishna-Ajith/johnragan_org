secretname=jenny
name=noname
echo "Try to guess the secret name!"
# Adds a blank line
echo
until [ "$name" = "$secretname" ]
do
  echo -n "Your guess: "
  read name
done
echo "Very good."