import DA_SDK from 'https://da.live/nx/utils/sdk.js';

const COORDINATOR_ENDPOINT = 'https://<your-coordinator-host>/functions/prompt'; // TODO: replace with real URL

(async () => {
  const { context, token, actions } = await DA_SDK;

  // Button reference
  const btn = document.getElementById('give-prompt-btn');
  const statusEl = document.getElementById('status');

  // Simple helper
  const setStatus = (msg) => {
    statusEl.textContent = msg;
  };

  btn.addEventListener('click', async () => {
    const prompt = window.prompt('Enter your prompt for the Site Transfer Agent:');
    if (!prompt) return;

    setStatus('Sending …');
    try {
      const res = await fetch(COORDINATOR_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'x-api-key': '…'
        },
        body: JSON.stringify({ prompt, context }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      setStatus('Prompt sent successfully!');
      actions.closeLibrary();
    } catch (e) {
      console.error(e);
      setStatus('Failed to send prompt.');
    }
  });
})();
