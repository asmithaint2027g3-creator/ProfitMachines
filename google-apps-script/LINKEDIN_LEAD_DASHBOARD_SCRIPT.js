/**
 * ============================================================================
 * ProfitMachines – LinkedIn Lead Dashboard Google Apps Script
 * ============================================================================
 * Spreadsheet: ProfitMachines LinkedIn Lead Dashboard
 * 
 * This script initializes and manages the 3 required tabs:
 * 1. Post Analytics       (Performance metrics for company posts)
 * 2. Organic Engagement   (Comments, reactions & intent classification)
 * 3. Potential Leads      (Qualified leads synced with Airtable & Jira)
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Spreadsheet (or create a new one).
 * 2. In the top menu, go to Extensions -> Apps Script.
 * 3. Delete any code in the editor, paste this entire file, and click Save (💾).
 * 4. In the toolbar, select "initializeAllTables" from the dropdown and click "Run".
 * 5. Grant permissions when prompted. All 3 tabs will be created and formatted!
 * 6. (Optional) Click Deploy -> New deployment -> Select type: Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Copy the Web App URL for automated webhook syncing.
 * ============================================================================
 */

// ── 1. CONFIGURATION & SCHEMA DEFINITIONS ───────────────────────────────────

var TABS = {
  POST_ANALYTICS: 'Post Analytics',
  ORGANIC_ENGAGEMENT: 'Organic Engagement',
  POTENTIAL_LEADS: 'Potential Leads'
};

var HEADERS = {
  POST_ANALYTICS: [
    'post_id',
    'post_url',
    'post_text',
    'published_at',
    'impressions',
    'unique_impressions',
    'clicks',
    'reaction_count',
    'comment_count',
    'repost_count',
    'engagement_rate',
    'last_synced_at',
    'sync_status'
  ],
  ORGANIC_ENGAGEMENT: [
    'engagement_id',
    'post_id',
    'post_url',
    'engagement_type',
    'comment_text',
    'comment_created_at',
    'member_id',
    'member_name',
    'profile_url',
    'lead_classification',
    'review_status',
    'last_synced_at'
  ],
  POTENTIAL_LEADS: [
    'lead_id',
    'source_platform',
    'source_type',
    'source_record_id',
    'source_post_id',
    'source_post_url',
    'name',
    'email',
    'phone',
    'company',
    'job_title',
    'linkedin_profile_url',
    'comment_text',
    'service_interest',
    'business_requirement',
    'lead_score',
    'qualification_status',
    'created_at',
    'jira_issue_key',
    'airtable_record_id',
    'sync_status'
  ]
};

// Styling Palette (ProfitMachines Deep Navy Theme)
var THEME = {
  HEADER_BG: '#0B253A',       // Dark Teal / Executive Navy
  HEADER_TEXT: '#FFFFFF',     // Crisp White
  ZEBRA_BG: '#F8FAFC',        // Soft Slate
  BORDER_COLOR: '#E2E8F0',    // Light Slate Border
  FONT_FAMILY: 'Arial',
  HEADER_FONT_SIZE: 10,
  DATA_FONT_SIZE: 10
};

// ── 2. ONE-CLICK INITIALIZATION FUNCTION ────────────────────────────────────

/**
 * Run this function once from the Apps Script editor toolbar.
 * It will automatically create, format, and style all 3 required tabs.
 */
function initializeAllTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Initialize Tab 1: Post Analytics
  setupTab_(ss, TABS.POST_ANALYTICS, HEADERS.POST_ANALYTICS, {
    1: 160, // post_id
    2: 240, // post_url
    3: 350, // post_text
    4: 150, // published_at
    5: 110, // impressions
    6: 130, // unique_impressions
    7: 90,  // clicks
    8: 110, // reaction_count
    9: 110, // comment_count
    10: 100,// repost_count
    11: 120,// engagement_rate
    12: 150,// last_synced_at
    13: 110 // sync_status
  });

  // 2. Initialize Tab 2: Organic Engagement
  setupTab_(ss, TABS.ORGANIC_ENGAGEMENT, HEADERS.ORGANIC_ENGAGEMENT, {
    1: 160, // engagement_id
    2: 150, // post_id
    3: 220, // post_url
    4: 120, // engagement_type
    5: 380, // comment_text
    6: 150, // comment_created_at
    7: 160, // member_id
    8: 160, // member_name
    9: 220, // profile_url
    10: 180,// lead_classification
    11: 130,// review_status
    12: 150 // last_synced_at
  });

  // 3. Initialize Tab 3: Potential Leads
  setupTab_(ss, TABS.POTENTIAL_LEADS, HEADERS.POTENTIAL_LEADS, {
    1: 140, // lead_id
    2: 120, // source_platform
    3: 160, // source_type
    4: 160, // source_record_id
    5: 140, // source_post_id
    6: 220, // source_post_url
    7: 160, // name
    8: 180, // email
    9: 130, // phone
    10: 160,// company
    11: 160,// job_title
    12: 220,// linkedin_profile_url
    13: 350,// comment_text
    14: 220,// service_interest
    15: 280,// business_requirement
    16: 100,// lead_score
    17: 140,// qualification_status
    18: 150,// created_at
    19: 130,// jira_issue_key
    20: 150,// airtable_record_id
    21: 120 // sync_status
  });

  // Add dropdown validations
  addDropdownValidation_(ss.getSheetByName(TABS.ORGANIC_ENGAGEMENT), 10, [
    'General engagement',
    'Service inquiry',
    'Pricing inquiry',
    'Consultation request',
    'Potential business opportunity',
    'Spam or irrelevant'
  ]);
  
  addDropdownValidation_(ss.getSheetByName(TABS.ORGANIC_ENGAGEMENT), 11, [
    'Awaiting Review',
    'Qualified',
    'Rejected'
  ]);

  addDropdownValidation_(ss.getSheetByName(TABS.POTENTIAL_LEADS), 17, [
    'Qualified',
    'Rejected',
    'In Progress'
  ]);

  // Remove default empty "Sheet1" if it exists and other sheets are present
  var defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    try {
      ss.deleteSheet(defaultSheet);
    } catch (e) {
      // Ignore if it cannot be deleted
    }
  }

  Logger.log('✅ All 3 LinkedIn Lead Dashboard tables successfully initialized!');
  SpreadsheetApp.getActiveSpreadsheet().toast('All 3 LinkedIn Lead tabs initialized & styled successfully!', 'Success', 5);
}

/**
 * Helper to create, configure and style a single sheet tab.
 */
function setupTab_(ss, tabName, headers, columnWidths) {
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }

  var numCols = headers.length;
  
  // Set headers in row 1
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setValues([headers]);

  // Apply executive styling
  headerRange.setBackground(THEME.HEADER_BG)
             .setFontColor(THEME.HEADER_TEXT)
             .setFontFamily(THEME.FONT_FAMILY)
             .setFontSize(THEME.HEADER_FONT_SIZE)
             .setFontWeight('bold')
             .setHorizontalAlignment('center')
             .setVerticalAlignment('middle')
             .setWrap(true);

  // Freeze top header row
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 38);

  // Set column widths
  if (columnWidths) {
    for (var colIdx in columnWidths) {
      sheet.setColumnWidth(parseInt(colIdx, 10), columnWidths[colIdx]);
    }
  }

  // Ensure default formatting for data area
  var maxRows = sheet.getMaxRows();
  if (maxRows > 1) {
    var dataRange = sheet.getRange(2, 1, maxRows - 1, numCols);
    dataRange.setFontFamily(THEME.FONT_FAMILY)
             .setFontSize(THEME.DATA_FONT_SIZE)
             .setVerticalAlignment('middle');
  }

  // Ensure gridlines are visible
  sheet.setHiddenGridlines(false);
}

/**
 * Adds a dropdown validation rule to a column.
 */
function addDropdownValidation_(sheet, colIndex, allowedValues) {
  if (!sheet) return;
  var maxRows = sheet.getMaxRows();
  if (maxRows <= 1) {
    sheet.insertRowsAfter(1, 50);
    maxRows = sheet.getMaxRows();
  }
  var rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(allowedValues, true)
    .setAllowInvalid(false)
    .build();
  var range = sheet.getRange(2, colIndex, maxRows - 1, 1);
  range.setDataValidation(rule);
}

// ── 3. WEBHOOK RECEIVER (doPost & doGet) ─────────────────────────────────────

/**
 * Handles incoming POST requests from the ProfitMachines web application.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Acquire lock for up to 30 seconds to prevent concurrent write collisions
    lock.waitLock(30000);
  } catch (lockErr) {
    return createJsonResponse_({ success: false, error: 'Server busy, could not acquire lock.' }, 503);
  }

  try {
    var payload;
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      payload = e.parameter;
    } else {
      throw new Error('No post data received.');
    }

    var action = payload.action;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    // ── Action 1: Sync Post Analytics ──
    if (action === 'sync_post_analytics') {
      var posts = payload.posts || (payload.post ? [payload.post] : []);
      var sheet = ss.getSheetByName(TABS.POST_ANALYTICS);
      if (!sheet) setupTab_(ss, TABS.POST_ANALYTICS, HEADERS.POST_ANALYTICS);
      sheet = ss.getSheetByName(TABS.POST_ANALYTICS);

      var updated = 0;
      for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var row = [
          p.post_id || p.postId || '',
          p.post_url || p.postUrl || '',
          p.post_text || p.postText || '',
          p.published_at || p.publishedAt || '',
          p.impressions !== undefined ? p.impressions : 'Unavailable',
          p.unique_impressions !== undefined ? p.unique_impressions : 'Unavailable',
          p.clicks !== undefined ? p.clicks : 0,
          p.reaction_count !== undefined ? p.reaction_count : (p.likesCount || 0),
          p.comment_count !== undefined ? p.comment_count : (p.commentsCount || 0),
          p.repost_count !== undefined ? p.repost_count : (p.sharesCount || 0),
          p.engagement_rate !== undefined ? p.engagement_rate : 'Unavailable',
          p.last_synced_at || new Date().toISOString(),
          p.sync_status || 'SUCCESS'
        ];
        upsertRowByKey_(sheet, 1, p.post_id || p.postId, row);
        updated++;
      }
      return createJsonResponse_({ success: true, action: action, recordsSynced: updated });
    }

    // ── Action 2: Sync Organic Engagement (Comments) ──
    if (action === 'sync_organic_engagement') {
      var comments = payload.comments || (payload.comment ? [payload.comment] : []);
      var sheet2 = ss.getSheetByName(TABS.ORGANIC_ENGAGEMENT);
      if (!sheet2) setupTab_(ss, TABS.ORGANIC_ENGAGEMENT, HEADERS.ORGANIC_ENGAGEMENT);
      sheet2 = ss.getSheetByName(TABS.ORGANIC_ENGAGEMENT);

      var updated2 = 0;
      for (var j = 0; j < comments.length; j++) {
        var c = comments[j];
        var row2 = [
          c.engagement_id || c.commentId || '',
          c.post_id || c.postId || '',
          c.post_url || c.postUrl || '',
          c.engagement_type || 'Comment',
          c.comment_text || c.commentText || '',
          c.comment_created_at || c.commentCreatedAt || '',
          c.member_id || c.memberId || '',
          c.member_name || c.memberName || '',
          c.profile_url || c.profileUrl || '',
          c.lead_classification || c.classification || 'General engagement',
          c.review_status || c.reviewStatus || 'Awaiting Review',
          c.last_synced_at || new Date().toISOString()
        ];
        upsertRowByKey_(sheet2, 1, c.engagement_id || c.commentId, row2);
        updated2++;
      }
      return createJsonResponse_({ success: true, action: action, recordsSynced: updated2 });
    }

    // ── Action 3: Sync Qualified Potential Lead ──
    if (action === 'sync_potential_lead') {
      var lead = payload.lead || payload;
      var sheet3 = ss.getSheetByName(TABS.POTENTIAL_LEADS);
      if (!sheet3) setupTab_(ss, TABS.POTENTIAL_LEADS, HEADERS.POTENTIAL_LEADS);
      sheet3 = ss.getSheetByName(TABS.POTENTIAL_LEADS);

      var recordId = lead.source_record_id || lead.commentId || lead.lead_id;
      var row3 = [
        lead.lead_id || ('LD-LI-' + String(recordId).replace(/[^a-zA-Z0-9]/g, '')),
        lead.source_platform || 'LinkedIn',
        lead.source_type || 'Organic Post Comment',
        lead.source_record_id || recordId || '',
        lead.source_post_id || lead.postId || '',
        lead.source_post_url || lead.postUrl || '',
        lead.name || lead.memberName || '',
        lead.email || '',
        lead.phone || '',
        lead.company || '',
        lead.job_title || lead.jobTitle || '',
        lead.linkedin_profile_url || lead.profileUrl || '',
        lead.comment_text || lead.commentText || '',
        lead.service_interest || lead.serviceInterest || '',
        lead.business_requirement || lead.businessRequirement || '',
        lead.lead_score || lead.leadScore || 0,
        lead.qualification_status || lead.qualificationStatus || 'Qualified',
        lead.created_at || lead.commentCreatedAt || new Date().toISOString(),
        lead.jira_issue_key || lead.jiraIssueKey || '',
        lead.airtable_record_id || lead.airtableRecordId || '',
        lead.sync_status || 'SYNCHRONIZED'
      ];

      // Upsert by source_record_id (Col 4) or lead_id (Col 1)
      upsertRowByKey_(sheet3, 4, recordId, row3);

      return createJsonResponse_({
        success: true,
        action: action,
        leadId: row3[0],
        jiraKey: row3[18],
        airtableId: row3[19]
      });
    }

    // ── Action 4: Initialize All Tables via Webhook ──
    if (action === 'initialize') {
      initializeAllTables();
      return createJsonResponse_({ success: true, message: 'All tables initialized successfully.' });
    }

    return createJsonResponse_({ success: false, error: 'Unknown action: ' + action }, 400);

  } catch (err) {
    return createJsonResponse_({ success: false, error: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handles GET requests to verify webhook status and check available records.
 */
function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets().map(function(s) { return s.getName(); });
  
  return createJsonResponse_({
    status: 'ONLINE',
    app: 'ProfitMachines LinkedIn Lead Dashboard',
    spreadsheetName: ss.getName(),
    spreadsheetId: ss.getId(),
    availableTabs: sheets,
    timestamp: new Date().toISOString()
  });
}

// ── 4. ROW UPSERT HELPER (DUPLICATE PREVENTION) ──────────────────────────────

/**
 * Updates an existing row if primary key exists, or appends a new row if not found.
 * @param {Sheet} sheet Target spreadsheet tab
 * @param {number} keyCol 1-based column index of primary key
 * @param {string} keyValue Primary key value to search
 * @param {Array} rowData Complete row array to write
 */
function upsertRowByKey_(sheet, keyCol, keyValue, rowData) {
  if (!keyValue) {
    sheet.appendRow(rowData);
    return;
  }

  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    sheet.appendRow(rowData);
    return;
  }

  var keyRange = sheet.getRange(2, keyCol, lastRow - 1, 1);
  var values = keyRange.getValues();

  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]) === String(keyValue)) {
      var targetRow = i + 2;
      sheet.getRange(targetRow, 1, 1, rowData.length).setValues([rowData]);
      return;
    }
  }

  // If not found, append as new row
  sheet.appendRow(rowData);
}

/**
 * Formats JSON response for web requests.
 */
function createJsonResponse_(data, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
