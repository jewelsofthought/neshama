---
title: Linux Commands
description: Some useful commands
date: 2021-10-19T20:31:21.600Z
tags: 
eleventyExcludeFromCollections: true
modified: 2022-01-30T19:13:47.541Z
---

| Quick reference chart                      |                                                      |
| ------------------------------------------ | ---------------------------------------------------- | --- |
| inxi -Fxz                                  | Display info about all hardware                      |
| lshw [-short] -C [disk,cpu,network,memory] | Display info about                                   |
| lshw -C memory                             | Determine whether memory slots are available (empty) |
| ls[usb,pci,blk]                            | List USB, PCI or disk devices & info                 |
| hdparm -i /dev/sda                         | specific disk drive information                      |
| dmidecode -t memory                        | memory information                                   |
| dmidecode -t bios                          | Display UEFI/BIOS info                               |
| free -m                                    | free memory                                          |
| blkid                                      | List partition IDs (UUIDs)                           |
| ip link show                               | Show network interfaces                              |
| ip route                                   | Display routing tables                               |
| lspci \| grep -i vga                       | Determine the amount of video memory                 |
|                                            | then reissue with the device number;                 |
|                                            | for example: lspci -v -s 00:02.0                     |
|                                            | The VRAM is the prefetchable value.                  |     |
I should include my Notes here!