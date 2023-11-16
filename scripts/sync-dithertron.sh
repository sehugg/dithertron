#!/bin/bash
DESTPATH=$RSYNC_PATH/dithertron
make distro
rsync --stats -riltz --chmod=a+rx -e "ssh" ./tmp/dist/* $DESTPATH/
