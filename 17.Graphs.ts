import { Queue } from "./12.Queues";

type TVertex = string | number;
type TWeight = number;
type TEdges = { [x: TVertex]: { [x: TVertex]: TWeight } };
type TIsNodeVisitedTable = { [x: TVertex]: boolean };
type TIsNodeVisitedSet = Set<TVertex>;
type TDijkstarDistance = { [x: TVertex]: number };

/**
 * This helps
 */
class UndirectedGraph {
  #edges: TEdges = {};

  addVertex(vertex: TVertex) {
    this.#edges[vertex] = {};
  }

  addEdge(vertex1: TVertex, vertex2: TVertex, weight?: TWeight) {
    if (weight == undefined) {
      weight = 0;
    }
    this.#edges[vertex1][vertex2] = weight;
    this.#edges[vertex2][vertex1] = weight;
  }

  removeEdge(vertex1: TVertex, vertex2: TVertex) {
    if (this.#edges[vertex1] && this.#edges[vertex1][vertex2] != undefined) {
      delete this.#edges[vertex1][vertex2];
    }
    if (this.#edges[vertex2] && this.#edges[vertex2][vertex1] != undefined) {
      delete this.#edges[vertex2][vertex1];
    }
  }

  removeVertex(vertex: TVertex) {
    for (let adjacentVertex in this.#edges[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.#edges[vertex];
  }

  getEdges() {
    return Object.keys(this.#edges).map((currentElement) => {
      return {
        currentElement: this.#edges[Number(currentElement)],
      };
    });
  }
}
var graph1 = new UndirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addEdge(1, 2, 1);
graph1.getEdges(); // [1: {2: 1},  2: {1: 1}]
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);

graph1.addEdge(1, 5, 88);

var graph2 = new UndirectedGraph();
graph2.addVertex(1);
graph2.addVertex(2);
graph2.addEdge(1, 2, 1);
graph2.getEdges(); // 1: {2: 0},  2: {1: 0}
graph2.addVertex(3);
graph2.addVertex(4);
graph2.addVertex(5);
graph2.addEdge(2, 3, 8);
graph2.addEdge(3, 4, 10);
graph2.addEdge(4, 5, 100);
graph2.addEdge(1, 5, 88);
graph2.removeVertex(5);
graph2.removeVertex(1);
graph2.removeEdge(2, 3);

class DirectedGraph {
  #edges: TEdges = {};

  addVertex(vertex: TVertex) {
    this.#edges[vertex] = {};
  }

  addEdge(origVertex: TVertex, destVertex: TVertex, weight: TWeight) {
    if (weight === undefined) {
      weight = 0;
    }
    this.#edges[origVertex][destVertex] = weight;
  }

  removeEdge(origVertex: TVertex, destVertex: TVertex) {
    if (
      this.#edges[origVertex] &&
      this.#edges[origVertex][destVertex] != undefined
    ) {
      delete this.#edges[origVertex][destVertex];
    }
  }

  removeVertex(vertex: TVertex) {
    for (let adjacentVertex in this.#edges[vertex]) {
      this.removeEdge(Number(adjacentVertex), vertex);
    }
    delete this.#edges[vertex];
  }

  /**PSEUDOCODE:

    Create a queue( array) to store the vertices of the graph
    to be visited, and a table to store the vertices 
    that have been visited

    Add the first vertex to the queue

    While the queue is non-empty

    -Remove the first element of the queue 
     and check if it's visited from table

    -if not visited

    --add it to the table, print the vertex
      and add it's children to the queue
   */
  traverseBFS(vertex: TVertex) {
    const queue = new Queue<TVertex>();
    let isNodeVisitedTable: TIsNodeVisitedTable = {};
    queue.enqueue(vertex);

    while (queue.getLength()) {
      const tempVertex = queue.dequeue()!;

      if (!isNodeVisitedTable[tempVertex]) {
        isNodeVisitedTable[tempVertex] = true;
        console.log(tempVertex);
        for (let adjacentVertex in this.#edges[tempVertex]) {
          queue.enqueue(adjacentVertex);
        }
      }
    }
  }

  /**PSEUDOCODE:

    Create a table to note the vertices that have been visited
    ( will be empty at first)

    Loop through all the vertices of the edge and then loop through
    their connections as well
    
    -If they have no entry in visited table

    --Add them
   */
  traverseDFS(vertex: TVertex) {
    const isNodeVisitedTable: TIsNodeVisitedTable = {};
    this.traverseDFSHelper(vertex, isNodeVisitedTable);
  }

  traverseDFSHelper(vertex: TVertex, isNodeVisitedTable: TIsNodeVisitedTable) {
    isNodeVisitedTable[vertex] = true;

    console.log(vertex);

    for (let adjacentVertex in this.#edges[vertex]) {
      if (!isNodeVisitedTable[adjacentVertex]) {
        this.traverseDFSHelper(adjacentVertex, isNodeVisitedTable);
      }
    }
  }

  /**
    takes a vertex to measure the distance from
    create a table Q to store the edges of the graph
    and a table 'dist' to store the distance of source
    to any given key in the table
    for every vertex in edges
      first set it's distance to Infinity in dist
      then add the key value pair from the edges of the vertex
      to Q
    add the distance from source to source as 0 in dist

    while Q is non-empty
      get the
      
    Two objects Q and dist are initialized to store the source vertex
    and it's connections in the edges format, and it's distance from 
    the edge in the dist table
     
    For this loop through the keys in edges table
    and for key mark the distance as infinity and corresponding 
    connection in Q table

    Also set the distance of source from itself to 0

    while Q is a non-empty object
      find the vertex from node in Q with the least distance
      by storing a variable minimumDistance as Infinity
      and comparing distance of each node from dist table with it
      and updating the value if it's less than it's last value
      also storing the corresponding node in a variable closestNode

      then delete that vertex from Q

      for each node in edges
      

   */
  Dijkstra(source: TVertex) {
    const Q: TEdges = {};
    let dist: TDijkstarDistance = {};
    for (let vertex in this.#edges) {
      // unknown distances set to Infinity
      dist[vertex] = Infinity;
      // add v to Q
      Q[vertex] = this.#edges[vertex];
    }
    // Distance from source to source init to 0
    dist[source] = 0;

    while (!_isEmpty(Q)) {
      const u = _extractMin(Q, dist); // get the min distance

      if (u) {
        // remove u from Q
        delete Q[u];

        // for each neighbor, v, of u:
        // where v is still in Q.
        for (let neighbor in this.#edges[u]) {
          // current distance
          const alt = dist[u] + this.#edges[u][neighbor];
          // a shorter path has been found
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
          }
        }
      }
    }
    return dist;
  }

  topologicalSortUtil(
    v: TVertex,
    isNodeVisitedSet: TIsNodeVisitedSet,
    stack: Array<TVertex>
  ) {
    isNodeVisitedSet.add(v);

    for (var item in this.#edges[v]) {
      if (isNodeVisitedSet.has(item) == false) {
        this.topologicalSortUtil(item, isNodeVisitedSet, stack);
      }
    }
    stack.unshift(v);
  }

  topologicalSort() {
    const isNodeVisitedSet = new Set<TVertex>(),
      stack: Array<TVertex> = [];

    for (let item in this.#edges) {
      if (isNodeVisitedSet.has(item) == false) {
        this.topologicalSortUtil(item, isNodeVisitedSet, stack);
      }
    }
    return stack;
  }
}
var digraph1 = new DirectedGraph();
digraph1.addVertex("A");
digraph1.addVertex("B");
digraph1.addVertex("C");
digraph1.addEdge("A", "B", 1);
digraph1.addEdge("B", "C", 2);
digraph1.addEdge("C", "A", 3);

digraph1.traverseBFS("B");

// checks if an object is empty
function _isEmpty(obj: Object) {
  return Object.keys(obj).length === 0;
}

/**
 * Takes a Q and a dist,
 * initialize a minimum distance variable as infinity
 * and a node with minimum distance variable as null.
 * For every Vertex in Q,
 * if it's distance is dist is less than minimum distance,
 *  set minimum distance to that distance
 *  and node with minimum distance to that node
 * @param Q
 * @param dist
 * @returns node with minimum distance
 */
function _extractMin(Q: TEdges, dist: TDijkstarDistance) {
  let minimumDistance = Infinity,
    nodeWithMinimumDistance = null;
  for (let node in Q) {
    if (dist[node] <= minimumDistance) {
      minimumDistance = dist[node];
      nodeWithMinimumDistance = node;
    }
  }
  return nodeWithMinimumDistance;
}

var digraph1 = new DirectedGraph();
digraph1.addVertex("A");
digraph1.addVertex("B");
digraph1.addVertex("C");
digraph1.addVertex("D");
digraph1.addEdge("A", "B", 1);
digraph1.addEdge("B", "C", 1);
digraph1.addEdge("C", "A", 1);
digraph1.addEdge("A", "D", 1);
console.log(digraph1);
// DirectedGraph {
// V: 4,
// E: 4,
// edges: { A: { B: 1, D: 1 }, B: { C: 1 }, C: { A: 1 }, D: {} }}
digraph1.Dijkstra("A"); // { A: 0, B: 1, C: 2, D: 1 }

var g = new DirectedGraph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

// g.addEdge("B", "A");
// g.addEdge("D", "C");
// g.addEdge("D", "B");
// g.addEdge("B", "A");
// g.addEdge("A", "F");
// g.addEdge("E", "C");
var topologicalOrder = g.topologicalSort();
console.log(g);
// DirectedGraph {
// V: 6,
// E: 6,
// edges:
//  { A: { F: 0 },
//    B: { A: 0 },
//    C: {},
//    D: { C: 0, B: 0 },
//    E: { C: 0 },
//    F: {} } }
console.log(topologicalOrder); // [ 'E', 'D', 'C', 'B', 'A', 'F' ]
