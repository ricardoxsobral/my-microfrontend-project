const { navigate, updateFavoritesCount } = require('../mf_drawer/src/index.js');

describe('Teste da função navigate', () => {
    it('Deve enviar mensagem para o frame pai', () => {
        const mockPostMessage = jest.fn();
        global.window = {
            parent: {
                postMessage: mockPostMessage
            }
        };

        const action = 'navigate_to_videos';
        navigate(action);

        expect(mockPostMessage).toHaveBeenCalledWith({ action }, '*');
    });
    
});

describe('Teste da função updateFavoritesCount', () => {
    beforeEach(() => {
        // Limpa o localStorage antes de cada teste
        localStorage.clear();
    });

    it('Deve atualizar o contador corretamente quando favoritos estão presentes', () => {
        // Mock do localStorage com favoritos
        const mockFavorites = [
            { videoId: '1', title: 'Video 1', thumbnail: 'url1' },
            { videoId: '2', title: 'Video 2', thumbnail: 'url2' }
        ];
        localStorage.setItem('favorites', JSON.stringify(mockFavorites));

        // Mock do DOM
        document.body.innerHTML = '<div id="favorites-count"></div>';

        // Chama a função para atualizar o contador
        updateFavoritesCount();

        // Verifica se o contador foi atualizado corretamente
        const favoritesCountElement = document.getElementById('favorites-count');
        expect(favoritesCountElement.textContent).toBe('2');
    });

    it('Deve atualizar o contador corretamente quando não há favoritos', () => {
        // Mock do localStorage sem favoritos
        localStorage.setItem('favorites', JSON.stringify([]));

        // Mock do DOM
        document.body.innerHTML = '<div id="favorites-count"></div>';

        // Chama a função para atualizar o contador
        updateFavoritesCount();

        // Verifica se o contador foi atualizado corretamente
        const favoritesCountElement = document.getElementById('favorites-count');
        expect(favoritesCountElement.textContent).toBe('0');
    });
});


