#FMK Game

FMK game based on Movia data from OFF


##Requirements
- [VirtualBox](http://virtualbox.org)
- [Vagrant](http://vagrantup.com)

##How to get going

1. Clone this repo and `cd` into it
2. Run `vagrant up`
3. When Vagrant has finished setup, you can access the project using your favourite browser and the ip `192.168.57.10` or from an external device using `<your_ip>:8000`
4. Use `vagrant ssh` to SSH into your newly setup Vagrant box and `cd` into your projects directory using `cd Code/` and you are ready to go!
5. Use `Exit` and `vagrant halt` to shut down the Vagrant box, when finished developing

##Express help
Run `pm2 restart index` to restart Express server when code is changed