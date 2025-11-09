const timeoutInput = document.getElementById("timeout");
const saveButton = document.getElementById("save");

const MIN_TIMEOUT = 15;

function saveOptions(e) {
  e.preventDefault();
  let timeout = parseInt(timeoutInput.value, 10);
  if (isNaN(timeout) || timeout < MIN_TIMEOUT) {
    timeout = MIN_TIMEOUT;
  }
  timeoutInput.value = timeout; // Correct the input field if necessary
  browser.storage.local.set({
    timeout: timeout
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    timeoutInput.value = Math.max(MIN_TIMEOUT, result.timeout || 600);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("timeout");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
saveButton.addEventListener("click", saveOptions);
