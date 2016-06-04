# NB This file should only be used for configuring a new box

echo "******************************************"
echo "************** ADDONS ********************"
echo "******************************************"

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