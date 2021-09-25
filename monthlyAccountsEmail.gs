function monthlyAccountsEmail() {
  var recipient = 'syahzril@worq.space,afdhal@worq.space'
  // var location;

  var subject = 'WORQ Subang Monthly Petty Cash Update'

  let htmlBody = HtmlService.createHtmlOutputFromFile('emailBody').getContent();
  let bodyEmail = 
    htmlBody
    .replace('{location}','WORQ Subang');

  MailApp.sendEmail(recipient, subject, 'emailBody',{htmlBody:bodyEmail});
}


