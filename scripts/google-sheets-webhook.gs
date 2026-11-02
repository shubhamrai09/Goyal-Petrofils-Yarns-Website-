/**
 * Google Apps Script — appends every website enquiry / sample request to the Google Sheet.
 *
 * Setup: see README.md → "Saving enquiries to Google Sheets".
 * Receives the JSON that src/app/api/enquiry/route.ts POSTs:
 *   { name, company, email, phone, product, quantity, message, source, submittedAt }
 */

const SPREADSHEET_ID = "1kZL69LucabQKeGiLwakMRUCjJgoW8eze1jXBiDg8vSM";
const SHEET_GID = 0; // the first tab (…/edit?gid=0)

const HEADERS = ["Submitted at", "Name", "Company", "Email", "Phone / WhatsApp", "Product", "Quantity", "Requirement", "Source"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID)
      .getSheets()
      .filter(function (s) {
        return s.getSheetId() === SHEET_GID;
      })[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      d.submittedAt || new Date().toISOString(),
      cell(d.name),
      cell(d.company),
      cell(d.email),
      cell(d.phone),
      cell(d.product),
      cell(d.quantity),
      cell(d.message),
      cell(d.source),
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Stop values such as "=HYPERLINK(...)" from being run as formulas in the sheet.
function cell(v) {
  const s = v == null ? "" : String(v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
