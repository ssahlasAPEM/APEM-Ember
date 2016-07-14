#!/usr/bin/env bash

if [ -z `which gsed` ]; then
    SED="sed"
else
    SED="gsed"
fi

$SED --version
if [ $? -ne 0 ]; then
    echo "You don't appear to have GNU sed. Talk to @zack on Slack."
    exit 1
fi

bower cache clean
rm -rf bower_components
bower install
echo "using $SED"
grep -lr --include='*.js' sourceMappingURL bower_components/ | xargs $SED -i 's/sourceMappingURL//g'

# Depending on how npm was feeling when you ran npm install, intl may be in either or both of these
# places
INTL_A='node_modules/intl'
INTL_B='node_modules/ember-intl/node_modules/intl'

if [ -d "$INTL_A" ]; then
    echo "Fixing $INTL_A"
    grep -lr --include='*.js' sourceMappingURL $INTL_A | xargs $SED -i 's/sourceMappingURL//g'
fi

if [ -d "$INTL_B" ]; then
    echo "Fixing $INTL_B"
    grep -lr --include='*.js' sourceMappingURL $INTL_B | xargs $SED -i 's/sourceMappingURL//g'
fi

echo ""
echo ""
echo "If that all went well, ember builds should be good to go."
echo ""
echo "If you update your bower components, run this script again."
echo ""
echo "If the build still crashes, first try 'rm -rf dist/ tmp/; mkdir -p dist tmp;' then run the build again."
echo "If that doesn't help, hit @zack up on Slack"
