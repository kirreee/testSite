app.controller('articleCtrl', ['$scope','articleService', function ($scope, articleService) {

    articleService.getArticles(function (articles) {
        $scope.articles = articles;
    });

}]);