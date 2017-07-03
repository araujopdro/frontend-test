(function() {
  'use strict';

  angular.module('devtest', ['ngRoute']).config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "view/home.html",
        controller: "mainController"
    })

    .when("/404", {
        templateUrl: "view/404.html",
        controller: "mainController"
    })

    .otherwise({ redirectTo: '/404' });
});
})();