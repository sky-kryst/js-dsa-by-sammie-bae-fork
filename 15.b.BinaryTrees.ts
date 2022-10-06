type TBinaryNodeChild = BinaryTreeNode | null;

export class BinaryTreeNode {
  constructor(private _value: number) {}
  #left: TBinaryNodeChild = null;
  #right: TBinaryNodeChild = null;

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  set left(value: TBinaryNodeChild) {
    this.#left = value;
  }

  set right(value: TBinaryNodeChild) {
    this.#right = value;
  }

  get value() {
    return this._value;
  }

  set value(value: number) {
    this._value = value;
  }
}

export class BinaryTree {
  #root: TBinaryNodeChild = null;

  traversePreOrder() {
    function traversePreOrderHelper(node: TBinaryNodeChild) {
      // if node does not exists, exit
      if (!node) return;
      // else print the value
      console.log(node.value);
      // then call traversePreOrderHelper on left node first
      traversePreOrderHelper(node.left);
      // then right node
      traversePreOrderHelper(node.right);
    }

    // call traversePreOrderHelper on root
    traversePreOrderHelper(this.#root);
  }

  traversePreOrderIterative() {
    // initialize a stack for storing node
    const nodeStack: Array<TBinaryNodeChild> = [];
    // add root to it
    nodeStack.push(this.#root);
    // while stack is non-empty
    while (nodeStack.length) {
      // store the last element of the stack in a var
      const node = nodeStack.pop();
      // print it's value
      console.log(node?.value);
      // if right node exists add them it stack
      if (node?.right) nodeStack.push(node?.right);
      // if left node exists add them it stack
      if (node?.left) nodeStack.push(node?.left);
    }
  }

  traverseInOrder() {
    function traverseInOrderHelper(node: TBinaryNodeChild) {
      // if node does not exists, exit
      if (!node) return;
      // if node does not exists, exit
      // call traverseInOrderHelper on left node,
      // this will keep calling traverseInOrderHelper on left nodes
      // when a node with no more left node is found it will print it's value
      traverseInOrderHelper(node.left);
      // now it will print the parent value
      console.log(node.value);
      // then go to it's right node and return to it's ancestral node
      traverseInOrderHelper(node.right);
    }

    // call traverseInOrderHelper on root
    traverseInOrderHelper(this.#root);
  }

  /**
   * Keep going to the left and adding them to an array
   * if left node is not present
   * go back to the parent node by popping it off the array
   * and traverse it's right node by the steps mentioned above
   * when no more nodes are left do the same to the last element of the array
   * until the array is empty
   */
  traverseInOrderIterative() {
    // store root in a current var
    let current = this.#root,
      // initialize an array to store Tree nodes
      store: Array<TBinaryNodeChild> = [],
      // initialize a var to mark the process done
      done = false;

    // until done is not set to true
    while (!done) {
      // check if the current variable is null
      if (current != null) {
        // if not null
        // add it to store array
        store.push(current);
        // and update the value of current to it's left node
        current = current.left;
      } else {
        // if the left node is null
        // and store is non-empty
        if (store.length) {
          // store the last element of store as parent node
          // and remove it from store
          const parentNode = store.pop() || null;
          // print the value of node to show node traversed
          console.log(parentNode?.value);
          // set current as the right node of the parent node
          current = parentNode?.right || null;
        } else {
          // or else if store is empty
          // set done to true
          done = true;
        }
      }
    }
  }

  traversePostOrder() {
    function traversePostOrderHelper(node: TBinaryNodeChild) {
      // if left node exists, call traversePostOrderHelper on it
      // this will transverse to the leftmost node
      // when no children are found print the value
      if (node?.left) traversePostOrderHelper(node?.left);

      // and return and go to it's sibling,
      if (node?.right) traversePostOrderHelper(node?.right);

      // before returning to it's parent again and printing the value
      console.log(node?.value);
    }

    // call traversePostOrderHelper on root
    traversePostOrderHelper(this.#root);
  }

  traversePostOrderIterative() {
    // Create two arrays to store the nodes
    let store1: Array<TBinaryNodeChild> = [],
      store2: Array<TBinaryNodeChild> = [];

    // Push root to the first array
    store1.push(this.#root);

    // while first store is non-empty
    while (store1.length) {
      // save the last element of first store as a node
      // and remove it from the store
      const node = store1.pop() || null;
      // add it to store 2
      store2.push(node);
      // if left node of the current node exists, add it to store 1
      if (node?.left) store1.push(node?.left);
      // then if right node of the current node exists, add it to store 1
      if (node?.right) store1.push(node?.right);
    }

    // now that the order of the transversal is stored in store 2
    // pop off all the elements of store 2 and print them
    while (store2.length) {
      const node = store2.pop();
      console.log(node?.value);
    }
  }

  traverseLevelOrder() {
    // initialize root variable as root and queue as empty array
    const root = this.#root,
      queue: Array<BinaryTreeNode> = [];

    // if root is empty exit
    if (!root) return;
    // or else add root to queue
    queue.push(root);

    // while queue is non-empty
    while (queue.length) {
      // initialize a temp variable by the first element of queue
      const temp = queue.shift();
      // print it's value
      // this will print the parent values first
      console.log(temp?.value);
      // if left node exists, add to queue
      // this will print left child first
      if (temp?.left) queue.push(temp?.left);
      // if right node exists, add to queue
      if (temp?.right) queue.push(temp?.right);
    }
  }
}

export class BinarySearchTree {
  #root: TBinaryNodeChild = null;

  insert(value: number) {
    // create a new BST node with value
    const thisNode = new BinaryTreeNode(value);

    // if root is absent
    if (!this.#root) {
      // assign root as the node
      this.#root = thisNode;
    } else {
      // if not, assign a variable as root
      let currentRoot = this.#root;

      // loop until true
      while (true) {
        // if the given value is smaller than the variable's value
        if (currentRoot.value > value) {
          // and it has a left node
          if (currentRoot.left != null) {
            // change variable to left node
            currentRoot = currentRoot.left;
          } else {
            // or else assign left node as the given node
            // and exit loop because insertion is done
            currentRoot.left = thisNode;
            break;
          }
        } else if (currentRoot.value < value) {
          // if the given value is greater then the variable's value
          // and its has a right node
          if (currentRoot.right != null) {
            // change variable to right node
            currentRoot = currentRoot.right;
          } else {
            // or else assign right node as the given node
            // and exit loop because insertion is done
            currentRoot.right = thisNode;
            break;
          }
        } else {
          // or else if both the values are equal, exit the loop
          break;
        }
      }
    }
  }

  // takes a value to be removed
  remove(value: number) {
    // calls deleteRecursively on root and value
    return deleteRecursively(this.#root, value);

    // takes a node to traverse and a value to delete
    function deleteRecursively(root: TBinaryNodeChild, value: number) {
      // if node is null, return
      if (!root) {
        return null;
      } else if (value < root.value) {
        // if value is less than value of the node
        // call deleteRecursively on left node and value
        // and assign it's result to the left node
        // because this will update the child tree and update the value of left node
        root.left = deleteRecursively(root.left, value);
      } else if (value > root.value) {
        // if value is greater than value of the node
        // call deleteRecursively on right node and value
        // and assign it's result to the right node
        // because this will update the child tree and update the value of right node
        root.right = deleteRecursively(root.right, value);
      } else {
        // if the value matches the value of the node
        // and the node has no children
        if (!root.left && !root.right) {
          // return null
          // this will assign null to the node
          return null;
        } else if (!root.left) {
          // or if it has only right child
          // make right node the current root
          // and return root
          // this will assign the root as the node
          root = root.right;
          return root;
        } else if (!root.right) {
          // or if it has only left child
          // make left node the current root
          // and return root
          // this will assign the root as the node
          root = root.left;
          return root;
        } else {
          // if both children exists
          // find the max value in the left subtree
          // or the min value in the right subtree
          // and assign it to the node
          const temp = findMin(root.right);
          if (temp) {
            root.value = temp.value;
            root.right = deleteRecursively(root.right, temp.value);
            return root;
          }
        }
      }
      return root;
    }

    // takes a node to find min of it's subtree
    function findMin(root: TBinaryNodeChild) {
      // while left node exists keep assigning it as the node
      // this will traverse the subtree
      while (root?.left) {
        root = root.left;
      }
      // when no more subtree exists, return the node
      return root;
    }
  }

  // takes a value to find the corr. node
  findNode(value: number) {
    // initialize a var to store current root
    let currentRoot = this.#root;

    // while current root exists
    while (currentRoot) {
      // if value is smaller than the value of current root
      if (value < currentRoot.value) {
        // make left node the current root
        currentRoot = currentRoot.left;
      } else if (value > currentRoot.value) {
        // if value is greater than the value of current root
        // make right node the current root
        currentRoot = currentRoot.right;
      } else {
        // if the value matches return true to denote
        // found and exit the loop
        return true;
      }
    }
  }
}

const bst1 = new BinarySearchTree();
bst1.insert(1);
bst1.insert(3);
bst1.insert(2);
bst1.findNode(3);
bst1.findNode(5);
