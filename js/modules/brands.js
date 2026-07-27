export function initBrands() {
    // ELEMENTOS
    const brandsSection = document.getElementById("brands");
    const brandsWrapper = brandsSection?.querySelector(".brands-wrapper");
    
    // VALIDAÇÃO
    if (!brandsSection || !brandsWrapper) return;

    // ELEMENTOS DO CARROSSEL
    const slides = brandsWrapper.querySelectorAll(".brands-slide");
    const dots = brandsSection.querySelectorAll(".carousel-dots .dot");
    const brandCards = brandsSection.querySelectorAll(".brand-card");

    // ESTADO
    const state = {
        currentSlide: 0,
        totalSlides: slides.length,

        isDragging: false,
        startX: 0,
        currentX: 0, 
        
        hasDragged: false,

        dragTolerance: 5,

        autoplayId: null,
        resumeAutoplayId: null
    };

    // FUNÇÕES
    function goToSlide(index) {
        index = (index + state.totalSlides) % state.totalSlides;
        
        state.currentSlide = index;

        updateCarouselPosition();
        updateDots();
    }

    function getDragThreshold() {
        return brandsWrapper.clientWidth * 0.15;
    }

    function getDragDistance() {
        return state.currentX - state.startX;
    }    

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle(
                "is-active",
                index === state.currentSlide
            );
        });
    }

    function handlePointerDown(event) {
        state.isDragging = true;
        state.startX = event.clientX;
        state.currentX = event.clientX;
        state.hasDragged = false;

        stopAutoplay();

        brandsWrapper.setPointerCapture(event.pointerId);
        brandsWrapper.classList.add("is-dragging");
    }

    function handlePointerMove(event) {
        if (!state.isDragging) return;

        state.currentX = event.clientX;
        const distance = getDragDistance();

        if (Math.abs(distance) > state.dragTolerance) {
            state.hasDragged = true;
        }

        updateCarouselPosition(distance);
    }

    function handlePointerUp(event) {
        if (!state.isDragging) return;

        state.isDragging = false;

        const distance = getDragDistance();
        const threshold = getDragThreshold();

        if (brandsWrapper.hasPointerCapture(event.pointerId)) {
            brandsWrapper.releasePointerCapture(event.pointerId);
        }

        brandsWrapper.classList.remove("is-dragging");

        if (distance <= -threshold) {
            goToSlide(state.currentSlide + 1);
        } else if (distance >= threshold) {
            goToSlide(state.currentSlide - 1);
        } else {
            updateCarouselPosition();
        }

        scheduleAutoplay();
    }  
    
    function dispatchBrandSelected(event) {
        if (state.hasDragged) {
            event.preventDefault();
            return;
        }

        document.dispatchEvent(
            new CustomEvent("brandSelected", {
                detail: {
                    brand: event.currentTarget.dataset.brand
                }
            })
        );
    }
    
    function updateCarouselPosition(dragOffset = 0) {
        brandsWrapper.style.setProperty(
            "--current-slide",
            state.currentSlide
        );

        brandsWrapper.style.setProperty(
            "--drag-offset",
            `${dragOffset}px`
        );
    }

    function startAutoplay() {
        stopAutoplay();

        state.autoplayId = setInterval(() => {
            goToSlide(state.currentSlide + 1);
        }, 4000);
    }
    
    function stopAutoplay() {
        if (!state.autoplayId) return;

        clearInterval(state.autoplayId);
        state.autoplayId = null;
    }  
    
    function scheduleAutoplay() {
        clearTimeout(state.resumeAutoplayId);
        
        state.resumeAutoplayId = setTimeout(() => {
            state.resumeAutoplayId = null;
            startAutoplay();
        }, 3000);
    }    

    function bindEvents() {
        // Eventos dos dots
        dots.forEach((dot) => {
            dot.addEventListener("click", () => {
                const slideIndex = Number(dot.dataset.slide);

                goToSlide(slideIndex);
            });
        });

        brandCards.forEach((card) => {
            card.addEventListener("click", dispatchBrandSelected);
        });       

        // Eventos do swipe
        brandsWrapper.addEventListener("pointerdown", handlePointerDown);
        brandsWrapper.addEventListener("pointermove", handlePointerMove);
        brandsWrapper.addEventListener("pointerup", handlePointerUp);
        brandsWrapper.addEventListener("pointercancel", handlePointerUp);
    }

    updateCarouselPosition();
    updateDots();
    bindEvents();
    startAutoplay();
}