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


    //Open advance searchSettings
    $scope.openAdvanceSearchSettings = function () {
        $('#advance-search-btn').hide();
        $('#advanceSearch-content').fadeIn(500);
    };


    $scope.setActiveCarType = function (event) {
        let targetCarTypeEl = $(event.currentTarget);

        if (targetCarTypeEl.hasClass('inActive-carType')) {
            targetCarTypeEl.removeClass('inActive-carType').addClass('active-carType');
            return;
        }

        targetCarTypeEl.removeClass('active-carType').addClass('inActive-carType');
    };


    //Rounder slide picker year.
    $("#filter-year-shape").roundSlider({
        handleShape: "dot",
        radius: 130,
        circleShape: "half-top",
        sliderType: "range",
        showTooltip: true,
        change: "traceEventYear",
        drag: "traceEventYear",
        max: '2015',
        value: "1800" + "," + '2015',
        min: 1800
    });


}]);