/**
 * ═════════════════════════════════════════════════════════════════════════════
 * PROFIT MACHINES - ENTERPRISE ANALYTICS DASHBOARD ENGINE (SHEET 2)
 * ═════════════════════════════════════════════════════════════════════════════
 * This script runs entirely in your Analytics Spreadsheet (Sheet 2).
 * It reads raw multi-form & telemetry data from Sheet 1, purges localhost/dev
 * traffic, and mathematically builds 15 automated executive intelligence tabs.
 * ═════════════════════════════════════════════════════════════════════════════
 */

// 🔴 SHEET 1 ID (DATA COLLECTION SPREADSHEET WHERE WEBHOOK SAVES RAW DATA)
var DATA_SHEET_ID = "1fdZl2it4O86OUB92DvBaeeEM75fXue1yqjcvLq51gVs";

// 🔴 WEBSITE URL (For Automated QA Audits — Enter once deployed)
var SITE_BASE_URL = "";

// 🔴 DEVELOPMENT MODE: Set to true so localhost test traffic appears in dashboards
var INCLUDE_LOCALHOST_IN_DEV = true;

// ── SaaS Dark / Slate Enterprise Theme ──────────────────────────────────────────
var C = {
    bg: "#f8fafc", // Main dashboard canvas background
    p: "#e2e8f0",  // Sub-panel borders
    r1: "#ffffff", // Table row odd
    r2: "#f1f5f9", // Table row even
    t: "#0f172a",  // Slate-900 primary dark text
    m: "#64748b",  // Slate-500 muted text
    w: "#ffffff",  // White text for dark headers
    pu: "#4f46e5", // Indigo accent (Profit Machines Primary)
    g: "#10b981",  // Emerald green (Conversions)
    o: "#f59e0b",  // Amber orange (Pipeline)
    c: "#0ea5e9",  // Sky blue (Telemetry)
    re: "#ef4444"  // Rose red (Hot Leads)
};

// ══════════════════════════════════════════════════════════════════════════════
// THE MASTER BUILDER (Orchestrator)
// ══════════════════════════════════════════════════════════════════════════════
function PULL_DATA_AND_BUILD_ALL_DASHBOARDS() {
    var ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (!DATA_SHEET_ID || DATA_SHEET_ID.includes("PASTE_YOUR")) {
        if (ui) ui.alert("❌ Error: Please paste your Sheet 1 ID at the top of the script in DATA_SHEET_ID!");
        return;
    }

    var db;
    try {
        db = SpreadsheetApp.openById(DATA_SHEET_ID);
    } catch (e) {
        if (ui) ui.alert("❌ Error: Could not open Sheet 1 (ID: " + DATA_SHEET_ID + ").\n\nEnsure the Sheet ID is correct and you have Editor permissions.\nDetails: " + e.toString());
        return;
    }

    // Pulling Raw Ingestion Data from Sheet 1 (Exact Tab Matches for all 18 tabs)
    // Live_Traffic_Events is the real master telemetry sheet the webhook actually writes every
    // page view/session to (SCHEMA_95, snake_case columns) — checked first so real data is used
    // instead of legacy tabs that may be empty.
    var tSheet = db.getSheetByName("Live_Traffic_Events") || db.getSheetByName("Page Views") || db.getSheetByName("traffic_analytics") || db.getSheetByName("TrafficAnalytics");
    var eSheet = db.getSheetByName("Live_Traffic_Events") || db.getSheetByName("CTA Clicks") || db.getSheetByName("Website Events") || db.getSheetByName("engagement_metrics");
    var ubSheet = db.getSheetByName("Live_Traffic_Events") || db.getSheetByName("Sessions") || db.getSheetByName("UTM Data") || db.getSheetByName("user_behavior_library");
    
        // Profit Machines Dedicated Form Sheets
    var inboundSheet = db.getSheetByName("Form_Inbound_Leads") || db.getSheetByName("Inbound Leads");
    var consultSheet = db.getSheetByName("Form_Consultation_Bookings") || db.getSheetByName("Consultation Bookings") || db.getSheetByName("Book for Consultation");
    var expertSheet = db.getSheetByName("Form_Expert_Consulting") || db.getSheetByName("Talk to Expert") || db.getSheetByName("Expert Consulting");
    var diagSheet = db.getSheetByName("Form_Diagnostic_Assessments") || db.getSheetByName("Diagnostic Forms") || db.getSheetByName("Profit Pool Diagnostics");
    var partnerSheet = db.getSheetByName("Form_Partner_Applications") || db.getSheetByName("Partners") || db.getSheetByName("Partner Applications");
    var careerSheet = db.getSheetByName("Form_Career_Applications") || db.getSheetByName("Job Applications") || db.getSheetByName("Career Applications");
    var chatSheet = db.getSheetByName("Form_Chatbot_Conversations") || db.getSheetByName("Chatbot Leads") || db.getSheetByName("Chatbot");
    var formsSheet = db.getSheetByName("Form_Submissions");

    var tDataRaw = normalizeTrafficHeaders((tSheet && tSheet.getLastRow() > 0) ? tSheet.getDataRange().getValues() : []);
    var eDataRaw = (eSheet && eSheet.getLastRow() > 0) ? eSheet.getDataRange().getValues() : [];
    var ubDataRaw = normalizeTrafficHeaders((ubSheet && ubSheet.getLastRow() > 0) ? ubSheet.getDataRange().getValues() : []);
    var inboundData = (inboundSheet && inboundSheet.getLastRow() > 0) ? inboundSheet.getDataRange().getValues() : [];
    var consultData = (consultSheet && consultSheet.getLastRow() > 0) ? consultSheet.getDataRange().getValues() : [];
    var expertData = (expertSheet && expertSheet.getLastRow() > 0) ? expertSheet.getDataRange().getValues() : [];
    var diagData = (diagSheet && diagSheet.getLastRow() > 0) ? diagSheet.getDataRange().getValues() : [];
    var partnerData = (partnerSheet && partnerSheet.getLastRow() > 0) ? partnerSheet.getDataRange().getValues() : [];
    var careerData = (careerSheet && careerSheet.getLastRow() > 0) ? careerSheet.getDataRange().getValues() : [];
    var chatData = (chatSheet && chatSheet.getLastRow() > 0) ? chatSheet.getDataRange().getValues() : [];
    var formsData = (formsSheet && formsSheet.getLastRow() > 0) ? formsSheet.getDataRange().getValues() : [];

    // ── LOCALHOST & DEV SANITIZATION ENGINE ──
    var tData = filterLocalhostData(tDataRaw);
    var ubData = filterLocalhostData(ubDataRaw);

    var validSessions = new Set();
    if (tData.length > 1) {
      var sIdx = tData[0].indexOf("Session ID");
      if (sIdx > -1) {
        for (var i = 1; i < tData.length; i++) { if(tData[i][sIdx]) validSessions.add(tData[i][sIdx]); }
      }
    }
    var eData = eDataRaw.filter(function(row, idx) {
      if (idx === 0) return true;
      var eSessIdx = eDataRaw[0] ? eDataRaw[0].indexOf("Session ID") : -1;
      if (eSessIdx === -1) return true;
      return validSessions.has(row[eSessIdx]);
    });

    var devRecordsPurged = (tDataRaw.length - tData.length) + (ubDataRaw.length - ubData.length);
    // ─────────────────────────────────────────

    // Build all 16 Intelligence Tabs
    try { buildMissionControlCenter(tData, eData, ubData, db, devRecordsPurged); } catch (err) { console.error("Tab 1 Error: " + err.toString()); }
    try { buildExecutiveDashboard(tData, eData); } catch (err) { console.error("Tab 2 Error: " + err.toString()); }
    try { buildGeoMapProfile(tData); } catch (err) { console.error("Tab 3 Error: " + err.toString()); }
    try { buildTrafficAndPagesPareto(tData); } catch (err) { console.error("Tab 4 Error: " + err.toString()); }
    try { buildHeatmapSheet(tData); } catch (err) { console.error("Tab 5 Error: " + err.toString()); }
    try { buildGrowthGraphSheet(tData); } catch (err) { console.error("Tab 6 Error: " + err.toString()); }
    try { buildRepeatVisitorRatioSheet(tData); } catch (err) { console.error("Tab 7 Error: " + err.toString()); }
    try { buildTechProfile(ubData); } catch (err) { console.error("Tab 8 Error: " + err.toString()); }
    try { buildIdentityLinkerSheet(ubData, db); } catch (err) { console.error("Tab 9 Error: " + err.toString()); }
    try { buildStdDevSheet(eData); } catch (err) { console.error("Tab 10 Error: " + err.toString()); }
    try { buildSankeySheet(tData); } catch (err) { console.error("Tab 11 Error: " + err.toString()); }
    try { buildBrokenLinkSheet(); } catch (err) { console.error("Tab 12 Error: " + err.toString()); }
    try { buildCoOccurrenceMatrix(tData, eData); } catch (err) { console.error("Tab 13 Error: " + err.toString()); }
    try { buildFunnelDropOffSheet(tData, db); } catch (err) { console.error("Tab 14 Error: " + err.toString()); }
    try { buildLeadScoringEngine(tData, eData); } catch (err) { console.error("Tab 15 Error: " + err.toString()); }
        try {
      buildLeadsConversionsIntelligence([
        { name: "Inbound Leads", data: inboundData },
        { name: "Consultation Bookings", data: consultData },
        { name: "Expert Advisory Inquiries", data: expertData },
        { name: "Profit Pool Diagnostics", data: diagData },
        { name: "Partner Applications", data: partnerData },
        { name: "Career Applications", data: careerData },
        { name: "Chatbot Conversations", data: chatData }
      ], formsData, tData);
    } catch (err) { console.error("Tab 16 Error: " + err.toString()); }

    if (ui) ui.alert("✅ SUCCESS! 16 Profit Machines Analytics Tabs Built & Sanitized.\n\n" + devRecordsPurged + " localhost development records were purged.");
}

function filterLocalhostData(data) {
    if (!data || data.length < 2) return data || [];
    if (INCLUDE_LOCALHOST_IN_DEV) return data; // Keep localhost data during local testing

    var headers = data[0];
    var ipCol = headers.indexOf("IP Address");
    if (ipCol === -1) ipCol = headers.indexOf("ipAddress");
    if (ipCol === -1) ipCol = headers.indexOf("ip_address");
    if (ipCol === -1) return data;

    var filtered = [headers];
    for (var i = 1; i < data.length; i++) {
        var ip = String(data[i][ipCol]);
        if (ip !== "127.0.0.1" && ip !== "::1" && !ip.toLowerCase().includes("localhost")) {
            filtered.push(data[i]);
        }
    }
    return filtered;
}

// Maps Live_Traffic_Events' SCHEMA_95 snake_case columns onto the Title-Case names every
// tab builder below expects, so real telemetry is used instead of legacy empty tabs.
var TRAFFIC_HEADER_ALIASES = {
    "ip_address": "IP Address",
    "session_id": "Session ID",
    "user_id": "Visitor ID",
    "page": "Page Path",
    "page_url": "Page Path",
    "page_title": "Page Title",
    "referrer_url": "Referrer",
    "traffic_source": "Traffic Source",
    "utm_source": "UTM Source",
    "utm_medium": "UTM Medium",
    "utm_campaign": "UTM Campaign",
    "device_type": "Device",
    "operating_system": "OS",
    "browser": "Browser",
    "timestamp": "Timestamp"
};

function normalizeTrafficHeaders(data) {
    if (!data || data.length < 1) return data || [];
    var headers = data[0];
    if (headers.indexOf("session_id") === -1 && headers.indexOf("ip_address") === -1) return data; // already Title Case
    var renamed = headers.map(function (h) { return TRAFFIC_HEADER_ALIASES[h] || h; });

    // Synthesize a combined "IP Location" column from the separate geo_* fields if present
    var cityIdx = headers.indexOf("geo_city"), stateIdx = headers.indexOf("geo_state"), countryIdx = headers.indexOf("geo_country");
    if (renamed.indexOf("IP Location") === -1 && (cityIdx > -1 || stateIdx > -1 || countryIdx > -1)) {
        renamed.push("IP Location");
        var out = [renamed];
        for (var i = 1; i < data.length; i++) {
            var parts = [cityIdx > -1 ? data[i][cityIdx] : "", stateIdx > -1 ? data[i][stateIdx] : "", countryIdx > -1 ? data[i][countryIdx] : ""].filter(Boolean);
            out.push(data[i].concat([parts.join(", ") || "Unknown"]));
        }
        return out;
    }
    return [renamed].concat(data.slice(1));
}

function getOrCreateTab(name) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return null;
    var sh = ss.getSheetByName(name);
    if (sh) {
        try {
            sh.clearContents();
            sh.clearFormats();
            var charts = sh.getCharts();
            for (var i = 0; i < charts.length; i++) sh.removeChart(charts[i]);
        } catch (e) {}
    } else {
        sh = ss.insertSheet(name);
    }
    ss.setActiveSheet(sh);
    return sh;
}

function styleTitle(sh, text, c_span, bg) {
    if (!sh) return;
    sh.getRange(1, 1, 1, Math.max(c_span, 1)).merge().setValue(text).setBackground(bg).setFontColor(C.w).setFontWeight("bold").setFontSize(16).setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.setRowHeight(1, 55);
    sh.setFrozenRows(2);
    sh.getRange("A2").setValue("PROFIT MACHINES ENTERPRISE AI • Last Refreshed: " + new Date().toLocaleString()).setBackground(C.bg).setFontColor(C.m).setFontSize(10).setFontStyle("italic");
}

function setColWidths(sh, startCol, widths) {
    if (!sh || !widths || !widths.length) return;
    for (var i = 0; i < widths.length; i++) sh.setColumnWidth(startCol + i, widths[i]);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1: MISSION CONTROL
// ══════════════════════════════════════════════════════════════════════════════
function buildMissionControlCenter(tData, eData, ubData, db, devRecordsPurged) {
    var sh = getOrCreateTab("🛰️ Mission Control");
    styleTitle(sh, "🛰️ PROFIT MACHINES — CENTRAL COMMAND & MISSION CONTROL", 12, C.t);
    sh.getRange("A1:Z100").setBackground(C.bg);
    setColWidths(sh, 1, [20, 200, 200, 200, 200, 200, 20].concat(new Array(10).fill(100)));

    if (!tData || tData.length < 2) {
        sh.getRange(4, 2).setValue("Waiting for live traffic telemetry in Sheet 1...").setFontColor(C.m);
        return;
    }

    var tHead = tData[0], ipCol = tHead.indexOf("IP Address"), sCol = tHead.indexOf("Traffic Source");
    var eDurCol = (eData && eData.length > 0) ? eData[0].indexOf("Duration (sec)") : -1;
    var ubHotCol = (ubData && ubData.length > 0) ? ubData[0].indexOf("Hot Lead Flag") : -1;

    var totalVisits = tData.length - 1;
    var ipCounts = {}, sources = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], s = tData[i][sCol] || "Direct";
        if (ip) ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        sources[s] = (sources[s] || 0) + 1;
    }

    var uniqueUsers = Object.keys(ipCounts).length;
    var returnUsers = Object.keys(ipCounts).filter(function (k) { return ipCounts[k] > 1; }).length;

    var totalSecs = 0, timedSessions = 0;
    if (eDurCol > -1) {
        for (var i = 1; i < eData.length; i++) {
            var d = Number(eData[i][eDurCol]) || 0;
            if (d > 0) { totalSecs += d; timedSessions++; }
        }
    }
    var avgSecs = timedSessions > 0 ? Math.round(totalSecs / timedSessions) : 0;

    var hotLeads = 0;
    if (ubHotCol > -1) {
        for (var i = 1; i < ubData.length; i++) {
            if (String(ubData[i][ubHotCol]).toUpperCase() === "YES" || String(ubData[i][ubHotCol]).toUpperCase() === "TRUE") hotLeads++;
        }
    }

    var drawMegaStat = function (row, col, title, value, span, color, textcolor) {
        sh.getRange(row, col, 1, span).merge().setValue(title.toUpperCase()).setBackground(C.t).setFontColor(C.w).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontSize(10);
        sh.getRange(row + 1, col, 2, span).merge().setValue(value).setBackground(color).setFontColor(textcolor || C.w).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontSize(26);
    };

    drawMegaStat(4, 2, "🌐 GLOBAL TRAFFIC", totalVisits.toLocaleString(), 1, C.pu);
    drawMegaStat(4, 3, "👤 UNIQUE TARGETS", uniqueUsers.toLocaleString(), 1, C.c);
    drawMegaStat(4, 4, "⏱ AVG ENGAGEMENT", avgSecs + "s", 1, C.g);
    drawMegaStat(4, 5, "🔄 LOYALTY SURGE", returnUsers.toLocaleString(), 1, C.o);
    drawMegaStat(4, 6, "🔥 HOT LEADS DETECTED", hotLeads, 1, C.re, C.w);

    sh.getRange(8, 2, 1, 5).merge().setValue("ENTERPRISE VITALS & ACQUISITION RADAR").setBackground(C.p).setFontColor(C.t).setFontWeight("bold").setHorizontalAlignment("center");

    var retentionPct = uniqueUsers > 0 ? Math.round(returnUsers / uniqueUsers * 100) : 0;
    sh.getRange(9, 2).setValue("Retention %").setFontColor(C.bg);
    sh.getRange(10, 2).setValue(retentionPct).setFontColor(C.bg); 
    try {
        var gauge1 = sh.newChart().setChartType(Charts.ChartType.GAUGE).addRange(sh.getRange(9, 2, 2, 1))
            .setPosition(9, 2, 0, 0).setOption("title", "Retention %").setOption("width", 200).setOption("height", 200)
            .setOption("greenFrom", 30).setOption("greenTo", 100).setOption("redFrom", 0).setOption("redTo", 15).build();
        sh.insertChart(gauge1);
    } catch(e) {}

    sh.getRange(9, 3).setValue("Avg Secs").setFontColor(C.bg);
    sh.getRange(10, 3).setValue(avgSecs).setFontColor(C.bg);
    try {
        var gauge2 = sh.newChart().setChartType(Charts.ChartType.GAUGE).addRange(sh.getRange(9, 3, 2, 1))
            .setPosition(9, 3, 0, 0).setOption("title", "Avg Secs").setOption("width", 200).setOption("height", 200)
            .setOption("max", 200).setOption("greenFrom", 60).setOption("greenTo", 200).setOption("yellowFrom", 30).setOption("yellowTo", 60).build();
        sh.insertChart(gauge2);
    } catch(e) {}

    var srcRows = Object.keys(sources).map(function (k) { return [k, sources[k]]; }).sort(function (a, b) { return b[1] - a[1] });
    if (srcRows.length > 0) {
        sh.getRange(25, 2, srcRows.length, 2).setValues(srcRows).setFontColor(C.bg);
        try {
            var pie = sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(25, 2, srcRows.length, 2))
                .setPosition(9, 4, 0, 0).setOption("title", "Acquisition Radar").setOption("pieHole", 0.5)
                .setOption("backgroundColor", C.bg).setOption("width", 400).setOption("height", 300).build();
            sh.insertChart(pie);
        } catch(e) {}
    }

    sh.getRange(21, 2, 1, 5).merge().setValue("PROFIT MACHINES SYSTEM TERMINAL FEED").setBackground(C.t).setFontColor(C.g).setFontWeight("bold").setFontFamily("Courier New");
    sh.getRange(22, 2, 5, 5).merge().setBackground("#000000").setFontColor("#00ff00").setFontFamily("Courier New").setVerticalAlignment("top").setWrap(true)
        .setValue("> PROFIT MACHINES AI DATA LINK ONLINE... \n> " + totalVisits + " TELEMETRY LOGS COMPILED... \n> DEV SANITIZATION: " + (devRecordsPurged || 0) + " LOCALHOST RECORDS PURGED... \n> AI LEAD ENGINE ACTIVE... \n> READY FOR EXECUTIVE QUERY.");
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2: EXECUTIVE DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function buildExecutiveDashboard(tData, eData) {
    var sh = getOrCreateTab("🚦 Executive KPIs");
    styleTitle(sh, "🚦 Profit Machines Executive Dashboard & Core Performance Metrics", 10, C.pu);
    setColWidths(sh, 1, [250, 100, 100, 40, 600, 40, 250, 100, 100, 40, 600]);

    if (!tData || tData.length < 2) return;

    var tHeaders = tData[0], eHeaders = (eData && eData.length > 0) ? eData[0] : [];
    var pathCol = tHeaders.indexOf("Page Path"), ipCol = tHeaders.indexOf("IP Address"), locCol = tHeaders.indexOf("IP Location");
    var urlCol = eHeaders.indexOf("Page URL"), durCol = eHeaders.indexOf("Duration (sec)");

    var pageCounts = {}, ipByPage = {};
    for (var i = 1; i < tData.length; i++) {
        var p = tData[i][pathCol], ip = tData[i][ipCol];
        if (!p || p === "/") continue;
        pageCounts[p] = (pageCounts[p] || 0) + 1;
        if (!ipByPage[p]) ipByPage[p] = new Set();
        if (ip) ipByPage[p].add(ip);
    }
    var topPages = Object.keys(pageCounts).map(function (k) { return [k, pageCounts[k], ipByPage[k].size] }).sort(function (a, b) { return b[1] - a[1] });

    var timeByPage = {};
    if (urlCol > -1 && durCol > -1) {
        for (var i = 1; i < eData.length; i++) {
            var u = eData[i][urlCol], d = Number(eData[i][durCol]) || 0;
            if (!u || d <= 0) continue;
            if (!timeByPage[u]) timeByPage[u] = { sum: 0, count: 0, max: 0 };
            timeByPage[u].sum += d; timeByPage[u].count++;
            if (d > timeByPage[u].max) timeByPage[u].max = d;
        }
    }
    var timeArr = Object.keys(timeByPage).map(function (k) { return [k, (timeByPage[k].sum / timeByPage[k].count).toFixed(1), timeByPage[k].max] }).sort(function (a, b) { return b[1] - a[1] });

    var ipCounts = {}, ipLocs = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], loc = tData[i][locCol];
        if (!ip) continue;
        ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        if (loc) ipLocs[ip] = loc;
    }
    var topIPs = Object.keys(ipCounts).map(function (k) { return [k, ipLocs[k] || "Unknown", ipCounts[k]] }).filter(function (x) { return x[2] > 1 }).sort(function (a, b) { return b[2] - a[2] });

    var drawTable = function (startRow, themeColor, icon, title, headers, rowData, chartValueCol) {
        sh.getRange(startRow, 1, 1, headers.length).merge().setValue(icon + " " + title).setBackground(themeColor).setFontColor(C.w).setFontWeight("bold");
        sh.getRange(startRow + 1, 1, 1, headers.length).setValues([headers]).setBackground(C.p).setFontColor(C.t).setFontWeight("bold");
        if (rowData.length > 0) {
            sh.getRange(startRow + 2, 1, rowData.length, headers.length).setValues(rowData).setBackground(C.r1).setFontColor(C.t);
            for (var r = 0; r < rowData.length; r++) { if (r % 2 !== 0) sh.getRange(startRow + 2 + r, 1, 1, headers.length).setBackground(C.r2); }
            // Bar chart built from the same live rows just written (real data, no fabricated values)
            if (chartValueCol) {
                try {
                    var chart = sh.newChart().setChartType(Charts.ChartType.BAR)
                        .addRange(sh.getRange(startRow + 2, 1, rowData.length, 1))
                        .addRange(sh.getRange(startRow + 2, chartValueCol, rowData.length, 1))
                        .setPosition(startRow, 5, 0, 0)
                        .setOption("title", headers[chartValueCol - 1] + " by " + headers[0])
                        .setOption("width", 380).setOption("height", 190)
                        .setOption("legend", "none")
                        .setOption("colors", [themeColor])
                        .build();
                    sh.insertChart(chart);
                } catch (e) {}
            }
        }
    };

    var r1 = 4, r2 = 20, r3 = 36;
    drawTable(r1, C.pu, "🏆", "Q1: Top Solutions & Pages (excl. Home)", ["Page / Solution", "Visits", "Unique IPs"], topPages.slice(0, 5), 2);
    drawTable(r2, "#6366f1", "⏱", "Q2: Top Pages by Dwell Time", ["Page", "Avg Sec", "Max Sec"], timeArr.slice(0, 5), 2);
    drawTable(r3, C.c, "🔄", "Q3: Top Enterprise Repeat Visitors", ["IP Address", "Location", "Total Visits"], topIPs.slice(0, 5), 3);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3: GEO MAP PROFILE
// ══════════════════════════════════════════════════════════════════════════════
function buildGeoMapProfile(tData) {
    var sh = getOrCreateTab("🗺️ Geo Map");
    styleTitle(sh, "🗺️ Geographic Map Intensity & Global Traffic Profile", 8, C.c);
    setColWidths(sh, 1, [150, 100, 100, 150, 200, 100, 150]);
    if (!tData || tData.length < 2) return;
    var hd = tData[0], locCol = hd.indexOf("IP Location");
    var countryDist = {}; 
    for (var i = 1; i < tData.length; i++) {
        var loc = tData[i][locCol] || "Unknown";
        var country = loc.split(",").pop().trim();
        if (country) countryDist[country] = (countryDist[country] || 0) + 1;
    }
    var cArr = Object.keys(countryDist).map(function (k) { return [k, countryDist[k]] }).sort(function (a, b) { return b[1] - a[1] });
    sh.getRange(4, 1, 1, 2).setValues([["Country", "Traffic"]]).setBackground(C.c).setFontColor(C.w).setFontWeight("bold");
    if (cArr.length > 0) {
        sh.getRange(5, 1, cArr.length, 2).setValues(cArr);
        try {
            var chart = sh.newChart().setChartType(Charts.ChartType.GEO).addRange(sh.getRange(4, 1, cArr.length+1, 2)).setPosition(4, 7, 0, 0).setOption("width", 500).build();
            sh.insertChart(chart);
        } catch(e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4: PARETO 80-20
// ══════════════════════════════════════════════════════════════════════════════
function buildTrafficAndPagesPareto(tData) {
    var sh = getOrCreateTab("📏 Pareto (80-20)");
    styleTitle(sh, "📏 80/20 Pareto Analysis — Solution Concentration", 9, C.re);
    setColWidths(sh, 1, [200, 100, 100, 120, 50, 180, 100, 100, 120]);
    if (!tData || tData.length < 2) return;
    var hd = tData[0], pCol = hd.indexOf("Page Path");
    var pcs = {};
    for (var i = 1; i < tData.length; i++) {
        var p = tData[i][pCol];
        if (p) pcs[p] = (pcs[p] || 0) + 1;
    }
    var pArr = Object.keys(pcs).map(function (k) { return [k, pcs[k]] }).sort(function (a, b) { return b[1] - a[1] });
    var pTot = pArr.reduce(function (a, b) { return a + b[1] }, 0), pCum = 0;
    // Share/Cumulative kept as real numbers (not fabricated) so they can drive the Pareto chart below
    var rows = pArr.map(function(r) { pCum += r[1]; return [r[0], r[1], r[1]/pTot, pCum/pTot]; });
    sh.getRange(4, 1, 1, 4).setValues([["Top Pages", "Visits", "Share", "Cumulative"]]).setBackground(C.re).setFontColor(C.w);
    if (rows.length > 0) {
        sh.getRange(5, 1, rows.length, 4).setValues(rows);
        sh.getRange(5, 3, rows.length, 2).setNumberFormat("0.0%");
        var chartRows = Math.min(10, rows.length);
        try {
            var pareto = sh.newChart().setChartType(Charts.ChartType.COMBO)
                .addRange(sh.getRange(4, 1, chartRows + 1, 2))
                .addRange(sh.getRange(4, 4, chartRows + 1, 1))
                .setPosition(4, 6, 0, 0)
                .setOption("title", "Pareto Concentration — Top 10 Pages")
                .setOption("width", 480).setOption("height", 260)
                .setOption("series", { 0: { type: "bars", targetAxisIndex: 0, color: C.re }, 1: { type: "line", targetAxisIndex: 1, color: C.t, lineWidth: 3 } })
                .setOption("vAxes", { 0: { title: "Visits" }, 1: { title: "Cumulative Share", format: "percent", viewWindow: { min: 0, max: 1 } } })
                .build();
            sh.insertChart(pareto);
        } catch (e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 5: HEATMAP SHEET
// ══════════════════════════════════════════════════════════════════════════════
function buildHeatmapSheet(tData) {
    var sh = getOrCreateTab("🕒 Daily Heatmap");
    styleTitle(sh, "🕒 Traffic Heatmaps & Multi-Year Engagement Calendar", 55, C.g);
    if (!tData || tData.length < 2) return;
    var tsCol = tData[0].indexOf("Timestamp");
    var mx = []; for (var d = 0; d < 7; d++) mx[d] = new Array(24).fill(0);
    for (var i = 1; i < tData.length; i++) {
        var ts = tData[i][tsCol]; if (!ts) continue;
        var dt = new Date(typeof ts === "string" ? ts.replace(" IST", "") : ts);
        if (isNaN(dt.getTime())) continue;
        mx[dt.getDay()][dt.getHours()]++;
    }
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var peak = 0;
    for (var d = 0; d < 7; d++) {
        sh.getRange(5 + d, 1).setValue(days[d]).setBackground(C.p).setFontWeight("bold");
        for (var h = 0; h < 24; h++) {
            sh.getRange(5+d, h+2).setValue(mx[d][h] || "").setHorizontalAlignment("center");
            if (mx[d][h] > peak) peak = mx[d][h];
        }
    }
    // Color-scale heatmap over the real hourly counts (no synthetic midpoint — driven by actual peak)
    var heatRange = sh.getRange(5, 2, 7, 24);
    var heatRule = SpreadsheetApp.newConditionalFormatRule()
        .setGradientMaxpoint(C.re)
        .setGradientMidpointWithValue("#fef3c7", SpreadsheetApp.InterpolationType.NUMBER, String(Math.max(1, Math.round(peak / 2))))
        .setGradientMinpoint("#ffffff")
        .setRanges([heatRange])
        .build();
    sh.setConditionalFormatRules([heatRule]);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 6: GROWTH GRAPH
// ══════════════════════════════════════════════════════════════════════════════
function buildGrowthGraphSheet(tData) {
    var sh = getOrCreateTab("📈 Growth & Momentum");
    styleTitle(sh, "📈 Traffic Growth Trajectory & Day-over-Day Momentum", 7, C.pu);
    if (!tData || tData.length < 2) return;
    var tsCol = tData[0].indexOf("Timestamp");
    var daily = {};
    for (var i = 1; i < tData.length; i++) {
        var ts = tData[i][tsCol]; if (!ts) continue;
        var key = Utilities.formatDate(new Date(ts), "Asia/Kolkata", "yyyy-MM-dd");
        daily[key] = (daily[key] || 0) + 1;
    }
    var dates = Object.keys(daily).sort(), cum = 0;
    var rows = dates.map(function(d, i) { 
        cum += daily[d]; 
        var prev = i > 0 ? daily[dates[i-1]] : daily[d];
        var mom = prev > 0 ? ((daily[d]-prev)/prev*100).toFixed(1) + "%" : "0%";
        return [d, daily[d], cum, mom]; 
    });
    sh.getRange(3, 1, 1, 4).setValues([["Date", "Sessions", "Cumulative", "Momentum"]]).setBackground(C.pu).setFontColor(C.w);
    if (rows.length > 0) sh.getRange(4, 1, rows.length, 4).setValues(rows);
    if (rows.length > 0) {
        try {
            var chart = sh.newChart().setChartType(Charts.ChartType.LINE).addRange(sh.getRange(3, 1, rows.length+1, 2)).addRange(sh.getRange(3, 3, rows.length+1, 1)).setPosition(3, 7, 0, 0).setOption("width", 600).build();
            sh.insertChart(chart);
        } catch(e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 7: REPEAT VISITOR RATIO
// ══════════════════════════════════════════════════════════════════════════════
function buildRepeatVisitorRatioSheet(tData) {
    var sh = getOrCreateTab("👥 Visitor Ratio");
    styleTitle(sh, "👥 User Acquisition vs. Retention Donut", 6, C.c);
    if (!tData || tData.length < 2) return;
    var ipCol = tData[0].indexOf("IP Address"), ipCounts = {};
    for (var i = 1; i < tData.length; i++) if (tData[i][ipCol]) ipCounts[tData[i][ipCol]] = (ipCounts[tData[i][ipCol]] || 0) + 1;
    var nv = 0, rv = 0; Object.keys(ipCounts).forEach(function(ip) { if (ipCounts[ip] === 1) nv++; else rv++; });
    var rows = [["New Visitors", nv], ["Repeat Visitors", rv]];
    sh.getRange(4, 1, 2, 2).setValues(rows).setBackground(C.r1);
    try {
        sh.insertChart(sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(4,1,2,2)).setPosition(4, 4, 0, 0).setOption("pieHole", 0.6).build());
    } catch(e) {}
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 8: TECH PROFILE
// ══════════════════════════════════════════════════════════════════════════════
function buildTechProfile(ubData) {
    var sh = getOrCreateTab("📱 Tech Profile");
    styleTitle(sh, "📱 Technical Footprint & Devices", 8, C.o);
    if (!ubData || ubData.length < 2) return;
    var hd = ubData[0], osC = hd.indexOf("OS"), vwC = hd.indexOf("Device");
    var os = {}, vw = {};
    for (var i = 1; i < ubData.length; i++) {
        if (osC > -1 && ubData[i][osC]) os[ubData[i][osC]] = (os[ubData[i][osC]] || 0) + 1;
        if (vwC > -1 && ubData[i][vwC]) vw[ubData[i][vwC]] = (vw[ubData[i][vwC]] || 0) + 1;
    }
    var osArr = Object.keys(os).map(function(k) { return [k, os[k]] }).sort(function(a,b){return b[1]-a[1]});
    var vwArr = Object.keys(vw).map(function(k) { return [k, vw[k]] }).sort(function(a,b){return b[1]-a[1]});

    sh.getRange(4, 1, 1, 2).setValues([["Operating System", "Hits"]]).setBackground(C.o).setFontColor(C.w);
    if (osArr.length > 0) {
        sh.getRange(5, 1, osArr.length, 2).setValues(osArr);
        try {
            var osPie = sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(4, 1, osArr.length + 1, 2))
                .setPosition(4, 4, 0, 0).setOption("title", "OS Distribution").setOption("pieHole", 0.4)
                .setOption("width", 340).setOption("height", 240).build();
            sh.insertChart(osPie);
        } catch (e) {}
    }

    var vwStartRow = 6 + osArr.length;
    sh.getRange(vwStartRow, 1, 1, 2).setValues([["Device Type", "Hits"]]).setBackground(C.o).setFontColor(C.w);
    if (vwArr.length > 0) {
        sh.getRange(vwStartRow + 1, 1, vwArr.length, 2).setValues(vwArr);
        try {
            var vwPie = sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(vwStartRow, 1, vwArr.length + 1, 2))
                .setPosition(vwStartRow, 4, 0, 0).setOption("title", "Device Type Distribution").setOption("pieHole", 0.4)
                .setOption("width", 340).setOption("height", 240).build();
            sh.insertChart(vwPie);
        } catch (e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 9: IDENTITY LINKER
// ══════════════════════════════════════════════════════════════════════════════
function buildIdentityLinkerSheet(ubData, db) {
    var sh = getOrCreateTab("🔗 Identity Linker");
    styleTitle(sh, "🔗 Unmasking Anonymous Traffic & Matching Inquiries", 8, C.re);
    if (!ubData || ubData.length < 2) return;
    var vidCol = ubData[0].indexOf("Visitor ID");
    var idents = {};
    // Current Sheet 1 schema (Visitor ID / Session ID were added to these lead tabs); legacy
    // tab names kept as a fallback for older spreadsheets that haven't been migrated yet.
    ["Contact Leads", "AI Diagnostic Leads", "Career Applications", "Partner Applications", "Newsletter Subscribers", "Form Submissions", "Leads", "contact_submissions", "ai_diagnostics", "partner_applications"].forEach(function (tab) {
        var s = db.getSheetByName(tab); if (!s || s.getLastRow() < 2) return;
        var d = s.getDataRange().getValues(), vC = d[0].indexOf("Visitor ID"), eC = d[0].indexOf("Email"), nC = d[0].indexOf("Name");
        if (vC > -1 && eC > -1) {
            for (var i = 1; i < d.length; i++) if (d[i][vC] && d[i][eC]) idents[d[i][vC]] = { n: d[i][nC] || "Enterprise User", e: d[i][eC], t: tab };
        }
    });
    var results = []; for (var i = 1; i < ubData.length; i++) {
        var v = ubData[i][vidCol]; if (v && idents[v]) results.push([v, idents[v].n, idents[v].e, idents[v].t]);
    }
    sh.getRange(3, 1, 1, 4).setValues([["Visitor ID", "Lead Name", "Email", "Conversion Form"]]).setBackground(C.pu).setFontColor(C.w);
    if (results.length > 0) sh.getRange(4, 1, results.length, 4).setValues(results).setBackground(C.r1);
    else sh.getRange(4, 1).setValue("No identity matches yet — run migrateAddVisitorTrackingColumns() in Sheet 1 if this is a pre-existing spreadsheet.").setFontColor(C.m);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 10: STD DEV SHEET
// ══════════════════════════════════════════════════════════════════════════════
function buildStdDevSheet(eData) {
    var sh = getOrCreateTab("📊 Std Deviation");
    styleTitle(sh, "📊 Engagement Stat Volatility & Variance", 6, C.pu);
    if (!eData || eData.length < 2) return;
    var sCol = eData[0].indexOf("Engagement Score");
    var sc = []; for (var i = 1; i < eData.length; i++) if (eData[i][sCol]) sc.push(Number(eData[i][sCol]));
    if (sc.length === 0) return;
    var mean = sc.reduce(function(a,b){return a+b},0)/sc.length;
    var std = Math.sqrt(sc.reduce(function(a,b){return a+Math.pow(b-mean,2)},0)/sc.length);
    sh.getRange(4, 1, 2, 2).setValues([["Mean Engagement Score", mean.toFixed(1)], ["Score Volatility (Std Dev)", std.toFixed(1)]]).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 11: SANKEY PATHS
// ══════════════════════════════════════════════════════════════════════════════
function buildSankeySheet(tData) {
    var sh = getOrCreateTab("🌊 Sankey Flow");
    styleTitle(sh, "🌊 Top User Navigation Journey Paths", 6, C.c);
    if (!tData || tData.length < 2) return;
    var sidC = tData[0].indexOf("Session ID"), pC = tData[0].indexOf("Page Path"), tsC = tData[0].indexOf("Timestamp");
    var sesh = {}; for (var i = 1; i < tData.length; i++) {
        var sid = tData[i][sidC]; if (sid) { if (!sesh[sid]) sesh[sid] = []; sesh[sid].push({ p: tData[i][pC] || "/", ts: tData[i][tsC] }); }
    }
    var flows = {}; Object.keys(sesh).forEach(function(s) {
        var p = sesh[s].sort(function(a,b){return new Date(a.ts)-new Date(b.ts)});
        for (var j=0; j<p.length-1; j++) { if(p[j].p !== p[j+1].p) { var f = p[j].p + " → " + p[j+1].p; flows[f] = (flows[f]||0)+1; } }
    });
    var arr = Object.keys(flows).map(function(k){return [k, flows[k]]}).sort(function(a,b){return b[1]-a[1]}).slice(0, 15);
    sh.getRange(4, 1, 1, 2).setValues([["Navigation Transition Flow", "Flow Count"]]).setBackground(C.c).setFontColor(C.w);
    if (arr.length > 0) {
        sh.getRange(5, 1, arr.length, 2).setValues(arr).setBackground(C.r1);
        // Apps Script charts have no native Sankey type — a ranked bar chart is the closest real-data visualization of flow volume
        try {
            var flowChart = sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(4, 1, arr.length + 1, 2))
                .setPosition(4, 4, 0, 0).setOption("title", "Top Navigation Transitions").setOption("legend", "none")
                .setOption("colors", [C.c]).setOption("width", 480).setOption("height", 320).build();
            sh.insertChart(flowChart);
        } catch (e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 12: BROKEN LINK QA
// ══════════════════════════════════════════════════════════════════════════════
function buildBrokenLinkSheet() {
    var sh = getOrCreateTab("🤖 Broken Link QA");
    styleTitle(sh, "🤖 Automated Endpoint Audit for Profit Machines", 5, C.re);
    sh.getRange(3, 1, 1, 3).setValues([["URL Endpoint", "Status", "Latency"]]).setBackground(C.re).setFontColor(C.w);
    if (!SITE_BASE_URL || SITE_BASE_URL.trim() === "") {
        sh.getRange(4, 1, 1, 3).setValues([["[Pending Deployment]", "Awaiting Production Website URL (Set in SITE_BASE_URL)", "-"]]).setBackground(C.r1).setFontColor(C.m);
        return;
    }
    var paths = ["/", "/solutions", "/offerings", "/industries", "/outcomes", "/company", "/resources", "/contact", "/book-consultation"];
    paths.forEach(function(p, i) {
        var url = SITE_BASE_URL + p, st = "🔴 Failed", t = 0;
        try { 
            var start = Date.now(); 
            var res = UrlFetchApp.fetch(url, {muteHttpExceptions:true}); 
            st = res.getResponseCode() === 200 ? "✅ OK (200)" : res.getResponseCode(); 
            t = Date.now()-start; 
        } catch(e) {
            st = "🔴 Failed: " + e.toString();
        }
        sh.getRange(4+i, 1, 1, 3).setValues([[url, st, t+"ms"]]).setBackground(C.r1);
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 13: CO-OCCURRENCE MATRIX
// ══════════════════════════════════════════════════════════════════════════════
function buildCoOccurrenceMatrix(tData, eData) {
    var sh = getOrCreateTab("🔀 Co-Occurrence");
    styleTitle(sh, "🔀 Solution & Page Interconnectivity Matrix", 15, C.pu);
    if (!tData || tData.length < 2) return;
    var tHead = tData[0], sCol = tHead.indexOf("Session ID"), pCol = tHead.indexOf("Page Path");
    
    var sessionPages = {}; var pageCounts = {};
    for (var i = 1; i < tData.length; i++) { 
        var s = tData[i][sCol], p = tData[i][pCol]; if (!s || !p) continue;
        if (!sessionPages[s]) sessionPages[s] = new Set(); sessionPages[s].add(p);
    }
    Object.keys(sessionPages).forEach(function (s) { sessionPages[s].forEach(function (p) { pageCounts[p] = (pageCounts[p] || 0) + 1; }); });
    var topPages = Object.keys(pageCounts).sort(function (a, b) { return pageCounts[b] - pageCounts[a] }).slice(0, 10);
    if (topPages.length === 0) return;

    var matrixCount = {};
    topPages.forEach(function (p1) { matrixCount[p1] = {}; topPages.forEach(function (p2) { matrixCount[p1][p2] = 0; }); });
    Object.keys(sessionPages).forEach(function (sid) {
        var pgs = Array.from(sessionPages[sid]);
        for (var i = 0; i < pgs.length; i++) {
            if (!matrixCount[pgs[i]]) continue;
            for (var j = 0; j < pgs.length; j++) { if (matrixCount[pgs[i]][pgs[j]] !== undefined) matrixCount[pgs[i]][pgs[j]]++; }
        }
    });

    sh.getRange(4, 2, 1, topPages.length).setValues([topPages]).setBackground(C.p).setFontWeight("bold");
    var maxCount = 0;
    for (var r = 0; r < topPages.length; r++) {
        sh.getRange(5 + r, 1).setValue(topPages[r]).setBackground(C.p).setFontWeight("bold");
        for (var c = 0; c < topPages.length; c++) {
            var count = matrixCount[topPages[r]][topPages[c]];
            sh.getRange(5 + r, 2 + c).setValue(count || "-").setHorizontalAlignment("center");
            if (count > maxCount) maxCount = count;
        }
    }
    // Color intensity mirrors real interconnectivity counts so the matrix reads as a heatmap, not just numbers
    var matrixRange = sh.getRange(5, 2, topPages.length, topPages.length);
    var matrixRule = SpreadsheetApp.newConditionalFormatRule()
        .setGradientMaxpoint(C.pu)
        .setGradientMidpointWithValue("#ede9fe", SpreadsheetApp.InterpolationType.NUMBER, String(Math.max(1, Math.round(maxCount / 2))))
        .setGradientMinpoint("#ffffff")
        .setRanges([matrixRange])
        .build();
    sh.setConditionalFormatRules([matrixRule]);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 14: FUNNEL DROP-OFF
// ══════════════════════════════════════════════════════════════════════════════
function buildFunnelDropOffSheet(tData, db) {
    var sh = getOrCreateTab("🔻 Funnel Drops");
    styleTitle(sh, "🔻 Multi-Stage Conversion Funnel (Intent to Diagnostic)", 6, C.o);
    if (!tData || tData.length < 2) return;
    var uV = new Set(), sV = new Set(), cV = new Set();
    var pCol = tData[0].indexOf("Page Path"), ipCol = tData[0].indexOf("IP Address");
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], p = (tData[i][pCol] || "").toLowerCase(); if (!ip) continue;
        uV.add(ip);
        if (p.includes("solutions") || p.includes("use-cases")) sV.add(ip);
        if (p.includes("diagnostic") || p.includes("proposal") || p.includes("architect") || p.includes("contact")) cV.add(ip);
    }
    var rows = [["1. Total Global Visitors", uV.size], ["2. High Solution Intent", sV.size], ["3. Diagnostic / RFP Form Hit", cV.size]];
    sh.getRange(4, 1, 3, 2).setValues(rows).setBackground(C.r1);
    try {
        sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(4,1,3,2)).setPosition(4, 4, 0, 0).build());
    } catch(e) {}
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 15: LEAD SCORING ENGINE
// ══════════════════════════════════════════════════════════════════════════════
function buildLeadScoringEngine(tData, eData) {
    var sh = getOrCreateTab("🎯 Lead Scoring");
    styleTitle(sh, "🎯 AI-Driven Predictive Lead Intent & Heat Engine", 8, C.re);
    if (!tData || tData.length < 2) return;

    var ipCol = tData[0].indexOf("IP Address"), pCol = tData[0].indexOf("Page Path"), sCol = tData[0].indexOf("Session ID");
    var eSess = (eData && eData.length > 0) ? eData[0].indexOf("Session ID") : -1;
    var eDur = (eData && eData.length > 0) ? eData[0].indexOf("Duration (sec)") : -1;

    var tTime = {};
    if (eSess > -1 && eDur > -1) {
        for (var i = 1; i < eData.length; i++) {
            var sessId = eData[i][eSess];
            var durVal = Number(eData[i][eDur]) || 0;
            if (sessId) tTime[sessId] = (tTime[sessId] || 0) + durVal;
        }
    }

    var leads = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], p = (tData[i][pCol] || "").toLowerCase(), s = tData[i][sCol]; if (!ip) continue;
        if (!leads[ip]) leads[ip] = { score: 0, hits: 0, time: 0, contact: false };
        leads[ip].hits++;
        if(s) leads[ip].time += (tTime[s] || 0);
        if(p.includes("diagnostic") || p.includes("proposal") || p.includes("architect") || p.includes("contact")) leads[ip].contact = true;
    }

    var printRows = Object.keys(leads).map(function(ip) {
        var l = leads[ip]; var score = 0; if (l.contact) score += 50; if (l.hits > 10) score += 20; if (l.time > 120) score += 30;
        var badge = score >= 80 ? "🔥 HOT PROSPECT" : score >= 50 ? "⭐ Verified Intent" : "Warm Lead";
        return [ip, score, badge, l.hits, l.time+"s", l.contact ? "YES" : "NO"];
    }).sort(function(a,b){ return b[1]-a[1]; });

    sh.getRange(4, 1, 1, 6).setValues([["IP Target", "Lead Score", "Classification", "Hits", "Dwell Time", "Conversion Form Visited"]]).setBackground(C.t).setFontColor(C.w);
    if (printRows.length > 0) sh.getRange(5, 1, Math.min(50, printRows.length), 6).setValues(printRows.slice(0, 50)).setBackground(C.r1);

    // Classification split computed from the same printRows badges (no fabricated buckets)
    var badgeCounts = {};
    printRows.forEach(function (r) { badgeCounts[r[2]] = (badgeCounts[r[2]] || 0) + 1; });
    var badgeArr = Object.keys(badgeCounts).map(function (k) { return [k, badgeCounts[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
    if (badgeArr.length > 0) {
        var badgeStartRow = 8 + Math.min(50, printRows.length);
        sh.getRange(badgeStartRow, 1, 1, 2).setValues([["Classification", "Count"]]).setBackground(C.t).setFontColor(C.w);
        sh.getRange(badgeStartRow + 1, 1, badgeArr.length, 2).setValues(badgeArr).setBackground(C.r1);
        try {
            var badgePie = sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(badgeStartRow, 1, badgeArr.length + 1, 2))
                .setPosition(badgeStartRow, 4, 0, 0).setOption("title", "Lead Classification Split").setOption("pieHole", 0.4)
                .setOption("colors", [C.re, C.o, C.m]).setOption("width", 360).setOption("height", 240).build();
            sh.insertChart(badgePie);
        } catch (e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 16: LEADS & CONVERSIONS INTELLIGENCE
// ══════════════════════════════════════════════════════════════════════════════
// leadTabs: [{ name: "Contact Leads", data: [[headers...], [row...], ...] }, ...]
function buildLeadsConversionsIntelligence(leadTabs, formsData, tData) {
    var sh = getOrCreateTab("📋 Leads & Conversions");
    styleTitle(sh, "📋 Leads, Diagnostic Requests & Form Submissions Intelligence", 12, C.pu);
    setColWidths(sh, 1, [20, 200, 160, 40, 200, 160, 40, 200, 160, 40, 200]);

    // Flatten every lead tab into { tab, head, row } so stats can be computed generically,
    // since each per-form sheet has a different column layout.
    var allRows = [];
    (leadTabs || []).forEach(function (t) {
        var head = (t.data && t.data[0]) || [];
        var rows = (t.data && t.data.length > 1) ? t.data.slice(1) : [];
        rows.forEach(function (r) { allRows.push({ tab: t.name, head: head, row: r }); });
    });

    var formsRows = (formsData && formsData.length > 1) ? formsData.slice(1) : [];
    var fHead = formsData[0] || [];

    if (allRows.length === 0 && formsRows.length === 0) {
        sh.getRange(4, 2).setValue("Waiting for lead / form submission data in Sheet 1...").setFontColor(C.m);
        return;
    }

    // ── Mega stat row ──
    var totalVisits = (tData && tData.length > 1) ? tData.length - 1 : 0;
    var byTabCount = {};
    allRows.forEach(function (item) { byTabCount[item.tab] = (byTabCount[item.tab] || 0) + 1; });
    var totalLeads = allRows.length;
    var totalDiag = byTabCount["AI Diagnostic Leads"] || 0;
    var convRate = totalVisits > 0 ? ((totalLeads / totalVisits) * 100).toFixed(1) + "%" : "N/A";

    var drawMegaStat = function (row, col, title, value, color) {
        sh.getRange(row, col, 1, 1).setValue(title.toUpperCase()).setBackground(C.t).setFontColor(C.w).setFontWeight("bold").setHorizontalAlignment("center").setFontSize(9);
        sh.getRange(row + 1, col, 2, 1).merge().setValue(value).setBackground(color).setFontColor(C.w).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontSize(22);
    };
    drawMegaStat(4, 2, "📥 Total Leads (All Forms)", totalLeads, C.pu);
    drawMegaStat(4, 3, "🎯 Diagnostic Requests", totalDiag, C.re);
    drawMegaStat(4, 5, "📝 Form Submissions", formsRows.length, C.g);
    drawMegaStat(4, 6, "📈 Visit-to-Lead Rate", convRate, C.o);

    // ── Leads by Form Type (one bucket per dedicated sheet) ──
    var formTypeRows = Object.keys(byTabCount).map(function (k) { return [k, byTabCount[k]]; }).sort(function (a, b) { return b[1] - a[1]; });

    sh.getRange(9, 2, 1, 2).merge().setValue("📊 Leads by Form Type").setBackground(C.pu).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(10, 2, 1, 2).setValues([["Form Type", "Count"]]).setBackground(C.p).setFontWeight("bold");
    if (formTypeRows.length > 0) {
        sh.getRange(11, 2, formTypeRows.length, 2).setValues(formTypeRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(10, 2, formTypeRows.length + 1, 2)).setPosition(9, 4, 0, 0).setOption("pieHole", 0.5).setOption("title", "Form Type Split").setOption("width", 340).setOption("height", 260).build());
        } catch (e) {}
    }

    // ── Leads by Status (tabs without a Status column, e.g. Newsletter, are marked N/A) ──
    var byStatus = {};
    allRows.forEach(function (item) {
        var sIdx = item.head.indexOf("Status");
        var s = sIdx > -1 ? (item.row[sIdx] || "New") : "N/A";
        byStatus[s] = (byStatus[s] || 0) + 1;
    });
    var statusRows = Object.keys(byStatus).map(function (k) { return [k, byStatus[k]]; }).sort(function (a, b) { return b[1] - a[1]; });

    sh.getRange(9, 8, 1, 2).merge().setValue("🚦 Leads by Status").setBackground(C.re).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(10, 8, 1, 2).setValues([["Status", "Count"]]).setBackground(C.p).setFontWeight("bold");
    if (statusRows.length > 0) {
        sh.getRange(11, 8, statusRows.length, 2).setValues(statusRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(10, 8, statusRows.length + 1, 2))
                .setPosition(9, 11, 0, 0).setOption("title", "Status Split").setOption("pieHole", 0.4)
                .setOption("width", 320).setOption("height", 220).build());
        } catch (e) {}
    }

    // ── Lead Attribution by UTM Source ──
    var bySource = {};
    allRows.forEach(function (item) {
        var uIdx = item.head.indexOf("UTM Source");
        var s = (uIdx > -1 ? item.row[uIdx] : "") || "Direct / Organic";
        bySource[s] = (bySource[s] || 0) + 1;
    });
    var sourceRows = Object.keys(bySource).map(function (k) { return [k, bySource[k]]; }).sort(function (a, b) { return b[1] - a[1]; });

    sh.getRange(24, 2, 1, 2).merge().setValue("🌐 Lead Attribution by Source").setBackground(C.c).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(25, 2, 1, 2).setValues([["UTM Source", "Leads"]]).setBackground(C.p).setFontWeight("bold");
    if (sourceRows.length > 0) {
        sh.getRange(26, 2, sourceRows.length, 2).setValues(sourceRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(25, 2, sourceRows.length + 1, 2))
                .setPosition(24, 5, 0, 0).setOption("title", "Leads by Source").setOption("legend", "none")
                .setOption("colors", [C.c]).setOption("width", 340).setOption("height", 240).build());
        } catch (e) {}
    }

    // ── AI Diagnostic breakdowns: Industry & Company Size ──
    var diagOnly = allRows.filter(function (item) { return item.tab === "AI Diagnostic Leads"; });
    var byIndustry = {}, bySize = {};
    diagOnly.forEach(function (item) {
        var indIdx = item.head.indexOf("Industry"), sizeIdx = item.head.indexOf("Company Size");
        var ind = (indIdx > -1 ? item.row[indIdx] : "") || "Unspecified"; byIndustry[ind] = (byIndustry[ind] || 0) + 1;
        var sz = (sizeIdx > -1 ? item.row[sizeIdx] : "") || "Unspecified"; bySize[sz] = (bySize[sz] || 0) + 1;
    });
    var indRows = Object.keys(byIndustry).map(function (k) { return [k, byIndustry[k]]; }).sort(function (a, b) { return b[1] - a[1]; });
    var sizeRows = Object.keys(bySize).map(function (k) { return [k, bySize[k]]; }).sort(function (a, b) { return b[1] - a[1]; });

    sh.getRange(24, 8, 1, 2).merge().setValue("🏭 Diagnostic Leads by Industry").setBackground(C.o).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(25, 8, 1, 2).setValues([["Industry", "Count"]]).setBackground(C.p).setFontWeight("bold");
    if (indRows.length > 0) {
        sh.getRange(26, 8, indRows.length, 2).setValues(indRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(25, 8, indRows.length + 1, 2))
                .setPosition(24, 14, 0, 0).setOption("title", "Diagnostic Leads by Industry").setOption("legend", "none")
                .setOption("colors", [C.o]).setOption("width", 340).setOption("height", 240).build());
        } catch (e) {}
    }

    sh.getRange(24, 11, 1, 2).merge().setValue("🏢 Diagnostic Leads by Company Size").setBackground("#6366f1").setFontColor(C.w).setFontWeight("bold");
    sh.getRange(25, 11, 1, 2).setValues([["Company Size", "Count"]]).setBackground(C.p).setFontWeight("bold");
    if (sizeRows.length > 0) {
        sh.getRange(26, 11, sizeRows.length, 2).setValues(sizeRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(25, 11, sizeRows.length + 1, 2))
                .setPosition(24, 18, 0, 0).setOption("title", "Company Size Split").setOption("pieHole", 0.4)
                .setOption("colors", ["#6366f1", C.pu, C.c, C.g, C.o]).setOption("width", 320).setOption("height", 220).build());
        } catch (e) {}
    }

    // ── Leads Captured Per Day (Trend, all forms combined) ──
    var daily = {};
    allRows.forEach(function (item) {
        var tIdx = item.head.indexOf("Timestamp");
        var ts = tIdx > -1 ? item.row[tIdx] : null; if (!ts) return;
        var key = Utilities.formatDate(new Date(ts), Session.getScriptTimeZone(), "yyyy-MM-dd");
        daily[key] = (daily[key] || 0) + 1;
    });
    var dateKeys = Object.keys(daily).sort();
    var trendRows = dateKeys.map(function (d) { return [d, daily[d]]; });

    sh.getRange(40, 2, 1, 2).merge().setValue("📈 Leads Captured Per Day").setBackground(C.g).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(41, 2, 1, 2).setValues([["Date", "Leads"]]).setBackground(C.p).setFontWeight("bold");
    if (trendRows.length > 0) {
        sh.getRange(42, 2, trendRows.length, 2).setValues(trendRows).setBackground(C.r1);
        try {
            sh.insertChart(sh.newChart().setChartType(Charts.ChartType.LINE).addRange(sh.getRange(41, 2, trendRows.length + 1, 2)).setPosition(40, 4, 0, 0).setOption("width", 500).setOption("title", "Daily Lead Volume").build());
        } catch (e) {}
    }

    // ── Career Resume Submissions (Drive links captured via Form Submissions) ──
    var linkIdx = fHead.indexOf("Resume Drive Link"), nameIdx = fHead.indexOf("Name"), roleIdx = fHead.indexOf("Role"), fTsIdx = fHead.indexOf("Timestamp");
    var resumeRows = formsRows.filter(function (r) { return r[linkIdx]; }).map(function (r) {
        return [r[nameIdx] || "", r[roleIdx] || "", r[fTsIdx] || "", r[linkIdx]];
    });

    sh.getRange(58, 2, 1, 4).merge().setValue("📄 Career Resume Submissions (" + resumeRows.length + ")").setBackground(C.t).setFontColor(C.w).setFontWeight("bold");
    sh.getRange(59, 2, 1, 4).setValues([["Candidate", "Role", "Submitted", "Resume Link"]]).setBackground(C.p).setFontWeight("bold");
    if (resumeRows.length > 0) sh.getRange(60, 2, resumeRows.length, 4).setValues(resumeRows).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOM MENU SETUP
// ══════════════════════════════════════════════════════════════════════════════
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('🚀 PROFIT MACHINES ANALYTICS')
        .addItem('🔄 Refresh All 16 Dashboards', 'PULL_DATA_AND_BUILD_ALL_DASHBOARDS')
        .addToUi();
}

// ══════════════════════════════════════════════════════════════════════════════
// SECURE GET API ENDPOINT FOR WEBSITE /analytics CONSUMPTION
// ══════════════════════════════════════════════════════════════════════════════
function doGet(e) {
    try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var tabNames = [
            "🛰️ Mission Control",
            "🚦 Executive KPIs",
            "🗺️ Geo Map",
            "📏 Pareto (80-20)",
            "🕒 Daily Heatmap",
            "📈 Growth & Momentum",
            "👥 Visitor Ratio",
            "📱 Tech Profile",
            "🔗 Identity Linker",
            "📊 Std Deviation",
            "🌊 Sankey Flow",
            "🤖 Broken Link QA",
            "🔀 Co-Occurrence",
            "🔻 Funnel Drops",
            "🎯 Lead Scoring",
            "📋 Leads & Conversions"
        ];

        var exportData = {};
        tabNames.forEach(function(tab) {
            var sh = ss.getSheetByName(tab);
            if (sh && sh.getLastRow() > 0) {
                exportData[tab] = sh.getDataRange().getValues();
            }
        });

        return ContentService.createTextOutput(JSON.stringify({
            status: "success",
            timestamp: new Date().toISOString(),
            tabsFound: Object.keys(exportData).length,
            data: exportData
        })).setMimeType(ContentService.MimeType.JSON);
    } catch (err) {
        return ContentService.createTextOutput(JSON.stringify({
            status: "error",
            message: err.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

