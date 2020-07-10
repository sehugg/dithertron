#!/bin/bash
DESTPATH=$RSYNC_PATH/dithertron
rsync --stats -riltz --chmod=a+rx -e "ssh" * $DESTPATH/
