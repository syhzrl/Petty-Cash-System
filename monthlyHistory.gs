var sheet = SpreadsheetApp.openById('1bYq6U8uLsQycviG8Zwb6JHQWjKBlsH9dSSCJPfpKF4o');
var aom = sheet.getSheetByName('AOM');
var fd = sheet.getSheetByName('Front Desk');
var today = new Date();
var monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function clearContent(sheet, bfRow , balanceRow ){ //clear content and set balance for new month

  var lastBal;
 
  for (var i = 0 ; i < sheet.getLastRow() ; i++){
    if (sheet.getRange(i+1,balanceRow).getValue() != ""){

      lastBal = sheet.getRange(i+1,balanceRow).getValue();
    }
  }

  sheet.getRange(2 , 1 , sheet.getLastRow(), sheet.getLastColumn()).clearContent();

  sheet.getRange(2,balanceRow).setValue(lastBal);

  sheet.getRange(2,1).setValue(today);

  sheet.getRange(2,bfRow).setValue('B/f Bal');

}

function monthlyHistory() {// daily trigger here

  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  if (today.getDate() == lastDay){

    sheet.insertSheet(monthArr[today.getMonth()] + ' ' + today.getFullYear(), 5); //create sheet based on the month at index 5

    var destSheet = sheet.getSheetByName(monthArr[today.getMonth()] + ' ' + today.getFullYear());

    destSheet.getRange(1 , 1).setValue('Front Desk');                     

    fd.getDataRange().copyTo(destSheet.getRange(2 ,1));

    destSheet.getRange(fd.getLastRow() + 3,1).setValue('AOM');

    aom.getDataRange().copyTo(destSheet.getRange(fd.getLastRow() + 4 ,1)); 

    clearContent(aom , 4, 12);

    clearContent(fd , 4, 12);

    monthlyaccountsEmail();
  }
}



