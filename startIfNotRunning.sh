# check mongo
mongo=`ps -ef | grep -v grep | grep mongo | awk '{ if(NR == 1) {print NR} }'`
if [ "$mongo" != '1' ]
then
  # process not found, restart mongo and node
  if
    cd /home/ec2-user/www/smartjsc/
  then
    echo "`date` Restarting killed mongo process." >> /home/ec2-user/www/smartjsc/production.log 2>&1 &
    mongod --dbpath ~/mongodb/data >> production.log 2>&1 &
  else
    echo "Could not locate current directory."
  fi
else
  # process was found
  echo "No need to restart mongo."
fi

sleep 1

# check node
ps -ef | grep -v grep | grep node
# if not found - equals to 1, start it
if [ $? -eq 1 ]
then
  # process not found
  if
    cd /home/ec2-user/www/smartjsc/
  then
    echo "`date` Restarting killed node process." >> /home/ec2-user/www/smartjsc/production.log 2>&1 &
    /bin/sh ./start.sh >> production.log 2>&1 &
  else
    echo "Could not locate current directory."
  fi
else
  # process was found
  echo "No need to restart node."
fi
