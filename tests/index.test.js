const handlePostMessage = require('../src/index.js');

describe('Teste do event listener para postMessage', () => {
  let mockFrames;
  let mockEvent;

  beforeEach(() => {
    document.body.innerHTML = `
      <iframe id="frame1"></iframe>
      <iframe id="frame2"></iframe>
    `;

    mockFrames = [
      { contentWindow: { postMessage: jest.fn() } },
      { contentWindow: { postMessage: jest.fn() } }
    ];

    mockEvent = {
      data: { action: 'alguma_acao' },
      source: window
    };
  });

  test('Deve repassar a mensagem para todos os frames exceto a fonte original', () => {
    document.querySelectorAll('iframe').forEach((frame, index) => {
      frame.contentWindow = mockFrames[index].contentWindow;
    });

    handlePostMessage(mockEvent);


    mockFrames.forEach(frame => {
      expect(frame.contentWindow.postMessage).toHaveBeenCalledWith({ action: 'alguma_acao' }, '*');
    });
  });
});
