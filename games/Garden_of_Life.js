/*
@title: Garden of Life
@description: A puzzle game that is supposed to be somewhat unnerving.
- WASD to move
- J to reset level
@author: RTdQ3z
@tags: ['Garden' 'Puzzle' 'Weird']
@addedOn: 2022-07-26

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const falseGoal = "f";
const spiritWall = "s";
const wall = "w";
const tile = "t";
const dirt = "d";
const replacement = "r";
const blackScreenOfCreepy = "o";
const blackScreen = "a"

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
........00000...
.....0.003030...
....0303033030..
.....033003030..
....0000030330..
...00333033330..
..033300000000..
..003000D000D0..
....0...000D0...
.......0000D0...
.......0DD00....
........0D0.....
........0D0.....
.........0......`],
  [ box, bitmap`
...........3....
.....8....363...
....868...D3....
.....8D..D......
...CCCCDCCDCCC..
...C020D000D0C..
...02200D000D0..
...C00200D020C..
...C00020D022C..
...CC0CCCCCCCC..
...CCCCC2CCDCC..
...CDCC22CCCCC..
...CCDCCCCCCCD..
....H.D......6D.
...H6H......696.
....H........6..`],
  [ goal, bitmap`
.............LL.
.............LL.
.............LL.
.............LL.
.............LL.
.CCCCCCCCCCCCLL.
CCFFFFFFFFFCCLL.
CF000000000FCLL.
CF000000000FCLL.
CF000000000FCLL.
CF000000000FCLL.
CF000000000FCLL.
CCFFFFFFFFFCCLL.
.CCCCCCCCCCCCC..
................
................`],
  [ falseGoal, bitmap`
.............LL.
.............LL.
.............LL.
.............LL.
.............LL.
.CCCCCCCCCCCCLL.
CCFFFFFFFFFCCLL.
CFFFFFFFFFFFCLL.
CFFFFFFFFFFFCLL.
CFFFFFFFFFFFCLL.
CFFFFFFFFFFFCLL.
CFFFFFFFFFFFCLL.
CCFFFFFFFFFCCLL.
.CCCCCCCCCCCCC..
................
................`],
  [ wall, bitmap`
.DDDDDDDDDDDDDD.
DDDDD4DDD4DDDDDD
DD4DDDDDDDDDD4DD
DDDDHDDDDDD8DDDD
DDDH6HD4DD868DDD
DDDDHDDDDDD8DDDD
DD4DDD3DDDDDDDDD
DDDDD363DDDDDD4D
DDDDDD3DD4DDDDDD
DDDDDDDDDDD6DDDD
DD4DDDDDDD696D4D
DDDDD4DDDDD6DDDD
DDDDDDDDDDDDDDDD
DDDDDHDDDD4DDDDD
D4DDH6HDDDDDDDD4
.DDDDHDDDDDDDDD.`],
  [ spiritWall, bitmap`
.DDDDDDDDDDDDDD.
DDDDD4DDD4DDDDDD
DD4DDDDDDDDDD4DD
DDDD2DDDDDD2DDDD
DDD212D4DD212DDD
DDDD2DDDDDD2DDDD
DD4DDD2DDDDDDDDD
DDDDD212DDDDDD4D
DDDDDD2DD4DDDDDD
DDDDDDDDDDD2DDDD
DD4DDDDDDD212D4D
DDDDD4DDDDD2DDDD
DDDDDDDDDDDDDDDD
DDDDD2DDDD4DDDDD
D4DD212DDDDDDDD4
.DDDD2DDDDDDDDD.`],
  [ tile, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LL111111111111LL
LLLLLLLLLLLLLLLL`],
  [ dirt, bitmap`
DDDDDDDDDDDDDDDD
DD444444444444DD
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
D44444444444444D
DD444444444444DD
DDDDDDDDDDDDDDDD`],
  [ replacement, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ blackScreenOfCreepy, bitmap`
0000000000000000
0000000000300000
0000000003630000
000000000D300000
000022222D220000
0002000DD0002000
000202D002202000
0002022002202000
0002003000302000
0002003000302000
0002000000002000
0000200000020000
0000200000020000
0000022222200000
0000000000000000
0000000000000000`],
  [ blackScreen, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
  );

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  
  map`
wwwwwwwwwwww
wwww..wwwwww
wwpb..wwwwww
wwwwwtwwwwww
wwwwwtwwwwww
wwwwwtwwwwww
wwwwwtwwwwww
wwwwwtwwwwww
wwww..wwwwww
wwww..tttttg
wwwwwwwwwwww
wwwwwwwwwwww`,
  map`
w..wwwwwwwww
w..ttttttt..
wtwwwwwwwwb.
wtwwwwwwwwpw
...wwwwwwwww
...www..ttgw
wwtwww..wwww
wwtwwwwtwwww
wwtwwwwtwwww
w..wwwwtwwww
w..ttt..wwww
wwwwww..wwww`,
  map`
wwwwwww
w...tfw
w...www
p.b.tfw
w...www
w...tgw
wwwwwww`,
  map`
wwwwwwwwwwwwwww..w
pbttttttttttttt..w
wwwwwwwwwwwwwwwwtw
wwwwwwwwwwww..wwtw
w..ttttttttt..wwtw
w..wwwwwwwwwwtwwtw
wwtwwwww...wwtwwtw
wwtwwwww...wwtwwtw
wwtww..t...wwtwwtw
wwtww..wtwtwwtwwtw
wwtwwwtwtwtwwtwwtw
wwtwwwtwgwfwwtwwtw
wwtwwwtwwwwww..wtw
wwtwww..ttttt..wtw
wwtwww..wwwwwwwwtw
wwtwwwwwwwwwwwww..
ww..tttttttttttt..
ww..wwwwwwwwwwwwww`,
  map`
wwwwwwwwww
w..b.tttgw
w....wwwww
w....wwwww
wp...wwwww
w....wwwww
w....wwwww
w..b.tttgw
wwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w......wwwww..tttgww
w....b.wwwww..wwwwww
w....wwwwwwwwtwwwwww
w....b.wwwwwwtwwwwww
w......wwwwwwtwwwwww
w..wwwwwwwwww...tgww
w..tttttttttt...wwww
wp...ww....ww....www
w....ww....ww....www
w..tttttttttt...wwww
w..wwwwwwwwww...tgww
w......wwwwwwtwwwwww
w....b.wwwwwwtwwwwww
w....wwwwwwwwtwwwwww
w....b.wwwww..wwwwww
w......wwwww..tttgww
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwssswww
wpssbssgw
wwwssswww`,
  map`
ww..wwwwww
ww..wssssw
ww..wsbssw
ww..wwwwsw
wp..wwwwsw
ww..wwwwss
ww..ssssss
w...wwwwww
w...ttttgw
wwwwwwwwww`,
  map`
wwwwwwwwwwww
wssssssssssw
wsbsssswwwsw
wwwwwssgwwsw
wssswwwwwwsw
wswssssssssw
wpwwwwwwwwww
wswwwwwwwwww
wswwsswssgww
wssssbwsswww
wswwsswwsssw
wswwsssssssw
wwwwwwwsswww`,
  map`
wwwwwwwwwwwwwwwww
www.....p.....www
www..b.....b..www
www...........www
wwwwwwwssswwwwwww
www...........www
wwww.........wwww
wwww..w...w..wwww
wsss..ww.ww..wwww
wsss.........wwww
wsww..w......wwww
wswwtww..wwwwwwww
wswwtw...ww...www
wswwtw........www
wswwtwwwww....www
wsw......w....www
wsw......w....www
wswwwwwwtw....www
wsw...wwtww...www
sss...w...www.www
sss...w...ww...ww
www...w........ww
wwwwwtwwtwwtswwww
wwwwwtwwtwwtsswww
wwwwwgwwfwwgsswww
wwwwwwwwwwwwwwwww`,
  map`
o`
]
  ;


// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setBackground(dirt)

setSolids([ player, box, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [player, box],
  [box]: [box],
});

// inputs for player movement control
onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});
 
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Garden of Life", { y: 4, color: color`2` });
      addText("By RTdQ3z", {y: 6, color: color`2` });
    }
  }
});
