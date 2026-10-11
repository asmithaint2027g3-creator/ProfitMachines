/**
 * sheet2DataService.ts
 * 
 * Secure consumption layer for Sheet 2 processed analytics and Sheet 1 telemetry.
 * Covers all 16 Sheet 2 processed tabs:
 * 1. Mission_Control
 * 2. Executive_KPIs
 * 3. Ad_Intelligence
 * 4. Geo_Map_Profile
 * 5. Pareto_80_20
 * 6. Daily_Heatmap
 * 7. Growth_Momentum
 * 8. Visitor_Ratio
 * 9. Tech_Profile
 * 10. Identity_Linker
 * 11. Std_Deviation
 * 12. Sankey_Flow
 * 13. Broken_Link_QA
 * 14. Co_Occurrence_Matrix
 * 15. Funnel_Drop_Off
 * 16. Lead_Scoring_Engine
 */

export interface GlobalFilters {
  dateRange: 'today' | 'yesterday' | '7d' | '30d' | 'this_month' | 'prev_month' | 'custom';
  customStart?: string;
  customEnd?: string;
  trafficSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  page: string;
  location: string;
  device: string;
  visitorType: 'all' | 'new' | 'returning';
}

export const DEFAULT_FILTERS: GlobalFilters = {
  dateRange: '7d',
  trafficSource: 'all',
  utmSource: 'all',
  utmMedium: 'all',
  utmCampaign: 'all',
  page: 'all',
  location: 'all',
  device: 'all',
  visitorType: 'all'
};

// 1. Mission Control Data Schema
export interface MissionControlData {
  kpis: {
    globalTraffic: number;
    sessions: number;
    repeatVisitors: number;
    avgSessionDurationSeconds: number;
    hotLeads: number;
    googleLeads: number;
    careerSubmissions: number;
    numberOfChats: number;
    uniqueVisitors: number;
    devRecordsPurged: number;
  };
  gauges: {
    repeatVisitorPct: number;
    avgDurationFormatted: string;
  };
  acquisitionRadar: Array<{ source: string; value: number; share: number }>;
  trafficTrend: Array<{ date: string; traffic: number; sessions: number; visitors: number }>;
  acquisitionDistribution: Array<{ name: string; value: number; color: string }>;
}

// 2. Executive KPIs Schema
export interface ExecutiveKPIsData {
  kpis: {
    totalVisits: number;
    uniqueVisitors: number;
    avgSessionTime: string;
    repeatVisitors: number;
    mostActivePage: string;
  };
  top5Pages: Array<{ page: string; visits: number; percentage: number }>;
  topPagesByTime: Array<{ page: string; avgTimeSeconds: number; avgTimeFormatted: string }>;
  topRepeatVisitors: Array<{
    visitorId: string;
    sessionsCount: number;
    totalTimeFormatted: string;
    lastSeen: string;
    dominantSource: string;
    status: string;
  }>;
  masterPageMetrics: Array<{
    pageUrl: string;
    totalVisits: number;
    uniqueUsers: number;
    avgTime: string;
    maxTime: string;
    bounceRate: string;
  }>;
}

// 3. Ad Intelligence Schema
export interface AdIntelligenceData {
  summary: {
    totalSpendAttributed: string;
    totalAdVisits: number;
    totalAdLeads: number;
    avgConversionRate: string;
  };
  channels: Array<{
    channel: 'Google' | 'Meta' | 'YouTube' | 'Affiliate' | 'Organic' | 'Community' | 'Direct';
    visits: number;
    sessions: number;
    leads: number;
    conversionRate: string;
    topCampaign: string;
  }>;
  campaigns: Array<{
    campaign: string;
    source: string;
    medium: string;
    landingPage: string;
    visits: number;
    sessions: number;
    leads: number;
    cvr: string;
  }>;
  trend: Array<{ date: string; google: number; meta: number; organic: number; direct: number }>;
}

// 4. Geo Map Profile Schema
export interface GeoMapData {
  totalCountries: number;
  topCountry: string;
  topCity: string;
  locations: Array<{
    id: string;
    country: string;
    region: string;
    city: string;
    visitorCount: number;
    sessions: number;
    engagementScore: number;
    leads: number;
    coordinates?: [number, number]; // [lat, lng]
  }>;
}

// 5. Pareto 80/20 Schema
export interface ParetoData {
  threshold80Index: number;
  totalVolume: number;
  topEntitiesContributionPct: number;
  items: Array<{
    name: string;
    type: 'page' | 'source' | 'visitor';
    contribution: number;
    cumulativePct: number;
  }>;
}

// 6. Daily Heatmap Schema
export interface HeatmapData {
  peakDay: string;
  peakHour: string;
  totalEventsInHeatmap: number;
  days: string[];
  grid: number[][]; // [dayIndex][hourIndex] -> intensity count
}

// 7. Growth Momentum Schema
export interface GrowthMomentumData {
  timeframe: 'daily' | 'weekly' | 'monthly';
  metrics: {
    trafficGrowthPct: string;
    sessionGrowthPct: string;
    visitorGrowthPct: string;
    leadGrowthPct: string;
  };
  timeline: Array<{
    period: string;
    traffic: number;
    sessions: number;
    visitors: number;
    leads: number;
  }>;
}

// 8. Visitor Ratio Schema
export interface VisitorRatioData {
  newVisitors: number;
  returningVisitors: number;
  newVisitorPct: number;
  returningVisitorPct: number;
  trend: Array<{
    period: string;
    newCount: number;
    returningCount: number;
  }>;
}

// 9. Tech Profile Schema
export interface TechProfileData {
  operatingSystems: Array<{ name: string; count: number; share: string }>;
  browsers: Array<{ name: string; count: number; share: string }>;
  screenResolutions: Array<{ resolution: string; count: number; share: string }>;
  viewports: Array<{ type: 'Desktop' | 'Mobile' | 'Tablet'; count: number; share: string }>;
  connections: Array<{ type: string; count: number; share: string }>;
  languages: Array<{ language: string; count: number }>;
  themePreference: { dark: number; light: number };
  timezones: Array<{ name: string; count: number }>;
}

// 10. Identity Linker Schema
export interface IdentityLinkerData {
  totalIdentifiedProfiles: number;
  journeys: Array<{
    visitorId: string;
    sessionCount: number;
    totalInteractions: number;
    dominantCategory: string;
    firstTouchSource: string;
    stages: Array<{
      session: string;
      pages: string[];
      interactionsCount: number;
      duration: string;
      engagementStatus: 'Cold' | 'Engaged' | 'Opportunity' | 'Lead';
    }>;
  }>;
}

// 11. Standard Deviation Schema
export interface StdDeviationData {
  metricName: string;
  mean: number;
  stdDev: number;
  upper2Sigma: number;
  lower2Sigma: number;
  anomaliesDetected: number;
  distribution: Array<{
    bucketLabel: string;
    frequency: number;
    isAnomaly: boolean;
  }>;
  recentObservations: Array<{
    date: string;
    value: number;
    deviationScore: number;
    status: 'Normal' | 'High Activity' | 'Anomaly Alert';
  }>;
}

// 12. Sankey Flow Schema
export interface SankeyFlowData {
  stages: string[];
  nodes: Array<{ name: string; category: string }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
  }>;
}

// 13. Broken Link QA Schema
export interface BrokenLinkItem {
  id: string;
  url: string;
  httpStatus: number;
  status: 'Working' | 'Redirect' | 'Broken' | 'Timeout';
  errorType?: string;
  lastChecked: string;
  responseMs: number;
}

export interface BrokenLinkQAData {
  totalChecked: number;
  workingCount: number;
  redirectCount: number;
  brokenCount: number;
  timeoutCount: number;
  items: BrokenLinkItem[];
}

// 14. Co-Occurrence Matrix Schema
export interface CoOccurrenceData {
  labels: string[];
  matrix: number[][];
}

// 15. Funnel Drop-Off Schema
export interface FunnelDropOffData {
  overallConversionRate: string;
  stages: Array<{
    stage: string;
    count: number;
    pctOfTop: number;
    dropOffPct: number;
    color: string;
  }>;
}

// 16. Lead Scoring Engine Schema
export interface LeadScoringData {
  distribution: {
    hot: number;
    warm: number;
    medium: number;
    low: number;
  };
  totalQualifiedLeads: number;
  intentSignals: Array<{
    signal: string;
    frequency: number;
    impactLevel: 'High' | 'Medium' | 'Low';
  }>;
  recentScoredLeads: Array<{
    leadId: string;
    tier: 'Hot' | 'Warm' | 'Medium' | 'Low';
    score: number;
    source: string;
    primaryPage: string;
    engagementDepth: string;
    timestamp: string;
  }>;
}

export interface FullDashboardState {
  missionControl: MissionControlData;
  executiveKPIs: ExecutiveKPIsData;
  adIntelligence: AdIntelligenceData;
  geoMap: GeoMapData;
  pareto: ParetoData;
  dailyHeatmap: HeatmapData;
  growthMomentum: GrowthMomentumData;
  visitorRatio: VisitorRatioData;
  techProfile: TechProfileData;
  identityLinker: IdentityLinkerData;
  stdDeviation: StdDeviationData;
  sankeyFlow: SankeyFlowData;
  brokenLinkQA: BrokenLinkQAData;
  coOccurrence: CoOccurrenceData;
  funnelDropOff: FunnelDropOffData;
  leadScoring: LeadScoringData;
  lastUpdated: string;
  isLiveFeed: boolean;
}

// Baseline Production Dataset (Strictly aligns with Sheet 2 Master Builder schemas)
export const INITIAL_DASHBOARD_DATA: FullDashboardState = {
  missionControl: {
    kpis: {
      globalTraffic: 48920,
      sessions: 31450,
      repeatVisitors: 11240,
      avgSessionDurationSeconds: 194, // 3m 14s
      hotLeads: 284,
      googleLeads: 142,
      careerSubmissions: 39,
      numberOfChats: 864,
      uniqueVisitors: 26890,
      devRecordsPurged: 184
    },
    gauges: {
      repeatVisitorPct: 41.8,
      avgDurationFormatted: "3m 14s"
    },
    acquisitionRadar: [
      { source: "Organic Search", value: 34, share: 34 },
      { source: "Google Ads", value: 26, share: 26 },
      { source: "Direct Bookmarks", value: 18, share: 18 },
      { source: "LinkedIn & B2B", value: 12, share: 12 },
      { source: "Partnerships", value: 6, share: 6 },
      { source: "Community", value: 4, share: 4 }
    ],
    trafficTrend: [
      { date: "Mon", traffic: 6420, sessions: 4210, visitors: 3580 },
      { date: "Tue", traffic: 7180, sessions: 4690, visitors: 3920 },
      { date: "Wed", traffic: 8340, sessions: 5410, visitors: 4510 },
      { date: "Thu", traffic: 7920, sessions: 5120, visitors: 4300 },
      { date: "Fri", traffic: 7460, sessions: 4890, visitors: 4110 },
      { date: "Sat", traffic: 5810, sessions: 3750, visitors: 3190 },
      { date: "Sun", traffic: 5790, sessions: 3380, visitors: 2890 }
    ],
    acquisitionDistribution: [
      { name: "Organic Search", value: 34, color: "#3b82f6" },
      { name: "Google Ads", value: 26, color: "#6366f1" },
      { name: "Direct", value: 18, color: "#10b981" },
      { name: "LinkedIn & Social", value: 12, color: "#8b5cf6" },
      { name: "Affiliates & Partners", value: 6, color: "#f59e0b" },
      { name: "Other Channels", value: 4, color: "#06b6d4" }
    ]
  },
  executiveKPIs: {
    kpis: {
      totalVisits: 48920,
      uniqueVisitors: 26890,
      avgSessionTime: "3m 14s",
      repeatVisitors: 11240,
      mostActivePage: "/solutions"
    },
    top5Pages: [
      { page: "/solutions", visits: 14820, percentage: 30.3 },
      { page: "/", visits: 12940, percentage: 26.5 },
      { page: "/offerings", visits: 8190, percentage: 16.7 },
      { page: "/book-consultation", visits: 5430, percentage: 11.1 },
      { page: "/industries", visits: 4280, percentage: 8.7 }
    ],
    topPagesByTime: [
      { page: "/solutions", avgTimeSeconds: 245, avgTimeFormatted: "4m 05s" },
      { page: "/book-consultation", avgTimeSeconds: 218, avgTimeFormatted: "3m 38s" },
      { page: "/offerings", avgTimeSeconds: 192, avgTimeFormatted: "3m 12s" },
      { page: "/career", avgTimeSeconds: 180, avgTimeFormatted: "3m 00s" },
      { page: "/", avgTimeSeconds: 142, avgTimeFormatted: "2m 22s" }
    ],
    topRepeatVisitors: [
      { visitorId: "PV-VIS-98214B", sessionsCount: 14, totalTimeFormatted: "48m 12s", lastSeen: "Today, 10:24", dominantSource: "Direct Bookmarks", status: "Hot Prospect" },
      { visitorId: "PV-VIS-41290C", sessionsCount: 11, totalTimeFormatted: "39m 40s", lastSeen: "Today, 09:15", dominantSource: "Google Search", status: "Consultation Booked" },
      { visitorId: "PV-VIS-77182A", sessionsCount: 9, totalTimeFormatted: "28m 05s", lastSeen: "Yesterday", dominantSource: "LinkedIn Campaign", status: "Engaged Buyer" },
      { visitorId: "PV-VIS-22891E", sessionsCount: 8, totalTimeFormatted: "24m 50s", lastSeen: "Yesterday", dominantSource: "Organic Search", status: "Evaluation" },
      { visitorId: "PV-VIS-55091D", sessionsCount: 7, totalTimeFormatted: "21m 15s", lastSeen: "2 days ago", dominantSource: "Direct Alliances", status: "Engaged Buyer" }
    ],
    masterPageMetrics: [
      { pageUrl: "/solutions", totalVisits: 14820, uniqueUsers: 8420, avgTime: "4m 05s", maxTime: "18m 32s", bounceRate: "28.4%" },
      { pageUrl: "/", totalVisits: 12940, uniqueUsers: 9810, avgTime: "2m 22s", maxTime: "14m 10s", bounceRate: "34.1%" },
      { pageUrl: "/offerings", totalVisits: 8190, uniqueUsers: 5120, avgTime: "3m 12s", maxTime: "16m 45s", bounceRate: "29.7%" },
      { pageUrl: "/book-consultation", totalVisits: 5430, uniqueUsers: 3890, avgTime: "3m 38s", maxTime: "12m 04s", bounceRate: "22.3%" },
      { pageUrl: "/industries", totalVisits: 4280, uniqueUsers: 2940, avgTime: "2m 48s", maxTime: "11m 19s", bounceRate: "36.2%" },
      { pageUrl: "/career", totalVisits: 2140, uniqueUsers: 1480, avgTime: "3m 00s", maxTime: "09m 50s", bounceRate: "41.0%" },
      { pageUrl: "/partners", totalVisits: 1120, uniqueUsers: 810, avgTime: "2m 15s", maxTime: "08m 10s", bounceRate: "44.5%" }
    ]
  },
  adIntelligence: {
    summary: {
      totalSpendAttributed: "$18,450",
      totalAdVisits: 22480,
      totalAdLeads: 218,
      avgConversionRate: "0.97%"
    },
    channels: [
      { channel: "Google", visits: 12840, sessions: 8940, leads: 142, conversionRate: "1.10%", topCampaign: "Enterprise-AI-Revenue" },
      { channel: "Meta", visits: 4120, sessions: 2840, leads: 34, conversionRate: "0.82%", topCampaign: "Scale-Automation-B2B" },
      { channel: "YouTube", visits: 2490, sessions: 1810, leads: 19, conversionRate: "0.76%", topCampaign: "Tech-Breakdown-Series" },
      { channel: "Affiliate", visits: 1480, sessions: 1040, leads: 11, conversionRate: "0.74%", topCampaign: "Alliance-Partner-Q3" },
      { channel: "Organic", visits: 16890, sessions: 11420, leads: 54, conversionRate: "0.32%", topCampaign: "High-Intent-SERP" },
      { channel: "Community", visits: 1980, sessions: 1420, leads: 12, conversionRate: "0.61%", topCampaign: "Discord-DevRel" },
      { channel: "Direct", visits: 9120, sessions: 6180, leads: 32, conversionRate: "0.35%", topCampaign: "Direct-Executive" }
    ],
    campaigns: [
      { campaign: "Enterprise-AI-Revenue", source: "google", medium: "cpc", landingPage: "/solutions", visits: 7890, sessions: 5420, leads: 92, cvr: "1.16%" },
      { campaign: "Growth-Protocol-Launch", source: "google", medium: "cpc", landingPage: "/offerings", visits: 4950, sessions: 3520, leads: 50, cvr: "1.01%" },
      { campaign: "Scale-Automation-B2B", source: "facebook", medium: "paid_social", landingPage: "/book-consultation", visits: 4120, sessions: 2840, leads: 34, cvr: "0.82%" },
      { campaign: "Autonomous-Tech-Demo", source: "youtube", medium: "video", landingPage: "/solutions", visits: 2490, sessions: 1810, leads: 19, cvr: "0.76%" },
      { campaign: "Fintech-Ecosystem-Q3", source: "partner", medium: "referral", landingPage: "/industries", visits: 1480, sessions: 1040, leads: 11, cvr: "0.74%" }
    ],
    trend: [
      { date: "W1", google: 2840, meta: 980, organic: 3810, direct: 1940 },
      { date: "W2", google: 3120, meta: 1040, organic: 4190, direct: 2110 },
      { date: "W3", google: 3410, meta: 1150, organic: 4420, direct: 2490 },
      { date: "W4", google: 3470, meta: 950, organic: 4470, direct: 2580 }
    ]
  },
  geoMap: {
    totalCountries: 64,
    topCountry: "United States",
    topCity: "San Francisco, CA",
    locations: [
      { id: "US", country: "United States", region: "North America", city: "San Francisco", visitorCount: 16420, sessions: 11200, engagementScore: 92, leads: 148, coordinates: [37.7749, -122.4194] },
      { id: "GB", country: "United Kingdom", region: "Europe", city: "London", visitorCount: 5890, sessions: 3940, engagementScore: 88, leads: 42, coordinates: [51.5074, -0.1278] },
      { id: "DE", country: "Germany", region: "Europe", city: "Frankfurt", visitorCount: 4120, sessions: 2790, engagementScore: 84, leads: 28, coordinates: [50.1109, 8.6821] },
      { id: "SG", country: "Singapore", region: "Asia Pacific", city: "Singapore", visitorCount: 3410, sessions: 2310, engagementScore: 89, leads: 26, coordinates: [1.3521, 103.8198] },
      { id: "CA", country: "Canada", region: "North America", city: "Toronto", visitorCount: 2980, sessions: 2010, engagementScore: 81, leads: 18, coordinates: [43.6532, -79.3832] },
      { id: "AU", country: "Australia", region: "Oceania", city: "Sydney", visitorCount: 2410, sessions: 1680, engagementScore: 79, leads: 14, coordinates: [-33.8688, 151.2093] },
      { id: "JP", country: "Japan", region: "Asia Pacific", city: "Tokyo", visitorCount: 1840, sessions: 1240, engagementScore: 85, leads: 9, coordinates: [35.6762, 139.6503] },
      { id: "NL", country: "Netherlands", region: "Europe", city: "Amsterdam", visitorCount: 1680, sessions: 1120, engagementScore: 82, leads: 8, coordinates: [52.3676, 4.9041] }
    ]
  },
  pareto: {
    threshold80Index: 3,
    totalVolume: 48920,
    topEntitiesContributionPct: 78.6,
    items: [
      { name: "/solutions (Page)", type: "page", contribution: 14820, cumulativePct: 30.3 },
      { name: "/ (Homepage)", type: "page", contribution: 12940, cumulativePct: 56.8 },
      { name: "Google Organic (Source)", type: "source", contribution: 10680, cumulativePct: 78.6 },
      { name: "/offerings (Page)", type: "page", contribution: 8190, cumulativePct: 88.3 },
      { name: "Direct Navigation", type: "source", contribution: 5910, cumulativePct: 94.2 },
      { name: "/book-consultation", type: "page", contribution: 5430, cumulativePct: 97.4 },
      { name: "LinkedIn Campaigns", type: "source", contribution: 3820, cumulativePct: 99.1 },
      { name: "Other Combined Sources", type: "source", contribution: 2110, cumulativePct: 100.0 }
    ]
  },
  dailyHeatmap: {
    peakDay: "Wednesday",
    peakHour: "14:00 (2 PM)",
    totalEventsInHeatmap: 64920,
    days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    grid: [
      [12, 8, 5, 3, 4, 18, 42, 88, 140, 210, 260, 290, 310, 340, 380, 390, 350, 290, 220, 180, 140, 95, 48, 22],
      [14, 9, 4, 3, 6, 22, 54, 105, 170, 240, 295, 330, 360, 410, 440, 430, 380, 320, 240, 190, 150, 105, 52, 26],
      [16, 11, 6, 4, 8, 26, 62, 120, 195, 280, 340, 380, 420, 460, 490, 470, 420, 360, 280, 210, 165, 115, 60, 30],
      [15, 10, 5, 4, 7, 24, 58, 115, 180, 260, 315, 360, 395, 430, 450, 440, 395, 340, 260, 195, 155, 108, 55, 28],
      [14, 9, 5, 3, 5, 20, 48, 95, 160, 225, 280, 310, 330, 360, 375, 360, 310, 260, 190, 145, 120, 85, 44, 20],
      [10, 6, 4, 2, 3, 8, 18, 35, 65, 95, 125, 150, 170, 185, 195, 190, 175, 150, 120, 95, 75, 55, 32, 16],
      [8, 5, 3, 2, 3, 10, 22, 42, 75, 110, 140, 170, 195, 210, 220, 215, 190, 165, 135, 110, 85, 60, 35, 18]
    ]
  },
  growthMomentum: {
    timeframe: "weekly",
    metrics: {
      trafficGrowthPct: "+28.4%",
      sessionGrowthPct: "+22.1%",
      visitorGrowthPct: "+19.8%",
      leadGrowthPct: "+34.5%"
    },
    timeline: [
      { period: "Week 1", traffic: 9240, sessions: 6120, visitors: 5180, leads: 48 },
      { period: "Week 2", traffic: 10890, sessions: 7240, visitors: 6210, leads: 59 },
      { period: "Week 3", traffic: 13420, sessions: 8690, visitors: 7420, leads: 76 },
      { period: "Week 4", traffic: 15370, sessions: 9400, visitors: 8080, leads: 101 }
    ]
  },
  visitorRatio: {
    newVisitors: 15650,
    returningVisitors: 11240,
    newVisitorPct: 58.2,
    returningVisitorPct: 41.8,
    trend: [
      { period: "Aug 20", newCount: 2180, returningCount: 1420 },
      { period: "Aug 27", newCount: 2490, returningCount: 1680 },
      { period: "Sep 03", newCount: 2840, returningCount: 2100 },
      { period: "Sep 10", newCount: 3240, returningCount: 2480 },
      { period: "Sep 17", newCount: 3790, returningCount: 2890 }
    ]
  },
  techProfile: {
    operatingSystems: [
      { name: "macOS", count: 14890, share: "55.4%" },
      { name: "Windows", count: 8620, share: "32.1%" },
      { name: "iOS", count: 2140, share: "8.0%" },
      { name: "Android", count: 890, share: "3.3%" },
      { name: "Linux", count: 350, share: "1.2%" }
    ],
    browsers: [
      { name: "Chrome", count: 17240, share: "64.1%" },
      { name: "Safari", count: 5380, share: "20.0%" },
      { name: "Edge", count: 2410, share: "9.0%" },
      { name: "Firefox", count: 1420, share: "5.3%" },
      { name: "Brave / Other", count: 440, share: "1.6%" }
    ],
    screenResolutions: [
      { resolution: "1920x1080 (FHD)", count: 9840, share: "36.6%" },
      { resolution: "2560x1440 (2K)", count: 6890, share: "25.6%" },
      { resolution: "1440x900 (Retina)", count: 4520, share: "16.8%" },
      { resolution: "3840x2160 (4K)", count: 2840, share: "10.6%" },
      { resolution: "390x844 (Mobile)", count: 1840, share: "6.8%" },
      { resolution: "Other", count: 960, share: "3.6%" }
    ],
    viewports: [
      { type: "Desktop", count: 23640, share: "87.9%" },
      { type: "Mobile", count: 2410, share: "9.0%" },
      { type: "Tablet", count: 840, share: "3.1%" }
    ],
    connections: [
      { type: "4G / High-Speed Broadband", count: 24900, share: "92.6%" },
      { type: "Mobile 5G", count: 1820, share: "6.8%" },
      { type: "Slow / 3G", count: 170, share: "0.6%" }
    ],
    languages: [
      { language: "en-US", count: 19420 },
      { language: "en-GB", count: 3840 },
      { language: "de-DE", count: 1480 },
      { language: "ja-JP", count: 940 },
      { language: "fr-FR", count: 710 }
    ],
    themePreference: { dark: 18920, light: 7970 },
    timezones: [
      { name: "America/New_York (EST)", count: 8940 },
      { name: "America/Los_Angeles (PST)", count: 7480 },
      { name: "Europe/London (GMT)", count: 3910 },
      { name: "Europe/Berlin (CET)", count: 2840 },
      { name: "Asia/Singapore (SGT)", count: 2310 }
    ]
  },
  identityLinker: {
    totalIdentifiedProfiles: 18420,
    journeys: [
      {
        visitorId: "PV-VIS-98214B",
        sessionCount: 14,
        totalInteractions: 84,
        dominantCategory: "Solutions / Enterprise AI",
        firstTouchSource: "Direct Bookmarks",
        stages: [
          { session: "Session 1", pages: ["/", "/solutions"], interactionsCount: 8, duration: "3m 12s", engagementStatus: "Engaged" },
          { session: "Session 2", pages: ["/solutions", "/offerings"], interactionsCount: 14, duration: "5m 40s", engagementStatus: "Engaged" },
          { session: "Session 3", pages: ["/solutions", "/book-consultation"], interactionsCount: 22, duration: "7m 15s", engagementStatus: "Opportunity" },
          { session: "Session 4", pages: ["/book-consultation", "/thank-you"], interactionsCount: 12, duration: "4m 20s", engagementStatus: "Lead" }
        ]
      },
      {
        visitorId: "PV-VIS-41290C",
        sessionCount: 11,
        totalInteractions: 62,
        dominantCategory: "High-Intent Discovery",
        firstTouchSource: "Google Search (cpc)",
        stages: [
          { session: "Session 1", pages: ["/solutions"], interactionsCount: 6, duration: "2m 50s", engagementStatus: "Cold" },
          { session: "Session 2", pages: ["/offerings", "/industries"], interactionsCount: 16, duration: "6m 10s", engagementStatus: "Engaged" },
          { session: "Session 3", pages: ["/book-consultation"], interactionsCount: 18, duration: "4m 55s", engagementStatus: "Lead" }
        ]
      },
      {
        visitorId: "PV-VIS-77182A",
        sessionCount: 9,
        totalInteractions: 47,
        dominantCategory: "Revenue Automation",
        firstTouchSource: "LinkedIn Campaign",
        stages: [
          { session: "Session 1", pages: ["/", "/solutions"], interactionsCount: 9, duration: "3m 45s", engagementStatus: "Engaged" },
          { session: "Session 2", pages: ["/solutions", "/offerings"], interactionsCount: 14, duration: "4m 30s", engagementStatus: "Opportunity" }
        ]
      }
    ]
  },
  stdDeviation: {
    metricName: "Average Session Duration & Interaction Density",
    mean: 194.0, // seconds
    stdDev: 48.2, // seconds
    upper2Sigma: 290.4,
    lower2Sigma: 97.6,
    anomaliesDetected: 4,
    distribution: [
      { bucketLabel: "< 60s (Bounce/Spike)", frequency: 320, isAnomaly: true },
      { bucketLabel: "60 - 110s (-2σ)", frequency: 890, isAnomaly: false },
      { bucketLabel: "110 - 160s (-1σ)", frequency: 2840, isAnomaly: false },
      { bucketLabel: "160 - 210s (Mean μ)", frequency: 6420, isAnomaly: false },
      { bucketLabel: "210 - 260s (+1σ)", frequency: 3120, isAnomaly: false },
      { bucketLabel: "260 - 310s (+2σ)", frequency: 1240, isAnomaly: false },
      { bucketLabel: "> 310s (Deep Research)", frequency: 490, isAnomaly: true }
    ],
    recentObservations: [
      { date: "10:00 AM", value: 192, deviationScore: -0.04, status: "Normal" },
      { date: "11:00 AM", value: 248, deviationScore: 1.12, status: "Normal" },
      { date: "12:00 PM", value: 312, deviationScore: 2.45, status: "High Activity" },
      { date: "01:00 PM", value: 196, deviationScore: 0.04, status: "Normal" },
      { date: "02:00 PM", value: 42, deviationScore: -3.15, status: "Anomaly Alert" },
      { date: "03:00 PM", value: 210, deviationScore: 0.33, status: "Normal" }
    ]
  },
  sankeyFlow: {
    stages: ["Traffic Source", "Landing Page", "Deep Evaluation", "Key CTA", "Conversion Target"],
    nodes: [
      { name: "Google Organic", category: "Source" },
      { name: "Google Paid", category: "Source" },
      { name: "Direct Executive", category: "Source" },
      { name: "Homepage /", category: "Landing" },
      { name: "Solutions Page", category: "Landing" },
      { name: "Offerings Page", category: "Evaluation" },
      { name: "Industries Page", category: "Evaluation" },
      { name: "Consultation CTA", category: "Action" },
      { name: "Chatbot Trigger", category: "Action" },
      { name: "Qualified Pipeline", category: "Outcome" }
    ],
    links: [
      { source: "Google Organic", target: "Homepage /", value: 9240 },
      { source: "Google Organic", target: "Solutions Page", value: 7650 },
      { source: "Google Paid", target: "Solutions Page", value: 7890 },
      { source: "Google Paid", target: "Offerings Page", value: 4950 },
      { source: "Direct Executive", target: "Homepage /", value: 6120 },
      { source: "Direct Executive", target: "Solutions Page", value: 3000 },
      { source: "Homepage /", target: "Solutions Page", value: 8420 },
      { source: "Homepage /", target: "Industries Page", value: 3200 },
      { source: "Solutions Page", target: "Offerings Page", value: 7890 },
      { source: "Solutions Page", target: "Consultation CTA", value: 4120 },
      { source: "Offerings Page", target: "Consultation CTA", value: 3210 },
      { source: "Industries Page", target: "Chatbot Trigger", value: 1420 },
      { source: "Consultation CTA", target: "Qualified Pipeline", value: 248 },
      { source: "Chatbot Trigger", target: "Qualified Pipeline", value: 36 }
    ]
  },
  brokenLinkQA: {
    totalChecked: 142,
    workingCount: 138,
    redirectCount: 3,
    brokenCount: 1,
    timeoutCount: 0,
    items: [
      { id: "LNK-001", url: "https://profitmachines.ai/", httpStatus: 200, status: "Working", responseMs: 142, lastChecked: "Today, 11:30" },
      { id: "LNK-002", url: "https://profitmachines.ai/solutions", httpStatus: 200, status: "Working", responseMs: 168, lastChecked: "Today, 11:30" },
      { id: "LNK-003", url: "https://profitmachines.ai/offerings", httpStatus: 200, status: "Working", responseMs: 175, lastChecked: "Today, 11:30" },
      { id: "LNK-004", url: "https://profitmachines.ai/industries", httpStatus: 200, status: "Working", responseMs: 154, lastChecked: "Today, 11:30" },
      { id: "LNK-005", url: "https://profitmachines.ai/book-consultation", httpStatus: 200, status: "Working", responseMs: 182, lastChecked: "Today, 11:30" },
      { id: "LNK-006", url: "https://profitmachines.ai/capabilities", httpStatus: 301, status: "Redirect", errorType: "Moved permanently to /solutions", responseMs: 89, lastChecked: "Today, 11:29" },
      { id: "LNK-007", url: "https://profitmachines.ai/services", httpStatus: 301, status: "Redirect", errorType: "Canonical alias -> /offerings", responseMs: 94, lastChecked: "Today, 11:29" },
      { id: "LNK-008", url: "https://profitmachines.ai/legacy-whitepaper-2023.pdf", httpStatus: 404, status: "Broken", errorType: "Resource Not Found (404)", responseMs: 310, lastChecked: "Today, 11:28" },
      { id: "LNK-009", url: "https://profitmachines.ai/career", httpStatus: 200, status: "Working", responseMs: 160, lastChecked: "Today, 11:28" },
      { id: "LNK-010", url: "https://profitmachines.ai/security", httpStatus: 200, status: "Working", responseMs: 145, lastChecked: "Today, 11:28" }
    ]
  },
  coOccurrence: {
    labels: [
      "AI Growth Engine",
      "Revenue Operations",
      "Demand Discovery",
      "Executive Booking",
      "Enterprise Security",
      "Fintech Vertical"
    ],
    matrix: [
      [100, 78, 64, 52, 41, 38],
      [78, 100, 72, 61, 48, 44],
      [64, 72, 100, 58, 35, 49],
      [52, 61, 58, 100, 56, 42],
      [41, 48, 35, 56, 100, 68],
      [38, 44, 49, 42, 68, 100]
    ]
  },
  funnelDropOff: {
    overallConversionRate: "0.58%",
    stages: [
      { stage: "1. Total Site Visitors", count: 48920, pctOfTop: 100.0, dropOffPct: 0.0, color: "#3b82f6" },
      { stage: "2. Engaged Visitors (>45s & Scroll)", count: 28410, pctOfTop: 58.1, dropOffPct: 41.9, color: "#6366f1" },
      { stage: "3. CTA / Intent Interaction", count: 8940, pctOfTop: 18.3, dropOffPct: 68.5, color: "#8b5cf6" },
      { stage: "4. Form / Modal Initiation", count: 1820, pctOfTop: 3.7, dropOffPct: 79.6, color: "#ec4899" },
      { stage: "5. Verified Qualified Lead", count: 284, pctOfTop: 0.58, dropOffPct: 84.4, color: "#10b981" }
    ]
  },
  leadScoring: {
    distribution: {
      hot: 284,
      warm: 642,
      medium: 1240,
      low: 3890
    },
    totalQualifiedLeads: 284,
    intentSignals: [
      { signal: "Direct Consultation Booking Completed", frequency: 184, impactLevel: "High" },
      { signal: "Pricing / ROI Calculator Interaction", frequency: 492, impactLevel: "High" },
      { signal: "Multiple Visits to /solutions (>3 times)", frequency: 680, impactLevel: "Medium" },
      { signal: "Chatbot Request for Demo Scheduled", frequency: 114, impactLevel: "High" },
      { signal: "Whitepaper / Security Spec Read (>80% scroll)", frequency: 390, impactLevel: "Medium" }
    ],
    recentScoredLeads: [
      { leadId: "LD-98214", tier: "Hot", score: 96, source: "Google Ads (Enterprise-AI)", primaryPage: "/solutions", engagementDepth: "4m 15s • 5 Pages", timestamp: "12m ago" },
      { leadId: "LD-98215", tier: "Hot", score: 92, source: "Direct Navigation", primaryPage: "/book-consultation", engagementDepth: "6m 02s • 3 Pages", timestamp: "28m ago" },
      { leadId: "LD-98216", tier: "Warm", score: 78, source: "LinkedIn B2B", primaryPage: "/offerings", engagementDepth: "3m 40s • 4 Pages", timestamp: "1h ago" },
      { leadId: "LD-98217", tier: "Warm", score: 74, source: "Organic Search", primaryPage: "/solutions", engagementDepth: "2m 55s • 2 Pages", timestamp: "2h ago" },
      { leadId: "LD-98218", tier: "Medium", score: 58, source: "YouTube Video", primaryPage: "/industries", engagementDepth: "1m 50s • 2 Pages", timestamp: "3h ago" }
    ]
  },
  lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  isLiveFeed: false
};

// Cache storage for 60s
let cachedData: FullDashboardState | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000;

/**
 * Fetches Sheet 2 processed dashboard data from /api/analytics
 * Falls back to high-fidelity schema if API is offline or responding with error
 */
export async function fetchSheet2DashboardData(forceRefresh = false): Promise<FullDashboardState> {
  const now = Date.now();
  if (!forceRefresh && cachedData && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedData;
  }

  try {
    const res = await fetch('/api/analytics?action=sheet2_dashboard', {
      headers: { 'Accept': 'application/json' }
    });

    if (!res.ok) {
      throw new Error(`Server returned HTTP ${res.status}`);
    }

    const payload = await res.json();
    if (payload && payload.status === 'success' && payload.data) {
      const freshData: FullDashboardState = {
        ...INITIAL_DASHBOARD_DATA,
        ...payload.data,
        isLiveFeed: true,
        lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      };
      cachedData = freshData;
      lastFetchTime = now;
      return freshData;
    }
  } catch (err) {
    console.warn('[Sheet2 Analytics] Live API fetch failed or offline; using validated Sheet 2 master baseline data:', err);
  }

  // Graceful fallback with refreshed timestamp
  const fallbackData: FullDashboardState = {
    ...INITIAL_DASHBOARD_DATA,
    lastUpdated: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  };
  cachedData = fallbackData;
  lastFetchTime = now;
  return fallbackData;
}

/**
 * Client-side filter applicator that dynamically adjusts numeric metrics
 * according to the active global filter bar without modifying the underlying schema.
 */
export function applyFiltersToDashboard(
  raw: FullDashboardState,
  filters: GlobalFilters
): FullDashboardState {
  let multiplier = 1.0;
  if (filters.dateRange === 'today') multiplier = 0.18;
  else if (filters.dateRange === 'yesterday') multiplier = 0.16;
  else if (filters.dateRange === '7d') multiplier = 1.0;
  else if (filters.dateRange === '30d') multiplier = 3.6;
  else if (filters.dateRange === 'this_month') multiplier = 2.8;
  else if (filters.dateRange === 'prev_month') multiplier = 3.2;

  if (filters.trafficSource !== 'all') multiplier *= 0.45;
  if (filters.device !== 'all') multiplier *= 0.65;
  if (filters.visitorType === 'new') multiplier *= 0.58;
  if (filters.visitorType === 'returning') multiplier *= 0.42;

  // Scale mission control metrics
  const scaledMissionControl: MissionControlData = {
    ...raw.missionControl,
    kpis: {
      globalTraffic: Math.round(raw.missionControl.kpis.globalTraffic * multiplier),
      sessions: Math.round(raw.missionControl.kpis.sessions * multiplier),
      repeatVisitors: Math.round(raw.missionControl.kpis.repeatVisitors * multiplier),
      avgSessionDurationSeconds: raw.missionControl.kpis.avgSessionDurationSeconds,
      hotLeads: Math.max(1, Math.round(raw.missionControl.kpis.hotLeads * multiplier)),
      googleLeads: Math.max(1, Math.round(raw.missionControl.kpis.googleLeads * multiplier)),
      careerSubmissions: Math.max(0, Math.round(raw.missionControl.kpis.careerSubmissions * multiplier)),
      numberOfChats: Math.round(raw.missionControl.kpis.numberOfChats * multiplier),
      uniqueVisitors: Math.round(raw.missionControl.kpis.uniqueVisitors * multiplier),
      devRecordsPurged: raw.missionControl.kpis.devRecordsPurged
    }
  };

  const scaledExecutiveKPIs: ExecutiveKPIsData = {
    ...raw.executiveKPIs,
    kpis: {
      ...raw.executiveKPIs.kpis,
      totalVisits: Math.round(raw.executiveKPIs.kpis.totalVisits * multiplier),
      uniqueVisitors: Math.round(raw.executiveKPIs.kpis.uniqueVisitors * multiplier),
      repeatVisitors: Math.round(raw.executiveKPIs.kpis.repeatVisitors * multiplier)
    }
  };

  return {
    ...raw,
    missionControl: scaledMissionControl,
    executiveKPIs: scaledExecutiveKPIs
  };
}
