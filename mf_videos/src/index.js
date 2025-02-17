async function searchVideos() {
    const query = document.getElementById('search-input').value;
    try {
        const response = await fetch(`http://localhost:3003/search?query=${query}`);
        const data = await response.json();
        const container = document.getElementById('videos-container');
        container.innerHTML = data.items.map(item => `
            <div class="video-item">
                <div>
                    <iframe src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
                </div>
                <span class="star" onclick="toggleFavorite('${item.id.videoId}', '${item.snippet.title}', '${item.snippet.thumbnails.medium.url}', this)">&#9733;</span>                    
            </div>
        `).join('');
        updateFavoriteStars();
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

function toggleFavorite(videoId, title, thumbnail, element) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const video = { videoId, title, thumbnail };
    const index = favorites.findIndex(fav => fav.videoId === videoId);

    if (index !== -1) {
        favorites.splice(index, 1);
        element.classList.remove('active');
    } else {
        favorites.push(video);
        element.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

function loadFavorites() {
    const container = document.getElementById('favorites-container');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    container.innerHTML = favorites.map(video => `
        <div class="video-item">
            <div>
                <iframe src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allowfullscreen></iframe>
            </div>
            <span class="star active" onclick="removeFavorite('${video.videoId}', this)">&#9733;</span>
        </div>
    `).join('');
}

function removeFavorite(videoId, element) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(video => video.videoId !== videoId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    loadFavorites();
    const videos = document.querySelectorAll('#videos-container .star');
    videos.forEach(star => {
        if (star.getAttribute('onclick').includes(videoId)) {
            star.classList.remove('active');
        }
    });
    updateFavoritesCount();
}

function updateFavoriteStars() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const videos = document.querySelectorAll('#videos-container .star');
    videos.forEach(star => {
        const videoId = star.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (favorites.some(fav => fav.videoId === videoId)) {
            star.classList.add('active');
        }
    });
}

window.addEventListener('message', event => {
    const { action } = event.data;
    console.log(`Received action: ${action}`);
    const videosSection = document.getElementById('videos-section');
    const favoritesSection = document.getElementById('favorites-section');

    if (action === 'videos') {
        videosSection.classList.add('active');
        favoritesSection.classList.remove('active');
    } else if (action === 'favorites') {
        favoritesSection.classList.add('active');
        videosSection.classList.remove('active');
        loadFavorites();
    }
});

// Inicializa a página com a seção de vídeos visível
document.getElementById('videos-section').classList.add('active');