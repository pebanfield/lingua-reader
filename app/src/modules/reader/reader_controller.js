angular.module('lingua.reader')

.controller('ReaderCtrl', ['$scope', 'chapterSet', function($scope, chapterSet) {

    $scope.firstChapter = chapterSet;

    //TODO - track in AppData
    var baseLanguage = 'english';
    var activeText;
    angular.forEach($scope.firstChapter, function(trans){
      if(trans.language === baseLanguage){
        activeText = trans;
      }
    });

    $scope.$broadcast('lingua.parsePageOne');

    $scope.$on('lingua.pageOneParsed', function(){
      $scope.$broadcast('lingua.parsePageTwo');
    });

    $scope.$on('lingua.pageTwoParsed', function(){
      $scope.$broadcast('lingua.parsePageThree');
    });
}]);