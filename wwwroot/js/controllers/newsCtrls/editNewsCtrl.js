app.controller('editNewsCtrl', ['$scope', '$routeParams', 'newsService', function ($scope, $routeParams, newsService) {

    newsService.getNewsById($routeParams.id, function (newsModel) {
        if (newsModel.status === 404) {
            return handleErrors();
        } else if (newsModel.operationResult !== null) {
            if (!newsModel.operationResult.isSucceed) {
                return handleErrors();
            }
        }
        $scope.news = newsModel;

    });

    function handleErrors() {
        Swal.fire({
            'title': 'Gick inte hitta nyheten.',
            'type': 'warning'
        }).then(function () {
            return location.href = '#!/news';
        });
    }

    $scope.updateNews = function () {
        inputModel = {
            'Title': $scope.news.title,
            'Description': $scope.news.description
        };

        let isValidateSucceed = validateFormInputs(inputModel);
        if (!isValidateSucceed) {
            return;
        }
        updateNews(inputModel);
    };


    //Updating news
    function updateNews(inputModel) {
        newsService.updateNews($routeParams.id, inputModel, function (result) {
            if (result.isSucceed) {
                return operationSucceed();
            } else {
                return operationFailed(result.errors);
            }
        });
    }

    function operationSucceed() {
        Swal.fire({
            'title': 'Nyhet har updaterats.',
            'type': 'success'
        }).then(function () {
            return location.href = '#!/news';
        });
    }

    function operationFailed(errors) {
        let errorMsg;
        try {
            for (var i = 0; i < errors.length; i++) {
                errors += errors[i];
            }
        } finally {
            Swal.fire({
                'title': 'Nyhet har blivit skapad.',
                'text': errorMsg,
                'type': 'warning'
            }).then(function () {
                return;
            });
        }
    }

    //Validate form inputs
    function validateFormInputs(inputModel) {
        let requiredArray = [];
        if (!inputModel.Title) {
            $scope.isTitleEmpty = true;
            requiredArray.push(1);
        } else {
            $scope.isTitleEmpty = false;
        }
        if (!inputModel.Description) {
            $scope.isDescriptionEmpty = true;
            requiredArray.push(1);
        } else {
            $scope.isDescriptionEmpty = false;
        }
        return requiredArray.length > 0 ? false : true;
    }

}]);