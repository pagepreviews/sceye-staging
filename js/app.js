document.addEventListener('DOMContentLoaded', () => {

    //empty links
    document.addEventListener('click', (event) => {
        if (event.target.matches('a[href="#"]')) {
            event.preventDefault();
        }
    }, false);


    const navigationToggle = document.querySelector('.navigation-toggle');
    const body = document.querySelector('body');
    if (navigationToggle) {
        navigationToggle.addEventListener('click', (event) => {
            event.preventDefault();
            body.classList.toggle('navigation-open');
            // if (document.body.classList.contains('navigation-open')) {
            //     locomotiveScroll.stop();
            // } else {
            //     locomotiveScroll.start();
            // }
        });
    }

    const mainNavigationItems = document.querySelectorAll('.menu-main a');
    for (let index = 0; index < mainNavigationItems.length; index++) {
        const element = mainNavigationItems[index];
        element.addEventListener('click', () => {
            body.classList.remove('navigation-open');
            // locomotiveScroll.start();
        });
    }

    //locomotive
    let locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
            prevent: (node) => node.getAttribute("id") === "modalSelector",
        },
    });

    //whatWeDo
    let whatWeDoNavigation = new Swiper('.what-we-do-navigation', {
        speed: 700,
        spaceBetween: 0,
        slidesPerView: 'auto',
        watchSlidesProgress: true,
        breakpoints: {
            767: {
                spaceBetween: 20
            },
            992: {
                spaceBetween: 40
            }
        }
    });
    let whatWeDoMain = new Swiper('.what-we-do-main', {
        speed: 700,
        spaceBetween: 10,
        autoHeight: true,
        allowTouchMove: false,
        simulateTouch: false,
        thumbs: {
            swiper: whatWeDoNavigation,
            autoScrollOffset: 1,
        },
    });

    //impact
    let impactSlider = new Swiper('.impact-slider', {
        speed: 700,
        spaceBetween: 20,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.impact-button-next',
            prevEl: '.impact-button-prev',
        },
    });

    //weAreHiring
    let weAreHiringSlider = new Swiper('.we-are-hiring-slider', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        speed: 10000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
    });

    //gallery
    let gallerySlider = new Swiper('.gallery-slider', {
        slidesPerView: 'auto',
        spaceBetween: 16,
        loop: true,
        speed: 10000,
        allowTouchMove: false,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
    });

    //latestNews
    let latestNewsSlider = new Swiper('.latest-news-slider', {
        speed: 700,
        spaceBetween: 16,
        slidesPerView: 1,
        navigation: {
            nextEl: '.latest-news-button-next',
            prevEl: '.latest-news-button-prev',
        },
        breakpoints: {
            767: {
                slidesPerView: 2,
            },
            1130: {
                slidesPerView: 3,
            }
        }
    });

    //useCases
    let useCasesNavigation = new Swiper('.use-cases-navigation', {
        speed: 700,
        spaceBetween: 0,
        slidesPerView: 'auto',
        watchSlidesProgress: true,
    });
    let useCasesMain = new Swiper('.use-cases-main', {
        speed: 700,
        spaceBetween: 10,
        autoHeight: true,
        allowTouchMove: false,
        simulateTouch: false,
        thumbs: {
            swiper: useCasesNavigation,
            autoScrollOffset: 1,
        },
    });

    //accordion
    document.querySelectorAll('.accordion').forEach((accordion) => {
        accordion.addEventListener('click', (event) => {
            const button = event.target.closest('.accordion-button');
            if (!button || !accordion.contains(button)) return;
            const item = button.closest('.accordion-item');
            const isActive = item.classList.contains('is-active');
            accordion.querySelectorAll('.accordion-item').forEach((el) => {
                el.classList.remove('is-active');
            });
            if (!isActive) {
                item.classList.add('is-active');
            }
        });
    });


    //Proximity
    const proximitySlider = new Swiper('.proximity-slider', {
        speed: 700,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.proximity-button-next',
            prevEl: '.proximity-button-prev',
        }
    });
    const proximityLayers = document.querySelectorAll('.proximity-layer');

    if (proximityLayers.length) {
        const proximity = document.querySelector('.proximity');
        const updateActiveLayer = (index) => {
            proximityLayers.forEach((layer, i) => {
                layer.classList.toggle('active', i === index);
            });
            proximity.classList.forEach(className => {
                if (className.startsWith('proximity-active-')) {
                    proximity.classList.remove(className);
                }
            });
            proximity.classList.add('proximity-active-' + index);
        };
        proximityLayers.forEach((layer, index) => {
            layer.addEventListener('click', () => {
                proximitySlider.slideTo(index);
            });
        });
        proximitySlider.on('slideChange', () => {
            updateActiveLayer(proximitySlider.activeIndex);
        });
        updateActiveLayer(proximitySlider.activeIndex);
    }

    //modal
    const positionModal = (button, modal) => {
        const margin = 16;
        const container = button.closest('.features');
        if (!container) return;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const modalRect = modal.getBoundingClientRect();
        let left = buttonRect.left - containerRect.left + buttonRect.width / 2 - modalRect.width / 2;
        const top = buttonRect.bottom - containerRect.top;
        if (left < margin) {
            left = margin;
        }
        const maxLeft = container.clientWidth - modalRect.width - margin;
        if (left > maxLeft) {
            left = maxLeft;
        }
        modal.style.left = `${left}px`;
        modal.style.top = `${top}px`;
    };
    const repositionActiveModal = () => {
        const activeButton = document.querySelector('.features-point.active');
        const activeModal = document.querySelector('.features-modal.active');

        if (activeButton && activeModal) {
            positionModal(activeButton, activeModal);
        }
    };
    window.addEventListener('resize', repositionActiveModal);
    window.addEventListener('orientationchange', repositionActiveModal);
    const modalButtons = document.querySelectorAll('.features-point');
    const modals = document.querySelectorAll('.features-modal');
    if (modalButtons.length && modals.length) {
        const closeAllModals = () => {
            modals.forEach(modal => modal.classList.remove('active'));
            modalButtons.forEach(button => button.classList.remove('active'));
        };
        modalButtons.forEach(button => {
            button.addEventListener('click', e => {
                e.stopPropagation();
                const targetId = button.dataset.target;
                const targetModal = document.getElementById(targetId);
                if (!targetModal) return;
                const isAlreadyOpen = targetModal.classList.contains('active');
                closeAllModals();
                if (!isAlreadyOpen) {
                    targetModal.classList.add('active');
                    button.classList.add('active');
                    positionModal(button, targetModal);
                }
            });
        });
        modals.forEach(modal => {
            const closeButton = modal.querySelector('.features-modal-close');
            if (closeButton) {
                closeButton.addEventListener('click', e => {
                    e.stopPropagation();
                    closeAllModals();
                });
            }
            modal.addEventListener('click', e => {
                e.stopPropagation();
            });
        });
        document.addEventListener('click', () => {
            closeAllModals();
        });
    }


    //header
    const header = document.querySelector('.header-site');

    let lastScroll = window.pageYOffset;
    let ticking = false;

    const threshold = 10;

    function updateHeader() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('header-hidden');
        } else if (currentScroll > lastScroll + threshold) {
            header.classList.add('header-hidden');
        } else if (currentScroll < lastScroll - threshold) {
            header.classList.remove('header-hidden');
        }

        const elements = document.elementsFromPoint(
            window.innerWidth / 2,
            60
        );

        const section = elements.find(el =>
            !el.closest('.header-site') &&
            (el.closest('.section-light') || el.closest('.section-dark'))
        );

        const light = section?.closest('.section-light');

        header.classList.toggle('header-light', !!light);

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', updateHeader);

    updateHeader();


}); //DOMContentLoaded

