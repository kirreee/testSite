app.controller('myArticlesCtrl', ['$scope', 'articleService', function ($scope, articleService) {

    articleService.getMyArticles(function (articles) {
        $scope.articles = articles;
    });

    $scope.removeArticle = function (articleId) {
        if (articleId === undefined || articleId === null) {
            return;
        }

        Swal.fire({
            title: 'Är du säker?',
            text: 'Du kommer inte att kunna återställa detta!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, radera annonsen!',
            cancelButtonText: 'Avbryt'
        }).then((result) => {
            if (result.value) {
                removeArticle(articleId);
            } else {
                return;
            }
        });
    };


    function removeArticle(articleId) {
        articleService.deleteArticle(articleId, function (result) {
            if (result.isSucceed) {
                for (let i = 0; i < $scope.articles.length; i++) {
                    if (articleId === $scope.articles[i].id) {
                        $scope.articles.splice(i, 1);
                        break;
                    }
                }
            } else {
                Swal.fire({
                    title: 'Något gick fel med att radera annonsen',
                    type: 'warning'
                });
            }
        });
    }


    //Go to article edit view.
    $scope.editArticle = function (articleId) {
        location.href = '#!/editArticles/' + articleId;
    };

}]);