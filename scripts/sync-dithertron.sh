#!/bin/bash
DESTPATH=$RSYNC_PATH/dithertron
make distro
rsync --stats -riltz --exclude tmp --chmod=a+rx -e "ssh" index.html ./gen ./images ./lib $DESTPATH/
