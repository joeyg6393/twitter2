chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sendToWebhook") {
      fetch('https://hook.us1.make.com/r6lu2m4x285b1xom2srqofh4coe6guru', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({tweet: request.tweet}),
      })
      .then(response => response.json())
      .then(data => console.log('Webhook response:', data))
      .catch(error => console.error('Error:', error));
    }
  });