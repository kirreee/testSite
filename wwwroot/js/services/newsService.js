app.service('newsService', function ($http) {

    var baseUrl = "/api/News/";

    //GET: AllNews
    this.getAllNews = function (data) {
        $http({
            method: 'GET',
            url: baseUrl + "GetAllNews"
        }).then(function successCallback(response) {
            data(response.data);
        }, function errorCallback(response) {
            data(response.data);
        });
    };


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

    //GET: News/{Id}
    this.getNewsById = function (newsId, data) {
        $http({
            method: 'GET',
            url: baseUrl + "GetNewsById/" + newsId
        }).then(function successCallback(response) {
            data(response.data);
        }, function errorCallback(response) {
            data(response.data);
        });
    };

    //POST: News/{Id} 
    this.updateNews = function (newsId, inputModel, result) {
        $http({
            method: 'POST',
            url: baseUrl + "UpdateNews/" + newsId,
            data: inputModel
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            result(response.data);
        });
    };

    //DELETE: News/{Id}
    this.deleteNews = function (newsId, result) {
        $http({
            method: 'DELETE',
            url: baseUrl + "DeleteNews/" + newsId
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            result(response.data);
        });
    };

});