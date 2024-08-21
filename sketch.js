let grid;
let grid_new;
let score = 0;
let w = 150;

function setup() {
    createCanvas(4 * w + 4, 4 * w + 4);
  canvas.id = "canvas_container";
  noLoop();
  grid = blankGrid();
  grid_new = blankGrid();
  // console.table(grid);
  addNumber();
  addNumber();
/*  addNumberTEST(2);
    addNumberTEST(4);
    addNumberTEST(8);
    addNumberTEST(16);
    addNumberTEST(32);
    addNumberTEST(64);
    addNumberTEST(128);
    addNumberTEST(256);
    addNumberTEST(512);
    addNumberTEST(1024);
    addNumberTEST(2048);*/
  updateCanvas();
}

// One "move"
function keyPressed() {
  let flipped = false;
  let rotated = false;
  let played = true;
  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      flipped = true;
      break;
    case RIGHT_ARROW:
      grid = transposeGrid(grid);
      rotated = true;
      break;
    case LEFT_ARROW:
      grid = transposeGrid(grid);
      grid = flipGrid(grid);
      rotated = true;
      flipped = true;
      break;
    default:
      played = false;
  }

  if (played) {
    let past = copyGrid(grid);
    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }
    let changed = compare(past, grid);
    if (flipped) {
      grid = flipGrid(grid);
    }
    if (rotated) {
      grid = transposeGrid(grid);
    }
    if (changed) {
      addNumber();
    }
    updateCanvas();

    let gameover = isGameOver();
    if (gameover) {
      console.log('GAME OVER');
    }

    let gamewon = isGameWon();
    if (gamewon) {
      console.log('GAME WON');
    }
  }
}

function updateCanvas() {
  background(16,16,16);
  drawGrid();
  select('#score').html(score);
}

function drawGrid() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      noFill();
      strokeWeight(2);
      let val = grid[i][j];
      let s = val.toString();
      if (grid_new[i][j] === 1) {
        stroke(0, 0, 0);
        strokeWeight(0);
        grid_new[i][j] = 0;
      } else {
        strokeWeight(0);
        stroke(0);
      }

      if (val != 0) {
        fill(colorsSizes[s].color);
	    strokeWeight(8);
        stroke(16,16,16);
      } else {
        noFill();
      }
      rect(i * w, j * w, w, w, 25);
      if (val !== 0) {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(16,16,16);
        textSize(colorsSizes[s].size);
        text(val, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}

