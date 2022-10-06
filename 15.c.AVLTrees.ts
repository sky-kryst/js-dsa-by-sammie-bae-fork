type TAVLTree = AVLTree | null;

class AVLTree {
  constructor(private value: number) {}
  #left: TAVLTree = null;
  #right: TAVLTree = null;
  #depth = 1;

  setDepthBasedOnChildren() {
    if (!(this.#left && this.#right)) {
      this.#depth = 0;
    } else {
      this.#depth = 1;
    }

    if (this.#left != null) {
      this.#depth += this.#left.#depth;
    }

    if (this.#right != null && this.#depth <= this.#right.#depth) {
      this.#depth += this.#right.#depth;
    }
  }

  rotateLL() {
    const valueBefore = this.value;
    const rightBefore = this.#right;

    if (this.#left) {
      this.value = this.#left.value;
      this.#right = this.#left;
      this.#left = this.#left.#left;
    }

    if (this.#right) {
      this.#right.#left = this.#right.#right;
      this.#right.#right = rightBefore;
      this.#right.value = valueBefore;

      this.#right.setDepthBasedOnChildren();
    }

    this.setDepthBasedOnChildren();
  }

  rotateRR() {
    // the right side is too long => rotate from the right (_not_ rightwards)
    var valueBefore = this.value;
    var leftBefore = this.#left;
    if (this.#right) {
      this.value = this.#right.value;

      this.#left = this.#right;
      this.#right = this.#right.#right;
    }
    if (this.#left) {
      this.#left.#right = this.#left.#left;
      this.#left.#left = leftBefore;
      this.#left.value = valueBefore;

      this.#left.setDepthBasedOnChildren();
    }
    this.setDepthBasedOnChildren();
  }

  balance() {
    var ldepth = this.#left == null ? 0 : this.#left.#depth;
    var rdepth = this.#right == null ? 0 : this.#right.#depth;

    if (ldepth > rdepth + 1) {
      // LR or LL rotation
      let lldepth = 0,
        lrdepth = 0;
      if (this.#left) {
        lldepth = this.#left.#left == null ? 0 : this.#left.#left.#depth;
        lrdepth = this.#left.#right == null ? 0 : this.#left.#right.#depth;
      }

      if (lldepth < lrdepth) {
        // LR rotation consists of a RR rotation of the left child
        this.#left?.rotateRR();
        // plus a LL rotation of this node, which happens anyway
      }
      this.rotateLL();
    } else if (ldepth + 1 < rdepth) {
      // RR or RL rorarion
      var rrdepth = 0,
        rldepth = 0;
      if (this.#right) {
        rrdepth = this.#right.#right == null ? 0 : this.#right.#right.#depth;
        rldepth = this.#right.#left == null ? 0 : this.#right.#left.#depth;
      }

      if (rldepth > rrdepth) {
        // RR rotation consists of a LL rotation of the right child
        this.#right?.rotateLL();
        // plus a RR rotation of this node, which happens anyway
      }
      this.rotateRR();
    }
  }

  insert(value: number): boolean {
    let childInserted = false;

    if (value == this.value) {
      return false; // should be all unique
    } else if (value < this.value) {
      if (this.#left == null) {
        this.#left = new AVLTree(value);
        childInserted = true;
      } else {
        childInserted = this.#left.insert(value);
        if (childInserted == true) this.balance();
      }
    } else if (value > this.value) {
      if (this.#right == null) {
        this.#right = new AVLTree(value);
        childInserted = true;
      } else {
        childInserted = this.#right.insert(value);

        if (childInserted == true) this.balance();
      }
    }
    if (childInserted == true) this.setDepthBasedOnChildren();
    return childInserted;
  }

  remove(value: number) {
    return deleteRecursively(this, value);

    function deleteRecursively(root: TAVLTree, value: number) {
      if (!root) {
        return null;
      } else if (value < root.value) {
        root.#left = deleteRecursively(root.#left, value);
      } else if (value > root.value) {
        root.#right = deleteRecursively(root.#right, value);
      } else {
        //no child
        if (!root.#left && !root.#right) {
          return null; // case 1
        } else if (!root.#left) {
          root = root.#right;
          return root;
        } else if (!root.#right) {
          root = root.#left;
          return root;
        } else {
          var temp = findMin(root.#right);
          root.value = temp!.value;
          root.#right = deleteRecursively(root.#right, temp!.value);
          return root;
        }
      }
      root.setDepthBasedOnChildren(); // ONLY DIFFERENCE from the BST one
      return root;
    }

    function findMin(root: TAVLTree) {
      while (root!.#left) {
        root = root!.#left;
      }
      return root;
    }
  }
}

var avlTest = new AVLTree(1);
avlTest.insert(2);
avlTest.insert(3);
avlTest.insert(4);
avlTest.insert(5);
avlTest.insert(123);
avlTest.insert(203);
avlTest.insert(2222);
console.log(avlTest);
