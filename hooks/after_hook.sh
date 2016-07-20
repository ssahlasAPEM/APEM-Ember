# hook to run after the compile script in the heroku-buildpack-ember-builder
# duplicates the functionality of the laravel-bridge

# this variable is "inherited" from the compile script
cd $emberapp_root
cp -r dist/* ../../public
mv ../../public/index.html ../../resources/views/app/main.blade.php
