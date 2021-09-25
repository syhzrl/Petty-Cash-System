var receiptSheet = sheet.getSheetByName('Receipt');

var expenseSheet = sheet.getSheetByName('Expense');

var today2 = new Date('6/10/2021'); //<------------- TEST VALUE

function isItemInArray(array, item) {

  for (var i = 0; i < array.length; i++) {

    if (array[i][0] == item) {

      return true;   // Found it

    }
  }

  return false;   // Not found
}

function failSafeAutoReceipt() {

  var receiptArr = receiptSheet.getRange('A2:I' + receiptSheet.getLastRow()).getValues();
  var frontDeskArr = fd.getRange('A2:L' + fd.getLastRow()).getValues();
  var aomArr = aom.getRange('A2:L' + aom.getLastRow()).getValues();
  var tempArr = [];

  for (var i = 0 ; i < receiptArr.length ; i++){

    if(receiptArr[i][0].getDate() == today2.getDate()){

      tempArr.push(receiptArr[i]);
    }
  }

  for (var i = 0 ; i < tempArr.length ; i++){

    tempArr[i][0] = tempArr[i][0].toLocaleString();

    tempArr[i].splice(1,1);
  }

  for (var i = 0 ; i < frontDeskArr.length ; i++){

    frontDeskArr[i][0] = frontDeskArr[i][0].toLocaleString();

  }

  for (var i = 0 ; i < aomArr.length ; i++){

    aomArr[i][0] = aomArr[i][0].toLocaleString();

  }

  for (var i = 0 ; i < tempArr.length ; i++){

    var writeArr = [];

    if(!isItemInArray(frontDeskArr, tempArr[i][0]) && tempArr[i][5] == 'Front Desk'){

      tempArr[i].splice(5,1);

      writeArr.push(tempArr[i]);

      fd.getRange(fd.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

      if(fd.getLastRow() > 2){
        fd.getRange(fd.getLastRow(), 12).setFormula('=L' + (fd.getLastRow()-1) + "+E" + fd.getLastRow() + "-J" + fd.getLastRow());
      }
    }

    if(!isItemInArray(aomArr, tempArr[i][0]) && tempArr[i][5] == 'AOM'){

      tempArr[i].splice(5,1);
      
      writeArr.push(tempArr[i]);

      aom.getRange(aom.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

      if(aom.getLastRow() > 2){
        aom.getRange(aom.getLastRow(), 12).setFormula('=L' + (aom.getLastRow()-1) + "+E" + aom.getLastRow() + "-J" + aom.getLastRow());
      }
    }
  }
}

function failSafeAutoExpense(){

  var expenseArr = expenseSheet.getRange('A2:I' + expenseSheet.getLastRow()).getValues();
  var frontDeskArr = fd.getRange('A2:L' + fd.getLastRow()).getValues();
  var aomArr = aom.getRange('A2:L' + aom.getLastRow()).getValues();
  var tempArr = [];

  for (var i = 0 ; i < expenseArr.length ; i++){

    if(expenseArr[i][0].getDate() == today2.getDate()){

      tempArr.push(expenseArr[i]);
      
    }
  }

  for (var i = 0 ; i < tempArr.length ; i++){

    tempArr[i][0] = tempArr[i][0].toLocaleString();
  }

  for (var i = 0 ; i < frontDeskArr.length ; i++){

    frontDeskArr[i][0] = frontDeskArr[i][0].toLocaleString();

  }

  for (var i = 0 ; i < aomArr.length ; i++){

    aomArr[i][0] = aomArr[i][0].toLocaleString();

  }

  for (var i = 0 ; i < tempArr.length ; i++){

    var writeArr = [];

    if(!isItemInArray(aomArr, tempArr[i][0]) && tempArr[i][7] == 'AOM'){

      tempArr[i].splice(7,1);
      
      writeArr.push([tempArr[i][0],'',tempArr[i][1],tempArr[i][2],'','','',tempArr[i][5],tempArr[i][6],tempArr[i][3],tempArr[i][4]]);

      aom.getRange(aom.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

      if(aom.getLastRow() > 2){
        aom.getRange(aom.getLastRow(), 12).setFormula('=L' + (aom.getLastRow()-1) + "+E" + aom.getLastRow() + "-J" + aom.getLastRow());
      }
    }

    if(!isItemInArray(frontDeskArr, tempArr[i][0]) && tempArr[i][7] == 'Front Desk'){

      tempArr[i].splice(7,1);

      writeArr.push([tempArr[i][0],'',tempArr[i][1],tempArr[i][2],'','','',tempArr[i][5],tempArr[i][6],tempArr[i][3],tempArr[i][4]]);

      fd.getRange(fd.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

      if(fd.getLastRow() > 2){
        fd.getRange(fd.getLastRow(), 12).setFormula('=L' + (fd.getLastRow()-1) + "+E" + fd.getLastRow() + "-J" + fd.getLastRow());
      }
    }
  }
}

function failSafeAutoMaster(){ // daily trigger here

  failSafeAutoReceipt();

  failSafeAutoExpense();
}






