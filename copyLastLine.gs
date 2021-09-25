//This function is inside a google form

var ss = SpreadsheetApp.openById('1bYq6U8uLsQycviG8Zwb6JHQWjKBlsH9dSSCJPfpKF4o');
var expenseSheet = ss.getSheetByName('Expense');
var aom = ss.getSheetByName('AOM');
var fd = ss.getSheetByName('Front Desk');

function copyLastLine(){

  var expenseArr = expenseSheet.getRange('A'+expenseSheet.getLastRow()+':'+'I'+expenseSheet.getLastRow()).getValues();

  var cashBox = expenseArr[0][7];

  var writeArr = [];

  if (cashBox == 'Front Desk'){

    expenseArr[0].splice(7,1);
      
    writeArr.push([expenseArr[0][0],'',expenseArr[0][1],expenseArr[0][2],'','','',expenseArr[0][5],expenseArr[0][6],expenseArr[0][3],expenseArr[0][4]]);

    fd.getRange(fd.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

    if(fd.getLastRow() > 2){
      fd.getRange(fd.getLastRow(), 12).setFormula('=L' + (fd.getLastRow()-1) + "+E" + fd.getLastRow() + "-J" + fd.getLastRow());
    }
  }

  if (cashBox == "AOM"){

    expenseArr[0].splice(7,1);
      
    writeArr.push([expenseArr[0][0],'',expenseArr[0][1],expenseArr[0][2],'','','',expenseArr[0][5],expenseArr[0][6],expenseArr[0][3],expenseArr[0][4]]);

    aom.getRange(aom.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

    if(aom.getLastRow() > 2){
      aom.getRange(aom.getLastRow(), 12).setFormula('=L' + (aom.getLastRow()-1) + "+E" + aom.getLastRow() + "-J" + aom.getLastRow());
    }
  }
}



