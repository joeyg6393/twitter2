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
  
  const responses = JSON.parse(response);
  
  Object.values(responses).forEach((text) => {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    container.appendChild(bubble);
  });
  
  document.body.appendChild(container);
  
  setTimeout(() => {
    container.remove();
  }, 10000); // Remove bubbles after 10 seconds
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
