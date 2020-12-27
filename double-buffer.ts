/*
A buffer is a piece of state that can be modified.
This buffer is edited incrementally but we want the observers
to percieve a single atomic change when buffer completes.
To do this we use two buffers, the current and next.

Always read from the current.
Always write to the next.

When complete the buffers are swapped.

- We want a state to be incremental modifiable
- We want a state to be access while modifying it
- We want to prevent outsiders from accessing the next state 
- We want to always be capable of reading the current state
*/

type Buffer = {
    buffer: number[],
};

const clear = (buffer: Buffer) => {
    buffer.buffer = buffer.buffer.map(e => 0);
}

const print = (buffer: Buffer) => {
    console.log(buffer);
}

const current: Buffer = { buffer: [1, 2, 3, 4] };

print(current);

clear(current);

print(current);

// Lets imagine we have some actor/functin to fill our buffer sequentally

clear(current);
current.buffer[0] = 1;
current.buffer[1] = 2;
// If we read at this point
// imagine we have a get_current_buffer()
// The code will be invalid
current.buffer[2] = 3;
current.buffer[3] = 4;

// So we simply keep two buffers: current and next
// get_current_buffer() is non blocking and always returns the current
// we always write on the next buffer and swap when we are done updating


// This pattern can be found in graphcs, physics and AI.
// When entities interact with each other and concurrency is involved
// Under some constraints its an applicable method

// In the following we attempt to generate a data flow of sequential actions.
// We will use a class this time to compact a lil bit our code
// Our goal is to have multiple actors that attack each other and we mark them as hit
class Actor {

    hit: boolean;
    pointer: Actor | null;

    constructor() {
        this.hit = false;
        this.pointer = null;
    }

    reset() {
        this.hit = false;
    }

    attack() {
        this.hit = true;
    }

    point(actor: Actor) {
        this.pointer = actor;
    }

    counterAttack() {
        if (this.wasHit()) this.pointer?.attack();
    }

    wasHit(): boolean {
        return this.hit;
    }

}

const a0 = new Actor();
const a1 = new Actor();
const a2 = new Actor();

const actors = [a0, a1, a2];

actors.forEach(a => console.log(a0.wasHit()));

// a0 => a1 => a2 => a0
a0.