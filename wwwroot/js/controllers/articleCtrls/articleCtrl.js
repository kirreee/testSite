app.controller('articleCtrl', ['$scope', 'articleService', function ($scope, articleService) {

    //$scope.title = 'hejsan';


    articleService.getArticles(function (articles) {
        $scope.articles = articles;
    });

    $scope.displayArticleDetail = function (articleId) {
        $('#articleDetails-container').fadeIn();
        $('#list-content-holder').addClass('blur');

        getArticleData(articleId);
    };


    function getArticleData(articleId) {
        $scope.articles.forEach(function (article) {
            if (articleId === article.id) {
                return $scope.articleObj = article;
            }
        });
    }

    $scope.getAllArticles = function () {
        $('#advanceSearch-content').hide();
        $('#list-of-cars').fadeIn(500);
    };


    //Toggle display show between hexList and gridList
    $scope.toggleLists = function (type) {
        let hexagonList = $('#hexagon-grid-holder'),
            gridList = $('#grid-list-holder');

        if (type === 'hexaList') {
            if (!hexagonList.css('display') === 'none') {
                return;
            }

            gridList.hide();
            hexagonList.fadeIn(400);
        } else {
            if (!gridList.css('display') === 'none') {
                return;
            }

            hexagonList.hide();
            gridList.fadeIn(400);
        }
    };


    $scope.closeDetailView = function() {
        $('#articleDetails-container').fadeOut();
        $('#list-content-holder').removeClass('blur');
    };


}]);