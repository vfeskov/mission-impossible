# Mission Impossible puzzle from Illuseum Berlin

Objective is to put all pieces inside the box:
<img src="https://github.com/vfeskov/mission-impossible/raw/master/puzzle.jpeg" />

[SOLUTION](https://github.com/vfeskov/mission-impossible/tree/master/solution)

This script brute-forces the puzzle by putting different variants of each piece one by one into every possible coordinates. It checks if a piece can fit by checking intersection of its cuboid with already fitted pieces. 

If it can't put another piece, it is considered a dead end and the script moves the previous piece to  different coordinates or changes it's variant

When it fits all the pieces it outputs them alongside their coordinates
