
# Mission Impossible

A puzzle sold at [Illuseum Berlin](https://www.google.com/maps/place/Illuseum+Berlin/@52.5213,13.406281,15z/data=!4m5!3m4!1s0x0:0x75f943bb3aa2fafc!8m2!3d52.5213!4d13.406281), objective is to put all pieces inside the box:

<img  src="https://github.com/vfeskov/mission-impossible/raw/master/puzzle.jpeg"  />

- Box is 5x5x5
- 6 pieces of 2x4x1
- 6 pieces of 2x3x2
- 5 pieces of 1x1x1
- Cat was hungry and wouldn't go away, name's Mishka

[SOLUTION](https://github.com/vfeskov/mission-impossible/tree/master/solution/README.md) found by this script

## The script

It brute-forces the puzzle by putting every variant of every piece (e.g., if you rotate the thicc piece you can get 3 unique variants) one by one into every possible coordinates

If it can't put another piece, the combination is considered a dead end and the script moves the previous piece to different coordinates or changes it's variant

When it fits all the pieces it outputs them alongside their coordinates

To run the script you need NodeJS first, then run this command inside project's folder:
```
npm start
```

It also saves dead ends for the first 3 pieces in a file, so if the script is stopped and re-run it won't check those dead ends again
