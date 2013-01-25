# Base64 encode the images.
echo Encoding images...
rm -f public/css/images.css.less
for filename in public/img/icons/*; do
  file_ext=${filename##*.}
  if [ "$file_ext" != 'png' ] || [ "$file_ext" != 'jpg' ];
  then
    data=`openssl enc -base64 -in $filename | tr -d '\n'`
    filename=$(basename $filename)
    filename=${filename%.*}
    echo $filename
    echo @$filename: url\(data:image/png\;base64,$data\)\; >> public/css/images.css.less
  fi
done

# Compile and minify the css.
echo Compiling css...
lessc -x public/css/style.less public/css/style.css

# Minify the javascript.
echo Minifying javascript...
rm -f public/minified/*.js
rm -f public/javascripts/minified.js
java -jar node_modules/yuicompressor/yuicompressor-2.4.2.jar public/javascripts --fo public/minified
cat public/minified/*.js >public/javascripts/minified.js
rm -f public/minified/*.js

echo starting...
sudo node app.js