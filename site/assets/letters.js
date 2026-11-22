/* THE COUNSEL SCHEDULE. One line per letter, in date order.
   Each letter lives at /counsel/<slug>, with its picture at /images/counsel/<slug>-post.jpg (1080x1350)
   and its link preview at /images/counsel/<slug>-og.jpg (1200x630).
   A new letter becomes "today's" at 5 a.m. Accra time on its date. /counsel always opens today's letter. */
window.LETTERS = [
  { date: "2026-11-21", slug: "value-in-challenges", title: "There is value in challenges" }
];
/* Today's letter: the latest one whose date has arrived (5 a.m. Accra time = 05:00 UTC). */
window.todaysLetter = function(){
  var today = new Date(Date.now() - 5*3600*1000).toISOString().slice(0,10), pick = null;
  (window.LETTERS||[]).forEach(function(l){ if(l.date <= today) pick = l; });
  return pick;
};
