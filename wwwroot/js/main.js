var app = angular.module("bilectApp", ["ngRoute"]).run(function () { });



// App Config
app.config(["$routeProvider",
    function ($routeProvider) {

        // Routing
        $routeProvider.
            when("/home", {
                templateUrl: "/templates/home.html",
                controller: "mainCtrl"
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