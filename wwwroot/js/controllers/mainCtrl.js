app.controller('mainCtrl', ['$scope', function ($scope) {

    //Display advance search-btn
    $scope.showAdvanBtn = function (event) {
        let advanceBtn = $('#advance-search-btn');
        advanceBtn.fadeIn();
        advanceBtn.css('display', 'block');

        $(event.currentTarget).addClass('search-box-big');
    };

    //Show link title on mouseover
    $scope.showLinkTxt = function (event) {
        $(event.currentTarget.firstChild).siblings('.link-title').show(200);
    };

    //Hide link title on mouseleave
    $scope.hideLinkText = function (event) {
        $(event.currentTarget.firstChild).siblings('.link-title').hide();
    };


    //Focus on car:hover in hexagonGridList
    $scope.focusHexagon = function(event) {
        $(event.target).removeClass('img-hex-opcaityLow');
        $('.img-hex').not(event.target).addClass('img-hex-opcaityLow');
       
    };

    //Unfocus car on ul:unhover in hexagonGridList
    $scope.unfocusHexaong = function() {
        $('.img-hex').removeClass('img-hex-opcaityLow');
    };


    //Open advance searchSettings
    $scope.openAdvanceSearchSettings = function () {
        $('#advance-search-btn').hide();
        $('#advanceSearch-content').fadeIn(500);
        $('#list-of-cars').addClass('list-of-cars-hidden');
    };


    $scope.setActiveCarType = function (event) {
        let targetCarTypeEl = $(event.currentTarget);

        if (targetCarTypeEl.hasClass('inActive-carType')) {
            targetCarTypeEl.removeClass('inActive-carType').addClass('active-carType');
            return;
        }
        targetCarTypeEl.removeClass('active-carType').addClass('inActive-carType');
    };

    //Year picker slider
    $("#filter-year-shape").roundSlider({
        handleShape: "dot",
        radius: 130,
        circleShape: "half-top",
        sliderType: "range",
        showTooltip: true,
        change: "traceEventYear",
        drag: "traceEventYear",
        max: getCurrentYear(),
        value: "1800" + "," + getCurrentYear(),
        min: 1800
    });

    //Milage picker slider
    $("#filter-milage-shape").roundSlider({
        handleShape: "dot",
        radius: 130,
        circleShape: "half-top",
        sliderType: "range",
        showTooltip: true,
        change: "traceEventMilage",
        drag: "traceEventMilage",
        max: 10000,
        value: "0, 10000",
        min: 0
    });

    //Price picker slider
    $("#filter-price-shape").roundSlider({
        handleShape: "dot",
        radius: 130,
        circleShape: "half-top",
        sliderType: "range",
        showTooltip: true,
        change: "traceEventPrice",
        drag: "traceEventPrice",
        max: 999,
        value: "0,999",
        min: 0
    });

    //Color picker slider
    $("#filter-color-shape").roundSlider({
        handleShape: "dot",
        radius: 125,
        circleShape: "half-top",
        sliderType: "min-range",
        showTooltip: true,
        change: "traceEventColor",
        drag: "traceEventColor",
        min: 1,
        max: 20,
        value: 20
    });
 

}]);


//Gets the current year
function getCurrentYear() {
    var d = new Date();
    var currentYear = d.getFullYear();
    return currentYear;
}

function traceEventColor(e) {
    $(function () {
        if (e.value <= 4 && e.value >= 1) {
            $('#color-value').css('color', 'red').text('Röd'); return;
        } else if (e.value <= 7 && e.value >= 5) {
            $('#color-value').css('color', 'orange').text('Orange'); return;
        } else if (e.value === 8) {
            $('#color-value').css('color', 'yellow').text('Gul'); return;
        } else if (e.value <= 11 && e.value >= 9) {
            $('#color-value').css('color', 'green').text('Grön'); return;
        } else if (e.value <= 14 && e.value >= 12) {
            $('#color-value').css('color', 'blue').text('Blå'); return;
        } else if (e.value <= 16 && e.value >= 14) {
            $('#color-value').css('color', 'black').text('Svart'); return;
        }
        else if (e.value === 20) {
            $('#color-value').css('color', 'white').text('Vit'); return;
        }
    });
}


//Change year text on slider changes
function traceEventYear(e) {
    $(function () {
        try {
            var minYear = e.value.substring(0, e.value.indexOf(",")),
                maxYear = e.value.substring(e.value.indexOf(",") + 1);
        } catch (err) {
            console.log(err);
        } finally {
            $('#year-min').text(minYear);
            $('#year-max').text(maxYear);
        }
    });
}

//Change milage text on slider changes
function traceEventMilage(e) {
    $(function () {
        var maxMilage,
            minMilage;
        try {
            maxMilage = e.value.substring(e.value.indexOf(",") + 1);
            minMilage = e.value.substring(0, e.value.indexOf(","));
        } catch (err) {
            console.log(err);
        } finally {
            let milageMaxString = maxMilage.length >= 5 ? '10' + ' 000 MIL' : maxMilage + ' MIL',
                milageMinString = minMilage.length >= 5 ? '10' + ' 000 MIL' : minMilage + ' MIL';

            $('#mileage-min').text(milageMinString);
            $('#mileage-max').text(milageMaxString);

        }
    });
}

//Change price text on slider changes
function traceEventPrice(e) {
    $(function () {
        try {
            var minPrice = e.value.substring(0, e.value.indexOf(",")),
                maxPrice = e.value.substring(e.value.indexOf(",") + 1);
        } catch (err) {
            console.log(err);
        } finally {
            $('#price-min').text(minPrice + ' TKR');
            $('#price-max').text(maxPrice + ' TKR');
        }
    });
}