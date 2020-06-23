#!/bin/bash
DESTPATH=$RSYNC_PATH/dithertron
rsync --stats -rpilvz --chmod=a+rx -e "ssh" * $DESTPATH/
