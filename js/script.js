$(document).ready(function () {
    $('.my-carousel').carousel().swipeCarousel({
        // low, medium or high
        sensitivity: 'high'
    });

    var cw = $('.service').width();
    $('.service').css({ 'height': cw + 'px' });

    var cw = $('.musicService').width();
    $('.musicService').css({ 'height': cw + 'px' });

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


    function drawCircle(cx, cy, r) {

        var svgCircle = document.createElementNS('http://www.w3.org/2000/svg', "circle");
        svgCircle.setAttributeNS(null, "cx", cx);
        svgCircle.setAttributeNS(null, "cy", cy);
        svgCircle.setAttributeNS(null, "r", r);
        svgCircle.setAttributeNS(null, "stroke", '#FBA100')
        svgCircle.setAttributeNS(null, "fill", '#FBA100')
        return svgCircle;

    }

    function polarToCartesian(center_x, center_y, radius, angle_in_degrees) {
        var return_value = {}
        var angle_in_radians = angle_in_degrees * Math.PI / 180.0;
        return_value.x = center_x + radius * Math.cos(angle_in_radians);
        return_value.y = center_y + radius * Math.sin(angle_in_radians);
        return return_value;
    }

    /*  ==============================
        Loop to Draw Satellite circles
        ==============================  */

    //  The center is the same for all circles
    var cx = 300
    var cy = 350

    var radius_of_satellites_from_center = 225
    var radius_of_small_circles = 80
    var number_of_satellite_circles = 5

    //  The angle increments for each circle drawn
    for (var n = 0; n < number_of_satellite_circles; n++) {

        //  Find how many degrees separate each circle
        var degrees_of_separation = 360 / number_of_satellite_circles

        var angle_as_degrees = degrees_of_separation * n

        var coordinates = polarToCartesian(cx, cy, radius_of_satellites_from_center, angle_as_degrees)
        var circle = drawCircle(coordinates.x, coordinates.y, radius_of_small_circles);
        var textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
        var text = document.createTextNode(getBubbleText(n));
        textElement.setAttribute("x", "0");
        textElement.setAttribute("y", "110");
        textElement.setAttribute("fill", "white");
        textElement.setAttribute("font-family", "Verdana");
        textElement.setAttribute("font-size", "15");
        textElement.setAttribute("x", circle.getAttribute("cx") - 50)
        textElement.setAttribute("y", circle.getAttribute("cy"))
        textElement.appendChild(text);

        document.getElementById('useCases').appendChild(circle)
        document.getElementById('useCases').appendChild(textElement)

    }

    function getBubbleText(circleNumber) {
        switch (circleNumber) {
            case 0: return "PRODUCTION"
            case 1: return "SONGWRITING/\
            COMPOSITION"
            case 2: return "VOCAL\
            PRODUCTION"
            case 3: return "MIXING/\
            MASTERING"
            case 4: return "SOUND SUITES"
            //default : return "SONGWRITING/COMPOSITION"
        }
    }

})