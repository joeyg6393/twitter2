function addCommentButton() {
  const button = document.createElement('button');
  button.textContent = 'Comment';
  button.id = 'tweet-to-webhook-button';
  button.addEventListener('click', sendTweetToWebhook);
  document.body.appendChild(button);
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

addCommentButton();
