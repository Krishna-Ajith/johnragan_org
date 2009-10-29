echo "We will set up the locales now"
echo
echo "Hit any key to continue"
read letter
sudo locale-gen en_US.UTF-8
sudo /usr/sbin/update-locale LANG=en_US.UTF-8
mkdir ~/tmp

echo "We will now upgrade the Ubuntu image and then restart,"
echo "which will log you out."
echo
echo "Hit return to continue"
read letter

sudo aptitude safe-upgrade
sudo aptitude full-upgrade
sudo apt-get update
sudo aptitude install build-essential
sudo apt-get install build-essential
sudo shutdown -r now

exit