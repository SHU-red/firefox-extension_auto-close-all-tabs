let lastSent = 0;
const THROTTLE_INTERVAL = 3000; // 3 seconds

function reportActivity() {
  const now = Date.now();
  if (now - lastSent > THROTTLE_INTERVAL) {
    browser.runtime.sendMessage({ type: "userActivity" });
    lastSent = now;
  }
}

document.addEventListener("mousedown", reportActivity);
document.addEventListener("keydown", reportActivity);
document.addEventListener("scroll", reportActivity);
