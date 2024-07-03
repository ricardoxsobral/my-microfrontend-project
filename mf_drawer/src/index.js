function navigate(action) {
    console.log(`Navigating to: ${action}`); // Log de depuração
    window.parent.postMessage({ action }, '*'); // Envia mensagem para o frame pai
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.getElementById('favorites-count').textContent = favorites.length;
}

// Atualiza o contador ao inicializar e sempre que houver mudança nos favoritos
updateFavoritesCount();
window.addEventListener('storage', updateFavoritesCount);