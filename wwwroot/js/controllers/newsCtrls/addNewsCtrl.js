app.controller('addNewsCtrl', ['$scope', 'newsService', function ($scope, newsService) {

    //Trigger input type="file"
    $scope.triggerInputFile = function () {
        $('#imageUpload').click();
    };


    $scope.addNews = function () {
        let inputModel = {
            'Title': $scope.title,
            'Description': $scope.description
        };

        let isValidateSucceed = validateFormInputs(inputModel);
        if (!isValidateSucceed) {
            return;
        }
        postNews(inputModel);
    };

    //Post news
    function postNews(inputModel) {
        newsService.addNews(inputModel, function (result) {
            if (result.isSucceed) {
                return operationSuccess();
            } else {
                return operationFailed(result.errors);
            }
        });
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

    //Handle operation succeed
    function operationSuccess() {
        Swal.fire({
            'title': 'Nyhet har blivit skapad.',
            'type': 'success'
        }).then(function () {
            return location.href = '#!/news';
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
                'title': 'Nyhet har blivit skapad.',
                'text': errorMsg,
                'type': 'warning'
            }).then(function () {
                return;
            });
        }
    }
}]);