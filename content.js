function addCommentButton() {
  const buttonContainer = document.createElement('div');
  buttonContainer.id = 'tweet-to-webhook-container';

  const button = document.createElement('button');
  button.textContent = 'Comment';
  button.id = 'tweet-to-webhook-button';
  button.addEventListener('click', sendTweetToWebhook);

  const dropdownButton = document.createElement('button');
  dropdownButton.textContent = '▼';
  dropdownButton.id = 'tweet-to-webhook-dropdown-button';
  dropdownButton.addEventListener('click', toggleDropdown);

  const dropdown = document.createElement('div');
  dropdown.id = 'tweet-to-webhook-dropdown';
  dropdown.className = 'dropdown-hidden';

  const settingsOption = document.createElement('a');
  settingsOption.textContent = 'Settings';
  settingsOption.href = '#';
  settingsOption.addEventListener('click', openSettings);

  const upgradeOption = document.createElement('a');
  upgradeOption.textContent = 'Upgrade';
  upgradeOption.href = 'https://example.com/upgrade';
  upgradeOption.target = '_blank';

  dropdown.appendChild(settingsOption);
  dropdown.appendChild(upgradeOption);

  buttonContainer.appendChild(button);
  buttonContainer.appendChild(dropdownButton);
  buttonContainer.appendChild(dropdown);

  document.body.appendChild(buttonContainer);
}

function toggleDropdown(event) {
  event.stopPropagation();
  const dropdown = document.getElementById('tweet-to-webhook-dropdown');
  dropdown.classList.toggle('dropdown-hidden');
}

function openSettings(event) {
  event.preventDefault();
  const settingsUrl = chrome.runtime.getURL('settings.html');
  window.open(settingsUrl, '_blank');
}

function createChatBubbles(response) {
  const container = document.createElement('div');
  container.id = 'chat-bubbles-container';
  
  const closeButton = document.createElement('button');
  closeButton.textContent = 'X';
  closeButton.className = 'close-button';
  closeButton.addEventListener('click', () => container.remove());
  container.appendChild(closeButton);
  
  const responses = JSON.parse(response);
  
  Object.values(responses).forEach((text) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    bubble.addEventListener('click', () => {
      copyToReplyField(text);
      container.remove();
    });
    container.appendChild(bubble);
  });
  
  document.body.appendChild(container);
}

function copyToReplyField(text) {
  const replyField = document.querySelector('[data-testid="tweetTextarea_0"]');
  if (replyField) {
    replyField.focus();
    document.execCommand('insertText', false, text);
  }
}

function sendTweetToWebhook() {
  const tweetText = document.querySelector('article[data-testid="tweet"] [data-testid="tweetText"]').textContent;
  chrome.runtime.sendMessage({action: "sendToWebhook", tweet: tweetText});
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "webhookResponse") {
    createChatBubbles(request.response);
  }
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('tweet-to-webhook-dropdown');
  const dropdownButton = document.getElementById('tweet-to-webhook-dropdown-button');
  if (dropdown && !dropdown.contains(event.target) && event.target !== dropdownButton) {
    dropdown.classList.add('dropdown-hidden');
  }
});

addCommentButton();
