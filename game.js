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
  var counter = 0;
  if (boardSize % 2 == 1 || boardSize == undefined){
    return -1;
  }else{
    var finished = [];
    var symbol = symbolGenerate();
    while (finished.length != boardSize*boardSize){
      var coorX = Math.floor(Math.random() * boardSize);
      var coorY = Math.floor(Math.random() * boardSize);
      if (!isExist(finished, coorX, coorY)){
        if (counter == 2){
          counter = 0;
          symbol = symbolGenerate();
        }
        var cell = new Cell(coorX, coorY, symbol);
        counter++;
        finished.push(cell);
      }
    }
  }
  return finished;
}
