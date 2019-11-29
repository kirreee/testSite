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

    //Get my articles
    this.getMyArticles = function (articles) {
        $http({
            method: 'GET',
            url: baseUrl + 'GetMyArticles'
        }).then(function successCallback(response) {
            articles(response.data);
        }, function errorCallback(response) {
            console.log('Response:', response.status);
        });
    };


    //Get article by Id
    this.getArticleById = function (articleId, articleData) {
        $http({
            method: 'GET',
            url: baseUrl + 'GetArticleById/' + articleId
        }).then(function successCallback(response) {
            articleData(response.data);
        }, function errorCallback(response) {
            console.log('Response:', response.status);
        });
    };

    //Update article
    this.updateArticle = function (articleId, articleModel, result) {
        $http({
            method: 'POST',
            url: baseUrl + 'UpdateArticle/' + articleId,
            data: articleModel
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            console.log('Response:', response.status);
        });
    };

    //Delete article
    this.deleteArticle = function (articleId, result) {
        $http({
            method: 'DELETE',
            url: baseUrl + 'DeleteArticle/' + articleId
        }).then(function successCallback(response) {
            result(response.data);
        }, function errorCallback(response) {
            console.log('Response:', response.status);
        });
    };

});