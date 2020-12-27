// Let's see and discuss why the traditional oop prototype is nonsense

/*
Let's consider we prototype an entity of a game, such as a Tree.
Depending on the subtypes of Tree (Palm, Pinus...) we spawn instances.
In the traditional approach (Gang of Four) we would:

- Generate a Factory/Spawner of our Tree entities.

Constructor takes a reference to the type to instantiate from
Factory(tree: &Tree)
We define in our Tree a clone() method.

Then we use our factory as such:
factory_palm = Factory(Palm());
factory_pinus Factory(Pinus);

p0 = factory_palm.get();
p1 = factory_pinus.get();
And so on...

Problem, we still have to implment clone for every subtype of Tree.
What would this clone() behavior ideally be? Shallow/Deep?
Still a different class for each subtype. Code smell.
*/

// One use of prototypes is data modelling
// This example is from game programming patterns

/*
{
  "name": "goblin grunt",
  "minHealth": 20,
  "maxHealth": 30,
  "resists": ["cold", "poison"],
  "weaknesses": ["fire", "light"]
}

{
  "name": "goblin wizard",
  "prototype": "goblin grunt",
  "spells": ["fire ball", "lightning bolt"]
}

{
  "name": "goblin archer",
  "prototype": "goblin grunt",
  "attacks": ["short bow"]
}
*/

