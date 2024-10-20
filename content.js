function addCommentButton() {
    const button = document.createElement('button');
    button.textContent = 'Comment';
    button.id = 'tweet-to-webhook-button';
    button.addEventListener('click', sendTweetToWebhook);
    document.body.appendChild(button);
  }
  
  function sendTweetToWebhook() {
    const tweetText = document.querySelector('article[data-testid="tweet"] [data-testid="tweetText"]').textContent;
    chrome.runtime.sendMessage({action: "sendToWebhook", tweet: tweetText});
  }
  
  addCommentButton();