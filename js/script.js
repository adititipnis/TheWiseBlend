$(document).ready(function () {
    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('name')) {
        window.location.href = "./portfolio?name=" + searchParams.get('name')
    }

    $('.my-carousel').carousel().swipeCarousel({
        // low, medium or high
        sensitivity: 'high'
    });

    var cw = $('.service').width();
    $('.service').css({ 'height': cw + 'px' });

    var isMobineNavVisible = false
    $(".mobileNavOverlay").hide()
    toggleMobileNav = () => {
        isMobineNavVisible = !isMobineNavVisible
        if (isMobineNavVisible)
            $(".mobileNavOverlay").show()
        else
            $(".mobileNavOverlay").hide()
    }
    $(".navigation-narrow").on("click", toggleMobileNav)

    $(".mobileNavOverlay-content a").on("click", toggleMobileNav)

    const stripSize = 4

    $.getJSON("data/featured.json", function (result) {
        while (result.length) {
            var featuredStrip = result.splice(0, stripSize).map(featured => ("<span><img class='imgFeatured' value=" + featured.url + " src=" + featured.img + " /></span>"));
            var featuredStripDiv = "<div class='featuredStrip'>" + featuredStrip.join('') + "</div>"
            $(".featuredSection").append(featuredStripDiv)
        }
    });

    $.getJSON("data/music-featured.json", function (result) {
        if (result.length) {
            result.forEach(featured => {
                $("<img class='imgFeatured' value=" + featured.url + " src=" + encodeURI(featured.img) + " data-caption='" + featured.caption + "'/>").appendTo(".musicFeaturedSection")
            })
        }
        var cw = $('.service').width()
        $(".musicFeaturedSection img").css({ 'height': cw + 'px' })
    });

    $.getJSON("data/video-featured.json", function (result) {
        if (result.length) {
            result.forEach(featured => {
                $("<img class='imgFeatured' value=" + featured.url + " src=" + encodeURI(featured.img) + " data-caption='" + featured.caption + "'/>").appendTo(".videoFeaturedSection")
            })
        }
    });

    $(document).on("click", ".imgFeatured", function () {
        console.log($(this).attr("value"))
        $(".divVideo iframe")[0].src = $(this).attr("value")
        if ($(this).attr("data-caption").length > 0)
            $(".divVideo p")[0].innerHTML = $(this).attr("data-caption")
        $(".divVideo").show()
    })

    $("#videoClose").on("click", () => {
        $(".divVideo iframe")[0].src = ""
        $(".divVideo").hide()
    })
    var $form = $('form');

    if ($form.length > 0) {
        $('form input[type="submit"]').bind('click', function (event) {
            if (event) event.preventDefault();
            // validate_input() is a validation function I wrote, you'll have to substitute this with your own.
            register($form)
        });
    }

    function register($form) {
        $("#status").empty()
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (err) { alert("Could not connect to the registration server. Please try again later."); },
            success: function (data) {
                if (data.result != "success")
                    $("#status").append(data.msg)
                else
                    $("#status").append("Your message has been sent. We'll get back to you soon!")

            }
        });
    }

    // $(".useCaseName").on("mouseenter", function () {
    //     $(this).next().css({ 'opacity': 1 });
    // })

    $('.serviceCard').on('mouseenter', function () {
        this.classList.toggle('is-flipped');
    });

    $('.serviceCard').on('mouseleave', function () {
        setTimeout(() => {
            this.classList.toggle('is-flipped');
        }, 1500);
    });

    $('.homeService').on('mouseenter', function () {
        $(this).find('img').addClass('hover')
        $(this).find('h4').addClass('hover')
        $(this).find('p').addClass('hover')
    });

    $('.homeService').on('mouseleave', function () {
        $(this).find('img').removeClass('hover')
        $(this).find('h4').removeClass('hover')
        $(this).find('p').removeClass('hover')
    });

    $("#slideshow > div:gt(0)").hide();

    setInterval(function () {
        $('#slideshow > div:first')
            .fadeOut(1000)
            .next()
            .fadeIn(1000)
            .end()
            .appendTo('#slideshow');
    }, 3000);

    $($(".brandsSection").children(".brands")[0]).css({ "margin-left": "0vw" })
    currentSection = 0
    var section


    setInterval(() => {
        if (currentSection == 0)
            $($(".brandsSection").children(".brands")[0]).animate({ "margin-left": "-84vw" })
        else if (currentSection == 1)
            $($(".brandsSection").children(".brands")[0]).animate({ "margin-left": "-170vw" })
        else if (currentSection == 2)
            $($(".brandsSection").children(".brands")[0]).css({ "margin-left": "0vw" })
        currentSection < 2 ? currentSection++ : currentSection = 0
    }, 1000)
})