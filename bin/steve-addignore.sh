#!/bin/bash
echo 'webclient-deployed

.*
!.gitignore
*~

# KDE
.directory

#https://raw.github.com/github/gitignore/master/Global/vim.gitignore

.*.sw[a-z]
*.un~
Session.vim

#https://raw.github.com/github/gitignore/master/Global/TextMate.gitignore

*.tmproj
*.tmproject
tmtags

# https://raw.github.com/github/gitignore/master/Global/OSX.gitignore

.DS_Store

# Thumbnails
._*

# Files that might appear on external disk
.Spotlight-V100
.Trashes

# steve
*.css
*.html
npm-debug.log
pakmanaged.*
node_modules
!.npmignore
cat 
' >> .gitignore

echo '# overrides .gitignore for NPM
node_modules
.git
' >> .npmignore
