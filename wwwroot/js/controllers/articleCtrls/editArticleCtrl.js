app.controller('editArticleCtrl', ['$scope', '$routeParams', 'articleService', function ($scope, $routeParams, articleService) {


    //Gets article data
    articleService.getArticleById($routeParams.id, function (articleData) {
        $scope.article = articleData;

        setActiveDriveWheel(articleData.driveWheel); //Set orange border on selected driveWheel
    });

    //Get enums to selectLists
    articleService.getEnums(function (enums) {
        $scope.carTypes = enums.carTypes;
        $scope.gearboxTypes = enums.gearboxTypes;
        $scope.fuelTypes = enums.fuelTypes;
    });


    function setActiveDriveWheel(driveWheel) {
        let activeClass = 'driveWheel-icon-holder-active';
        $('#' + driveWheel).addClass(activeClass);
    }

    $scope.updateArticle = function () {

        let isValidateSucceed = valiDateFormData();
        if (!isValidateSucceed) {
            return;
        }

        $scope.article.driveWheel = getSelectedDriveWheel();

        articleService.updateArticle($routeParams.id, $scope.article, function (result) {
            if (result.isSucceed) {
                Swal.fire({
                    title: 'Anons har blivit updaterad',
                    type: 'success'
                }).then(function () {
                    location.href = '#!/myArticles';
                });
            } else {
                Swal.fire({
                    title: 'Något gick fel',
                    text: 'Gick inte updatera annons',
                    type: 'warning'
                }).then(function () {
                    location.href = '#!/myArticles';
                });
            }
        });
    };


    $scope.setActiveDriveWheel = function (event) {
        $('.driveWheel-icon-holder').not(event.target).removeClass('driveWheel-icon-holder-active');
        $(event.target).addClass('driveWheel-icon-holder-active');
    };

    function getSelectedDriveWheel() {
        let selectedDriveWheel = $('.driveWheel-icon-holder-active').find('p').text();
        switch (selectedDriveWheel) {
            case 'Framhjulsdriven':
                return 1;
            case 'Fyrhjulsdriven':
                return 2;
            case 'Bakhjulsdriven':
                return 3;
            default:
                return 1;
        }
    }


    //Validation
    function valiDateFormData() {
        let requiredAray = [];

        if (!$scope.article.title) {
            $scope.isTitleEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isTitleEmpty = false;
        }
        if (!$scope.article.description) {
            $scope.isDescriptionEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isDescriptionEmpty = false;
        }
        if (!$scope.article.fuelType) {
            $scope.isFueltypeEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isFueltypeEmpty = false;
        }
        if (!$scope.article.gearbox) {
            $scope.isGearboxEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isGearboxEmpty = false;
        }
        if (!$scope.article.color) {
            $scope.isColorEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isColorEmpty = false;
        }
        if (!$scope.article.registrationNumber) {
            $scope.isRegistrationNumberEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isRegistrationNumberEmpty = false;
        }
        if (!$scope.article.horsePower) {
            $scope.isHorsePowerEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isHorsePowerEmpty = false;
        }
        if (!$scope.article.price) {
            $scope.isPriceEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isPriceEmpty = false;
        }
        if (!$scope.article.model) {
            $scope.isModelEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isModelEmpty = false;
        }
        if (!$scope.article.manuFacturer) {
            $scope.isManufacturerEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isManufacturerEmpty = false;
        }
        if (!$scope.article.yearModel) {
            $scope.isYearEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isYearEmpty = false;
        }
        if (!$scope.article.carType) {
            $scope.isCartypeEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isCartypeEmpty = false;
        }
        if (!$scope.article.mileage) {
            $scope.isMileageEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isMileageEmpty = false;
        }

        if (requiredAray.length > 0) {
            return false;
        }

        return true;
    }

}]);