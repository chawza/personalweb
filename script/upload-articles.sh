#!/bin/bash

sshpass \
  -p <ssh-pass> \
  rsync -r -I --delete <source-dir-path> vm1:<des-dir-path>