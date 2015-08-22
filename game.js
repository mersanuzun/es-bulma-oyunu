var symbols = ["*", "&", "+", "#", "!", "|", "-", "/", "~", "<", ">", "@", "€", "$", "^", "?",
               "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "Q", "W", "Z", "S"
              ];
var guess = 0;
var cells;
var click = 1;
var correct = 0;
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
  return symbols.splice(Math.floor(Math.random() * symbols.length), 1)[0];
}
function createBoard(boardSize){
  var counter = 0;
  if (boardSize % 2 == 1 || boardSize == undefined){
    return -1;
  }else{
    var finished = [];
    var s = [];
    for (var i = 0; i < boardSize; i++){
        s.push([]);
        for(var j = 0 ; j < boardSize; j++){
            s[i].push([]);
        }
    }
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
  for (var i = 0; i < boardSize; i++){
      for (var j = 0; j < boardSize; j++){
          s[i][j] = finished[findCell(finished, i, j)]
      }
  }
  return s;
}
function findCell(cells, coorX, coorY){
  for (var i = 0; i < cells.length; i++){
    if (cells[i].coorX == coorX && cells[i].coorY == coorY) break;
  }
  return i;
}
var oldCoor = null;
function controlCell(coor){
  if (oldCoor == null) {
      oldCoor = coor;
      return;
  }else{
    if (oldCoor.symbol == coor.symbol){
      oldCoor.found = true;
      coor.found = true;
      oldCoor = null;
      return true;
    }else {
      console.log(oldCoor)
      oldCoorTemp = oldCoor;
      oldCoor = null;
      return oldCoorTemp;
    }
  }
}
$("input:radio").on("click", function(){
    boardSize = ($("input:radio:checked").val())
    $(".selectBoardSize").hide();
    cells = createBoard(boardSize);
    var table = $("#game tbody");
    for (var x = 0; x < boardSize; x++){
        var row = $("<tr>");
        for (var y = 0; y < boardSize; y++){
            var cell = $("<td></td>")
            cell.append("<div id='" + x + "" + y + "'style='background-color:#83F4EC; width:100%; height:100%;'>")
            cell.data({'x' : x, 'y' : y});
            row.append(cell);
        }
        table.append(row);
    }
    $("#game td").on("click", function(){
    if (correct == (boardSize * boardSize) / 2) return
    $that = $(this);
    var xCoor = $that.data("x");
    var yCoor = $that.data("y");
    if (click != 2){
        $("#" + xCoor + "" + yCoor).css("background-color", "#007871")
        $("#" + xCoor + "" + yCoor).html(cells[xCoor][yCoor].symbol);
        controlCell(cells[xCoor][yCoor]);
        click++;
    }else {
        $("#" + xCoor + "" + yCoor).css("background-color", "#007871")                
        $("#" + xCoor + "" + yCoor).html(cells[xCoor][yCoor].symbol);
        var oldCoord = controlCell(cells[xCoor][yCoor]);
        if (oldCoord instanceof Cell){
            setTimeout(function(){
                $("#" + oldCoord.coorX + "" + oldCoord.coorY).html("");
                $("#" + xCoor + "" + yCoor).html("");
                $("#" + xCoor + "" + yCoor).css("background-color", "#83F4EC");
                $("#" + oldCoord.coorX + "" + oldCoord.coorY).css("background-color", "#83F4EC");
            }, 1000)
        }else {
            correct++;
            console.log(correct)
        }
        guess++;
        console.log(guess)
        click = 1;
        if (correct == (boardSize * boardSize) / 2) {
            $("#guess").text("Game is finished. You made " + guess + " guess.")
        }
    }
});
})

