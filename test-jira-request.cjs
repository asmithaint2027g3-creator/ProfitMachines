const fetch = require('node-fetch').default || global.fetch;

async function run() {
  const payload = {
    reportId: "profitmachines-jira-daily",
    period: "daily",
    reportName: "ProfitMachines Daily Performance Report",
    recipients: ["asmitha.int2027g3@gmail.com"],
    force: true
  };

  try {
    const res = await fetch("https://profit-machines-1.vercel.app/api/reports/trigger", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer profitmachines_secure_cron_2026"
      },
      body: JSON.stringify(payload)
    });

    console.log("STATUS:", res.status);
    const json = await res.json();
    console.log("RESPONSE:", JSON.stringify(json, null, 2));
  } catch (err) {
    console.error("ERROR:", err);
  }
}

run();
