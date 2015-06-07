function Cell(coorX, coorY, symbol){
  this.coorX = coorX;
  this.coorY = coorY;
  this.symbol = symbol;
  this.found = false;
}


var symbols = ["*", "&", "+", "#", "!", "|", "-", "/", "~", "<", ">", "@", "€", "$", "^", "?"];

var value = 0;
var boardControl = [];
var boardShow = [];

function isExist (finished, coorX, coorY){
  var result;
  for (value in finished){
    if (finished[value].coorX == coorX && finished[value].coorY == coorY) {
      result = true;
      break;
    }else result = false;
  }
  return result;
}
function symbolGenerate(){
  return symbols[Math.floor(Math.random() * symbols.length)];
}
function createBoard(boardSize){
  if (boardSize % 2 == 1 || boardSize == undefined){
    return -1;
  }else{
    var finished = [];
    for(var coorY = 0; coorY < boardSize; coorY++){
      for(var coorX = 0; coorX < boardSize; coorX += 2){
        symbol = symbolGenerate();
        var cell = new Cell(coorX, coorY, symbol);
        finished.push(cell);
        cell = new Cell(coorX + 1, coorY, symbol);
        finished.push(cell);
      }
    }
  }
  return finished;
}
