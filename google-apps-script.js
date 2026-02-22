// Google Apps Script for Value Add VC Book Lead Capture
// Spreadsheet ID from your URL
var SPREADSHEET_ID = '1dyhxmvEMTsy5KYDu5lcgWE2PoYw4USJ3POQi_y1Nszg';

function doGet(e) {
  return ContentService.createTextOutput('Value Add VC Book Lead Capture is running!');
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = spreadsheet.getSheetByName('Leads');

    if (!sheet) {
      sheet = spreadsheet.insertSheet('Leads');
      sheet.getRange(1, 1, 1, 9).setValues([[
        'Timestamp',
        'Tier',
        'Name',
        'Email',
        'Company',
        'Role',
        'Goals',
        'Email Opt-In',
        'Price'
      ]]);
      sheet.getRange(1, 1, 1, 9).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.tier || '',
      data.name || '',
      data.email || '',
      data.company || '',
      data.role || '',
      data.goals || '',
      data.optIn || '',
      data.price || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
