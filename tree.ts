const input = ["-", "-", "."];

interface NodeTree {
    value: string;
    left: NodeTree;
    right: NodeTree;
}

const Tree = {};

const getLeft = (node: NodeTree) => node.left;
const getRight = (node: NodeTree) => node.right;

const getGetter = (command: string) => { 
    if (command === "-") {
       return getLeft; 
    }
    if (command === ".") {
        return getRight;
    }
}

interface Monad {
    acc: NodeTree[],
    current: NodeTree
}

input.map(c => getGetter(c)).forEach(console.log);

const fold = (monad: Monad) => (instruction: string) => {
    const node = getGetter(instruction)(monad.current);
    monad.acc = [node];
    monad.current = node;
    return monad;
}

const initialTree: Monad = {
    acc : [],
    current :  {
        value : "2",
        left : null,
        right : null,
    }
}

const result = input.reduce(function (monad, instruction) {
    const node = getGetter(instruction)(monad.current);
    monad.acc = [node];
    monad.current = node;
    return monad;
}, initialTree)

console.log(result);