var STATUS_VALUES = ["Awaiting invoice", "Invoiced", "Paid", "Cancelled"];
var SEAT_CAP = 50;
var STATUS_COLUMN = 7; // Payment Status is column G in both tabs

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Ai-Nativ")
    .addItem("Open Dashboard", "showDashboard")
    .addToUi();
}

function showDashboard() {
  var html = HtmlService.createHtmlOutputFromFile("Dashboard")
    .setWidth(1180)
    .setHeight(780);
  SpreadsheetApp.getUi().showModalDialog(html, "Ai-Nativ — Admin Dashboard");
}

function getDashboardData() {
  var ss = SpreadsheetApp.getActive();
  return {
    bookings: readRows(ss.getSheetByName("Bookings"), "cohort"),
    community: readRows(ss.getSheetByName("Community"), "tier"),
    seatCap: SEAT_CAP,
    statusValues: STATUS_VALUES,
  };
}

function readRows(sheet, thirdColumnKey) {
  if (!sheet) return [];
  var values = sheet.getDataRange().getValues();
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (!row[0]) continue;
    var entry = {
      rowIndex: i + 1,
      timestamp: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
      name: row[1],
      email: row[2],
      phone: row[3],
      amount: row[5],
      status: row[6],
    };
    entry[thirdColumnKey] = row[4];
    rows.push(entry);
  }
  rows.sort(function (a, b) {
    return a.timestamp < b.timestamp ? 1 : -1;
  });
  return rows;
}

function updateStatus(sheetName, rowIndex, newStatus) {
  if (STATUS_VALUES.indexOf(newStatus) === -1) {
    throw new Error("Invalid status: " + newStatus);
  }
  if (sheetName !== "Bookings" && sheetName !== "Community") {
    throw new Error("Invalid sheet: " + sheetName);
  }
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if (!sheet) throw new Error("Sheet not found: " + sheetName);
  var maxRows = sheet.getDataRange().getNumRows();
  if (rowIndex < 2 || rowIndex > maxRows) throw new Error("Row out of range: " + rowIndex);
  sheet.getRange(rowIndex, STATUS_COLUMN).setValue(newStatus);
  return true;
}
