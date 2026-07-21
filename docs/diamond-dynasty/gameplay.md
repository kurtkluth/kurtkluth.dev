---
title: Gameplay
description: Player cards and rarities, the lineup editor, training and potential, Scout Pack odds, pitcher fatigue, and saving.
---

The match is the heartbeat, but the franchise is the game. This page
covers the systems around the diamond.

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

- **Roster.** Every card you own, with ratings and rarity at a glance.
- **Lineup editor.** Set your batting order and starting pitcher by hand,
  or press auto-set and let the game place your best nine.
- **Training.** Spend coins on a player to raise their ratings. Growth is
  scaled by potential, so a young high-potential card is the better
  long-term investment even when a veteran looks stronger today.

The **team rating** number on the menu is computed from your active
lineup. It is the score the whole loop is trying to raise.

## Scout Packs

Packs cost 200 coins and contain three players, revealed with an animated
card flip. The pull odds for each rarity are published right on the packs
screen, so you always know the deal before you buy. Duplicates still
deepen the roster; a second good arm matters the day your starter tires
in the second inning.

## The match engine

Matches play out pitch by pitch. When you bat, a swing outcome weighs:

- how close your swing timing was to the ball crossing the plate,
- whether you swung at a strike or chased a ball outside the zone,
- the batter's rating against the pitcher's,
- and the pitcher's current fatigue.

When you pitch, the outcome weighs your pitch and location call against
the batter's rating and your pitcher's rating and fatigue. Both halves
animate on the field: your swings against a live pitch, your calls flying
to the plate. Three innings keeps a full game under ten minutes, and every
half-inning is played, not skipped.

## Fatigue and the bullpen

A pitcher's PIT value falls with every batter faced. Low PIT flattens
their effectiveness and raises the TIRED tag as a warning. Each club gets
one relief call per game. The AI manager operates under the same rules
and will go to their own bullpen when their starter fades.

## Saving

Everything (roster, coins, lineup, settings) persists automatically in
your browser's localStorage. There is no account and no cloud sync, so
the same browser on the same device is where your dynasty lives. A
private window, a different browser, or clearing site data starts the
franchise over.

Diamond Dynasty is also a PWA: install it from the browser menu and,
after the first visit, the whole game (audio included) works offline.
