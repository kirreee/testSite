app.controller('addArticleCtrl', ['$scope', 'articleService', function($scope, articleService) {

    //Get enums
    articleService.getEnums(function(enums) {
        $scope.carTypes = enums.carTypes;
        $scope.fuelTypes = enums.fuelTypes;
        $scope.gearboxTypes = enums.gearboxTypes;
    });


    $scope.setActiveDriveWheel = function(event) {
        $('.driveWheel-icon-holder').not(event.target).removeClass('driveWheel-icon-holder-active');
        $(event.target).addClass('driveWheel-icon-holder-active');
    };

    $scope.addArticle = function() {
        let inputModel = {
            'Title': $scope.title,
            'Description': $scope.description,
            'ManuFacturer': $scope.manuFacturer,
            'RegistrationNumber': $scope.registrationNumber,
            'Mileage': $scope.mileage,
            'Cartype': $scope.carType,
            'Model': $scope.model,
            'YearModel': $scope.yearModel,
            'Price': $scope.price,
            'Gearbox': $scope.gearBox,
            'Fueltype': $scope.fuelType,
            'Color': $scope.color,
            'Seats': $scope.seats,
            'HorsePower': $scope.horsePower,
            'Emission': $scope.emission,
            'Weight': $scope.weight,
            'Length': $scope.length,
            'Height': $scope.height,
            'Width': $scope.width,
            'DriveWheel': getSelectedDriveWheel(),
            'Images': null
        };

        let isValidateSucceed = valiDateFormData(inputModel);
        if (!isValidateSucceed) {
            return;
        }

        postArticle(inputModel);
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


    function postArticle(inputModel) {
        articleService.addArticle(inputModel, function (result) {
            if (result.isSucceed) {
                return handleOpeartionSucceed();
            } else {
                return handleOperationError();
            }
        });
    }

    function handleOpeartionSucceed() {
        Swal.fire({
            'title': 'Din anons har blivit skapad',
            'type': 'success'
        }).then(function () {
            return location.href = '#!/home';
        });
    }

    function handleOperationError() {
        Swal.fire({
            'title': 'Gick inte skapa anons',
            'type': 'error'
        }).then(function () {
            return;
        });
    }


    //Validation
    function valiDateFormData(inputModel) {
        let requiredAray = [];

        if (!inputModel.Title) {
            $scope.isTitleEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isTitleEmpty = false;
        }
        if (!inputModel.Description) {
            $scope.isDescriptionEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isDescriptionEmpty = false;
        }
        if (!inputModel.Fueltype) {
            $scope.isFueltypeEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isFueltypeEmpty = false;
        }
        if (!inputModel.Gearbox) {
            $scope.isGearboxEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isGearboxEmpty = false;
        }
        if (!inputModel.Color) {
            $scope.isColorEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isColorEmpty = false;
        }
        if (!inputModel.RegistrationNumber) {
            $scope.isRegistrationNumberEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isRegistrationNumberEmpty = false;
        }
        if (!inputModel.HorsePower) {
            $scope.isHorsePowerEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isHorsePowerEmpty = false;
        }
        if (!inputModel.Price) {
            $scope.isPriceEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isPriceEmpty = false;
        }
        if (!inputModel.Model) {
            $scope.isModelEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isModelEmpty = false;
        }
        if (!inputModel.ManuFacturer) {
            $scope.isManufacturerEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isManufacturerEmpty = false;
        }
        if (!inputModel.YearModel) {
            $scope.isYearEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isYearEmpty = false;
        }
        if (!inputModel.Cartype) {
            $scope.isCartypeEmpty = true;
            requiredAray.push(1);
        } else {
            $scope.isCartypeEmpty = false;
        }
        if (!inputModel.Mileage) {
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