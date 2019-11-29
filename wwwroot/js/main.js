var app = angular.module("bilectApp", ["ngRoute"]).run(function () {
    //Angular intial 
});





// App Config
app.config(["$routeProvider",
    function ($routeProvider) {

        // Routing
        $routeProvider.
            when("/home", {
                templateUrl: "/templates/home.html",
                controller: "mainCtrl"
            }).
            when("/addArticle", {
                templateUrl: "/templates/addArticle.html",
                controller: "addArticleCtrl"
            }).
            when("/myArticles", {
                templateUrl: "/templates/myArticles.html",
                controller: "myArticlesCtrl"
            }).
            when("/editArticles/:id", {
                templateUrl: "/templates/editArticle.html",
                controller: "editArticleCtrl"
            }).
            when("/news", {
                templateUrl: "/templates/news.html",
                controller: "newsCtrl"
            }).
            when("/addNews", {
                templateUrl: "/templates/addNews.html",
                controller: "addNewsCtrl"
            }).
            when("/editNews/:id", {
                templateUrl: "/templates/editNews.html",
                controller: "editNewsCtrl"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
]);