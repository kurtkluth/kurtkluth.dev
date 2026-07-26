---
title: Gameplay
description: Leagues and seasons, player cards and rarities, the lineup editor, training, facilities, statistics, Scout Pack odds, pitcher fatigue, and saving.
---

The match is the heartbeat, but the franchise is the game. This page
covers the systems around the diamond.

## Seasons and the league ladder

A season is fourteen matchdays against seven rival clubs, home and away,
followed by a four team playoff. The standings track wins, losses, and run
differential, and the top four seeds go to the semifinals.

Win the championship and your club is promoted. Finish in the bottom two
and you go down. There are five leagues to climb:

| League   | Roughly |
| -------- | ------- |
| Amateur  | Where every dynasty starts |
| Regional | Real ballclubs with real arms |
| National | National television, national pressure |
| Elite    | Nine clubs built to win titles |
| Legend   | The last rung |

The important part is what the league does to your opponents. Rival clubs
are built around the **league's** strength, not yours. That means a better
roster genuinely makes your games easier, which is the whole reward for
building one. Getting promoted is what makes them hard again.

Deeper leagues also pay better, so climbing is worth coins as well as
pride.

## Statistics

Every plate appearance and every pitch is recorded. After a match you get a
full box score with AB, R, H, RBI, BB, K and AVG for your hitters, and IP,
H, R, BB, K and ERA for your arms, including who took the win, the loss, or
the save.

Those lines roll up into a season line and a career line for every player
on your roster. Season stats reset when a new season starts; career totals
never do. The **My Team** screen has a Stats tab with club leaderboards for
both.

## Player cards

Every player in Diamond Dynasty is procedurally generated: name, position,
ratings, and the card art itself (each card is drawn as SVG, no two clubs
alike). Cards come in six rarities, and rarity sets the ceiling; a higher
rarity card arrives with better ratings and more room to grow.

Batters and pitchers carry different rating sets (a slugger's power does
not help them pitch), so building a club means collecting both sides of
the ball.

## My Team

The **My Team** screen is the front office:

- **Roster.** Every card you own, with ratings and rarity at a glance. Tap
  a card for its stat sheet and training.
- **Lineup editor.** Set your batting order and starting pitcher by hand,
  or press auto set and let the game place your best nine.
- **Stats.** Season and career leaderboards for your whole club.
- **Training.** Spend coins on a player to raise their ratings. Growth is
  scaled by potential, so a young high potential card is the better
  long-term investment even when a veteran looks stronger today.

The **team rating** number is computed from your active lineup. **Team
value** is the bigger number on the menu: roster strength plus facilities,
championships, wins, and Challenge Tower progress.

## Facilities

Five upgrade tracks, five levels each, bought with coins. Unlike a card,
a facility keeps paying every match after you buy it:

- **Training Center.** Cheaper training, up to 50 percent off.
- **Analytics Department.** Advance scouting. At level 1 the opposing
  pitcher's pitch type is called out before he throws it; at level 3 you
  get the location too.
- **Medical Center.** Your pitchers hold their stuff deeper into games.
- **Fan Center.** Bigger coin payouts from every match.
- **Scouting Hub.** Better odds on every pack you open.

## Scout Packs

Packs cost 200 coins and contain three players, revealed with an animated
card flip. The pull odds for each rarity are published right on the packs
screen, so you always know the deal before you buy. Duplicates still
deepen the roster; a second good arm matters the day your starter tires
in the second inning.

## Challenge Tower

One hundred floors, and every floor drops you into a jam that is already
in progress: down two in the last inning with runners on, or protecting a
one run lead with the bases loaded. Get out of it and the floor is yours.

Floors are generated from their own number, so floor 47 is the same puzzle
every time and on every device. Every fifth floor is a marquee club that
hits harder and pays double.

## Daily Challenges

Three objectives, redrawn at midnight local time: win matches, hit home
runs, collect hits, strike batters out, score runs, steal bases. They are
ticked off by ordinary match results, so playing the game you were going to
play anyway makes progress on them. Rewards pay automatically the moment
one completes.

## The match engine

Matches play out pitch by pitch, and neither half is skipped.

**When you bat**, the pitch flies in and a gold ring closes on it. Contact
is decided by where the barrel actually is when the ball gets there, so a
perfectly timed swing at a pitch off the plate misses, exactly as it looks
like it should. The swing outcome then weighs the batter's rating against
the pitcher's, and the pitcher's current fatigue.

With a runner on and the next bag open, a send button appears. Fast runners
beat catchers with weak arms, and a runner thrown out is an out you did not
have to give away.

**When you pitch**, every call is one pitch: a type from six, and a location
from three. The count is live and the hitter responds to it. He takes a lot
of first pitches, he expands the zone with two strikes, and he is not
swinging at all on 3-0. Command is a pitching skill, so a corner is only a
strike about half the time and worse when your arm is tired. Throw the same
pitch three times in a row and he starts sitting on it.

When a hit drops in against you, one of your fielders gets a shot at it.
Time the tap as the ring closes and the hit becomes an out. Miss it and the
play stands as it was called, so it can only help.

Three innings keeps a league match under ten minutes. Six and nine inning
matches are available in Settings for a longer sitting.

## Fatigue and the bullpen

A pitcher's PIT value falls with every batter faced. Low PIT flattens
their effectiveness and raises the TIRED tag as a warning. Each club gets
one relief call per game. The AI manager operates under the same rules
and will go to their own bullpen when their starter fades.

## Saving

Everything (roster, coins, lineup, season, statistics, facilities,
settings) persists automatically in your browser's localStorage. There is
no account and no cloud sync, so the same browser on the same device is
where your dynasty lives. A private window, a different browser, or
clearing site data starts the franchise over.

Diamond Dynasty is also a PWA: install it from the browser menu and,
after the first visit, the whole game (audio included) works offline.
