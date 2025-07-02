
// Fetch anime by ID from backend and increment view count
async function loadAnimePage() {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id') || 'frieren';
    // Fetch all anime and find the one with this ID
    const res = await fetch('https://my-anime-l74v.onrender.com/api/anime');
    const animeList = await res.json();
    const anime = animeList.find(a => a.id === animeId);
    if (anime) {
        document.getElementById('anime-img').src = anime.img;
        document.getElementById('anime-img').alt = anime.name;
        document.getElementById('anime-title').textContent = anime.name;
        document.getElementById('anime-desc').textContent = anime.desc;

        // Seasons
        const seasonsList = document.getElementById('seasons-list');
        anime.seasons.forEach((season, idx) => {
            const div = document.createElement('div');
            div.className = 'season';
            div.innerHTML = `<div class="season-title">${season.title}</div><div>${season.episodes} Episodes</div>`;
            div.style.cursor = "pointer";
            div.onclick = () => {
                window.location.href = `episodes.html?id=${animeId}&season=${idx + 1}`;
            };
            seasonsList.appendChild(div);
        });

        // Timer for ongoing anime
        const timerDiv = document.getElementById('timer');
        if (anime.ongoing && anime.nextEpisodeDate) {
            const nextEpisodeDate = new Date(anime.nextEpisodeDate);
            function updateTimer() {
                const now = new Date();
                const diff = nextEpisodeDate - now;
                if (diff > 0) {
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    timerDiv.textContent = `Next episode in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                } else {
                    timerDiv.textContent = "The next episode is now available!";
                }
            }
            updateTimer();
            setInterval(updateTimer, 1000);
        } else {
            timerDiv.style.display = "none";
        }

        // Increment view count (site-wide)
        fetch(`https://my-anime-l74v.onrender.com/api/anime/${animeId}/views`, { method: 'POST' });
    } else {
        document.querySelector('.anime-details').innerHTML = "<p>Anime not found.</p>";
    }
}

document.addEventListener('DOMContentLoaded', loadAnimePage);