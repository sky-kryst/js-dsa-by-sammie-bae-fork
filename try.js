/* 
 
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

  edges={
    A:{B,C,D,E,F}
    B:{C,D,E,F}
    C:{D,E,F}
    D:{E,F}
  }

  funHelper(fn)=>(vertex,visited)=>{
    for(let vertex2 in this.edges[vertex]){
      if(!visited[vertex2]){
        visited[vertex2]=true
        console.log(vertex2)
        fn(fn)(vertex2,visited)
      }
    }
  }

  fun(vertex){
    const visited={}
    
    visited[vertex]=true
    console.log(vertex)

    funHelper(funHelper(()=>{}))(vertex,visited)
  }
 */
