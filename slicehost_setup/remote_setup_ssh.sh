# ssh into the box and create a directory
mkdir /home/john/.ssh

# move and rename the public key
mv /home/john/id_rsa.pub /home/john/.ssh/authorized_keys

# change owner
chown -R john:john /home/john/.ssh

# change permission
chmod 700 /home/john/.ssh

# change permission
chmod 600 /home/john/.ssh/authorized_keys

echo "We are checking the operating system, which should be as follows:"
echo "DISTRIB_ID=Ubuntu"
echo "DISTRIB_RELEASE=8.04"
echo "DISTRIB_CODENAME=hardy"
echo 'DISTRIB_DESCRIPTION="Ubuntu 8.04.1"'
echo
cat /etc/lsb-release

echo "hit return to continue"
read letter

echo "You need to add the following to the ~/.bash_profile"
echo "file about to be opened with vi:"
echo "(be sure to copy the following before continuing):"
echo 'alias free="free -m"'
echo 'alias update="sudo aptitude update"'
echo 'alias install="sudo aptitude install"'
echo 'alias upgrade="sudo aptitude safe-upgrade"'
echo 'alias remove="sudo aptitude remove"'
echo 'export PS1="\n\[\e[36;1m\]\u@\[\e[32;1m\]\H:\w\n> \[\e[0m\]" '
echo
echo "hit any key to continue"
read letter

vi ~/.bash_profile

echo "please logout"