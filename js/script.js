$(document).ready(function () {
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

    $(document).on("click", ".imgFeatured", function () {
        console.log($(this).attr("value"))
        $(".divVideo iframe")[0].src = $(this).attr("value")
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

    $(".useCaseName").on("mouseover", function () {
        $(this).next().css({ 'opacity': 1 });
    })

    $('.serviceCard').on('mouseover', function () {
        this.classList.toggle('is-flipped');
    });

    $('.serviceCard').on('mouseout', function () {
        this.classList.toggle('is-flipped');
    });
})