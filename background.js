let timeout = 60;
let lastActivity = Date.now();
let intervalID;

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
  const idleSeconds = Math.floor((Date.now() - lastActivity) / 1000);
  const remaining = timeout - idleSeconds;

  if (remaining <= 0) {
    handleIdle();
    lastActivity = Date.now(); // Reset after closing
    return;
  }

  browser.browserAction.setBadgeText({ text: String(Math.max(0, remaining)) });
  browser.browserAction.setBadgeBackgroundColor({ color: '#000000' });
}

function resetActivity() {
  lastActivity = Date.now();
}

function start() {
  if (intervalID) {
    clearInterval(intervalID);
  }

  browser.storage.local.get("timeout").then((result) => {
    timeout = result.timeout || 600;
    
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

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "userActivity") {
    resetActivity();
  }
});

start();
