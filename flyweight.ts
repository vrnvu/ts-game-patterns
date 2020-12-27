type Mesh = {}

type Texture = {}

type Color = {}

type Position = {
  x: number;
  y: number;
}

// Common or shared data / expensive cost
type TreeModel = {
  mesh: Mesh;
  bark: Texture;
  leaves: Texture;
}

// A tree has the common model plus parametrizable specifics
type Tree = {
  model: TreeModel;
  positon: Position;
  barkTint: Color;
  leafTint: Color;
}

// Instanced rendering where we provide two streasms of data
// Common (mesh and textures) and the specific.
// With a single render call we would build all the entities

// In this example imagen we have a tile of terraing
// W for water, G for grass
// Depending on where the player is there is some cost associated
// And some behaviour we want to track in our control flow
// -----------
// W W W W W
// W G G G W
// W W W G W
type Terrain = {
  texture: Texture;
  isWater: Boolean;
  movementCost: number;
}

/* Since terrain instances are used in multiple places,
their lifetimes would be complex to track dynamically.
Instead we store them in our world (sink) at instantiation.
*/
type World = {
  tiles: Terrain[][];
}

const make_world = (world_size: number) => {
  const water_terrain: Terrain = {
    texture: {},
    isWater: true,
    movementCost: 3,
  };

  const grass_terrain: Terrain = {
    texture: {},
    isWater: false,
    movementCost: 1,
  };

  const world: World = {
    tiles: [],
  };

  for (let i = 0; i < world_size; i++) {
    for (let j = 0; j < world_size; j++) {
      const tile = (Math.random() > 0) ? grass_terrain : water_terrain;
      // add tile to the world ...
      // (...)
    }
  }

  return world;
};

const world = make_world(10);
const x: number = 0;
const y: number = 0;

// Now imagine we want to render the coordinate x, y
// we just get the values from our world

const isWater = world.tiles[0][0].isWater;
const movementCost = world.tiles[0][0].movementCost;
const texture = world.tiles[0][0].texture;

// Notice that this scheme messes our cache locallity and we can fall into
// pointer chasing troubles. Profile, say no to premature optimization
