// Задача 7. Every и some

function every(mas, cond) {
    for (var i = 0; i < mas.length; i++) {
        if (!predicate(mas[i]))
            return false;
        }
            return true;
    }
console.log(every([1, 4, NaN, 6], Number.isNaN)); //false  

function some(mas, cond) {
    for (var i = 0; i < mas.length; i++) {
        if (predicate(mas[i]))
            return true;
        }
            return false;
    }
console.log(every([1, 4, NaN, 6], Number.isNaN)); //true

// Задача 8. Повтор

function multiplyOrThrow(a, b) {
    if (Math.random() < 0.5) {
      return a * b
    } else {
      throw 'MultiplicatorUnitFailure'
    }
  }

  function success(a, b) {
    try {
      return multiplyOrThrow(a, b)
    } catch (e) {
      return success(a, b)
    }
  }

console.log(success(3,8));


// Задача 9. Кавычки в тексте
function replaceQuotes(str) {
    var result = str.replace((/(\b'\b)|'/g), (p0, p1) => p1 ? "'" : '"');
    return result; 
}
console.log(replaceQuotes("I'm the 'hero'")) // "I'm the \"hero\""

//Задача 10. Найти числа
function findNumbers(array) {
    var numbersArray = [];
    for (var i = 0; i < array.length; i++) {
        if (isNumber(array[i]))
            numbersArray.push(array[i]);
    }  return numbersArray;}
    function isNumber(value) {
    if (value == ".")
        return false;
    var regExp = /^[+-]?[0-9]*[.]?[0-9]*([eE][+-]?[0-9]*)?$/;
    return !!regExp.exec(value);
}
console.log(findNumbers(["-1", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."])); // [-1]

//Задача 11.День и месяц

function getNames(date){
  var options = {
    month: 'long',
    weekday: 'long'    
  };
  return (date.toLocaleString("en-US", options));
}
console.log(getNames(new Date())); // "Wednesday (month: January)"

//Задача 12. Разница в годах

function differenceInYears (fdate, sdate) {

  var x = 1000 * 3600 * 24 * 365;

  var dif = Math.abs(fdate.getTime() - sdate.getTime());
  var difInYears = +(dif / x).toFixed(1);
  console.log(difInYears);
}

differenceInYears(new Date(2014, 10, 2), new Date(2016, 10, 2)); // 2
differenceInYears(new Date(2014, 0), new Date(2014, 6)); // 0.5

//Задача 13. Погода Anomaly

function findAnomaly(array, param) {
    var anomaly = {
      max: array[0],
      min: array[0]
    };
  
    for (i = 0; i < array.length; i++) {
      var maxParam = Number(anomaly.max[param]);
      var current = Number(array[i][param]);
      if (maxParam < current) {
        anomaly.max = array[i];
      }
      var minParam = Number(anomaly.min[param]);
      current = Number(array[i][param]);
      if (minParam > current) {
        anomaly.min = array[i];
      }
    }
  
    return anomaly;
  }
  
  console.log(findAnomaly([{id: 123, param: 14},{id: 222, param: -5},{id: 4, param: 100},{id: 888, param: 20}], "param"))