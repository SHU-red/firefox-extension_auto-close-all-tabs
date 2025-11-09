let timeout = 60;
let lastActivity = Date.now();
let intervalID;

const IDLE_QUERY_INTERVAL = 15; // The minimum allowed by the API

function handleIdle() {
  browser.tabs.query({}).then((tabs) => {
    const tabIds = tabs.map(tab => tab.id);
    if (tabIds.length > 0) {
      browser.tabs.create({ url: "about:blank" }).then(() => {
        browser.tabs.remove(tabIds);
      });
    }
  });
}

function checkIdle() {
  // We can only query the API every 15 seconds.
  // To avoid querying every second, we can check if it's time to query.
  // A simpler way is to just query, and the browser will enforce the limit,
  // but let's be good citizens. The core logic is to reset lastActivity
  // if the user was active in the last 15s.
  browser.idle.queryState(IDLE_QUERY_INTERVAL).then((state) => {
    if (state === 'active') {
      lastActivity = Date.now();
    }

    const idleSeconds = Math.floor((Date.now() - lastActivity) / 1000);
    const remaining = timeout - idleSeconds;

    if (remaining <= 0) {
      handleIdle();
      lastActivity = Date.now(); // Reset after closing
      return;
    }

    browser.browserAction.setBadgeText({ text: String(Math.max(0, remaining)) });
    browser.browserAction.setBadgeBackgroundColor({ color: '#000000' });
  });
}

function start() {
  if (intervalID) {
    clearInterval(intervalID);
  }

  browser.storage.local.get("timeout").then((result) => {
    // Enforce a minimum of 15 seconds for the timeout.
    timeout = Math.max(IDLE_QUERY_INTERVAL, result.timeout || 600);
    
    lastActivity = Date.now();
    intervalID = setInterval(checkIdle, 1000);
    checkIdle();
  });
}

browser.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.timeout) {
    start();
  }
});

start();
