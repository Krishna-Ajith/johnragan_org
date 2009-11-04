sudo aptitude install apache2 apache2.2-common apache2-mpm-prefork apache2-utils libexpat1 ssl-cert

echo "Add the following to the end of the apache2.conf file that is being opened:"
echo "ServerName myapacheserver"
echo
echo "Hit return to continue"
read letter

sudo vi /etc/apache2/apache2.conf

sudo /etc/init.d/apache2 reload

sudo aptitude install mysql-server mysql-client libmysqlclient15-dev
# enter the password

sudo aptitude install libmysql-ruby1.8

echo "We are opening up irb, you need to input the following and make"
echo "sure true is returned, then exit:"
echo "require 'mysql'"
echo
echo "Hit return to continue"
read letter

#mysqladmin -u root -pmR8WdkJ2d5XnQ
# note that there is no space between -p and the password
#mysql -u root -pmR8WdkJ2d5XnQ 
#mysql> create database firstdb;
#mysql> exit

echo "Find the following two lines in my.cnf (memorize or write down):"
echo "language  = /usr/share/mysql/english"
echo "skip-external-locking"
echo
echo "and then enter the following two lines (copy them now):"
echo "skip-locking"
echo "skip-innodb"
echo
echo "Hit return to continue"
read letter

echo "Find these values in my.cnf and set them accordingly (write them down)"
echo "key_buffer    = 16K"
echo "max_allowed_packet  = 1M"
echo "thread_stack    = 64K"
echo
echo "Hit return to continue"
read letter

sudo vi /etc/mysql/my.cnf

echo "add following three lines after the thread_stack = 64K statement line"
echo "thread_cache_size = 4"
echo "sort_buffer=64K"
echo "net_buffer_length=2K"
echo
echo "Hit return to continue"
read letter

sudo vi /etc/mysql/my.cnf

echo "uncomment the following:"
echo "skip-innodb"
echo
echo "Hit return to continue"
read letter

sudo vi /etc/mysql/my.cnf

#slicehost_setup John$ ssh -N -p 22 -c 3des john@174.143.158.156 -L 3306/127.0.0.1/3306