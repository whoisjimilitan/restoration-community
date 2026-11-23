# 24 to 30 November rebuilt with the four moves: name the situation, give the word, say what to do, close on his most memorable line.
# Every sentence is Jimi's own, trimmed only. {{...}} marks anything not in his post.
NEW={
"2026-11-24":dict(body=[
"When your past is over, your accuser would flee, because the only thing that connects you to him is your past. He has no other information about you.",
"Jesus is a tomorrow thinker. He is not so much concerned about our present as our future. {{To}} the woman caught in the act of adultery, {{He said}}:",
("“Then neither do I condemn you,” Jesus declared. “Go now and leave your life of sin.”","John 8:11"),
"He was {{saying}}: your past is over now; stop looking back. I am not interested in your unworthy past. Focus on your future, and I am that future.",
"Do not look back; it is a dangerous thing to do unless it is meant to glorify God for what He has done in your life.",
"Be a forward looker. Discovery is for forward lookers."],
pray="{{Lord Jesus, my past is over. You are my future. Make me a forward looker. Amen.}}"),
"2026-11-25":dict(body=[
"Do you talk too much and not give opportunity for others to speak? Do your words build others up or pull them down? Is there any benefit people derive from them?",
"If we are honest with ourselves, we must admit that much of our conversation, prayer, fasting, preaching and teaching is nothing more than empty talk. God takes notice of every word we say, even that which we ourselves do not notice.",
"Vain and idle talk is a product of a vain and idle heart.",
"The heart is the treasury; the words are the things brought out of the treasury.",
("“A good man brings good things out of the good stored up in him, and an evil man brings evil things out of the evil stored up in him.”","Matthew 12:35"),
"Love, kindness, tenderness, wisdom of utterance and power to counsel are good treasures hidden in the heart, ready for use as occasion demands.",
"Do you want to speak? Pause a minute."],
pray="{{Fill my heart with good treasure, Lord, and let every word I speak today come from it. Amen.}}"),
"2026-11-26":dict(body=[
"The situation with you now on the outside may be poor, painful, frightening and discouraging. Looking at your situation on the outside would give you worries, discouragement, fear and anxiety.",
"While Goliath was busy looking at David from the human point of view, David was busy looking at Goliath from God’s point of view. David was a small boy compared to Goliath in age, size and experience in warfare, but he had a dream that was known to him alone.",
("“So we fix our eyes not on what is seen, but on what is unseen, since what is seen is temporary, but what is unseen is eternal.”","2 Corinthians 4:18"),
"But remember your dream. That dream should be your focus, not your present situation. Your dream will impart strength to endure your present trials. If it is raining now and you know that the rain is for a moment, you would endure.",
"For you to walk toward your future, your future has to move into you first."],
pray="{{Lord, let me see my situation from Your point of view. Let my future move into me today. Amen.}}"),
"2026-11-27":dict(body=[
"Who has hurt you today or in the past? Are you having feelings of resentment or harbouring a grudge as a result of offence?",
"As a child of God, how you respond to your situation matters.",
"Imagine the deep hurt Joseph felt when his brothers tore his coat of many colours, threw him into a dry pit and left him for dead. Joseph did not hold onto the offence. He let go of it, knowing that beyond offence, there God is.",
("“For if you forgive other people when they sin against you, your heavenly Father will also forgive you.”","Matthew 6:14"),
"Many are asking for blessing but have not let go of the grudge that is holding the blessing ransom.",
"Don’t remain a victim of self-imprisonment. You will receive in a moment what you have been seeking for years, the moment you let go of offence.",
"Release yourself."],
pray="{{I release them, and I release myself, in Jesus’ name. Amen.}}"),
"2026-11-28":dict(body=[
"Many spend so much time thinking about their life partner, friends and possessions. How many times do you lovingly think about Jesus daily?",
"Many are trying to climb the ladder of success, but remember, the first place we are to prosper is in our spiritual life.",
("“But seek first his kingdom and his righteousness, and all these things will be given to you as well.”","Matthew 6:33"),
"Enoch was great because his love for God was great. If you are praying to receive a mighty blessing, you must first of all have a mighty relationship with God.",
"One who loves God uses his time to meditate on God’s Word.",
"Meditation in God’s Word is a visit with Him.",
"Start loving Jesus and the sky will be your limit."],
pray="I love You, Lord. {{Amen.}}"),
"2026-11-29":dict(body=[
"Child of God, what is your situation? Is it barrenness, poverty, sickness, stagnation, rejection, or limitation?",
("“They triumphed over him by the blood of the Lamb and by the word of their testimony; they did not love their lives so much as to shrink from death.”","Revelation 12:11"),
"The word of our testimony is a weapon. We are meant to glorify God, not only for what He is doing presently in our situation but for what He did in the past.",
"If your situation is sickness, remember the sickness you had in the past and how God delivered you from the shackles of death. Even when Lazarus was still in the grave, Jesus gave thanks to His Heavenly Father.",
"As long as God is aware of your situation, He will not leave you without a solution."],
pray="I am no longer condemned, I am what God says I am, I have what God says I have and I can do what God says I can do, in Jesus’ name. Amen."),
"2026-11-30":dict(body=[
"Our hearts are so taken up by worldly considerations that we are impatient to recognise the fact that there is an appointed time for everything. This is why we try to move the hands of the clock forward by hook and crook.",
"When it is time to start a race, everybody waits for the blast of the gun. If any person beats the gun, that person would be called back to begin afresh, while others are still waiting patiently.",
"When His mother urged Him to turn water into wine, Jesus simply said, “My hour has not yet come,” knowing that there is an appointed time for everything.",
("“There is a time for everything, and a season for every activity under the heavens.”","Ecclesiastes 3:1"),
"If you are in a haste to achieve something, you are likely to make costly mistakes that would pull you back, if not down.",
"Always remember: God’s time is the best."],
pray="{{My times are in Your hands, Lord. I will not beat the gun. Amen.}}"),
}
for l in L:
    if l['date'] in NEW: l.update(NEW[l['date']])


# 22 and 23 November: the reviewed versions, plus one borrowing each (Jimi, 23 Nov)
for l in L:
    if l['date']=="2026-11-22":
        l['body']=[x if x!="We cannot separate warfare from salvation." else "We cannot separate warfare from salvation. True salvation puts us into direct conflict with satan." for x in l['body']]
    if l['date']=="2026-11-23":
        nb=[]
        for x in l['body']:
            if x=="People are faced with different weaknesses: jealousy, anger, urges of all kinds. We are one another’s strength.":
                nb+=["People are faced with different weaknesses: jealousy, anger, urges of all kinds.","We are one another’s strength."]
            else: nb.append(x)
        l['body']=nb
