// Anime data
const animeData = {
    "frieren": {
        title: "Frieren: Beyond Journey’s End",
        desc: "The adventure is over but life goes on for an elf mage just beginning to learn what living is all about. Elf mage Frieren and her courageous fellow adventurers have defeated the Demon King and brought peace to the land. But Frieren will long outlive the rest of her former party. How will she come to understand what life means to the people around her? Decades after their victory, the funeral of one her friends confronts Frieren with her own near immortality. Frieren sets out to fulfill the last wishes of her comrades and finds herself beginning a new adventure…",
        img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
        seasons: [
            { title: "Season 1", episodes: 28 },
            { title: "Season 2", episodes: 0, airing: true, nextEpisodeDate: "2026-01-01T00:00:00Z" }
        ],
        ongoing: true,
        nextEpisodeDate: "2026-01-01T00:00:00Z"
    },
    "solo-leveling": {
        title: "Solo Leveling",
        desc: "",
        img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
        seasons: [
            { title: "Season 1", episodes: 12 }
        ],
        ongoing: false
    },
    "sword-art-online": {
        title: "Sword Art Online",
        desc: "",
        img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11757-SxYDUzdr9rh2.jpg",
        seasons: [
            { title: "Season 1", episodes: 25 },
            { title: "Season 2", episodes: 24 }
        ],
        ongoing: false
    },
    "fullmetal-alchemist": {
        title: "Fullmetal Alchemist: Brotherhood",
        desc: "",
        img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg",
        seasons: [
            { title: "Season 1", episodes: 64 }
        ],
        ongoing: false
    },
    "death-note": {
        title: "Death Note",
        desc: "",
        img: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
        seasons: [
            { title: "Season 1", episodes: 37 }
        ],
        ongoing: false
    }
    // Add more anime here...
};

// Get anime id from URL
const params = new URLSearchParams(window.location.search);
const animeId = params.get('id') || 'frieren';
const anime = animeData[animeId];

// Fill content
if (anime) {
    document.getElementById('anime-img').src = anime.img;
    document.getElementById('anime-img').alt = anime.title;
    document.getElementById('anime-title').textContent = anime.title;
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
} else {
    document.querySelector('.anime-details').innerHTML = "<p>Anime not found.</p>";
}