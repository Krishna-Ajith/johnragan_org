# Replace all the IP addresses below with your own.

scp remote_setup_users.sh root@174.143.158.156:/home
echo "We ssh to the remote server, then you can run the following script:"
echo "bash /home/remote_setup_users.sh"
echo "After that, logout to continue."
echo "Hit enter to continue"
read letter
ssh root@174.143.158.156

echo "we are now copying the ssh public key to the server for user john"
scp ~/.ssh/id_rsa.pub john@174.143.158.156:/home/john/
scp ~/slicehost_setup/remote_setup_ssh.sh john@174.143.158.156:/home/john
scp ~/slicehost_setup/remote_setup_ubuntu.sh john@174.143.158.156:/home/john

echo "We are going to ssh in as john."
echo "Once you are in, you need to run the following script:"
echo "bash /home/john/remote_setup_ssh.sh"
echo "After that, logout to continue."
echo "Hit enter to continue"
read letter
ssh john@174.143.158.156

echo "We are going to do some ubuntu locale setting and upgrading as john."
echo "Once you are in, you need to run the following script:"
echo "bash /home/john/remote_setup_ubuntu.sh"
echo "After that, logout to continue."
echo "Hit enter to continue"
read letter
ssh john@174.143.158.156