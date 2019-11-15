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
        $(event.currentTarget.firstChild).siblings('.link-title').fadeIn(500);
    };

    //Hide link title on mouseleave
    $scope.hideLinkText = function (event) {
        $(event.currentTarget.firstChild).siblings('.link-title').hide();
    };

}]);