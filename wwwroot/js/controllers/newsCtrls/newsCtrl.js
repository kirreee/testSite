app.controller('newsCtrl', ['$scope', 'newsService', function ($scope, newsService) {


    //Get all news
    newsService.getAllNews(function (news) {
        if (news.length <= 0) {
            return $scope.isNewsEmpty = true;
        }
        $scope.news = news;
    });

    $scope.removeNews = function (newsId) {
        Swal.fire({
            title: 'Är du säker på att du vill radera denna nyhet?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, jag är säker.'
        }).then((result) => {
            if (result.value) {
                removeNews(newsId);
            }
        });
    };

    //Deleting news
    function removeNews(newsId) {
        newsService.deleteNews(newsId, function (result) {
            if (result.isSucceed) {
                return operationSucceed(newsId);
            } else {
                return operationFailed(result.errors);
            }
        });
    }

    //Removing news from List
    function operationSucceed(newsId) {
        Swal.fire({
            'title': 'Nyhet har blivit bortagen.',
            'type': 'success'
        }).then(function () {
            for (var i = 0; i < $scope.news.length; i++) {
                if (newsId === $scope.news[i].id) {
                    try {
                        $scope.news.splice(i, 1);
                        $scope.$apply($scope.news);

                    } catch (err) {
                        console.log(err);
                    }
                    break;
                }
            }
        });
    }

    //Handle operation failed
    function operationFailed(errors) {
        let errorMsg;
        try {
            for (var i = 0; i < errors.length; i++) {
                errors += errors[i];
            }
        } finally {
            Swal.fire({
                'title': 'Nyhet blev inte skapad.',
                'text': errorMsg,
                'type': 'warning'
            }).then(function () {
                return;
            });
        }
    }

    $scope.editNews = function (newsId) {
        location.href = '#!/editNews/' + newsId;
    };

}]);