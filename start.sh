# Minify the javascript.
echo Minifying javascript...
rm -f public/minified/*.js
rm -f public/javascripts/minified.js
java -jar node_modules/yuicompressor/yuicompressor-2.4.2.jar public/javascripts --fo public/minified
cat public/minified/*.js >public/javascripts/minified.js
rm -f public/minified/*.js

mongod --dbpath ~/mongodb/data >> production.log 2>&1 &
sudo node app.js >> production.log 2>&1 &