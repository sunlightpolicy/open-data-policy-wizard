function getAnswers(e) {
  
  // Get answers from form submission
  var response = e.response;
  var itemResponses = response.getItemResponses();
  
  // Create object where: keys = item titles, values = item answers
  var answers = {};
  for (var i = 0; i < itemResponses.length; i++) {
    var ir = itemResponses[i];
    var title = ir.getItem().getTitle();
    var answer = ir.getResponse();
    answers[title] = answer;
  }
  
  return answers;
}

function runWizard(e) {

  // Use default values when testing script
  var default_answers = {
    'Name': 'Sample City',
    'Short Name': 'City',
    'Who': 'Mayor',
    'Manager': 'Chief Information Officer',
    'Existing or New Position': 'Existing position',
    'Number': 'Executive Order 2017-1',
    'Email': 'gjordandetamore@sunlightfoundation.com'  // Change this to your email
  };
  if (typeof e !== 'undefined') {
    var answers = getAnswers(e);
  } else {
    var answers = default_answers;
  }
  
  // Fill out policy template with data from form submission
  var template = HtmlService.createTemplateFromFile('Text');
  template.data = answers;
  var htmlBody = template.evaluate().getContent();
  
  // Create the Google Doc
  var blob = DriveApp.createFile('dummy', htmlBody, 'text/html').getBlob();
  var resource = {
    title: "Sample open-data policy for the " + answers['Name'],
    convert: true,
    mimeType: 'application/vnd.google-apps.document' 
  };
  var file = Drive.Files.insert(resource, blob);
  
  // Add space after paragraphs
  var doc = DocumentApp.openById(file.id);
  var pars = doc.getBody().getParagraphs();
  for (p = 0; p < pars.length; p++) {
    pars[p].setSpacingAfter(14);
  }
  
  // Add recipient as an editor on the Google Doc
  doc.addEditor(answers['Email']);
  
  // Send the email
  var doc_url = doc.getUrl();
  GmailApp.sendEmail(answers['Email'], 'Your sample open-data policy', '', {
    name: 'Sunlight Foundation',
    htmlBody: '<p>See a Google Docs version of this text: <a href="'+ doc_url + '">' +
    doc_url + '</a></p><br><hr><br><br>' + htmlBody
  });
}
