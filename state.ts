/* I would suppouse the reader to be aware of the basics:
- prefer no side effects, pure functions
- why oop is bad
- AbstractDataType (dont confuse it with AlgebraicDataType)
- State pattern
- Data oriented programming
- Actors
*/

// The idea is to always try to model your actors as FSM when 
// an internal state and/or hard isolate to side effects are involved
// Start modeling your solution from a data oriented pov
// Think the data structures and how the data flow will work
// Derive states
// Use your prefered way to model the solution (ADTs + Pattern matching + Dynamic dispatch i.e) 
// You will detect complexity in some cases, simply split the actor in two or decouple it as it makes more sense
// Repeat 

// Notice how flyweight pattern fits nicely in some cases such as an state object not having other fields, only storing data
// All instances would be identical

// If you enconunter a problem, your state definition should be accurate enough
// To solve it independently of the FSM
// I.e for dynamic dispatch apply strategy, pass functions/behaviour/callback in the messages ... etc.

// Most critical aspect and error reason would be ownership
// But it would now be a concern inside your FSM module
// Ideally a complexity derived from a bad domainmodelling

// A note worthy state is time. In particular we talking about execution/runtime time.
// The state of our actual FSM. 
// A stack of states could be an approach.
// Another common (most) approach is pushdown automata which would help with entities having multiple FSM

// This solution is near the complexity of a concurrent event queue.
// If your problem is complex, approach that solution instead.