
lxc cmd ./pack-dist.sh

export DIR="/home/user/eleventy/11t-base-blog/"
export BASENAME="dist"
sleep 1

lxc file pull alpine11ty/${DIR}/dist.tar .
