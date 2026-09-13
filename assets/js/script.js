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
        if (sliderType === 'value') {
            var valueSlideCount = $slider.children('.student-mobility-value-slide').length;
            if (valueSlideCount <= 4) {
                $slider.addClass('row g-4').removeClass('student-mobility-value-slider');
                $slider.find('.student-mobility-value-slide').addClass('col-lg-3 col-md-6').removeClass('px-2 mb-4 student-mobility-value-slide');
                $slider.siblings('.student-mobility-slider-controls').removeClass('d-flex').addClass('d-none');
                return;
            }
        }

        function updateProgress(slick, currentSlide) {
            var progress = 0;
            
            // Helper to get current responsive setting
            function getSetting(key, defaultValue) {
                var value = slick.options ? slick.options[key] : defaultValue;
                if (slick.activeBreakpoint) {
                    var responsiveSettings = slick.options.responsive.find(function(r) { return r.breakpoint === slick.activeBreakpoint });
                    if (responsiveSettings && responsiveSettings.settings[key] !== undefined) {
                        value = responsiveSettings.settings[key];
                    }
                }
                return value;
            }

            if (sliderType === 'inbound' || sliderType === 'outbound' || sliderType === 'value') {
                // Calculation for standard sliding (1 by 1)
                var slidesToShow = getSetting('slidesToShow', sliderType === 'value' ? 4 : 3);
                var totalSteps = Math.max(slick.slideCount - slidesToShow + 1, 1);
                progress = ((currentSlide + 1) / totalSteps) * 100;
            } else if (sliderType === 'students' || sliderType === 'abroad') {
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

});