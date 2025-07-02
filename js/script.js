// --- Popular Anime Ranking ---
// --- Global View Count Helpers ---
async function getBackendView(animeId) {
    try {
        const res = await fetch(`https://my-anime-l74v.onrender.com/api/anime/${animeId}/views`);
        if (!res.ok) return 0;
        const data = await res.json();
        return data.views || 0;
    } catch {
        return 0;
    }
}
async function getPopularAnimeList(animeList, topN = 5) {
    // Fetch all view counts in parallel
    const animeWithViews = await Promise.all(animeList.map(async a => {
        const views = await getBackendView(a.id);
        return { ...a, views };
    }));
    return animeWithViews
        .sort((a, b) => b.views - a.views || a.name.localeCompare(b.name))
        .slice(0, topN);
}
async function renderPopularAnime(animeList) {
    const grid = document.getElementById('popular-anime-grid');
    if (!grid) return;
    const popular = await getPopularAnimeList(animeList, 5);
    grid.innerHTML = popular.map((anime, idx) => `
        <div class="anime-card" style="position:relative;">
            <a href="pages/anime.html?id=${anime.id}" class="popular-anime-link" data-anime-id="${anime.id}" style="display:block;position:relative;">
                <img src="${anime.img}" alt="${anime.name}">
                <div class="rank-bubble">${idx + 1}</div>
                <div class="views-bubble image-bubble">
                    <span style="font-size:1.13em;line-height:1;" id="views-count-${anime.id}">${anime.views}</span>
                    <span style="font-size:0.93em;opacity:0.85;">view${anime.views === 1 ? '' : 's'}</span>
                </div>
            </a>
            <div class="info">
                <div class="title" style="display:flex;align-items:center;gap:8px;">
                    <a href="pages/anime.html?id=${anime.id}" style="color:inherit;text-decoration:none;">${anime.name}</a>
                </div>
                ${idx === 0 ? '<div style="margin-top:8px;color:#facc15;font-size:1.1em;">★ Most Popular</div>' : ''}
            </div>
        </div>
    `).join('');
}

// --- Global Anime View Tracking ---
// Track view for any anime card click on the site (not just popular section)
// --- Global Anime View Tracking ---
// Track view for any anime card click on the site (not just popular section)
// --- Global Anime View Tracking ---
// Track view for any anime card click on the site (not just popular section)
let homepageAnimeList = [];
document.addEventListener('DOMContentLoaded', function animeViewGlobalHandler() {
    document.body.addEventListener('click', function(e) {
        // Only handle left-clicks with no modifier keys (to avoid ctrl+click, middle click, etc)
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
        let el = e.target;
        while (el && el !== document.body) {
            if (el.tagName === 'A' && el.href && el.href.includes('anime.html?id=')) {
                // No view increment here! Only update popular section if needed
                if (document.getElementById('popular-anime-grid')) {
                    setTimeout(() => renderPopularAnime(homepageAnimeList), 0);
                }
                break;
            }
            el = el.parentElement;
        }
    }, true);
});

// --- Main DOMContentLoaded Handler ---
document.addEventListener('DOMContentLoaded', function() {
    // Suggest Anime Modal/Form Logic
    var openBtn = document.getElementById('open-suggest-form');
    var form = document.getElementById('suggest-anime-form');
    var successMsg = document.getElementById('suggest-success');
    if (openBtn && form) {
        openBtn.addEventListener('click', function() {
            form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
            successMsg.style.display = 'none';
        });
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var animeName = document.getElementById('anime-name').value.trim();
            var animeDesc = document.getElementById('anime-desc').value.trim();
            if (!animeName) {
                document.getElementById('anime-name').focus();
                return;
            }
            fetch('https://my-anime-l74v.onrender.com/suggest-anime', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ animeName: animeName, animeDesc: animeDesc })
            })
            .then(function(response) {
                if (!response.ok) throw new Error('Failed to send suggestion.');
                return response.json();
            })
            .then(function(data) {
                successMsg.textContent = 'Thank you! Your suggestion has been sent.';
                successMsg.style.display = 'block';
                form.reset();
            })
            .catch(function(err) {
                successMsg.textContent = 'Sorry, there was a problem sending your suggestion.';
                successMsg.style.display = 'block';
            });
        });
    }

    // Fetch anime from backend and render sections
    fetch('https://my-anime-l74v.onrender.com/api/anime')
        .then(res => res.json())
        .then(animeList => {
            homepageAnimeList = animeList;
            // Carousel and Airing Soon
            const upcoming = animeList.filter(a => a.nextEpisodeDate).sort((a, b) =>
                new Date(a.nextEpisodeDate) - new Date(b.nextEpisodeDate)
            );
            const airingSoonGrid = document.getElementById('airing-soon-grid');
            const carouselSize = 3;
            const cardWidth = 320;
            const gap = 28;
            let carouselIndex = 0;
            let carouselDirection = 1; // 1 = right, -1 = left
            let lastCarouselInteraction = Date.now();
            let carouselAutoAdvance = true;
            let carouselAutoInterval = null;
            const carouselAutoDelay = 4000;

            // Render all cards ONCE
            airingSoonGrid.innerHTML = upcoming.map((anime) => {
                const date = new Date(anime.nextEpisodeDate);
                const dateStr = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                return `
                    <div class="anime-card">
                        <a href="pages/anime.html?id=${anime.id}">
                            ${anime.trailer
                                ? `<div class="trailer-frame-wrapper">
                                    <iframe src="${anime.trailer}" frameborder="0" allowfullscreen></iframe>
                                   </div>`
                                : `<img src="${anime.img}" alt="${anime.name}">`
                            }
                        </a>
                        <div class="info">
                            <div class="title"><a href="pages/anime.html?id=${anime.id}" style="color:inherit;text-decoration:none;">${anime.name}</a></div>
                            <div class="desc">Airs on: ${dateStr}</div>
                            <div class="countdown" id="countdown-${anime.id}"></div>
                        </div>
                    </div>
                `;
            }).join('');

            // Countdown logic for each anime
            upcoming.forEach(anime => {
                const countdownElem = document.getElementById(`countdown-${anime.id}`);
                if (!countdownElem) return;
                function updateCountdown() {
                    const now = new Date();
                    const target = new Date(anime.nextEpisodeDate);
                    const diff = target - now;
                    if (diff <= 0) {
                        countdownElem.textContent = "Now Airing!";
                        return;
                    }
                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((diff / (1000 * 60)) % 60);
                    const seconds = Math.floor((diff / 1000) % 60);
                    countdownElem.textContent =
                        `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
                }
                updateCountdown();
                setInterval(updateCountdown, 1000);
            });

            // Move carousel with smooth animation
            function moveCarousel() {
                const maxIndex = Math.max(0, upcoming.length - carouselSize);
                carouselIndex = Math.max(0, Math.min(carouselIndex, maxIndex));
                const offset = carouselIndex * (cardWidth + gap);
                airingSoonGrid.style.transform = `translateX(-${offset}px)`;
            }
            moveCarousel();

            // Carousel navigation
            document.getElementById('carousel-prev').onclick = function() {
                carouselIndex -= 1;
                moveCarousel();
                lastCarouselInteraction = Date.now();
            };
            document.getElementById('carousel-next').onclick = function() {
                carouselIndex += 1;
                moveCarousel();
                lastCarouselInteraction = Date.now();
            };

            // Auto-advance logic: bounce left/right
            function startCarouselAutoAdvance() {
                if (carouselAutoInterval) clearInterval(carouselAutoInterval);
                carouselAutoInterval = setInterval(() => {
                    const now = Date.now();
                    const videoFocused = document.activeElement && document.activeElement.tagName === "IFRAME";
                    const maxIndex = Math.max(0, upcoming.length - carouselSize);
                    if (
                        carouselAutoAdvance &&
                        now - lastCarouselInteraction > carouselAutoDelay &&
                        !videoFocused
                    ) {
                        carouselIndex += carouselDirection;
                        if (carouselIndex >= maxIndex) {
                            carouselIndex = maxIndex;
                            carouselDirection = -1;
                        } else if (carouselIndex <= 0) {
                            carouselIndex = 0;
                            carouselDirection = 1;
                        }
                        moveCarousel();
                    }
                }, carouselAutoDelay);
            }
            startCarouselAutoAdvance();

            // Pause auto-advance on interaction
            ['mouseenter', 'focusin', 'touchstart'].forEach(evt => {
                airingSoonGrid.addEventListener(evt, () => {
                    lastCarouselInteraction = Date.now();
                    carouselAutoAdvance = false;
                });
            });
            ['mouseleave', 'focusout', 'touchend'].forEach(evt => {
                airingSoonGrid.addEventListener(evt, () => {
                    lastCarouselInteraction = Date.now();
                    carouselAutoAdvance = true;
                });
            });

            // Also pause on carousel button click
            document.getElementById('carousel-prev').addEventListener('click', () => {
                lastCarouselInteraction = Date.now();
                carouselAutoAdvance = false;
                setTimeout(() => { carouselAutoAdvance = true; }, carouselAutoDelay * 2);
            });
            document.getElementById('carousel-next').addEventListener('click', () => {
                lastCarouselInteraction = Date.now();
                carouselAutoAdvance = false;
                setTimeout(() => { carouselAutoAdvance = true; }, carouselAutoDelay * 2);
            });

            // Render Popular Anime with up-to-date backend data
            renderPopularAnime(animeList);
        });
});