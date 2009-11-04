echo "First we will install ruby and its support."
echo
echo "Hit return to continue"
read letter

sudo aptitude install ruby1.8-dev ruby1.8 ri1.8 rdoc1.8 irb1.8 libreadline-ruby1.8 libruby1.8 libopenssl-ruby sqlite3 libsqlite3-ruby1.8
sudo ln -s /usr/bin/ruby1.8 /usr/local/bin/ruby
sudo ln -s /usr/bin/ri1.8 /usr/local/bin/ri
sudo ln -s /usr/bin/rdoc1.8 /usr/local/bin/rdoc
sudo ln -s /usr/bin/irb1.8 /usr/local/bin/irb

echo "Next we will do ruby -v, and you should see something like the following:"
echo "ruby 1.8.6 (2007-09-24 patchlevel 111) [x86_64-linux]"
echo
echo "Hit return to continue"
read letter

ruby -v

echo "Next we install ruby gems, and upgrade it"
echo
echo "Hit return to continue"
read letter

mkdir /home/john/sources
cd /home/john/sources
#Try to get the latest version
wget http://rubyforge.org/frs/download.php/60718/rubygems-1.3.5.tgz
tar xzvf rubygems-1.3.5.tgz
cd  rubygems-1.3.5
sudo ruby setup.rb
sudo ln -s /usr/bin/gem1.8 /usr/bin/gem

sudo gem update
sudo gem update --system

echo "We are now installing rails (this takes some time)"
echo
echo "Hit return to continue"
read letter

sudo gem install rails
rails -v

echo "We just did rails -v"
echo "You should have seen the following above (or something similar):"
echo "rails 2.3.4"
echo
echo "Hit return to continue"
read letter

echo "We are now installing imagemagick"
echo
echo "Hit return to continue"
read letter

sudo apt-get install imagemagick librmagick-ruby1.8 librmagick-ruby-doc libfreetype6-dev xml-core -y

echo "We brought up irb.  Please enter the following, and make sure it return 'true'"
echo "require 'RMagick'"
echo "Then 'exit' to continue after that."
echo
echo "Hit return to continue"
read letter

irb

echo "time to logout to continue"