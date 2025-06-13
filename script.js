const config = {
  series: [],
  movies: [],
  swipeThreshold: 100
};

// carrega os dados do data.js
if (window.data) {
  config.series = window.data.series || [];
  config.movies = window.data.movies || [];
}
document.addEventListener('DOMContentLoaded', () => {
  config.series = window.data.series;
  config.movies = window.data.movies;
  createCarousels();
  initialize();
});
                swipeThreshold: 100
            };

            let state = {
                mode: 'series',
                currentSeriesId: 0,
                currentItemType: null,
                carousels: {
                    A: {
                        currentSlide: 0,
                        isDragging: false,
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        touchCount: 0,
                        lastTouchTime: 0,
                        thumbnailWidth: 0,
                        thumbnailsVisible: 0
                    },
                    B: {
                        currentSlide: 0,
                        isDragging: false,
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        touchCount: 0,
                        lastTouchTime: 0,
                        thumbnailWidth: 0,
                        thumbnailsVisible: 0
                    },
                    C: {
                        currentSlide: 0,
                        isDragging: false,
                        startX: 0,
                        startY: 0,
                        currentX: 0,
                        currentY: 0,
                        touchCount: 0,
                        lastTouchTime: 0,
                        thumbnailWidth: 0,
                        thumbnailsVisible: 0
                    }
                },
                watchLaterList: []
            };

            let elements = {};

            function initialize() {
                elements.slidesWrapperA = document.getElementById('slidesWrapperA');
                elements.thumbnailsA = document.getElementById('thumbnailsA');
                elements.slidesWrapperB = document.getElementById('slidesWrapperB');
                elements.thumbnailsB = document.getElementById('thumbnailsB');
                elements.slidesWrapperC = document.getElementById('slidesWrapperC');
                elements.thumbnailsC = document.getElementById('thumbnailsC');
                elements.watchLaterContainer = document.getElementById('watchLaterList');
                elements.slideshowContainer = document.getElementById('slideshow-container');

                if (!elements.slidesWrapperA || !elements.thumbnailsA || !elements.slidesWrapperB || !elements.thumbnailsB || !elements.slidesWrapperC || !elements.thumbnailsC || !elements.watchLaterContainer || !elements.slideshowContainer) {
                    console.error('Elementos do carrossel não encontrados');
                    return;
                }

                createCarousels();
                updateThumbnailMetrics();
                setupEventListeners();
                setupMenuLinks();

                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(updateThumbnailMetrics, 100);
                });
            }

            function updateThumbnailMetrics() {
                if (state.mode === 'movie') return;
                ['A', 'B', 'C'].forEach(carousel => {
                    const thumbnail = elements[`thumbnails${carousel}`].querySelector('.thumbnail');
                    if (thumbnail) {
                        state.carousels[carousel].thumbnailWidth = thumbnail.offsetWidth + 12;
                        state.carousels[carousel].thumbnailsVisible = Math.floor(elements[`thumbnails${carousel}`].offsetWidth / state.carousels[carousel].thumbnailWidth);
                    }
                });
            }

            function createCarousels() {
                ['A', 'B', 'C'].forEach(carousel => {
                    const wrapper = elements[`slidesWrapper${carousel}`];
                    const thumbnails = elements[`thumbnails${carousel}`];
                    wrapper.innerHTML = state.mode === 'series' ? `<div class="swipe-indicator swipe-left">← Assistir agora (2 dedos)</div><div class="swipe-indicator swipe-right">Assistir depois (2 dedos) →</div>` : '';
                    wrapper.classList.toggle('movie-mode', state.mode === 'movie' && carousel === 'A');
                    elements.slideshowContainer.classList.toggle('movie-mode', state.mode === 'movie');

                    let items = [];
                    if (state.mode === 'series') {
                        if (carousel === 'A') {
                            items = [
                                config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                                
                            ].filter(Boolean);
                        } else if (carousel === 'B') {
                            items = [
                                config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 12")
                            ].filter(Boolean);
                        } else {
                            items = [
                                config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                                config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                            ].filter(Boolean);
                        }
                    } else {
                        if (carousel === 'A') {
                            items = config.series.filter(item => item.seriesId === state.currentSeriesId);
                        } else {
                            items = [];
                        }
                    }

                    if (state.mode === 'movie' && carousel !== 'A') {
                        wrapper.innerHTML = '';
                        thumbnails.innerHTML = '';
                        return;
                    }

                    items.forEach((item, index) => {
                        const slide = document.createElement('div');
                        slide.className = 'slide';
                        slide.dataset.index = index;
                        slide.dataset.carousel = carousel;
                        
                        slide.setAttribute('aria-label', `${item.episode}: ${item.title}`);
                        slide.innerHTML = `
                            <div class="slide-title">${item.title.toLowerCase()}</div>
                            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Imagem+Indisponível'">
                            <div class="slide-content">
                                <div class="slide-info">${item.episode}<br>${item.duration}</div>
                                <div class="slide-actions">
                                    <button class="action-button watch-now" aria-label="Assistir ${item.title} agora">▶ Assistir agora</button>
                                    <button class="action-button watch-later" aria-label="Adicionar ${item.title} a assistir depois">+ Assistir depois</button>
                                    <button class="action-button share-whatsapp" aria-label="Compartilhar ${item.title} no WhatsApp"><i class="fab fa-whatsapp"></i> Enviar</button>
                                </div>
                            </div>
                        `;
                        // Adiciona um event listener para redirecionar ao clicar no slide
                        slide.addEventListener('click', (e) => {
                            e.stopPropagation(); // Impede que o evento de clique se propague
                            if (item.link) {
                                window.open(item.link, '_blank');
                            } else {
                                showNotification('Link não disponível para este episódio tente mais tarde.');
                            }
                        });
                        wrapper.appendChild(slide);

                        if (state.mode === 'series' || carousel === 'A') {
                            const thumbnail = document.createElement('button');
                            thumbnail.className = 'thumbnail';
                            thumbnail.dataset.index = index;
                            thumbnail.dataset.carousel = carousel;
                            thumbnail.dataset.seriesId = item.seriesId;
                            thumbnail.setAttribute('aria-label', `Ir para episódio ${item.episode}`);
                            thumbnail.innerHTML = `
                                <img src="${item.image}" alt="Thumbnail ${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/140x110?text=Thumbnail'">
                                <div class="thumbnail-number">${item.episode}</div>
                            `;
                            thumbnail.onclick = () => {
                                loadSeries(item.seriesId); // Carrega o carrossel do anime clicado
                            };
                            thumbnails.appendChild(thumbnail);
                        }
                    });
                    updateSlides(carousel);
                    
// Adiciona clique nas miniaturas para navegação (corrige no modo 'movie')
const thumbs = elements[`thumbnails${carousel}`].querySelectorAll('.thumbnail');
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    const seriesId = parseInt(thumb.dataset.seriesId);

    if (!isNaN(seriesId) && carousel === 'A') {
      if (state.mode === 'series') {
        // 👉 Clicou no carrossel de animes → carrega episódios
        loadSeries(seriesId);
      } else if (state.mode === 'movie') {
        // 👉 Já está vendo episódios → troca o episódio
        state.carousels.A.currentSlide = index;
        updateSlides('A');
      }
    } else {
      // 👉 Carrosséis B e C funcionam normalmente
      state.carousels[carousel].currentSlide = index;
      updateSlides(carousel);
    }
  });
});
                });
            }

            function setupEventListeners() {
                ['A', 'B', 'C'].forEach(carousel => {
                    elements[`slidesWrapper${carousel}`].addEventListener('click', e => handleSlideClick(e, carousel));
                    elements[`slidesWrapper${carousel}`].addEventListener('touchstart', e => touchStart(e, carousel), { passive: true });
                    elements[`slidesWrapper${carousel}`].addEventListener('touchmove', e => touchMove(e, carousel), { passive: true });
                    elements[`slidesWrapper${carousel}`].addEventListener('touchend', e => touchEnd(e, carousel), { passive: true });
                    elements[`slidesWrapper${carousel}`].addEventListener('wheel', e => handleWheel(e, carousel), { passive: true });
                });

                elements.watchLaterContainer.addEventListener('click', handleWatchLaterClick);
                document.getElementById('home-icon').addEventListener('click', loadHomePage);
                document.getElementById('home-button').addEventListener('click', loadHomePage);
                document.addEventListener('keydown', handleKeyboardNavigation);
            }

            function setupMenuLinks() {
                document.querySelectorAll('[data-movie]').forEach(link => {
                    if (!link) return;
                    link.addEventListener('click', e => {
                        e.preventDefault();
                        const movieIndex = parseInt(link.dataset.movie);
                        loadMovie(movieIndex);
                        closeMainMenu();
                    });
                });

                document.querySelectorAll('[data-series]').forEach(link => {
                    if (!link) return;
                    link.addEventListener('click', e => {
                        e.preventDefault();
                        const seriesIndex = parseInt(link.dataset.series);
                        loadSeries(seriesIndex);
                        closeMainMenu();
                    });
                });
            }

            function closeMainMenu() {
                const mainMenu = document.getElementById('main-menu');
                const menuIcon = document.getElementById('menu-icon');
                if (mainMenu && menuIcon) {
                    mainMenu.classList.remove('open');
                    menuIcon.classList.remove('active');
                }
            }

            function loadHomePage() {
                state.mode = 'series';
                state.currentSeriesId = 0;
                state.currentItemType = null;
                ['A', 'B', 'C'].forEach(carousel => {
                    state.carousels[carousel].currentSlide = 0;
                });
                state.watchLaterList = [];
                ['A', 'B', 'C'].forEach(carousel => {
                    elements[`thumbnails${carousel}`].innerHTML = '';
                });
                createCarousels();
            }

            function loadMovie(index) {
                state.mode = 'movie';
                state.currentItemType = 'movie';
                state.carousels.A.currentSlide = index;
                state.watchLaterList = [];
                ['A', 'B', 'C'].forEach(carousel => {
                    elements[`thumbnails${carousel}`].innerHTML = '';
                });
                createCarousels();
            }

            function loadSeries(seriesId = 0) {
                state.mode = 'movie';
                state.currentItemType = 'series';
                state.currentSeriesId = seriesId;
                state.carousels.A.currentSlide = 0;
                ['A', 'B', 'C'].forEach(carousel => {
                    elements[`thumbnails${carousel}`].innerHTML = '';
                });
                createCarousels();
            }

            function handleSlideClick(e, carousel) {
                const target = e.target;
                const slide = target.closest('.slide');
                if (!slide || slide.dataset.carousel !== carousel) return;
                const index = parseInt(slide.dataset.index);
                e.stopPropagation();
                if (target.classList.contains('watch-now')) watchNow(index, carousel);
                else if (target.classList.contains('watch-later')) addToWatchLater(index, carousel);
                else if (target.classList.contains('share-whatsapp')) shareWhatsApp(index, carousel);
            }

            function handleWatchLaterClick(e) {
                const item = e.target.closest('.watch-later-item');
                if (!item) return;
                const index = parseInt(item.dataset.index);
                const items = state.currentItemType === 'movie' ? config.movies : config.series.filter(item => item.seriesId === state.currentSeriesId);
                const itemData = items[index];
                if (confirm(`Deseja remover "${itemData.title}" da lista "Assistir depois"?`)) {
                    state.watchLaterList = state.watchLaterList.filter(i => i !== index);
                    updateWatchLaterList();
                    showNotification(`"${itemData.title}" removido da lista "Assistir depois".`);
                }
            }

            function handleKeyboardNavigation(e) {
                if (state.mode === 'movie') return;
                ['A', 'B', 'C'].forEach(carousel => {
                    if (e.key === 'ArrowLeft') prevSlide(carousel);
                    else if (e.key === 'ArrowRight') nextSlide(carousel);
                    else if (e.key === 'Enter' && document.activeElement.classList.contains('thumbnail')) {
                        goToSlide(parseInt(document.activeElement.dataset.index), carousel);
                    }
                });
            }

            function handleWheel(e, carousel) {
                if (state.mode === 'movie') return;
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) return;
                e.preventDefault();
                if (e.deltaX > 0) nextSlide(carousel);
                else prevSlide(carousel);
            }

            function touchStart(e, carousel) {
                if (state.mode === 'movie') return;
                state.carousels[carousel].touchCount = e.touches.length;
                state.carousels[carousel].startX = e.touches[0].clientX;
                state.carousels[carousel].startY = e.touches[0].clientY;
                state.carousels[carousel].isDragging = true;
                state.carousels[carousel].lastTouchTime = Date.now();
                updateSwipeIndicators(carousel);
            }

            function touchMove(e, carousel) {
                if (state.mode === 'movie' || !state.carousels[carousel].isDragging) return;
                state.carousels[carousel].currentX = e.touches[0].clientX;
                state.carousels[carousel].currentY = e.touches[0].clientY;
                const deltaX = Math.abs(state.carousels[carousel].startX - state.carousels[carousel].currentX);
                const deltaY = Math.abs(state.carousels[carousel].startY - state.carousels[carousel].currentY);
                if (deltaY > deltaX) return;
                e.preventDefault();
                requestAnimationFrame(() => updateSwipeIndicators(carousel));
            }

            function touchEnd(e, carousel) {
                if (state.mode === 'movie' || !state.carousels[carousel].isDragging) return;
                const diffX = state.carousels[carousel].startX - state.carousels[carousel].currentX;
                const timeElapsed = Date.now() - state.carousels[carousel].lastTouchTime;
                if (Math.abs(diffX) > config.swipeThreshold && timeElapsed > 100) {
                    if (state.carousels[carousel].touchCount === 2) {
                        if (diffX > 0) {
                            addToWatchLater(state.carousels[carousel].currentSlide, carousel);
                            nextSlide(carousel);
                        } else {
                            watchNow(state.carousels[carousel].currentSlide, carousel);
                            prevSlide(carousel);
                        }
                    } else {
                        if (diffX > 0) nextSlide(carousel);
                        else prevSlide(carousel);
                    }
                }
                state.carousels[carousel].isDragging = false;
                state.carousels[carousel].startX = 0;
                state.carousels[carousel].startY = 0;
                state.carousels[carousel].currentX = 0;
                state.carousels[carousel].currentY = 0;
                state.carousels[carousel].touchCount = 0;
                updateSwipeIndicators(carousel);
            }

            function updateSwipeIndicators(carousel) {
                if (state.mode === 'movie') return;
                const indicators = elements[`slidesWrapper${carousel}`].querySelectorAll('.swipe-indicator');
                indicators.forEach(indicator => {
                    indicator.style.opacity = state.carousels[carousel].touchCount === 2 && state.carousels[carousel].isDragging ? '1' : '0';
                });
            }

            function updateSlides(carousel) {
                requestAnimationFrame(() => {
                    const slides = elements[`slidesWrapper${carousel}`].querySelectorAll('.slide');
                    const thumbnails = elements[`thumbnails${carousel}`].querySelectorAll('.thumbnail');
                    const items = state.mode === 'series' ? (
                        carousel === 'A' ? [
                            config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                        ].filter(Boolean) : carousel === 'B' ? [
                            config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 12")
                        ].filter(Boolean) : [
                            config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                            config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                        ].filter(Boolean)
                    ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                    const current = state.carousels[carousel].currentSlide;
                    slides.forEach((slide, i) => {
                        slide.classList.remove('active', 'prev', 'next');
                        if (i === current) slide.classList.add('active');
                        else if (state.mode === 'series') {
                            if (i === (current - 1 + items.length) % items.length) slide.classList.add('prev');
                            else if (i === (current + 1) % items.length) slide.classList.add('next');
                        }
                    });

                    thumbnails.forEach((thumbnail, i) => {
                        thumbnail.classList.toggle('active', i === current);
                    });

                    if ((state.mode === 'series' || carousel === 'A') && thumbnails.length) {
                        const offset = (current - Math.floor(state.carousels[carousel].thumbnailsVisible / 2)) * state.carousels[carousel].thumbnailWidth;
                        elements[`thumbnails${carousel}`].style.transform = `translateX(-${Math.max(0, offset)}px)`;
                    }
                });
            }

            function nextSlide(carousel) {
                const items = state.mode === 'series' ? (
                    carousel === 'A' ? [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                        
                    ].filter(Boolean) : carousel === 'B' ? [
                        config.series.find(item => item.seriesId === 11 && item.episode === "Ep. 12")
                    ].filter(Boolean) : [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean)
                ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                state.carousels[carousel].currentSlide = (state.carousels[carousel].currentSlide + 1) % items.length;
                updateSlides(carousel);
            }

            function prevSlide(carousel) {
                const items = state.mode === 'series' ? (
                    carousel === 'A' ? [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean) : carousel === 'B' ? [
                        config.series.find(item => item.seriesId === 11 && item.episode === "Ep. 12")
                    ].filter(Boolean) : [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean)
                ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                state.carousels[carousel].currentSlide = (state.carousels[carousel].currentSlide - 1 + items.length) % items.length;
                updateSlides(carousel);
            }

            function goToSlide(index, carousel) {
                state.carousels[carousel].currentSlide = index;
                updateSlides(carousel);
            }

            function watchNow(index, carousel) {
                const items = state.mode === 'series' ? (
                    carousel === 'A' ? [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean) : carousel === 'B' ? [
                        config.series.find(item => item.seriesId === 11 && item.episode === "Ep. 12")
                    ].filter(Boolean) : [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean)
                ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                const item = items[index];
                if (item && item.link) {
                    window.open(item.link, '_blank');
                } else {
                    showNotification('Link não disponível para este episódio tente mais tarde.');
                }
            }

            function addToWatchLater(index, carousel) {
                const items = state.mode === 'series' ? (
                    carousel === 'A' ? [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean) : carousel === 'B' ? [
                        config.series.find(item => item.seriesId === 11 && item.episode === "Ep. 12")
                    ].filter(Boolean) : [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                        
                    ].filter(Boolean)
                ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                const item = items[index];
                if (item) {
                    if (!state.watchLaterList.includes(index)) {
                        state.watchLaterList.push(index);
                        updateWatchLaterList();
                        showNotification(`"${item.title}" adicionado à lista "Assistir depois".`);
                    } else {
                        showNotification(`"${item.title}" já está na lista "Assistir depois".`);
                    }
                }
            }

            function shareWhatsApp(index, carousel) {
                const items = state.mode === 'series' ? (
                    carousel === 'A' ? [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean) : carousel === 'B' ? [
                        config.series.find(item => item.seriesId === 11 && item.episode === "Ep. 12")
                    ].filter(Boolean) : [
                        config.series.find(item => item.seriesId === 0 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 1 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 2 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 3 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 4 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 5 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 6 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 7 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 8 && item.episode === "Ep. 1"),
                        config.series.find(item => item.seriesId === 9 && item.episode === "Ep. 1"),
                     config.series.find(item => item.seriesId === 10 && item.episode === "Ep. 1")
                    ].filter(Boolean)
                ) : carousel === 'A' ? config.series.filter(item => item.seriesId === state.currentSeriesId) : [];

                const item = items[index];
                if (item) {
                    const message = encodeURIComponent(`Confira este episódio: ${item.title} - ${item.episode} - ${item.duration}\n${item.link || 'Link não disponível'}`);
                    window.open(`https://wa.me/?text=${message}`, '_blank');
                }
            }

            function updateWatchLaterList() {
                elements.watchLaterContainer.innerHTML = '';
                const items = state.currentItemType === 'movie' ? config.movies : config.series.filter(item => item.seriesId === state.currentSeriesId);
                state.watchLaterList.forEach(index => {
                    const item = items[index];
                    if (item) {
                        const watchLaterItem = document.createElement('div');
                        watchLaterItem.className = 'watch-later-item';
                        watchLaterItem.dataset.index = index;
                        watchLaterItem.innerHTML = `
                            <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/140x110?text=Thumbnail'">
                            <div class="watch-later-item-number">${item.episode}</div>
                        `;
                        elements.watchLaterContainer.appendChild(watchLaterItem);
                    }
                });
            }

            function showNotification(message) {
                notification.textContent = message;
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            initialize();
        });
document.addEventListener('DOMContentLoaded', () => {
  createCarousels();
});

function createCarousels() {
  const container = document.getElementById('carousel-container');
  if (!container) return;

  config.series.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.episode}</p>
      <p>${item.duration}</p>
    `;
    container.appendChild(card);
  });
}