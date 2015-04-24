'use strict';

angular.module('lingua.home', ['ionic', 'config'])

  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('home', {
        url: "/home",
        templateUrl: "src/modules/home/home.html",
        controller: 'HomeCtrl as home',
        resolve: { catalog:
          ['BookService', 'AppData', function (BookService, AppData) {
            return BookService.getCatalog()
              .then(function (result) {
                return result;
              });
          }]
        }
      });

  });