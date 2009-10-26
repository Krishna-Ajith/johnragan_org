#! /bin/bash
PS3="Choose your favorite fruit from these possibilities: "
# LINES has a defulat vlaue of 24, and COLUMNS a default value of 80
COLUMNS=20
select FRUIT in apple banana blueberry kiwi orange watermelon STOP
do
  if [ "$FRUIT" = "" ]; then
    echo -e "Invalid entry.\n"
    continue
  elif [ $FRUIT = STOP ]; then
    echo "Thanks for playing!"
    break
  fi
echo "You chose $FRUIT as your favorite."
# REPLY holds what was chosen
echo -e "That is choice reply $REPLY.\n"
done