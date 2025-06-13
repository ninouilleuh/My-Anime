// Dummy data for demonstration
const animeData = {
    frieren: {
        title: "Frieren: Beyond Journey’s End",
        seasons: [
            {
                title: "Season 1",
                episodes: 28,
                videos: [
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107257&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107259&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107260&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107261&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107877&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=108448&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=108870&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109054&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109177&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109338&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109526&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=110596&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=110599&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=112321&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=113203&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=113623&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=114697&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=115018&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=116998&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=117772&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=119410&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=119860&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=120034&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=120781&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=121529&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=121838&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=122211&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=122931&server=hd-1&type=sub"
                ],
                videosDub: [
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107257&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107259&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107260&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107261&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=107877&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=108448&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=108870&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109054&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109177&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109338&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=109526&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=110596&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=110599&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=112321&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=113203&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=113623&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=114697&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=115018&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=116998&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=117772&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=119410&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=119860&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=120034&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=120781&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=121529&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=121838&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=122211&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=frieren-beyond-journeys-end-18542&ep=122931&server=hd-1&type=dub"
                ],
                videosFrSub: [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28"
                ],
                videosFrDub: [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28"
                ]
            }
        ]
    },
    "solo-leveling": {
        title: "Solo Leveling",
        seasons: [
            {
                title: "Season 1",
                episodes: 12,
                videos: [
                    "https://gogoanime.com.by/streaming.php?id=solo-leveling-18718&ep=114721&server=hd-1&type=sub",
                    "https://gogoanime.com.by/streaming.php?id=solo-leveling-18718&ep=115276&server=hd-1&type=sub",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ],
                videosDub: [
                    "https://gogoanime.com.by/streaming.php?id=solo-leveling-18718&ep=114721&server=hd-1&type=dub",
                    "https://gogoanime.com.by/streaming.php?id=solo-leveling-18718&ep=115276&server=hd-1&type=dub",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ],
                videosFrSub: [
                    "https://video.sibnet.ru/shell.php?videoid=5389406",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ],
                videosFrDub: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                ]
            }
        ]
    }
    // Add more anime and seasons as needed
};

function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

const animeId = getParam('id');
const seasonNum = parseInt(getParam('season'), 10) || 1;
const episodeNum = parseInt(getParam('episode'), 10) || 1;

const anime = animeData[animeId];
if (!anime || !anime.seasons[seasonNum - 1]) {
    document.querySelector('.container').innerHTML = "<p>Anime or season not found.</p>";
} else {
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
}

// Language toggle button logic
const siteLangToggle = document.getElementById('site-lang-toggle');
const siteLangKey = 'siteLanguage';

// Set initial button text and site language
function updateSiteLangUI() {
    const lang = localStorage.getItem(siteLangKey) || 'en';
    siteLangToggle.textContent = lang === 'fr' ? 'English' : 'Français';
    document.documentElement.lang = lang;

    // Translate static text
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.textContent = lang === 'fr' ? '← Retour à l’accueil' : '← Back to Home';
    }

    // Show/hide language buttons
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'fr' ? 'none' : '';
    });
    document.querySelectorAll('.lang-fr').forEach(el => {
        el.style.display = lang === 'fr' ? '' : 'none';
    });

    // If switching to French and EN lang is selected, switch to FR sub by default
    if (lang === 'fr') {
        const frRadio = document.getElementById('lang-frsub');
        if (frRadio && !frRadio.checked && document.querySelector('.lang-radio.lang-en:checked')) {
            frRadio.checked = true;
            if (typeof showVideo === 'function') showVideo();
        }
    }
    // If switching to English and FR lang is selected, switch to EN sub by default
    if (lang === 'en') {
        const enRadio = document.getElementById('lang-sub');
        if (enRadio && !enRadio.checked && document.querySelector('.lang-radio.lang-fr:checked')) {
            enRadio.checked = true;
            if (typeof showVideo === 'function') showVideo();
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

