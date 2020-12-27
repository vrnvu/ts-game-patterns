/*
For this example imagine we have a duck that moves in a grid of tiles.
The duck can move in horizontal and vertical axis.
We map those possiblities and process them given a list of inputs.
*/
type Duck = {
  id: string;
  x: number;
  y: number;
}

type MoveInput = "UP" | "DOWN" | "LEFT" | "RIGHT";

// do and undo moves by saving the previous state
// this will allow us to keep a linked list of movements and a pointer
// MOVE_0, MOVE_1, MOVE_2
//                 ------
// If we are in MOVE_2 and UNDO
// MOVE_0, MOVE_1, Move_2
//         ------
// We get back at MOVE_1, where we could do or undo again (care edges)
// MOVE_0, MOVE_1, MOVE_3
//                 -------
// If instead we add a new move we need to thrash the top of the move stacks
const moveDuck = (dx: number, dy: number) => {
  let previous_x: number;
  let previous_y: number;
  return {
    do: (duck: Duck) => {
      previous_x = duck.x;
      previous_y = duck.y;
      duck.x += dx;
      duck.y += dy;
    },
    undo: (duck: Duck) => {
      duck.x += previous_x;
      duck.y += previous_y;
    },
  };
};

const processMovementInput = (move: MoveInput) => {
  if (move === "UP") {
    return moveDuck(0, 1);
  } else if (move === "DOWN") {
    return moveDuck(0, -1);
  } else if (move === "LEFT") {
    return moveDuck(-1, 0);
  } else if (move === "RIGHT") {
    return moveDuck(1, 0);
  } else {
    throw Error("Invalid input parameter.");
  }
};

const duck: Duck = {
  id: "Ducky Duck",
  x: 0,
  y: 0,
};

console.log(duck);

const moves: MoveInput[] = ["UP", "UP", "RIGHT", "RIGHT", "LEFT", "DOWN", "UP"];
const actions = moves.map((m) => processMovementInput(m));
const action_pointer = 0;

actions.forEach((action, pointer) => {
});

/*
To test you could add main loop that reads from user input

Up, Down, Left, Right, UndoMove, DoMove
U, D, L, R, UM, DM

The duck will move according to the user input,
a linked list will be stored internally to keep track of the moves
- Edge cases undo/do moves that does not exist
*/
while (true) {
  const buf = new Uint8Array(1024);
  /* Reading into `buf` from start.
   * buf.subarray(0, n) is the read result.
   * If n is instead Deno.EOF, then it means that stdin is closed.
   */
  const n = await Deno.stdin.read(buf);
  console.log(n);
}
