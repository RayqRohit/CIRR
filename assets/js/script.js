$(document).ready(function() {
    var $slider = $('.student-mobility-inbound-slider');
    var $progressBar = $('.student-mobility-progress-bar');
    
    // Only initialize if there are more than 3 cards
    if ($slider.children().length > 3) {
        
        function updateProgress(slick, currentSlide) {
            var slidesToShow = slick.options ? slick.options.slidesToShow : 3;
            // Handle responsive changes if needed by checking slick.activeBreakpoint
            if (slick.activeBreakpoint) {
                var responsiveSettings = slick.options.responsive.find(function(r) { return r.breakpoint === slick.activeBreakpoint });
                if (responsiveSettings) slidesToShow = responsiveSettings.settings.slidesToShow;
            }
            
            var steps = slick.slideCount - slidesToShow + 1;
            if (steps < 1) steps = 1;
            var calc = ((currentSlide + 1) / steps) * 100;
            $progressBar.css('width', calc + '%');
        }

        $slider.on('init', function(event, slick) {
            updateProgress(slick, 0);
        });

        $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            updateProgress(slick, nextSlide);
        });

        $slider.slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            prevArrow: $('.student-mobility-prev'),
            nextArrow: $('.student-mobility-next'),
            infinite: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
        
    } else {
        // Just display as flex grid if 3 or less
        $slider.addClass('row g-4').removeClass('student-mobility-inbound-slider');
        $slider.find('.student-mobility-slide').addClass('col-lg-4 col-md-6').removeClass('px-2 student-mobility-slide');
        // Hide the controls since slick is not initialized
        $slider.siblings('.student-mobility-slider-controls').removeClass('d-flex').addClass('d-none');
    }
});