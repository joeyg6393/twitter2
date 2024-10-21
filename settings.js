document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    chrome.storage.sync.get(['email', 'licenseKey', 'openaiApiKey'], function(result) {
        document.getElementById('email').value = result.email || '';
        document.getElementById('license-key').value = result.licenseKey || '';
        document.getElementById('openai-api').value = result.openaiApiKey || '';
    });

    // Save settings
    document.getElementById('save-settings').addEventListener('click', function() {
        const email = document.getElementById('email').value;
        const licenseKey = document.getElementById('license-key').value;
        const openaiApiKey = document.getElementById('openai-api').value;

        chrome.storage.sync.set({
            email: email,
            licenseKey: licenseKey,
            openaiApiKey: openaiApiKey
        }, function() {
            alert('Settings saved successfully!');
        });
    });
});
