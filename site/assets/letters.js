/* THE COUNSEL SCHEDULE. One line per letter, in date order.
   Each letter lives at /counsel/<slug>, with its picture at /images/counsel/<slug>-post.jpg (1080x1350)
   and its link preview at /images/counsel/<slug>-og.jpg (1200x630).
   A new letter becomes "today's" at 5 a.m. Accra time on its date. /counsel always opens today's letter. */
window.LETTERS = [
  { date: "2026-11-21", slug: "value-in-challenges", title: "There is value in challenges" },
  { date: "2026-11-22", slug: "warfare-and-salvation", title: "We cannot separate warfare from salvation" },
  { date: "2026-11-23", slug: "one-anothers-strength", title: "We are one another’s strength" },
  { date: "2026-11-24", slug: "your-past-is-over", title: "Your past is over" },
  { date: "2026-11-25", slug: "do-your-words-build-others-up", title: "Do your words build others up?" },
  { date: "2026-11-26", slug: "remember-your-dream", title: "Remember your dream" },
  { date: "2026-11-27", slug: "let-go-of-offence", title: "Let go of offence" },
  { date: "2026-11-28", slug: "visit-jesus-in-his-word", title: "Visit Jesus in His Word" },
  { date: "2026-11-29", slug: "your-testimony-is-a-weapon", title: "Your testimony is a weapon" },
  { date: "2026-11-30", slug: "wait-for-gods-time", title: "Wait for God’s time" }
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
