app.controller('mainCtrl', ['$scope', function ($scope) {

    //Display advance search-btn
    $scope.showAdvanBtn = function (event) {
        let advanceBtn = $('#advance-search-btn');
        advanceBtn.fadeIn();
        advanceBtn.css('display', 'block');

        $(event.currentTarget).addClass('search-box-big');
    };

}]);