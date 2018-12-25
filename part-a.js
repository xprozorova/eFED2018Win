//FUNCTION COUNTCHAR
function newCountChar(iString, iChar){
    var count=0;
    
    iString
      .toLowerCase()
      .split('')
      .map((elem)=>{
        if (elem === iChar.toLowerCase()){
          count++
        }
      });
    return count;
}
  
console.log(newCountChar("My Random String", "G"));
  
//FUNCTION DEEPCOMPARE
function deepCompare(object1, object2){
    var o1props = Object.getOwnPropertyNames(object1);
    var o2props = Object.getOwnPropertyNames(object2);
    if (o1props.length !== o2props.length){
      return false;
    }
    for (var i=0; i<o1props.length; i++){
      var prop=o1props[i];
      if (object1[prop] !== object2[prop]){
        return false;
      }
    }
    return true;
}
var a={two: '2', one: 1 };
var b={ one: 1, two: '2' }
console.log(deepCompare(a,b));

//FUNCTION CHESSBOARD
var black="#";
var white=" ";

function ChessBoard(iWidth, iHeight){
  var newString=[];
  for (var i=1; i <= iHeight; i++){
    newString=[];
    for (var j=1; j <= iWidth; j++){
      if ((i+j)%2==0){
        newString.push(black);
      } else {
        newString.push(white);
      }            
    }
    console.log(newString);
    }
}

console.log(ChessBoard(8, 4));

//FUNCTION MAKEARRAY

function makeArray(iFirst, iSecond, step = 1){
    var mas=[];
    if (iFirst < iSecond){
      for ( var i=iFirst; i<=iSecond;){
        mas.push(i);
        i=i+step;
      }
    }
    else{
      for( var j=iFirst; j>=iSecond;){
        mas.push(j);
        j=j-step;
      }
    }
    return mas;
}
console.log(makeArray(1, 10, 3))

//FUNCTION REVERCEARRAY
function reverseArray(mas){
    var newMas=[];
    for (var i=(mas.length-1); i>=0; i--){
      newMas.push(mas[i]);
    }
    return newMas;
}
console.log(reverseArray(["A", "B", "C", "D"]));

//FUNCTION REVERCEARRAYINPLACE
function reverseArrayInPlace(mas){
    var copyMas=mas.slice();
    mas=[];
    for (var i=(copyMas.length-1); i>=0; i--){
      mas.push(copyMas[i]);
    }
    return mas;
}
console.log(reverseArrayInPlace(["A", "B", "C", "D"]));

//FUNCTION MERGEARRAYS
function mergeArrays(){
    var args=[];
    for (var i=0; i<=arguments.length-1; i++){
     args = [...new Set([...args,...arguments[i]])];
  
  }
      return args;
}
console.log(mergeArrays([1, 2], [4, 4], [5, 6]));