// Datos de ejemplo de videos
const mockVideos = [
    {
        id: 1,
        title: "Cómo crear una aplicación web moderna con React",
        channel: "DevTutorials",
        channelAvatar: "D",
        views: "234K",
        duration: "24:15",
        thumbnail: "https://via.placeholder.com/320x180/4ecdc4/ffffff?text=React+Tutorial",
        uploadTime: "hace 2 días"
    },
    {
        id: 2,
        title: "Los mejores trucos de CSS que debes conocer",
        channel: "DesignMaster",
        channelAvatar: "D",
        views: "156K",
        duration: "18:32",
        thumbnail: "https://via.placeholder.com/320x180/ff6b6b/ffffff?text=CSS+Tips",
        uploadTime: "hace 1 día"
    },
    {
        id: 3,
        title: "JavaScript ES2024: Nuevas características",
        channel: "JSExpert",
        channelAvatar: "J",
        views: "89K",
        duration: "15:47",
        thumbnail: "https://via.placeholder.com/320x180/45b7d1/ffffff?text=JavaScript",
        uploadTime: "hace 3 horas"
    },
    {
        id: 4,
        title: "Node.js y Express: API REST completa",
        channel: "BackendPro",
        channelAvatar: "B",
        views: "312K",
        duration: "45:23",
        thumbnail: "https://via.placeholder.com/320x180/96ceb4/ffffff?text=Node.js",
        uploadTime: "hace 1 semana"
    },
    {
        id: 5,
        title: "Diseño UI/UX: Principios fundamentales",
        channel: "UXDesigner",
        channelAvatar: "U",
        views: "198K",
        duration: "32:18",
        thumbnail: "https://via.placeholder.com/320x180/feca57/ffffff?text=UI%2FUX",
        uploadTime: "hace 4 días"
    },
    {
        id: 6,
        title: "MongoDB vs PostgreSQL: ¿Cuál elegir?",
        channel: "DatabaseGuru",
        channelAvatar: "D",
        views: "145K",
        duration: "28:09",
        thumbnail: "https://via.placeholder.com/320x180/ff9ff3/ffffff?text=Database",
        uploadTime: "hace 2 días"
    }
];

function loadVideos() {
    const container = document.getElementById('videos-container');
    if (!container) return;
    
    container.innerHTML = '';

    mockVideos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.style.animationDelay = `${index * 0.1}s`;

        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <span class="video-duration">${video.duration}</span>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <div class="channel-avatar">${video.channelAvatar}</div>
                    <div class="video-details">
                        <div class="channel-name">${video.channel}</div>
                        <div class="video-stats">${video.views} visualizaciones • ${video.uploadTime}</div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(videoCard);
    });
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

function showHome() {
    document.getElementById('content').innerHTML = `
        <div class="welcome-header">
            <h1 class="welcome-title">¡Bienvenido a NovaStream! 🚀</h1>
            <p class="welcome-subtitle">La plataforma de streaming de nueva generación</p>
        </div>
        <div class="videos-grid" id="videos-container"></div>
    `;
    loadVideos();
}

function showTrending() {
    document.getElementById('content').innerHTML = `
        <div class="welcome-header">
            <h1 class="welcome-title">🔥 Tendencias</h1>
            <p class="welcome-subtitle">Los videos más populares ahora mismo</p>
        </div>
        <div class="videos-grid" id="videos-container"></div>
    `;
    loadVideos();
}

function showSubscriptions() {
    document.getElementById('content').innerHTML = `
        <div class="welcome-header">
            <h1 class="welcome-title">📺 Suscripciones</h1>
            <p class="welcome-subtitle">Videos de tus canales favoritos</p>
        </div>
        <div class="videos-grid" id="videos-container"></div>
    `;
    loadVideos();
}

function showLibrary() {
    document.getElementById('content').innerHTML = `
        <div class="welcome-header">
            <h1 class="welcome-title">📚 Biblioteca</h1>
            <p class="welcome-subtitle">Tu contenido guardado y historial</p>
        </div>
        <div class="videos-grid" id="videos-container"></div>
    `;
    loadVideos();
}

function showChat() {
    document.getElementById('content').innerHTML = `
        <div class="welcome-header">
            <h1 class="welcome-title">💬 Chat</h1>
            <p class="welcome-subtitle">Mensajería en tiempo real</p>
        </div>
        <div style="text-align: center; padding: 40px;">
            <p style="color: #aaa; font-size: 18px;">El chat estará disponible cuando el backend esté conectado</p>
            <a href="../test-backend.html" style="color: #4ecdc4; text-decoration: none;">Probar conexión del backend</a>
        </div>
    `;
}

// Actualizar elementos activos del sidebar
document.addEventListener('DOMContentLoaded', function () {
    loadVideos();

    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
