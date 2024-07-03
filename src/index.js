window.addEventListener('message', event => {
    const { action } = event.data;
    console.log(`Received action: ${action}`);
    const frames = document.querySelectorAll('iframe');
    frames.forEach(frame => {
        if (frame.contentWindow !== event.source) {
            frame.contentWindow.postMessage({ action }, '*');
        }
    });
});