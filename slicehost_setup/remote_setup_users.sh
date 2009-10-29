echo "Setup a new password for root"
passwd

echo "We will then add the new user 'john'"
adduser john

mkdir /home/john/setup_scripts

echo "we will bring up visudo, and you will need to add the"
echo "following line to the end of the file (copy it now):"
echo "john    ALL=(ALL) ALL"
echo "hit return to continue"

read letter

visudo

echo "Now, please log out"