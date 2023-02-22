---
layout: layouts/home.njk
title: A Day in the Life of a Sysadmin
description: An intimate glimpse into the work of a sysadmin
templateClass: tmpl-home
date:
---

Tom, our senior sysadmin had just left the week before. Mark and I were working on moving our internal mail store (CommuniGate) to a new storage array (EMC CX600). Our cutoff date was the end of the week, as the students were about to return the following week. I was hoping that we could even get it done on Wed night.

A crises always has a canary, a small hint that all is not right in Paradise. Stefan had sent Mark and I an early morning heads-up via email that Pollux (mail3), one of the mail gateways, had run out of swap. Now that could only be the new virus scanner (TrendMicro) we had installed. Which probably means that there was a lot of virus activity. Well, I looked at the logs and did not see too much, except that it was straining at 17.0 load average. Being under pressure, I did not give it too much thought. Keeping an eye on it, I noticed it was calming down.

So we continue with our CommuniGate installation.

Later that morning, Erin, from Support comes over and says it seems we are infected with a worm, a new version of the SOBIG worm (version F), I do believe.

Well, of course, due to time pressure on this mail project, I had been pulled off completing the virus scan project, and had managed to install the virus scanner on only one of our three gateways. I wanted to test for a while on one of the gateways to make sure everything was working properly before installing it on all three. Defining the notifications had taken longer than I expected, so it had been all of a week languishing at this stage. But I now realized that something was wrong and I needed to install the virus scanner on all the gateways, update the virus files, and that would take probably the rest of the day. So, after re-ordering my priorities, I began to do that.

Firstly, I already had taken one of the gateways (mail2) out of the load pool in preparation for the installation. So, wanting to try something, I had tarred up all the TrendMicro files, and just needed to untar them and install them on mail2. This was to reduce the pain of having to reconfigure the actions and notifications again. It had been complicated and uncomfortable doing it on mail1, I was trying to simplify the process on mail2. They really should have a manual way of being able to port configurations between hosts. But no, of course, they have to build a fancy control manager product and charge people for that one. I don’t need that. I could use cfengine, or just scp the configuration changes. I mean, how often am I going to change the configuration anyways?

In the meantime, i tried to update Pollux’s virus file, as i was concerned that it did not have the new pattern file. The update process timed out! 3 times. Well, that’s not working. Onto TrendMicro’s site. Find the file, download it manually. Find the documentation that explains how to install it manually on the product. Install, restart. Check virus log files – and voila!

<pre>
200X/08/20 15:08:43 GMT-04:00   43A12B63-9EF2-669D-2B11-6257D1C4DF0E    support@infolex.gr      <ajohnson@my.edu>      Re: Thank you!  WORM_SOBIG.F    2       3               3
</pre>

Well, a nice readable log format though I don’t know what those trailing numbers are, and it would be nice to know, but unless it becomes relevant, I will not bother with it.

Unfortunately that didn’t work. Well, it was a long shot, but I had to try it.

So, I copy over the product and install it. Then the patch. Then the configuration. Finally the new pattern file, start the MTA and the virus scanner. Enable mail2 in the load pool, and voila! Success. Repeat the process for mail3, and we are good to go. Well, let us say we have prevented new viruses from entering the system. Now we have to start cleaning up the mess.

I would say it is about 3:30pm. Pollux (mail3) is hurting, the other two are getting sluggish. But, I need to get going to take Jason, my son, to football practice.

We are like a virus fighting a virus. Thrust and parry. Attack and defend. It is all the same.

I believe it was around 8:30pm when I decided to sit down and take a look at the hosts again. Ouch. I ran a check on the mailq, and waited 1min, 5min, 10min and it was not returning. That is a bad sign.

Trying to get an idea of what is going on, I get a call from John A., my manager, to let me know that he thinks nothing is getting through the gateways, as their queues seem to be clogged. He thinks we ought to disable the gateways. I am all for that. Give me time to clean them up!

I realize I am going to need queue information no matter what, and so I run the command, knowing I am going to wait for however long it takes. It transpires that we had over 120,000 emails in the queue on each gateway! To read the information for that many emails on our system took about 40 minutes to 1 hour or so. That is the pace at which the cleanup went.

So this is basically what I did. First I needed the mail information.

Run
<pre>
# mailq > /tmp/m
</pre>
on the gateways. Wait.

Peruse the queues to get some idea of how bad it is. I looked at some emails, and remembered that Arin had said there were <code>.pif</code> files. I ascertained that by reading the emails. I also noticed that a couple of subjects that were common, by looking at the virus logs. Using lines like “Wicked Screensaver” started to get my goat up – I mean who do these smart asses think they are?

Eventually, I got results. The first mailq had completed. On Pollux I noticed a lot of mail from virusadmin which were notifications of virus activity and from MAILER-D telling people their mail could not be sent and why. I realized I needed to clean these out. So, I ran a search on the output of the mailq program and removed these instances.

Here is the program:

<pre>
# The process of last night
# after the attack of the SOBIG WORM, version F
# To extract these from mailq to
# input to postsuper
# The queues were large
# So I did a
# mailq > /tmp/m
# then
# $0 | postsuper -d -
# which will find these users
# and feed the message id to postsuper

while ( <> ) {
 if ( /^\S/ ) {
  /^(\w+)/;
  $f = $1;
 }
 print "$f\n" if ( /MAILER-|virusadmin@my/ );
}
</pre>  

That cleaned up about 30,000 or so emails.

I realize that I had to be more aggressive. Using the information about the .pif files and the common subjects, I decided to run a search on all of the emails, identify the ones that contain a virus, and delete them from the queue. For the mail program to do that would take far too long.

So I wrote a wicked little script to curb the wicked screensaver and the SOBIG bad WORM, version F.

<pre>
open(O,">/tmp/x.out") ||die;
open(I,"/tmp/f") ||die;
@flist = &lt;I&gt;
close(I);
foreach $file ( @flist ) {
 print $file;
    next if ( $file =~ m:/defer/: );
    chomp $file;
    open (F, $file) or next;
    $_= <F>;
    $_ = <F>;
    if ( /\.pif"|virusadmin\@my.edu|wicked_scr.scr|Wicked
Screensaver/i) {
        $file =~/\/(.*)$/;
        print O "$file\n";
    }
}
</pre>

Here how it works:

It runs a find on the spool to give me a directory listing of all the files in the pool. Then this script, accepting this file listing as input, opens each one of them, minus some kruft, and searches for those patterns described above, outputting the file name. However, as is always the case, my script was not perfect as one of my regular expressions is not quite right. I wanted to output just the Message-ID, but it outputs the directory as well. That is, instead of getting something like <code>ASDRFE546T</code>, I get <code>./deferred/A/0/ASDRFE546T</code>. So I cannot pipe it straight into postsuper, I need to write the output to a file, for now. If this is ever needed again, I will fix the regexp. But at 3am, or thereabouts, in the morning, it was fine.

So to fix my little problem, I run a little awk script on the output,

</pre>

# awk -F/ '{print $NF}' | postsuper -d -

</pre>

and pipe it to postsuper, which will remove the tagged messages.

After nodding off a couple of times while waiting, and having the VPN time out on me once and my machine hibernate another, thus breaking my connection with the mail gateways and causing the programs to terminate. Which in turn requires me to have to manually manipulate the data to set up everything for the next run, I came up with the deluxe version:
<pre>
# nohup [awk ...] > /tmp/p 2&>1
</pre>
uninterruptable, so if I fall asleep and get bumped, it will not stop running. Secondly, it outputs the results to a file. Always useful.

At this point we had already switched the gateways off. In fact that occurred at around 11:30pm, I believe. So we were getting no new mail. Which, of course, made my life so much easier.

Everything else was fine, except that ken noticed earlier that we were getting hammered on the firewall - ICMP packets were extraordinarily high. It later seemed that it was trying to do something with rexecd. Which are two different things. It would have been informative to have collected some evidence and been able to do some forensics on what was going on at the firewall. I think that was a more sophisticated attempt at breaking in. High ICMP traffic generally means probing - data gathering, as it is sometimes called. Rexec traffic means that someone is trying to execute a local program from a remote location. I would think that very few unix sites still either have rexecd allowed through their border, or use r-commands to execute remotely. We actually use secure shell for remote access to our servers.

With these scripts I (after run 3 that is - we are at about 4 o'clock at this stage) manage to reduce the queues from above 100,000 messages to around 30,000. I then ran the queues manually to push them out. It still took a while, to do that, and around 8am or so I have a talk with John, and it seems that things are under control. Mail1 is down to 147 messages, 2 & 3 are coming down. I switch mail1 off again and watch the queue for a while, deciding to sacrifice it and get some sleep.

Good night all.

Well, the saga continues. I was up at about 1pm. And after a brief discussion with Jeff, am working on cleaning up mail1. The mailq program has been running for over an hour and identified 77,000 messages in the queue. But the crises is over. The other two gateways are running fine, with about 150 messages each in the queue. Mail1 is off-line, so we will be able to handle it. The rexec port is switched off on the border. All is quiet. I will take it easy today, finish cleaning up mail1 and kick back.

…………
a
Julian
