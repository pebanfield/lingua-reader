angular.module('lingua.home')

  .controller('HomeCtrl', ['$scope', 'catalog', '$state', 'AppData', function($scope, catalog, $state, AppData) {

    console.log("reader home");
    $scope.catalog = catalog;

    $scope.readBook = function(book){
        AppData.appState.selectedBook = book;
        $state.go('reader');
    };
  }]);