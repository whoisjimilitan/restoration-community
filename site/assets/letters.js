/* THE COUNSEL SCHEDULE. One line per letter, in date order.
   Each letter lives at /counsel/<slug>, with its picture at /images/counsel/<slug>-post.jpg (1080x1350)
   and its link preview at /images/counsel/<slug>-og.jpg (1200x630).
   A new letter becomes "today's" at 5 a.m. Accra time on its date. /counsel always opens today's letter. */
window.LETTERS = [
  { date: "2026-11-21", slug: "value-in-challenges", title: "There is value in challenges" },
  { date: "2026-11-22", slug: "warfare-and-salvation", title: "We cannot separate warfare from salvation" },
  { date: "2026-11-23", slug: "one-anothers-strength", title: "We are one another’s strength" },
  { date: "2026-11-24", slug: "jesus-is-a-tomorrow-thinker", title: "Jesus is a tomorrow thinker" },
  { date: "2026-11-25", slug: "do-you-want-to-speak", title: "Do you want to speak? Pause a minute" },
  { date: "2026-11-26", slug: "your-future-has-to-move-into-you", title: "Your future has to move into you first" },
  { date: "2026-11-27", slug: "beyond-offence-there-god-is", title: "Beyond offence, there God is" },
  { date: "2026-11-28", slug: "meditation-is-a-visit-with-him", title: "Meditation in God’s Word is a visit with Him" },
  { date: "2026-11-29", slug: "the-weapon-of-testimony", title: "The word of our testimony is a weapon" },
  { date: "2026-11-30", slug: "gods-time-is-the-best", title: "God’s time is the best" }
];
/* Today's letter: the latest one whose date has arrived (5 a.m. Accra time = 05:00 UTC). */
window.todaysLetter = function(){
  var today = new Date(Date.now() - 5*3600*1000).toISOString().slice(0,10), pick = null;
  (window.LETTERS||[]).forEach(function(l){ if(l.date <= today) pick = l; });
  return pick;
};

/* The coming city encounter, linked in every letter's footer. Change this one line for the next city.
   The link hides itself after the "until" date. */
window.NEXT_ENCOUNTER = { label: "Accra, 11 December", href: "/accra", until: "2026-12-11" };
