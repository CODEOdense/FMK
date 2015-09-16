echo "** INSTALLING MAILCATCHA **"
sudo apt-get install ruby-dev -y
sudo apt-get install libsqlite3-dev
sudo gem install mailcatcher

sudo sed -i 's/;sendmail_path =/sendmail_path = \/usr\/bin\/env catchmail -f test@edentic.local/g' /etc/php5/fpm/php.ini

# Add config to mods-available for PHP
# -f flag sets "from" header for us
echo "sendmail_path = /usr/bin/env $(which catchmail) -f test@local.dev" | sudo tee /etc/php5/mods-available/mailcatcher.ini

# Enable sendmail config for all php SAPIs (apache2, fpm, cli)
sudo php5enmod mailcatcher

echo "** RESTARTING THINGS **"
service php5-fpm restart
service nginx restart