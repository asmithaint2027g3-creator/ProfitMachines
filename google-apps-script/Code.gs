/**
 * =========================================================================
 * PROFIT VECTOR / PROFITMACHINES - ENTERPRISE APPS SCRIPT BACKEND
 * =========================================================================
 * 
 * Version: 2.0.0 (Enterprise Suite)
 * Handles:
 *  1. FORM_SUBMISSIONS  - All inbound contact, consultation, expert, partner, & career forms
 *  2. VISITORS          - First-party anonymous visitor profiles & conversion statuses
 *  3. PAGE_VIEWS        - Granular SPA page view & engagement duration tracking
 *  4. TRAFFIC_ANALYTICS - Daily aggregated traffic & source metrics
 *  5. LEADS             - Verified qualified lead records with lifecycle status
 *  6. EVENTS            - Micro-interaction & conversion event logs (CTA clicks, scrolls)
 *  7. MAILING_LOG       - Audit trail of transactional notifications dispatched
 *  8. ERROR_LOG         - Server-side exception & validation error logging
 * 
 * Configuration: Set NOTIFICATION_EMAIL to your designated team inbox.
 */

var CONFIG = {
  NOTIFICATION_EMAIL: "poojasri.aram@gmail.com", // Form submissions and daily/weekly reports sent here
  ORGANIZATION_NAME: "ProfitMachines",
  WEBSITE_URL: "https://profit-vector-indol.vercel.app",
  SHEETS: {
    FORM_SUBMISSIONS: "FORM_SUBMISSIONS",
    VISITORS: "VISITORS",
    PAGE_VIEWS: "PAGE_VIEWS",
    TRAFFIC_ANALYTICS: "TRAFFIC_ANALYTICS",
    LEADS: "LEADS",
    EVENTS: "EVENTS",
    MAILING_LOG: "MAILING_LOG",
    ERROR_LOG: "ERROR_LOG"
  }
};

/**
 * Handle incoming POST requests from the website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // Wait up to 10 seconds to prevent concurrent write collisions

    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ status: "error", message: "Empty request payload" }, 400);
    }

    var payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({ status: "error", message: "Malformed JSON payload: " + parseErr.message }, 400);
    }

    var type = payload.type || (payload.table ? mapTableToType(payload.table) : "form");
    var data = payload.fields || payload.data || payload;
    var result = { status: "success", type: type };

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    initializeSheets(ss);

    switch (type.toLowerCase()) {
      case "form":
      case "form_submission":
      case "lead":
        result = handleFormSubmission(ss, data);
        break;

      case "visitor":
      case "visitor_tracking":
        result = handleVisitorRecord(ss, data);
        break;

      case "pageview":
      case "page_view":
        result = handlePageView(ss, data);
        break;

      case "event":
      case "interaction":
        result = handleEvent(ss, data);
        break;

      case "analytics_summary":
        result = handleAnalyticsSummary(ss, data);
        break;

      default:
        // Generic table routing fallback
        var tableName = payload.table || CONFIG.SHEETS.FORM_SUBMISSIONS;
        result = handleGenericTable(ss, tableName, data);
        break;
    }

    return createJsonResponse(result, 200);

  } catch (err) {
    logError(err, e ? e.postData.contents : "No data");
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Handle GET requests for connectivity testing & lightweight analytics reading
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
  
  if (action === "stats") {
    try {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var submissionsSheet = ss.getSheetByName(CONFIG.SHEETS.FORM_SUBMISSIONS);
      var visitorsSheet = ss.getSheetByName(CONFIG.SHEETS.VISITORS);
      var pageViewsSheet = ss.getSheetByName(CONFIG.SHEETS.PAGE_VIEWS);
      
      var stats = {
        status: "success",
        totalSubmissions: submissionsSheet ? Math.max(0, submissionsSheet.getLastRow() - 1) : 0,
        totalVisitors: visitorsSheet ? Math.max(0, visitorsSheet.getLastRow() - 1) : 0,
        totalPageViews: pageViewsSheet ? Math.max(0, pageViewsSheet.getLastRow() - 1) : 0,
        timestamp: new Date().toISOString()
      };
      return createJsonResponse(stats, 200);
    } catch (err) {
      return createJsonResponse({ status: "error", message: err.message }, 500);
    }
  }

  // Authenticated analytics endpoints — require ANALYTICS_API_KEY script property when configured
  if (action === "daily_analytics" || action === "weekly_analytics" || action === "dashboard_data") {
    if (!checkApiKey(e)) {
      return createJsonResponse({ status: "error", message: "Unauthorized" }, 401);
    }
    try {
      var ss2 = SpreadsheetApp.getActiveSpreadsheet();
      initializeSheets(ss2);
      var now2 = new Date();
      var todayStart = new Date(now2.getFullYear(), now2.getMonth(), now2.getDate());
      var week7Start = new Date(now2.getTime() - 7 * 24 * 60 * 60 * 1000);
      var day30Start = new Date(now2.getTime() - 30 * 24 * 60 * 60 * 1000);

      if (action === "daily_analytics") {
        return createJsonResponse({ status: "success", stats: computeAnalyticsForRange(ss2, todayStart, now2) }, 200);
      }
      if (action === "weekly_analytics") {
        return createJsonResponse({ status: "success", stats: computeAnalyticsForRange(ss2, week7Start, now2) }, 200);
      }
      // dashboard_data: combined snapshot for the live Analytics Dashboard page
      return createJsonResponse({
        status: "success",
        today: computeAnalyticsForRange(ss2, todayStart, now2),
        last7Days: computeAnalyticsForRange(ss2, week7Start, now2),
        last30Days: computeAnalyticsForRange(ss2, day30Start, now2),
        generatedAt: now2.toISOString()
      }, 200);
    } catch (err2) {
      return createJsonResponse({ status: "error", message: err2.message }, 500);
    }
  }

  // Sheet 2 Processed Analytics Endpoints
  if (action === "sheet2_dashboard" || action === "sheet2_tab") {
    if (!checkApiKey(e)) {
      return createJsonResponse({ status: "error", message: "Unauthorized" }, 401);
    }
    try {
      var ss2 = SpreadsheetApp.getActiveSpreadsheet();
      if (action === "sheet2_tab") {
        var requestedTab = (e && e.parameter && e.parameter.tab) ? e.parameter.tab : "Mission_Control";
        var tabData = readSheet2Tab(ss2, requestedTab);
        return createJsonResponse({ status: "success", tab: requestedTab, data: tabData }, 200);
      }
      var allSheet2Data = readAllSheet2Tabs(ss2);
      return createJsonResponse({ status: "success", data: allSheet2Data, timestamp: new Date().toISOString() }, 200);
    } catch (errSheet2) {
      return createJsonResponse({ status: "error", message: errSheet2.message }, 500);
    }
  }

  return createJsonResponse({
    status: "online",
    service: "ProfitMachines Enterprise Apps Script Gateway",
    version: "2.1.0",
    timestamp: new Date().toISOString()
  }, 200);
}

/**
 * Validates the shared-secret analytics API key (Script Property: ANALYTICS_API_KEY).
 * If no key is configured, access is left open for backwards compatibility.
 */
function checkApiKey(e) {
  var configuredKey = PropertiesService.getScriptProperties().getProperty("ANALYTICS_API_KEY");
  if (!configuredKey) return true;
  var providedKey = (e && e.parameter && e.parameter.key) || "";
  return providedKey === configuredKey;
}

/**
 * 1. FORM SUBMISSION HANDLER
 */
function handleFormSubmission(ss, data) {
  var sheet = ss.getSheetByName(CONFIG.SHEETS.FORM_SUBMISSIONS);
  var leadsSheet = ss.getSheetByName(CONFIG.SHEETS.LEADS);
  var now = new Date();
  
  var submissionId = data.submission_id || generateSubmissionId();
  var timestamp = now.toISOString();

  var row = [
    timestamp,
    submissionId,
    data.form_name || data.formName || "Consultation Form",
    (data.name || (data.firstName ? data.firstName + " " + (data.lastName || "") : "") || data.Name || "").trim(),
    data.email || data.Email || "",
    data.phone || data.Phone || "",
    data.company || data.Company || "",
    data.designation || data.jobTitle || data.Designation || "",
    data.industry || data.Industry || data.interest || "",
    data.message || data.Message || data.requirement || "",
    data.page_url || data.pageUrl || "",
    data.page_title || data.pageTitle || "",
    data.referrer || data.referrerUrl || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || "",
    data.utm_term || "",
    data.utm_content || "",
    data.device || data.device_type || "",
    data.browser || "",
    data.os || "",
    data.country || data.geo_country || "",
    data.session_id || "",
    data.lead_source || data.Source || "Website Direct",
    "NEW_UNASSIGNED"
  ];

  sheet.appendRow(row);

  // Sync into LEADS sheet if email is provided
  if (data.email || data.Email) {
    leadsSheet.appendRow([
      timestamp,
      submissionId,
      (data.name || (data.firstName ? data.firstName + " " + (data.lastName || "") : "") || "").trim(),
      data.email || data.Email || "",
      data.company || data.Company || "",
      data.phone || data.Phone || "",
      data.interest || data.industry || "Enterprise AI Strategy",
      data.utm_source || "direct",
      "QUALIFIED_INBOUND",
      "Follow-up Required"
    ]);
  }

  // Dispatch Transactional Email Notification
  dispatchEmailNotification(ss, submissionId, data);

  return {
    status: "success",
    submissionId: submissionId,
    timestamp: timestamp,
    message: "Submission securely logged and queued for executive review."
  };
}

/**
 * 2. VISITOR RECORD HANDLER
 */
function handleVisitorRecord(ss, data) {
  var sheet = ss.getSheetByName(CONFIG.SHEETS.VISITORS);
  var visitorId = data.visitor_id || ("PV-VIS-" + Math.random().toString(36).substring(2, 8).toUpperCase());
  var now = new Date().toISOString();

  // Check if visitor already exists to update or append
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();
  var foundRowIndex = -1;

  for (var i = 1; i < values.length; i++) {
    if (values[i][0] === visitorId) {
      foundRowIndex = i + 1; // 1-indexed sheet row
      break;
    }
  }

  if (foundRowIndex > -1) {
    // Update existing visitor record
    var existingSessionCount = parseInt(values[foundRowIndex - 1][3] || 1, 10);
    var existingPageCount = parseInt(values[foundRowIndex - 1][4] || 1, 10);
    
    sheet.getRange(foundRowIndex, 3).setValue(now); // last_seen
    sheet.getRange(foundRowIndex, 4).setValue(existingSessionCount + (data.is_new_session ? 1 : 0));
    sheet.getRange(foundRowIndex, 5).setValue(existingPageCount + 1);
    sheet.getRange(foundRowIndex, 7).setValue(data.last_page || data.page_url || "");
    if (data.conversion_status) {
      sheet.getRange(foundRowIndex, 17).setValue(data.conversion_status);
    }
  } else {
    // Append new visitor
    sheet.appendRow([
      visitorId,
      now, // first_seen
      now, // last_seen
      data.session_count || 1,
      data.page_count || 1,
      data.landing_page || data.page_url || "",
      data.last_page || data.page_url || "",
      data.referrer || "",
      data.utm_source || "direct",
      data.utm_medium || "",
      data.utm_campaign || "",
      data.device_type || "",
      data.browser || "",
      data.os || "",
      data.country || "",
      data.language || "en",
      data.engagement_time || 0,
      data.conversion_status || "PROSPECT"
    ]);
  }

  return { status: "success", visitorId: visitorId };
}

/**
 * 3. PAGE VIEW HANDLER
 */
function handlePageView(ss, data) {
  var sheet = ss.getSheetByName(CONFIG.SHEETS.PAGE_VIEWS);
  var pvId = "PV-PV-" + Utilities.formatDate(new Date(), "GMT", "yyyyMMddHHmmss") + "-" + Math.floor(Math.random() * 1000);

  sheet.appendRow([
    pvId,
    data.visitor_id || "",
    data.session_id || "",
    new Date().toISOString(),
    data.page_url || "",
    data.page_title || "",
    data.referrer || "",
    data.time_on_page || 0,
    data.device || "",
    data.utm_source || "",
    data.utm_medium || "",
    data.utm_campaign || ""
  ]);

  return { status: "success", pageViewId: pvId };
}

/**
 * 4. EVENT INTERACTION HANDLER
 */
function handleEvent(ss, data) {
  var sheet = ss.getSheetByName(CONFIG.SHEETS.EVENTS);
  var eventId = "PV-EVT-" + Utilities.formatDate(new Date(), "GMT", "yyyyMMddHHmmss") + "-" + Math.floor(Math.random() * 1000);

  sheet.appendRow([
    eventId,
    data.event_name || "UNKNOWN_EVENT",
    data.visitor_id || "",
    data.session_id || "",
    new Date().toISOString(),
    data.page_url || "",
    data.element_text || data.element_id || "",
    data.event_category || "INTERACTION",
    data.value || 0
  ]);

  return { status: "success", eventId: eventId };
}

/**
 * 5. TRANSACTIONAL EMAIL NOTIFIER
 */
function dispatchEmailNotification(ss, submissionId, data) {
  var mailLog = ss.getSheetByName(CONFIG.SHEETS.MAILING_LOG);
  var now = new Date().toISOString();
  var recipient = CONFIG.NOTIFICATION_EMAIL;
  var subject = "🚨 New " + (data.form_name || "Enterprise Lead") + " [" + submissionId + "] - ProfitMachines";
  var userName = (data.name || (data.firstName ? data.firstName + " " + (data.lastName || "") : "") || data.Name || "Strategic Buyer").trim();
  var userEmail = data.email || data.Email || "";

  var htmlBody = ""
    + "<div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; rounded: 12px; background: #ffffff;'>"
    + "  <div style='background: #0f172a; padding: 18px 24px; border-radius: 8px; margin-bottom: 20px;'>"
    + "    <h2 style='color: #ffffff; margin: 0; font-size: 20px; font-weight: bold;'>ProfitMachines Intelligence Alert</h2>"
    + "    <p style='color: #94a3b8; margin: 4px 0 0 0; font-size: 12px;'>Submission Ref: " + submissionId + "</p>"
    + "  </div>"
    + "  <h3 style='color: #1e293b; margin-top: 0;'>New Inbound Executive Request</h3>"
    + "  <table style='width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;'>"
    + "    <tr><td style='padding: 8px 0; color: #64748b; width: 140px;'><strong>Full Name:</strong></td><td style='color: #0f172a;'><strong>" + userName + "</strong></td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Work Email:</strong></td><td style='color: #2563eb;'><a href='mailto:" + userEmail + "'>" + userEmail + "</a></td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Phone:</strong></td><td style='color: #0f172a;'>" + (data.phone || data.Phone || "Not provided") + "</td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Company:</strong></td><td style='color: #0f172a;'><strong>" + (data.company || data.Company || "Enterprise Client") + "</strong></td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Designation:</strong></td><td style='color: #0f172a;'>" + (data.designation || data.jobTitle || "Executive") + "</td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Requirement/Interest:</strong></td><td style='color: #0f172a;'>" + (data.interest || data.industry || data.form_name || "General Strategy") + "</td></tr>"
    + "    <tr><td style='padding: 8px 0; color: #64748b;'><strong>Traffic Source:</strong></td><td style='color: #0f172a;'>" + (data.utm_source || data.lead_source || "Direct Inbound") + "</td></tr>"
    + "  </table>"
    + "  <div style='background: #f8fafc; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 20px;'>"
    + "    <strong style='color: #334155; font-size: 13px;'>Requirement Details:</strong><br/>"
    + "    <p style='color: #475569; font-size: 14px; margin: 8px 0 0 0; line-height: 1.5;'>" + (data.message || data.Message || "Consultation requested with executive team.") + "</p>"
    + "  </div>"
    + "  <div style='text-align: center; margin-top: 24px;'>"
    + "    <a href='mailto:" + userEmail + "?subject=ProfitMachines%20Executive%20Consultation' style='background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 14px;'>Respond to Lead Directly</a>"
    + "  </div>"
    + "</div>";

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });

    mailLog.appendRow([
      now,
      submissionId,
      recipient,
      "ADMIN_NOTIFICATION",
      subject,
      "SENT",
      "MailApp",
      ""
    ]);
  } catch (mailErr) {
    mailLog.appendRow([
      now,
      submissionId,
      recipient,
      "ADMIN_NOTIFICATION",
      subject,
      "FAILED",
      "MailApp",
      mailErr.toString()
    ]);
  }
}

/**
 * UTILITIES & SHEET INITIALIZATION
 */
function initializeSheets(ss) {
  var sheetConfigs = [
    {
      name: CONFIG.SHEETS.FORM_SUBMISSIONS,
      headers: ["Timestamp", "Submission ID", "Form Name", "Full Name", "Email", "Phone", "Company", "Designation", "Industry/Interest", "Message/Requirement", "Page URL", "Page Title", "Referrer", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content", "Device", "Browser", "OS", "Country", "Session ID", "Lead Source", "Status"]
    },
    {
      name: CONFIG.SHEETS.VISITORS,
      headers: ["Visitor ID", "First Seen", "Last Seen", "Session Count", "Page Count", "Landing Page", "Last Page", "Referrer", "UTM Source", "UTM Medium", "UTM Campaign", "Device Type", "Browser", "OS", "Country", "Language", "Engagement Time (s)", "Conversion Status"]
    },
    {
      name: CONFIG.SHEETS.PAGE_VIEWS,
      headers: ["Page View ID", "Visitor ID", "Session ID", "Timestamp", "Page URL", "Page Title", "Referrer", "Time On Page (s)", "Device", "UTM Source", "UTM Medium", "UTM Campaign"]
    },
    {
      name: CONFIG.SHEETS.TRAFFIC_ANALYTICS,
      headers: ["Date", "Total Visitors", "Unique Visitors", "Sessions", "Page Views", "Top Landing Page", "Top Traffic Source", "Conversion Rate", "Form Submissions"]
    },
    {
      name: CONFIG.SHEETS.LEADS,
      headers: ["Timestamp", "Submission ID", "Full Name", "Email", "Company", "Phone", "Strategic Interest", "Lead Source", "Lifecycle Stage", "Next Action"]
    },
    {
      name: CONFIG.SHEETS.EVENTS,
      headers: ["Event ID", "Event Name", "Visitor ID", "Session ID", "Timestamp", "Page URL", "Element Text/ID", "Category", "Value"]
    },
    {
      name: CONFIG.SHEETS.MAILING_LOG,
      headers: ["Timestamp", "Submission ID", "Recipient", "Email Type", "Subject", "Status", "Provider", "Error Message"]
    },
    {
      name: CONFIG.SHEETS.ERROR_LOG,
      headers: ["Timestamp", "Error Message", "Stack Trace", "Raw Payload"]
    }
  ];

  sheetConfigs.forEach(function(cfg) {
    var sheet = ss.getSheetByName(cfg.name);
    if (!sheet) {
      sheet = ss.insertSheet(cfg.name);
      sheet.appendRow(cfg.headers);
      var headerRange = sheet.getRange(1, 1, 1, cfg.headers.length);
      headerRange.setBackground("#0F172A").setFontColor("#FFFFFF").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
  });
}

function generateSubmissionId() {
  var dateStr = Utilities.formatDate(new Date(), "GMT", "yyyyMMdd");
  var randomCode = Math.floor(1000 + Math.random() * 9000);
  return "PV-FRM-" + dateStr + "-" + randomCode;
}

function mapTableToType(table) {
  var t = table.toLowerCase();
  if (t.indexOf("lead") > -1 || t.indexOf("consult") > -1 || t.indexOf("expert") > -1 || t.indexOf("partner") > -1 || t.indexOf("job") > -1) return "form";
  if (t.indexOf("visitor") > -1) return "visitor";
  if (t.indexOf("page") > -1) return "pageview";
  if (t.indexOf("event") > -1) return "event";
  return "form";
}

function handleGenericTable(ss, tableName, data) {
  var sheet = ss.getSheetByName(tableName);
  if (!sheet) {
    sheet = ss.insertSheet(tableName);
  }
  var keys = Object.keys(data);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["Timestamp"].concat(keys));
    sheet.getRange(1, 1, 1, keys.length + 1).setBackground("#0F172A").setFontColor("#FFFFFF").setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  var rowValues = [new Date().toISOString()];
  for (var i = 0; i < keys.length; i++) {
    rowValues.push(data[keys[i]]);
  }
  sheet.appendRow(rowValues);
  return { status: "success", table: tableName };
}

function logError(err, rawPayload) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var errSheet = ss.getSheetByName(CONFIG.SHEETS.ERROR_LOG);
    if (errSheet) {
      errSheet.appendRow([
        new Date().toISOString(),
        err.message || err.toString(),
        err.stack || "",
        typeof rawPayload === "string" ? rawPayload : JSON.stringify(rawPayload)
      ]);
    }
  } catch (e) {
    console.error("Critical logging failure: " + e.toString());
  }
}

function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * =========================================================================
 * WO-115: TRAFFIC PROFILE ANALYTICS + DAILY/WEEKLY EMAIL REPORTING
 * =========================================================================
 */

/**
 * Handler for type: "analytics_summary" POST requests.
 * data.range accepts "today" | "7d" | "30d" (defaults to "today").
 */
function handleAnalyticsSummary(ss, data) {
  var range = (data && data.range) || "today";
  var now = new Date();
  var start;

  if (range === "7d") {
    start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (range === "30d") {
    start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  } else {
    start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  return { status: "success", range: range, stats: computeAnalyticsForRange(ss, start, now) };
}

/**
 * Reads all data rows (excluding the header) from a given sheet.
 */
function getSheetRows(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
}

/**
 * Computes normalized traffic/lead analytics for a [startDate, endDate) window
 * by reading the VISITORS, PAGE_VIEWS, EVENTS and FORM_SUBMISSIONS sheets.
 */
function computeAnalyticsForRange(ss, startDate, endDate) {
  var visitorRows = getSheetRows(ss, CONFIG.SHEETS.VISITORS);
  var pageViewRows = getSheetRows(ss, CONFIG.SHEETS.PAGE_VIEWS);
  var eventRows = getSheetRows(ss, CONFIG.SHEETS.EVENTS);
  var formRows = getSheetRows(ss, CONFIG.SHEETS.FORM_SUBMISSIONS);

  function inRange(dateVal) {
    if (!dateVal) return false;
    var d = (dateVal instanceof Date) ? dateVal : new Date(dateVal);
    return d >= startDate && d < endDate;
  }

  // ── Visitors (new, landing page, source, device, browser, geo) ──
  var newVisitorIds = {};
  var landingPageCounts = {};
  var utmSourceCounts = {};
  var deviceCounts = {};
  var browserCounts = {};
  var countryCounts = {};

  visitorRows.forEach(function (r) {
    var visitorId = r[0], firstSeen = r[1], landingPage = r[5] || "Unknown",
      utmSource = r[8] || "direct", deviceType = r[11] || "Unknown", browser = r[12] || "",
      country = r[14] || "Unknown";

    if (inRange(firstSeen)) {
      newVisitorIds[visitorId] = true;
      landingPageCounts[landingPage] = (landingPageCounts[landingPage] || 0) + 1;
      utmSourceCounts[utmSource] = (utmSourceCounts[utmSource] || 0) + 1;
      deviceCounts[deviceType] = (deviceCounts[deviceType] || 0) + 1;
      var browserFamily = detectBrowserFamily(browser);
      browserCounts[browserFamily] = (browserCounts[browserFamily] || 0) + 1;
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
  });

  // ── Page views & sessions ──
  var activeVisitorIds = {};
  var sessionIds = {};
  var pageUrlCounts = {};
  var totalTimeOnPage = 0;
  var pageViewCount = 0;

  pageViewRows.forEach(function (r) {
    var visitorId = r[1], sessionId = r[2], timestamp = r[3], pageUrl = r[4] || "Unknown", timeOnPage = Number(r[7]) || 0;
    if (inRange(timestamp)) {
      pageViewCount++;
      activeVisitorIds[visitorId] = true;
      if (sessionId) sessionIds[sessionId] = true;
      pageUrlCounts[pageUrl] = (pageUrlCounts[pageUrl] || 0) + 1;
      totalTimeOnPage += timeOnPage;
    }
  });

  var returningVisitors = 0;
  Object.keys(activeVisitorIds).forEach(function (vid) {
    if (!newVisitorIds[vid]) returningVisitors++;
  });

  // ── Events (CTA clicks, form interactions) ──
  var eventCategoryCounts = {};
  var ctaClickCount = 0;
  var formInteractionCount = 0;

  eventRows.forEach(function (r) {
    var eventName = String(r[1] || ""), timestamp = r[4], category = String(r[7] || "INTERACTION");
    if (inRange(timestamp)) {
      eventCategoryCounts[category] = (eventCategoryCounts[category] || 0) + 1;
      if (category.toUpperCase().indexOf("CTA") > -1 || eventName.toUpperCase().indexOf("CTA") > -1) ctaClickCount++;
      if (category.toUpperCase().indexOf("FORM") > -1 || eventName.toUpperCase().indexOf("FORM") > -1) formInteractionCount++;
    }
  });

  // ── Leads / form submissions ──
  var leadCount = 0;
  var leadSourceCounts = {};

  formRows.forEach(function (r) {
    var timestamp = r[0], leadSource = r[23] || "Website Direct";
    if (inRange(timestamp)) {
      leadCount++;
      leadSourceCounts[leadSource] = (leadSourceCounts[leadSource] || 0) + 1;
    }
  });

  var newVisitorCount = Object.keys(newVisitorIds).length;
  var sessionCount = Object.keys(sessionIds).length;

  return {
    rangeStart: startDate.toISOString(),
    rangeEnd: endDate.toISOString(),
    totalVisitors: newVisitorCount + returningVisitors,
    newVisitors: newVisitorCount,
    returningVisitors: returningVisitors,
    sessions: sessionCount,
    pageViews: pageViewCount,
    avgSessionDurationSeconds: sessionCount ? Math.round(totalTimeOnPage / sessionCount) : 0,
    leads: leadCount,
    topLandingPages: topEntries(landingPageCounts, 5),
    topPages: topEntries(pageUrlCounts, 5),
    trafficSources: topEntries(utmSourceCounts, 6),
    deviceDistribution: topEntries(deviceCounts, 5),
    browserDistribution: topEntries(browserCounts, 5),
    geographicDistribution: topEntries(countryCounts, 5),
    leadSources: topEntries(leadSourceCounts, 5),
    ctaClicks: ctaClickCount,
    formInteractions: formInteractionCount,
    eventBreakdown: topEntries(eventCategoryCounts, 8)
  };
}

function detectBrowserFamily(ua) {
  ua = String(ua || "").toLowerCase();
  if (ua.indexOf("edg") > -1) return "Edge";
  if (ua.indexOf("chrome") > -1) return "Chrome";
  if (ua.indexOf("firefox") > -1) return "Firefox";
  if (ua.indexOf("safari") > -1) return "Safari";
  return "Other";
}

function topEntries(countsObj, limit) {
  return Object.keys(countsObj)
    .map(function (k) { return { name: k, count: countsObj[k] }; })
    .sort(function (a, b) { return b.count - a.count; })
    .slice(0, limit);
}

function formatDuration(totalSeconds) {
  totalSeconds = Math.max(0, Math.round(totalSeconds || 0));
  var m = Math.floor(totalSeconds / 60);
  var s = totalSeconds % 60;
  return m + "m " + s + "s";
}

function buildObservations(stats) {
  var notes = [];
  if (stats.trafficSources && stats.trafficSources.length) {
    notes.push("Top traffic source is <strong>" + stats.trafficSources[0].name + "</strong> (" + stats.trafficSources[0].count + " new visitors).");
  }
  if (stats.topPages && stats.topPages.length) {
    notes.push("Most visited page: <strong>" + stats.topPages[0].name + "</strong> (" + stats.topPages[0].count + " views).");
  }
  if (stats.leads === 0) {
    notes.push("No leads captured in this period \u2014 monitor CTA placement and form visibility.");
  } else {
    notes.push("<strong>" + stats.leads + "</strong> lead(s) captured, primarily via " + (stats.leadSources[0] ? stats.leadSources[0].name : "direct inbound") + ".");
  }
  if (stats.sessions > 0 && stats.pageViews / stats.sessions < 1.5) {
    notes.push("Pages-per-session is low \u2014 consider reviewing internal linking and content depth.");
  }
  return notes.join(" ");
}

function buildMonitoringAreas(stats) {
  var notes = [];
  if (!stats.geographicDistribution || !stats.geographicDistribution.length || stats.geographicDistribution[0].name === "Unknown") {
    notes.push("Geographic data is sparse \u2014 consider enriching visitor records with IP-based country lookups.");
  }
  if (stats.ctaClicks === 0) {
    notes.push("No CTA click events recorded \u2014 verify client-side event tracking is firing correctly.");
  }
  if (stats.returningVisitors === 0 && stats.totalVisitors > 0) {
    notes.push("No returning visitors detected in this window \u2014 evaluate retention and remarketing efforts.");
  }
  if (!notes.length) notes.push("No anomalies detected. All tracking pipelines reporting normally.");
  return notes.join(" ");
}

function sectionTitle(title) {
  return "<h3 style='color:#0f172a;font-size:13px;text-transform:uppercase;letter-spacing:0.05em;border-left:4px solid #2563eb;padding-left:10px;margin:26px 0 10px 0;'>" + title + "</h3>";
}

function kpiBlock(label, value) {
  return "<td style='padding:14px 8px;text-align:center;background:#f8fafc;border-radius:8px;'>"
    + "<div style='font-size:22px;font-weight:800;color:#0f172a;'>" + value + "</div>"
    + "<div style='font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-top:2px;'>" + label + "</div>"
    + "</td>";
}

function formatEntriesTable(entries) {
  if (!entries || entries.length === 0) {
    return "<tr><td style='padding:6px 0;color:#94a3b8;font-size:13px;' colspan='2'>No data recorded for this period.</td></tr>";
  }
  return entries.map(function (en) {
    return "<tr>"
      + "<td style='padding:6px 4px;color:#334155;font-size:13px;border-bottom:1px solid #f1f5f9;'>" + en.name + "</td>"
      + "<td style='padding:6px 4px;color:#0f172a;font-weight:bold;font-size:13px;text-align:right;border-bottom:1px solid #f1f5f9;'>" + en.count + "</td>"
      + "</tr>";
  }).join("");
}

function reportHeader(subtitle) {
  return "<div style='background:#0f172a;padding:20px 26px;border-radius:8px 8px 0 0;'>"
    + "<div style='color:#ffffff;font-size:20px;font-weight:800;letter-spacing:0.02em;'>PROFITMACHINES</div>"
    + "<div style='color:#94a3b8;font-size:12px;margin-top:2px;'>" + subtitle + "</div>"
    + "</div>";
}

function reportFooter() {
  return "<div style='margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;'>"
    + "Report Generated: " + new Date().toISOString()
    + "</div>";
}

/**
 * Builds the professional HTML body for the daily traffic & lead intelligence email.
 */
function buildDailyEmailHtml(stats, dateStr) {
  return "<div style='font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#ffffff;'>"
    + reportHeader("Traffic Intelligence &mdash; Daily Report &mdash; " + dateStr)
    + "<div style='padding:24px 26px;'>"

    + "<table style='width:100%;border-collapse:separate;border-spacing:8px 0;margin-bottom:8px;'><tr>"
    + kpiBlock("Visitors", stats.totalVisitors)
    + kpiBlock("Sessions", stats.sessions)
    + kpiBlock("Page Views", stats.pageViews)
    + kpiBlock("Leads", stats.leads)
    + "</tr></table>"

    + sectionTitle("Traffic Sources")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.trafficSources) + "</table>"

    + sectionTitle("Top Pages")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.topPages) + "</table>"

    + sectionTitle("Engagement")
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>Avg. Session Duration: <strong>" + formatDuration(stats.avgSessionDurationSeconds) + "</strong></p>"
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>CTA Clicks: <strong>" + stats.ctaClicks + "</strong> &nbsp;|&nbsp; Form Interactions: <strong>" + stats.formInteractions + "</strong></p>"

    + sectionTitle("Lead Intelligence")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.leadSources) + "</table>"

    + sectionTitle("Visitor Profile")
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>New Visitors: <strong>" + stats.newVisitors + "</strong> &nbsp;|&nbsp; Returning Visitors: <strong>" + stats.returningVisitors + "</strong></p>"

    + sectionTitle("Device / Browser")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.deviceDistribution) + "</table>"
    + "<table style='width:100%;border-collapse:collapse;margin-top:8px;'>" + formatEntriesTable(stats.browserDistribution) + "</table>"

    + sectionTitle("Geographic Overview")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.geographicDistribution) + "</table>"

    + sectionTitle("Key Observations")
    + "<p style='font-size:13px;color:#334155;line-height:1.6;'>" + buildObservations(stats) + "</p>"

    + sectionTitle("Monitoring Areas")
    + "<p style='font-size:13px;color:#334155;line-height:1.6;'>" + buildMonitoringAreas(stats) + "</p>"

    + reportFooter()
    + "</div></div>";
}

/**
 * Builds the professional HTML body for the weekly traffic & lead intelligence email.
 */
function buildWeeklyEmailHtml(stats, rangeStr, dailyBreakdown) {
  var trendRows = (dailyBreakdown || []).map(function (d) {
    return "<tr>"
      + "<td style='padding:6px 4px;color:#334155;font-size:13px;border-bottom:1px solid #f1f5f9;'>" + d.date + "</td>"
      + "<td style='padding:6px 4px;color:#0f172a;font-size:13px;text-align:right;border-bottom:1px solid #f1f5f9;'>" + d.visitors + "</td>"
      + "<td style='padding:6px 4px;color:#0f172a;font-size:13px;text-align:right;border-bottom:1px solid #f1f5f9;'>" + d.pageViews + "</td>"
      + "<td style='padding:6px 4px;color:#0f172a;font-size:13px;text-align:right;border-bottom:1px solid #f1f5f9;'>" + d.leads + "</td>"
      + "</tr>";
  }).join("");

  return "<div style='font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;background:#ffffff;'>"
    + reportHeader("Traffic Intelligence &mdash; Weekly Report &mdash; " + rangeStr)
    + "<div style='padding:24px 26px;'>"

    + sectionTitle("Executive Summary")
    + "<table style='width:100%;border-collapse:separate;border-spacing:8px 0;margin-bottom:8px;'><tr>"
    + kpiBlock("Visitors", stats.totalVisitors)
    + kpiBlock("Sessions", stats.sessions)
    + kpiBlock("Page Views", stats.pageViews)
    + kpiBlock("Leads", stats.leads)
    + "</tr></table>"

    + sectionTitle("Traffic Profile (New vs Returning)")
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>New Visitors: <strong>" + stats.newVisitors + "</strong> &nbsp;|&nbsp; Returning Visitors: <strong>" + stats.returningVisitors + "</strong></p>"

    + sectionTitle("Traffic Sources &amp; Campaign Performance")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.trafficSources) + "</table>"

    + sectionTitle("Top Content")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.topPages) + "</table>"

    + sectionTitle("Engagement")
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>Avg. Session Duration: <strong>" + formatDuration(stats.avgSessionDurationSeconds) + "</strong></p>"
    + "<p style='font-size:13px;color:#334155;margin:4px 0;'>CTA Clicks: <strong>" + stats.ctaClicks + "</strong> &nbsp;|&nbsp; Form Interactions: <strong>" + stats.formInteractions + "</strong></p>"

    + sectionTitle("Lead Intelligence")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.leadSources) + "</table>"

    + sectionTitle("Device Profile")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.deviceDistribution) + "</table>"
    + "<table style='width:100%;border-collapse:collapse;margin-top:8px;'>" + formatEntriesTable(stats.browserDistribution) + "</table>"

    + sectionTitle("Geographic Profile")
    + "<table style='width:100%;border-collapse:collapse;'>" + formatEntriesTable(stats.geographicDistribution) + "</table>"

    + sectionTitle("Weekly Trends")
    + "<table style='width:100%;border-collapse:collapse;'><tr>"
    + "<th style='text-align:left;padding:6px 4px;font-size:11px;color:#64748b;text-transform:uppercase;'>Date</th>"
    + "<th style='text-align:right;padding:6px 4px;font-size:11px;color:#64748b;text-transform:uppercase;'>Visitors</th>"
    + "<th style='text-align:right;padding:6px 4px;font-size:11px;color:#64748b;text-transform:uppercase;'>Page Views</th>"
    + "<th style='text-align:right;padding:6px 4px;font-size:11px;color:#64748b;text-transform:uppercase;'>Leads</th>"
    + "</tr>" + trendRows + "</table>"

    + sectionTitle("Key Observations")
    + "<p style='font-size:13px;color:#334155;line-height:1.6;'>" + buildObservations(stats) + "</p>"

    + sectionTitle("Monitoring Areas")
    + "<p style='font-size:13px;color:#334155;line-height:1.6;'>" + buildMonitoringAreas(stats) + "</p>"

    + reportFooter()
    + "</div></div>";
}

function sendReportEmail(ss, subject, htmlBody, reportType) {
  var mailLog = ss.getSheetByName(CONFIG.SHEETS.MAILING_LOG);
  var now = new Date().toISOString();
  var recipient = CONFIG.NOTIFICATION_EMAIL;
  try {
    MailApp.sendEmail({ to: recipient, subject: subject, htmlBody: htmlBody });
    if (mailLog) mailLog.appendRow([now, reportType, recipient, reportType, subject, "SENT", "MailApp", ""]);
  } catch (err) {
    if (mailLog) mailLog.appendRow([now, reportType, recipient, reportType, subject, "FAILED", "MailApp", err.toString()]);
  }
}

/**
 * Sends the Daily Traffic & Lead Intelligence email. Wire this to a daily
 * time-driven trigger via setupTriggers().
 */
function sendDailyTrafficReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  initializeSheets(ss);

  var now = new Date();
  var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  var stats = computeAnalyticsForRange(ss, start, end);
  var dateStr = Utilities.formatDate(start, Session.getScriptTimeZone(), "MMMM d, yyyy");
  var subject = "ProfitMachines \u2014 Daily Traffic & Lead Intelligence \u2014 " + dateStr;
  var html = buildDailyEmailHtml(stats, dateStr);

  sendReportEmail(ss, subject, html, "DAILY_REPORT");
}

/**
 * Sends the Weekly Traffic & Lead Intelligence email (last 7 days).
 * Wire this to a weekly time-driven trigger via setupTriggers().
 */
function sendWeeklyTrafficReport() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  initializeSheets(ss);

  var now = new Date();
  var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var rangeStart = new Date(todayStart.getTime() - 6 * 24 * 60 * 60 * 1000);
  var rangeEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

  var stats = computeAnalyticsForRange(ss, rangeStart, rangeEnd);

  var dailyBreakdown = [];
  for (var i = 0; i < 7; i++) {
    var dayStart = new Date(rangeStart.getTime() + i * 24 * 60 * 60 * 1000);
    var dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
    var dayStats = computeAnalyticsForRange(ss, dayStart, dayEnd);
    dailyBreakdown.push({
      date: Utilities.formatDate(dayStart, Session.getScriptTimeZone(), "MMM d"),
      visitors: dayStats.totalVisitors,
      pageViews: dayStats.pageViews,
      leads: dayStats.leads
    });
  }

  var rangeStr = Utilities.formatDate(rangeStart, Session.getScriptTimeZone(), "MMM d") + " \u2013 " + Utilities.formatDate(now, Session.getScriptTimeZone(), "MMM d, yyyy");
  var subject = "ProfitMachines \u2014 Weekly Traffic & Lead Intelligence \u2014 " + rangeStr;
  var html = buildWeeklyEmailHtml(stats, rangeStr, dailyBreakdown);

  sendReportEmail(ss, subject, html, "WEEKLY_REPORT");
}

/**
 * One-time setup: run this manually from the Apps Script editor (Run > setupTriggers)
 * to install the daily (08:00) and weekly (Monday 08:00) reporting triggers.
 */
function setupTriggers() {
  deleteReportTriggers();
  ScriptApp.newTrigger("sendDailyTrafficReport").timeBased().everyDays(1).atHour(8).create();
  ScriptApp.newTrigger("sendWeeklyTrafficReport").timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).create();
}

function deleteReportTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    var fn = triggers[i].getHandlerFunction();
    if (fn === "sendDailyTrafficReport" || fn === "sendWeeklyTrafficReport") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}

/**
 * =========================================================================
 * SHEET 2 PROCESSED TABS READER
 * Reads any of the 16 processed analytics tabs created by Sheet 2 master builder.
 * =========================================================================
 */
var SHEET2_TABS = [
  "Mission_Control", "Executive_KPIs", "Ad_Intelligence", "Geo_Map_Profile",
  "Pareto_80_20", "Daily_Heatmap", "Growth_Momentum", "Visitor_Ratio",
  "Tech_Profile", "Identity_Linker", "Std_Deviation", "Sankey_Flow",
  "Broken_Link_QA", "Co_Occurrence_Matrix", "Funnel_Drop_Off", "Lead_Scoring_Engine"
];

function readSheet2Tab(ss, tabName) {
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) return null;
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow < 1 || lastCol < 1) return [];
  
  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  if (values.length <= 1) return [];
  
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var rowObj = {};
    for (var j = 0; j < headers.length; j++) {
      var key = String(headers[j] || ("col_" + j)).trim();
      rowObj[key] = values[i][j];
    }
    rows.push(rowObj);
  }
  return rows;
}

function readAllSheet2Tabs(ss) {
  var result = {};
  for (var i = 0; i < SHEET2_TABS.length; i++) {
    var tab = SHEET2_TABS[i];
    var data = readSheet2Tab(ss, tab);
    if (data !== null) {
      result[tab] = data;
    }
  }
  return result;
}

