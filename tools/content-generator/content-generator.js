/* eslint-disable import/no-unresolved */
import DA_SDK from 'https://da.live/nx/utils/sdk.js';

(async () => {
  const statusEl = document.getElementById('cg-status');
  const endpointInput = document.getElementById('cg-endpoint');
  const promptInput = document.getElementById('cg-prompt');
  const submitBtn = document.getElementById('cg-submit');

  // Default endpoint can be configured via env var injection in DA context
  // Fallback to localhost for local testing
  const DEFAULT_ENDPOINT = window.COORDINATOR_ENDPOINT || 'http://localhost:7071/api/webhook';
  endpointInput.value = DEFAULT_ENDPOINT;

  // Wait for DA SDK to be ready to leverage daFetch helper
  const { actions } = await DA_SDK;
  const { daFetch, closeLibrary } = actions;

  function setStatus(msg, success = false) {
    statusEl.textContent = msg;
    statusEl.style.color = success ? 'green' : 'red';
  }

  submitBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();
    if (!prompt) {
      setStatus('Please enter a prompt');
      return;
    }
    const url = endpointInput.value.trim();
    if (!url) {
      setStatus('Please provide coordinator endpoint URL');
      return;
    }

    setStatus('Sending…', true);
    try {
      const res = await daFetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} ${txt}`);
      }
      setStatus('Prompt sent successfully!', true);
      // Optionally close plugin UI
      closeLibrary();
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  });
})();
