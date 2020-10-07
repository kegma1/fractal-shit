let tree = [];
let roots = [];
let count = 2;

let MINLENGTH;
let ANGEL;
let RESTART;

let angel;

function setup() {
  createCanvas(400, 800);
  frameRate(10);

  MINLENGTH = createSlider(0.1, 100, 1, 0.1);
  ANGEL = createSlider(1, 10, 3, 1);
  RESTART = createButton("restart");
  RESTART.mousePressed(start);
  
  start(ANGEL.value());
}

function draw() {
  //blendMode(LIGHTEST);
  background(51);
  
  ANGEL.changed(start);
  let minLength = MINLENGTH.value();
  angel = ANGEL.value();

  if (count % 2 === 0 && tree[tree.length - 1].len > minLength) {
    tree = growTree(tree);
  }

  tree.forEach((element) => {
    element.draw();
  });

  if (count % 2 === 0 && roots[roots.length - 1].len > minLength) {
    roots = growTree(roots);
  }

  roots.forEach((element) => {
    element.draw();
  });

  stroke(255);
  strokeWeight(10);
  line(0, height / 2 - 3, width, height / 2 - 3);
}

function growTree(tree) {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].grown) {
      let newTree = tree.concat(tree[i].branch());
      tree = newTree;
    }
    tree[i].grown = true;
  }
  return tree;
}

function start() {
  tree = [];
  roots = [];

  let a = createVector(width / 2, height / 2);
  let b = createVector(width / 2, height / 2 - 100);

  let aNeg = createVector(width / 2, height / 2);
  let bNeg = createVector(width / 2, height / 2 + 100);

  let root = new Branch(a, b, 100, angel, 255);
  let baseRoot = new Branch(aNeg, bNeg, 100, angel, 100);

  tree.push(root);
  roots.push(baseRoot);
}
