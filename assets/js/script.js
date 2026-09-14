$(document).ready(function () {

    // Reusable function to initialize slick slider with a progress bar
    function setupSlickWithProgress($slider, $progressBar, $prev, $next, slickConfig, sliderType) {
        if (!$slider.length) return;

        // Special check for Inbound Slider: Display as grid if 3 or fewer cards
        if (sliderType === 'inbound') {
            var slideCount = $slider.children('.student-mobility-slide').length;
            if (slideCount <= 3) {
                $slider.addClass('row g-4').removeClass('student-mobility-inbound-slider');
                $slider.find('.student-mobility-slide').addClass('col-lg-4 col-md-6').removeClass('px-2 student-mobility-slide');
                $slider.siblings('.student-mobility-slider-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Students Grid Slider: Display as static grid if 8 or fewer cards
        if (sliderType === 'students' || sliderType === 'abroad') {
            var slideClass = sliderType === 'students' ? '.student-mobility-students-slide' : '.student-mobility-abroad-slide';
            var sliderClass = sliderType === 'students' ? 'student-mobility-students-slider' : 'student-mobility-abroad-slider';
            var studentSlideCount = $slider.children(slideClass).length;
            if (studentSlideCount <= 8) {
                $slider.addClass('row g-4').removeClass(sliderClass);
                $slider.find(slideClass).addClass('col-lg-3 col-md-6 col-sm-6').removeClass('px-2 mb-4 ' + slideClass.substring(1));
                $slider.siblings('.student-mobility-slider-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Outbound Slider: Display as grid if 3 or fewer cards
        if (sliderType === 'outbound') {
            var outboundSlideCount = $slider.children('.student-mobility-outbound-slide').length;
            if (outboundSlideCount <= 3) {
                $slider.addClass('row g-4').removeClass('student-mobility-outbound-slider');
                $slider.find('.student-mobility-outbound-slide').addClass('col-lg-4 col-md-6').removeClass('px-2 student-mobility-outbound-slide');
                $slider.siblings('.student-mobility-slider-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Value Slider: Display as grid if 4 or fewer cards
        if (sliderType === 'value' || sliderType === 'research-partners' || sliderType === 'pathway-value') {
            var slideClass = sliderType === 'value' ? '.student-mobility-value-slide' :
                (sliderType === 'pathway-value' ? '.pathway-exchange-value-slide' : '.research-mobility-partner-slide');
            var sliderClass = sliderType === 'value' ? 'student-mobility-value-slider' :
                (sliderType === 'pathway-value' ? 'pathway-exchange-value-slider' : 'research-mobility-partners-slider');
            var valueSlideCount = $slider.children(slideClass).length;
            if (valueSlideCount <= 4) {
                $slider.addClass('row g-4').removeClass(sliderClass);
                $slider.find(slideClass).addClass('col-lg-3 col-md-6').removeClass('px-2 mb-4 ' + slideClass.substring(1));
                $slider.siblings('.student-mobility-slider-controls, .research-mobility-slider-controls, .pathway-exchange-value-slider-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Other Projects Slider: Display as grid if 3 or fewer cards
        if (sliderType === 'other-projects') {
            var otherSlideCount = $slider.children('.research-mobility-other-slide').length;
            if (otherSlideCount <= 3) {
                $slider.addClass('row g-4').removeClass('research-mobility-other-slider mx-n2');
                $slider.find('.research-mobility-other-slide').addClass('col-lg-4 col-md-6').removeClass('px-2 mb-4 research-mobility-other-slide');
                $slider.siblings('.research-mobility-other-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Staff Mobility Slider: Display as grid if 3 or fewer cards
        if (sliderType === 'staff-mobility') {
            var staffSlideCount = $slider.children('.staff-mobility-slide').length;
            if (staffSlideCount <= 3) {
                $slider.addClass('row g-4').removeClass('staff-mobility-slider mx-n2');
                $slider.find('.staff-mobility-slide').addClass('col-lg-4 col-md-6').removeClass('px-2 mb-4 staff-mobility-slide');
                $slider.siblings('.staff-mobility-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Gateway Slider: Display as grid if 3 or fewer cards
        if (sliderType === 'gateway') {
            var gatewaySlideCount = $slider.children().length;
            if (gatewaySlideCount <= 3) {
                $slider.addClass('row g-4').removeClass('pathway-exchange-gateway-slider mx-n3');
                $slider.children().addClass('col-lg-4 col-md-6').removeClass('px-3 pb-2');
                $slider.siblings('.pathway-exchange-gateway-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        // Special check for Outbound Faculty / Team Grid Sliders: Display as grid if 8 or fewer cards
        if (sliderType === 'outbound-faculty') {
            var teamSlideCount = $slider.children().length;
            if (teamSlideCount <= 8) {
                if ($slider.hasClass('staff-mobility-faculty-slider')) {
                    $slider.addClass('row g-4').removeClass('staff-mobility-faculty-slider');
                    $slider.siblings('.staff-mobility-faculty-controls').removeClass('d-flex').addClass('d-none');
                } else if ($slider.hasClass('international-relations-team-slider')) {
                    $slider.addClass('row g-4').removeClass('international-relations-team-slider');
                    $slider.siblings('.international-relations-team-controls').removeClass('d-flex').addClass('d-none');
                }
                $slider.children().addClass('col-lg-3 col-md-6').removeClass('px-2 mb-4');
                return;
            }
        }

        function updateProgress(slick, currentSlide) {
            var progress = 0;

            // Helper to get current responsive setting
            function getSetting(key, defaultValue) {
                var value = slick.options ? slick.options[key] : defaultValue;
                if (slick.activeBreakpoint) {
                    var responsiveSettings = slick.options.responsive.find(function (r) { return r.breakpoint === slick.activeBreakpoint });
                    if (responsiveSettings && responsiveSettings.settings[key] !== undefined) {
                        value = responsiveSettings.settings[key];
                    }
                }
                return value;
            }

            if (sliderType === 'inbound' || sliderType === 'outbound' || sliderType === 'value' || sliderType === 'research-partners' || sliderType === 'other-projects' || sliderType === 'staff-mobility' || sliderType === 'gateway' || sliderType === 'pathway-value') {
                // Calculation for standard sliding (1 by 1)
                var slidesToShow = getSetting('slidesToShow', (sliderType === 'value' || sliderType === 'research-partners' || sliderType === 'pathway-value') ? 4 : 3);
                var totalSteps = Math.max(slick.slideCount - slidesToShow + 1, 1);
                progress = ((currentSlide + 1) / totalSteps) * 100;
            } else if (sliderType === 'students' || sliderType === 'abroad' || sliderType === 'outbound-faculty') {
                // Calculation for grid sliding (by pages/rows)
                var slidesToScroll = getSetting('slidesToScroll', 4);
                var currentStep = Math.ceil(currentSlide / slidesToScroll) + 1;
                var totalSteps = Math.ceil(slick.slideCount / slidesToScroll);
                if (totalSteps < 1) totalSteps = 1;
                progress = (currentStep / totalSteps) * 100;
            }

            $progressBar.css('width', progress + '%');
        }

        $slider.on('init', function (event, slick) {
            updateProgress(slick, 0);
        });

        $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            updateProgress(slick, nextSlide);
        });

        // Attach controls to config
        slickConfig.prevArrow = $prev;
        slickConfig.nextArrow = $next;

        $slider.slick(slickConfig);
    }

    // ==========================================
    // 1. Inbound Student Mobility Slider
    // ==========================================
    setupSlickWithProgress(
        $('.student-mobility-inbound-slider'),
        $('.student-mobility-progress-bar'),
        $('.student-mobility-prev'),
        $('.student-mobility-next'),
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'inbound'
    );

    // ==========================================
    // 2. International Students Grid Slider
    // ==========================================
    setupSlickWithProgress(
        $('.student-mobility-students-slider'),
        $('.student-mobility-students-progress-bar'),
        $('.student-mobility-students-prev'),
        $('.student-mobility-students-next'),
        {
            rows: 2,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: { rows: 2, slidesToShow: 2, slidesToScroll: 2 }
                },
                {
                    breakpoint: 768,
                    settings: { rows: 1, slidesToShow: 1, slidesToScroll: 1 }
                }
            ]
        },
        'students'
    );
    // ==========================================
    // 3. Outbound Track Record Slider
    // ==========================================
    setupSlickWithProgress(
        $('.student-mobility-outbound-slider'),
        $('.student-mobility-outbound-progress-bar'),
        $('.student-mobility-outbound-prev'),
        $('.student-mobility-outbound-next'),
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'outbound'
    );

    // ==========================================
    // 4. Abroad Students Grid Slider
    // ==========================================
    setupSlickWithProgress(
        $('.student-mobility-abroad-slider'),
        $('.student-mobility-abroad-progress-bar'),
        $('.student-mobility-abroad-prev'),
        $('.student-mobility-abroad-next'),
        {
            rows: 2,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: { rows: 2, slidesToShow: 2, slidesToScroll: 2 }
                },
                {
                    breakpoint: 768,
                    settings: { rows: 1, slidesToShow: 1, slidesToScroll: 1 }
                }
            ]
        },
        'abroad'
    );

    // ==========================================
    // 5. Value of Mobility Slider
    // ==========================================
    setupSlickWithProgress(
        $('.student-mobility-value-slider'),
        $('.student-mobility-value-progress-bar'),
        $('.student-mobility-value-prev'),
        $('.student-mobility-value-next'),
        {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'value'
    );

    // ==========================================
    // 5b. Pathway Exchange Value of Mobility Slider
    // ==========================================
    setupSlickWithProgress(
        $('.pathway-exchange-value-slider'),
        $('.pathway-exchange-value-progress-bar'),
        $('.pathway-exchange-value-prev'),
        $('.pathway-exchange-value-next'),
        {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'pathway-value'
    );

    // ==========================================
    // 6. Research Mobility Partners Slider
    // ==========================================
    setupSlickWithProgress(
        $('.research-mobility-partners-slider'),
        $('.research-mobility-partners-progress-bar'),
        $('.research-mobility-partners-prev'),
        $('.research-mobility-partners-next'),
        {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 1200, settings: { slidesToShow: 3 } },
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'research-partners'
    );

    // ==========================================
    // 7. Research Mobility Other Projects Slider
    // ==========================================
    setupSlickWithProgress(
        $('.research-mobility-other-slider'),
        $('.research-mobility-other-progress-bar'),
        $('.research-mobility-other-prev'),
        $('.research-mobility-other-next'),
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'other-projects'
    );

    // ==========================================
    // 8. Staff Mobility Slider
    // ==========================================
    setupSlickWithProgress(
        $('.staff-mobility-slider'),
        $('.staff-mobility-progress-bar'),
        $('.staff-mobility-prev'),
        $('.staff-mobility-next'),
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'staff-mobility'
    );

    // ==========================================
    // 9. Outbound Faculty Slider
    // ==========================================
    setupSlickWithProgress(
        $('.staff-mobility-faculty-slider'),
        $('.staff-mobility-faculty-progress-bar'),
        $('.staff-mobility-faculty-prev'),
        $('.staff-mobility-faculty-next'),
        {
            rows: 2,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            arrows: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: { rows: 2, slidesToShow: 2, slidesToScroll: 2 }
                },
                {
                    breakpoint: 768,
                    settings: { rows: 1, slidesToShow: 1, slidesToScroll: 1 }
                }
            ]
        },
        'outbound-faculty'
    );

    // ==========================================
    // 10. Student Voices Slider
    // ==========================================
    if ($('.international-relations-voices-slider').length) {
        $('.international-relations-voices-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: false,
            dots: true,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2, dots: true } },
                { breakpoint: 768, settings: { slidesToShow: 1, dots: true } }
            ]
        });
    }

    // ==========================================
    // 11. Our Team Slider
    // ==========================================
    setupSlickWithProgress(
        $('.international-relations-team-slider'),
        $('.international-relations-team-progress-bar'),
        $('.international-relations-team-prev'),
        $('.international-relations-team-next'),
        {
            rows: 2,
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: { rows: 2, slidesToShow: 2, slidesToScroll: 2, dots: false }
                },
                {
                    breakpoint: 768,
                    settings: { rows: 1, slidesToShow: 1, slidesToScroll: 1, dots: false }
                }
            ]
        },
        'outbound-faculty'
    );

    // ==========================================
    // 12. Student Success Stories (Video) Slider
    // ==========================================
    var $videoSlider = $('.international-relations-video-slider');
    if ($videoSlider.length) {
        $videoSlider.slick({
            centerMode: true,
            centerPadding: '17%',
            slidesToShow: 1,
            infinite: true,
            arrows: false,
            dots: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerPadding: '10%'
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: false,
                        centerPadding: '0'
                    }
                }
            ]
        });

        // Function to pause all YouTube videos in the slider
        function pauseAllVideos() {
            $videoSlider.find('iframe').each(function () {
                this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            });
        }

        // 1. Pause video on slide change
        $videoSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            pauseAllVideos();
        });

        // 2. Pause video when section scrolls out of view
        if ('IntersectionObserver' in window) {
            var videoSectionObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) {
                        pauseAllVideos();
                    }
                });
            }, { threshold: 0.1 });

            var videoSection = document.querySelector('.international-relations-video-section');
            if (videoSection) {
                videoSectionObserver.observe(videoSection);
            }
        }
    }

    // ==========================================
    // 13. Pathway Exchange Gateway Slider
    // ==========================================
    setupSlickWithProgress(
        $('.pathway-exchange-gateway-slider'),
        $('.pathway-exchange-gateway-progress-bar'),
        $('.pathway-exchange-gateway-prev'),
        $('.pathway-exchange-gateway-next'),
        {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: false,
            arrows: true,
            dots: false,
            responsive: [
                { breakpoint: 992, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } }
            ]
        },
        'gateway'
    );
    // ==========================================
    // 14. Pathway Exchange Partners Slider
    // ==========================================
    $('.pathway-exchange-partners-slider').slick({
        centerMode: true,
        centerPadding: '150px',
        slidesToShow: 3,
        dots: true,
        arrows: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    centerPadding: '100px',
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '60px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

    // ==========================================
    // 15. Pathway Exchange Success Stories Slider
    // ==========================================
    $('.pathway-exchange-success-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    // ==========================================
    // 16. Pathway Exchange Route Slider
    // ==========================================
    var $routeSlider = $('.pathway-exchange-route-carousel');
    var $routeProgress = $('.pathway-exchange-route-progress-bar');
    
    if ($routeSlider.length) {
        $routeSlider.on('init reInit afterChange', function (event, slick, currentSlide) {
            var i = (currentSlide ? currentSlide : 0) + 1;
            var calc = (i / slick.slideCount) * 100;
            $routeProgress.css('width', calc + '%');
        });

        $routeSlider.slick({
            centerMode: true,
            centerPadding: '20%',
            slidesToShow: 1,
            arrows: true,
            prevArrow: $('.pathway-exchange-route-prev'),
            nextArrow: $('.pathway-exchange-route-next'),
            dots: false,
            infinite: true,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        centerPadding: '10%'
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerPadding: '40px'
                    }
                }
            ]
        });
    }

    // ==========================================
    // 17. Pathway Exchange Prep Slider
    // ==========================================
    var $prepSlider = $('.pathway-exchange-prep-carousel');
    var $prepProgress = $('.pathway-exchange-prep-progress-bar');
    
    if ($prepSlider.length) {
        $prepSlider.on('init reInit afterChange', function (event, slick, currentSlide) {
            // When not infinite, currentSlide goes from 0 to (slideCount - slidesToShow)
            var slidesVisible = slick.options.slidesToShow;
            var maxIndex = slick.slideCount - slidesVisible;
            if (maxIndex <= 0) maxIndex = 1;
            
            var i = currentSlide || 0;
            var calc = ((i + 1) / (maxIndex + 1)) * 100;
            // Prevent going over 100%
            if (calc > 100) calc = 100;
            
            $prepProgress.css('width', calc + '%');
        });

        $prepSlider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.pathway-exchange-prep-prev'),
            nextArrow: $('.pathway-exchange-prep-next'),
            dots: false,
            infinite: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

});