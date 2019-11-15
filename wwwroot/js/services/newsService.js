app.service('newsService', function ($http) {

    var baseUrl = "/api/News/";


    //POST: News
    this.addNews = function (inputModel, result) {
        $http({
            method: 'POST',
            url: baseUrl + "AddNews",
            data: inputModel
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            result(response.data);
        });
    };

});