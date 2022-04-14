---
title: Linux Commands
description: null
date: 2021-08-21T16:00:00.000Z
tags:
  - IT
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
