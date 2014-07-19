$(function() {
    // get deferred content
    $.get('deferred.html', function(data) {
        $("#likes-n-shares").html(data);
    });
    // randomize the home screen
    $('#top li:not(.background)').each(function() {
        var _rotate = 'rotate(' + parseInt(Math.random() * 10 - 5) + 'deg)';
        $(this).css({
            'transform' : _rotate,
            '-ms-transform' : _rotate,
            '-webkit-transform' : _rotate
        });
    });
    // initialize gallery images
    $('.gallery-images').each(
        function() {
            $(this).css('background-image',
                'url(' + $(this).attr('href').replace('originals', 'thumbnails') + ')');
        });
    var days = Math
        .floor((new Date(2014, 04, 11, 23, 59, 59, 999).getTime() - new Date().getTime())
            / (24 * 60 * 60 * 1000));
    $('#timer').html(
        (days > 2) ? (days + ' days from now!') : ((days == 2) ? 'day after tomorrow!!'
            : ((days == 1) ? 'tomorrow!!' : ((days == 0) ? 'today!!!'
                : 'thank you for joining us. :)'))));
    // variable to store skrollr reference
    var _skrollr = null;
    // if there is a mobile agent, reduce the scroll multiplier
    var _scrollScale = 1;
    if ((/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor
        || window.opera)) {
        _scrollScale = 0.2;
    }
    // the below stuff should changes on window resize
    $(window).on(
        'resize',
        function() {
            // get the last scroll position
            var _scrollTop = _skrollr && _skrollr.getScrollTop();
            _skrollr && _skrollr.destroy();
            // get the window dimensions
            var winDim = {
                width : $(window).width(),
                height : $(window).height(),
            };
            // calculate the base em. this and css media queries must be in sync
            var emBase = (winDim.width > 1180 && winDim.height > 630) ? 20
                : (winDim.width > 980 && winDim.height > 540) ? 17
                    : (winDim.width > 800 && winDim.height > 440) ? 14
                        : (winDim.width > 582 && winDim.height > 356) ? 11
                            : (winDim.width > 434 && winDim.height > 256) ? 8 : 5;

            // animate backgrounds
            $('#top .background').attr(
                'data-0',
                "left:" + (winDim.width + emBase * 20) + "px;top:" + (winDim.height - emBase * 23)
                    + "px").attr(
                "data-50",
                "left:" + parseInt((winDim.width - emBase * 20) / 2) + "px;top:"
                    + (winDim.height - emBase * 23) + "px").attr(
                "data-1500",
                "left:" + parseInt((winDim.width - emBase * 20) / 2) + "px;top:"
                    + (winDim.height - emBase * 23) + "px").attr("data-2000",
                "left:-" + emBase * 20 + "px;top:" + (winDim.height - emBase * 23) + "px");
            $('#wedding .background').attr('data-2000',
                "left:-" + (emBase * 20) + "px;top:" + (winDim.height - emBase * 23) + "px").attr(
                "data-2500",
                "left:" + (emBase * 5) + "px;top:" + (winDim.height - emBase * 23) + "px").attr(
                "data-5500",
                "left:" + (emBase * 5) + "px;top:" + (winDim.height - emBase * 23) + "px").attr(
                "data-6000",
                "left:-" + (emBase * 20) + "px;top:" + (winDim.height - emBase * 23) + "px");
            $('#vidya .background').css({
                top : 0 + 'px',
                left : parseInt((winDim.width - emBase * 20) / 2) + 'px'
            }).attr('data-6000', "opacity:0").attr("data-6500", "opacity:1").attr("data-7500",
                "opacity:1").attr("data-8000", "opacity:0");

            $('#pranav .background').css({
                top : (winDim.height - emBase * 20) + 'px',
                left : '0px'
            }).attr('data-8000', "opacity:0;").attr("data-8500", "opacity:1;").attr("data-9500",
                "opacity:1").attr("data-10000", "opacity:0");
            $('#love .background').attr('data-10000', "left:0px;top:-" + (emBase * 20) + "px")
                .attr("data-10500", "left:0px;top:" + (winDim.height - emBase * 23) + "px").attr(
                    "data-13500", "left:0px;top:" + (winDim.height - emBase * 23) + "px").attr(
                    "data-14000", "left:" + (emBase * 2) + "px;top:-" + (emBase * 20) + "px");
            $('#gallery .background').attr('data-14000', "left:-" + (emBase * 20) + "px;top:0px")
                .attr("data-14500", "left:0px;top:0px");
            // skrollr initialization
            _skrollr = skrollr.init({
                forceHeight : true,
                scale : _scrollScale,
                mobileDeceleration : 1
            });
            skrollr.menu.init(_skrollr, {
                animate : false,
                easing : 'sqrt',
                duration : function(currentTop, targetTop) {
                    return 1000;
                },
            });
            // restore the current scroll position
            _scrollTop && _skrollr.setScrollTop(_scrollTop, true);
            // align items that are supposed to occupy the center
            $('.align-middle').each(function() {
                $(this).css('top', parseInt((winDim.height - $(this).height()) / 2) + 'px');
            });
        }).trigger('resize');
    // finally, remove the loader cover
    window.setTimeout(function() {
        $('.loader-cover').css('opacity', 0);
        // remove the loader cover
        window.setTimeout(function() {
            $('.loader-cover').remove();
        }, 1000);
    }, 500);
});