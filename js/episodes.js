
// Fetch animeData.json and run the rest of the logic after loading
fetch('../animeData.json')
  .then(res => res.json())
  .then(animeList => {
    function getParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name);
    }

    const animeId = getParam('id');
    const seasonNum = parseInt(getParam('season'), 10) || 1;
    const episodeNum = parseInt(getParam('episode'), 10) || 1;

    const anime = animeList.find(a => a.id === animeId);
    if (!anime || !anime.seasons[seasonNum - 1]) {
        document.querySelector('.container').innerHTML = "<p>Anime or season not found.</p>";
        return;
    }
    document.getElementById('anime-title').textContent = anime.title;
    document.getElementById('season-title').textContent = anime.seasons[seasonNum - 1].title;

    // Dropdown for episodes
    const episodeList = document.getElementById('episode-list');
    const select = document.createElement('select');
    select.className = 'episode-dropdown';
    anime.seasons[seasonNum - 1].videos.forEach((video, idx) => {
        const ep = idx + 1;
        const option = document.createElement('option');
        option.value = ep;
        option.textContent = `Episode ${ep}`;
        if (ep === episodeNum) option.selected = true;
        select.appendChild(option);
    });
    episodeList.appendChild(select);

    select.addEventListener('change', function() {
        window.location.search = `?id=${animeId}&season=${seasonNum}&episode=${this.value}`;
    });

    // Remember language selection per anime in localStorage
    function getLangStorageKey(animeId) {
        return `animeLang_${animeId}`;
    }

    // Set radio from storage on load
    const savedLang = localStorage.getItem(getLangStorageKey(animeId));
    if (savedLang) {
        const radio = Array.from(document.getElementsByName('lang')).find(r => r.value === savedLang);
        if (radio) radio.checked = true;
    }

    // Save language selection on change
    const langRadios = document.getElementsByName('lang');
    langRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            localStorage.setItem(getLangStorageKey(animeId), this.value);
            showVideo();
        });
    });

    function getSelectedLang() {
        for (const radio of langRadios) {
            if (radio.checked) return radio.value;
        }
        return 'sub';
    }

    function showVideo() {
        const lang = getSelectedLang();
        const season = anime.seasons[seasonNum - 1];
        let videoUrl;
        if (lang === 'dub' && season.videosDub && season.videosDub[episodeNum - 1]) {
            videoUrl = season.videosDub[episodeNum - 1];
        } else if (lang === 'frsub' && season.videosFrSub && season.videosFrSub[episodeNum - 1]) {
            videoUrl = season.videosFrSub[episodeNum - 1];
        } else if (lang === 'frdub' && season.videosFrDub && season.videosFrDub[episodeNum - 1]) {
            videoUrl = season.videosFrDub[episodeNum - 1];
        } else {
            videoUrl = season.videos[episodeNum - 1]; // default to EN sub
        }
        const videoContainer = document.getElementById('video-container');
        if (videoUrl) {
            let embedUrl = videoUrl
                .replace(/([?&])autoplay=\d/, '$1')
                .replace(/([?&])mute=\d/, '$1')
                .replace(/[?&]$/, '');
            videoContainer.innerHTML =
                `<iframe src="${embedUrl}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        }
    }

    // Call showVideo initially and on language change
    showVideo();
    langRadios.forEach(radio => radio.addEventListener('change', showVideo));
    // Also call showVideo when episode changes
    select.addEventListener('change', function() {
        window.location.search = `?id=${animeId}&season=${seasonNum}&episode=${this.value}`;
        // Optionally: showVideo();
    });
  });

// Language toggle button logic
const siteLangToggle = document.getElementById('site-lang-toggle');
const siteLangKey = 'siteLanguage';

// Set initial button text and site language
function updateSiteLangUI() {
    const lang = localStorage.getItem(siteLangKey) || 'en';
    if (siteLangToggle) siteLangToggle.textContent = lang === 'fr' ? 'English' : 'Français';
    document.documentElement.lang = lang;

    // Translate static text
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.textContent = lang === 'fr' ? '← Retour à l’accueil' : '← Back to Home';
    }

    // Show/hide language radio options robustly
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? '' : 'none';
    });
    document.querySelectorAll('.lang-fr').forEach(el => {
        el.style.display = lang === 'fr' ? '' : 'none';
    });

    // Always select the correct radio and update video for both languages
    const animeId = new URLSearchParams(window.location.search).get('id');
    if (lang === 'fr') {
        const frRadio = document.getElementById('lang-frsub');
        if (frRadio) {
            frRadio.checked = true;
            localStorage.setItem(`animeLang_${animeId}`, 'frsub');
            showVideo();
        }
    } else if (lang === 'en') {
        const enRadio = document.getElementById('lang-sub');
        if (enRadio) {
            enRadio.checked = true;
            localStorage.setItem(`animeLang_${animeId}`, 'sub');
            showVideo();
        }
    }
}
updateSiteLangUI();

siteLangToggle.addEventListener('click', () => {
    const current = localStorage.getItem(siteLangKey) || 'en';
    const next = current === 'en' ? 'fr' : 'en';
    localStorage.setItem(siteLangKey, next);
    updateSiteLangUI();
    // Optionally, reload or update text on the page for full translation
});

