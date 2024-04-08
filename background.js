// Listen for the extension installation
chrome.runtime.onInstalled.addListener(() => {
  // Set an alarm to trigger after 2 minutes (120000 milliseconds)
  chrome.alarms.create('openTabAlarm', { when: Date.now() + 1200000  });
});

// Listen for alarms
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'openTabAlarm') {
      openTabWithTimer();
      // Re-create the alarm to trigger again after 2 minutes
      chrome.alarms.create('openTabAlarm', { when: Date.now() + 1220000 });
  }
});

// Function to open a new tab with a timer and return to the original tab
function openTabWithTimer() {
  // Get the current active tab
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const originalTab = tabs[0];

      // Open the new tab
      chrome.tabs.create({url: chrome.runtime.getURL("timer.html")}, (tab) => {
          // Send a message to the new tab to start the countdown
          // chrome.tabs.sendMessage(tab.id, {action: "startCountdown"});

          // Listen for the tab to be closed
          chrome.tabs.onRemoved.addListener(function listener(tabId, removeInfo) {
              if (tabId === tab.id) {
                  // Remove the listener to prevent it from being called again
                  chrome.tabs.onRemoved.removeListener(listener);

                  // Return to the original tab
                  chrome.tabs.update(originalTab.id, {active: true});
              }
          });
      });
  });
}