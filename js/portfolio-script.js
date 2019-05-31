$(document).ready(function () {
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

    let searchParams = new URLSearchParams(window.location.search)
    if (searchParams.has('name')) {
        let param = searchParams.get('name')
        $.getJSON("data/music-featured.json", function (result) {
            var portfolio = result.filter(featured => featured.img.toLowerCase().indexOf(param.toLowerCase()) > -1)
            $(".portfolio iframe")[0].src = portfolio[0].url
            if (portfolio[0].caption.length > 0)
                $(".portfolio p")[0].innerHTML = portfolio[0].caption
        });
    }
    else
        window.location = "/"
})