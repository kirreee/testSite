app.service('articleService', function ($http) {

    var baseUrl = '/api/Article/';

    //Get enums
    this.getEnums = function (enums) {
        $http({
            method: 'GET',
            url: baseUrl + 'GetEnums'
        }).then(function successCallback(response) {
            enums(response.data);
        }, function errorCallback(response) {
            enums(response.data);
        });
    };

    //Get articles
    this.getArticles = function (articles) {
        $http({
            method: 'GET',
            url: baseUrl + 'GetArticles'
        }).then(function successCallback(response) {
            articles(response.data);
        }, function errorCallback(response) {
            articles(response.data);
        });
    };

    //Add article
    this.addArticle = function (formData, result) {
        $http({
            method: 'POST',
            url: baseUrl + 'AddArticle',
            data: formData
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            result(response.data);
        });
    };


});