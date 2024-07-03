// Importando as funções que serão testadas
const { searchVideos, toggleFavorite, loadFavorites, removeFavorite, updateFavoriteStars } = require('../mf_videos/src/index.js');

// Função utilitária para simular o fetch
function mockFetch(data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data)
    })
  );
}

// Configuração global antes dos testes
beforeEach(() => {
  // Mock do localStorage
  const mockLocalStorage = {};
  global.localStorage = {
    getItem: (key) => mockLocalStorage[key] || null,
    setItem: (key, value) => { mockLocalStorage[key] = value.toString(); },
    clear: () => { Object.keys(mockLocalStorage).forEach(key => delete mockLocalStorage[key]); }
  };

  // Configurar o DOM necessário antes de cada teste
  document.body.innerHTML = `
    <input id="search-input" type="text">
    <div id="videos-container"></div>
    <div id="favorites-container"></div>
    <div id="videos-section" class="section"></div>
    <div id="favorites-section" class="section"></div>
  `;
});

// Testes para as funções individuais

test('Deve buscar vídeos corretamente', async () => {
  global.fetch = mockFetch({
    items: [
      { id: { videoId: '1' }, snippet: { title: 'Video 1', thumbnails: { medium: { url: 'url1' } } } },
      { id: { videoId: '2' }, snippet: { title: 'Video 2', thumbnails: { medium: { url: 'url2' } } } }
    ]
  });

  await searchVideos();

  const videosContainer = document.getElementById('videos-container');
  expect(videosContainer.innerHTML).toContain('Video 1');
  expect(videosContainer.innerHTML).toContain('Video 2');
});

test('Deve adicionar vídeo aos favoritos', () => {
  toggleFavorite('1', 'Video 1', 'url1');
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  expect(favorites).toEqual([{ videoId: '1', title: 'Video 1', thumbnail: 'url1' }]);
});

test('Deve remover vídeo dos favoritos', () => {
  localStorage.setItem('favorites', JSON.stringify([{ videoId: '1', title: 'Video 1', thumbnail: 'url1' }]));
  removeFavorite('1');
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  expect(favorites).toEqual([]);
});

test('Deve carregar favoritos do localStorage', () => {
  const mockFavorites = [
    { videoId: '1', title: 'Video 1', thumbnail: 'url1' },
    { videoId: '2', title: 'Video 2', thumbnail: 'url2' }
  ];
  localStorage.setItem('favorites', JSON.stringify(mockFavorites));

  loadFavorites();

  const favoritesContainer = document.getElementById('favorites-container');
  expect(favoritesContainer.innerHTML).toContain('Video 1');
  expect(favoritesContainer.innerHTML).toContain('Video 2');
});

test('Deve retornar um array vazio se não houver favoritos no localStorage', () => {
  localStorage.clear();
  const favorites = loadFavorites();
  expect(favorites).toEqual([]);
});

test('Deve atualizar as estrelas de favoritos na interface', () => {
  const mockFavorites = [
    { videoId: '1', title: 'Video 1', thumbnail: 'url1' }
  ];
  localStorage.setItem('favorites', JSON.stringify(mockFavorites));

  updateFavoriteStars();

  const star1 = document.querySelector('.star[data-video-id="1"]');
  const star2 = document.querySelector('.star[data-video-id="2"]');

  expect(star1.classList.contains('active')).toBe(true);
  expect(star2.classList.contains('active')).toBe(false);
});

test('Deve inicializar a página com a seção de vídeos visível', () => {
  const videosSection = document.getElementById('videos-section');
  expect(videosSection.classList.contains('active')).toBe(true);
});