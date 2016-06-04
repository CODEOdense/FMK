# NB This file should only be used for configuring a new box

echo "******************************************"
echo "************** ADDONS ********************"
echo "******************************************"

echo "** XDEBUG CONFIG **"

xdebug="
xdebug.remote_enable = on
xdebug.remote_connect_back = on
xdebug.idekey = 'vagrant'
"
sudo echo "$xdebug" >> "/etc/php5/mods-available/xdebug.ini"

sudo sed -i 's/upload_max_filesize = 2M/upload_max_filesize = 1G/g' /etc/php5/fpm/php.ini
sudo sed -i 's/post_max_size = 8M/post_max_size = 1G/g' /etc/php5/fpm/php.ini
touch  /home/vagrant/Code/nginx.conf

echo "** Installing Imagemagic php5-imagick**";
sudo apt-get install imagemagick php5-imagick -y

echo "** RESTARTING THINGS **"
service php5-fpm restart
service nginx restart

echo "** INSTALLING PHPUNIT **"
wget https://phar.phpunit.de/phpunit.phar
chmod +x phpunit.phar
sudo mv phpunit.phar /usr/local/bin/phpunit
sudo phpunit --version

echo "** UPDATING NPM**"
sudo npm cache clean -f
sudo npm install -g npm
sudo npm cache clean -f

echo "** SPEEDING UP DB **"
sudo echo "innodb_flush_log_at_trx_commit = 2" >> /etc/mysql/my.cnf
sudo sed -i 's/skip-external-locking/skip-external-locking\ninnodb_flush_log_at_trx_commit = 2/g' /etc/mysql/my.cnf
sudo service mysql restart

echo "** SETTING UP PM2 NODE SCRIPT STARTER **"
npm install pm2 -g
pm2 startup ubuntu
su -c "env PATH=$PATH:/usr/bin pm2 startup ubuntu -u vagrant --hp /home/vagrant"
pm2 start /home/vagrant/Code/index.js