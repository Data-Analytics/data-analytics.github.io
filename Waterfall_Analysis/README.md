Visualising Tendulkar's ODI career using D3.js
==============================================

TL;DR you can use waterfall charts to visualise cricketer stats. This
is an attempt at plotting Tendulkar's ODI career.

Screenshot:<br/>
[![Sachin Tendulkar's ODI career as a waterfall plot](http://www.deepakg.com/prog/img/waterfall-tendulkar-odi-v2.png)](http://www.deepakg.com/prog/code/waterfall/tendulkar-odi-career.html)

[Live Demo](http://www.deepakg.com/prog/code/waterfall/tendulkar-odi-career.html)

While hacking on a
waterfall plot at booking.com's internal hackathon with
[Stuart](http://mrfrisby.com), it occurded to me that we could employ
waterfalls to visualise all kinds of things. This is an attempt at
visualising Sachin Tendulkar's ODI career.

It is a simple-minded plot of runs scored each year. It is not the
best way to visualise a cricketer's career. It doesn't take into
account the no. of matches played. For example, 1989 shows up without
a bar because Tendulkar made 0 runs in his debut year but it hides the
fact that he played just [one match in
1989](http://stats.espncricinfo.com/ci/engine/player/35320.html?class=2;template=results;type=allround;view=match;year=1989)
and that too in November. It also doesn't show significant
performances like centuries scored each year. Despite the
shortcomings, it is _a_ way to look at data and it does call out some
things immediately, like 1998 being Tendulkar's most prolific year
(odi-wise).

The data comes courtesy of [ESPN
Cricinfo's](http://www.espncricinfo.com/) brilliant and ever reliable
[Statsguru](http://stats.espncricinfo.com/ci/engine/stats/index.html). I
got the data through simple jQuery DOM traversal in Chrome's web
console and converted it into a
[PhantomJS](https://github.com/ariya/phantomjs/) script. You can find
it under the crawlers directory.
