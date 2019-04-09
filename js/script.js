$(document).ready(function () {
    $('.my-carousel').carousel().swipeCarousel({
        // low, medium or high
        sensitivity: 'high'
    });

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
})