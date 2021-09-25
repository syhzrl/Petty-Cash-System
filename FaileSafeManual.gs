function initMenu(){ // on open trigger here

  var ui = SpreadsheetApp.getUi();

  var menu = ui.createMenu("AUTOMATA");

  menu.addItem("Fail Safe", "failSafeManual");
  
  menu.addToUi();

}

function failSafeManual() {

  var receiptArr = receiptSheet.getRange('A2:I' + receiptSheet.getLastRow()).getValues();
  var expenseArr = expenseSheet.getRange('A2:I' + expenseSheet.getLastRow()).getValues();
  var tempArr = [];

  var ui = SpreadsheetApp.getUi();

  var input = ui.prompt('WHICH LINE?', ui.ButtonSet.OK_CANCEL);

  var index = parseInt(input.getResponseText()) - 2;

  if(input.getSelectedButton() == ui.Button.OK){

    input = ui.prompt('WHICH FORM? (THIS IS CASE SENSITIVE)', ui.ButtonSet.OK_CANCEL);

    var selectedForm = input.getResponseText();

    if(input.getSelectedButton() == ui.Button.OK){

      input = ui.prompt('WHICH TAB? (THIS IS CASE SENSITIVE)', ui.ButtonSet.OK_CANCEL);

      var selectedSheet = input.getResponseText();

      if(input.getSelectedButton() == ui.Button.OK){

        if(selectedForm == "Receipt"){

          tempArr.push(receiptArr[index]);

          tempArr[0].splice(1,1);

          tempArr[0].splice(5,1);

          if(selectedSheet == 'Front Desk'){

            fd.getRange(fd.getLastRow()+1 , 1 , tempArr.length , tempArr[0].length).setValues(tempArr);

            if(fd.getLastRow() > 2){
              fd.getRange(fd.getLastRow(), 12).setFormula('=L' + (fd.getLastRow()-1) + "+E" + fd.getLastRow() + "-J" + fd.getLastRow());
            }
          }

          if(selectedSheet == 'AOM'){

            aom.getRange(aom.getLastRow()+1 , 1 , tempArr.length , tempArr[0].length).setValues(tempArr);

            if(aom.getLastRow() > 2){
              aom.getRange(aom.getLastRow(), 12).setFormula('=L'+(aom.getLastRow()-1)+"+E"+aom.getLastRow()+"-J"+aom.getLastRow());
            }
          }
        }

        if(selectedForm == 'Expense'){

          var writeArr = [];

          tempArr.push(expenseArr[index]);

          tempArr[0].splice(7,1);

          writeArr.push([tempArr[0][0],'',tempArr[0][1],tempArr[0][2],'','','',tempArr[0][5],tempArr[0][6],tempArr[0][3],tempArr[0][4]]);

          if(selectedSheet == 'Front Desk'){

            fd.getRange(fd.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

            if(fd.getLastRow() > 2){
              fd.getRange(fd.getLastRow(), 12).setFormula('=L' + (fd.getLastRow()-1) + "+E" + fd.getLastRow() + "-J" + fd.getLastRow());
            }
          }

          if(selectedSheet == 'AOM'){

            aom.getRange(aom.getLastRow()+1 , 1 , writeArr.length , writeArr[0].length).setValues(writeArr);

            if(aom.getLastRow() > 2){
              aom.getRange(aom.getLastRow(), 12).setFormula('=L'+(aom.getLastRow()-1)+"+E"+aom.getLastRow()+"-J"+aom.getLastRow());
            }
          }
        }
      }
    } 
  }
}

