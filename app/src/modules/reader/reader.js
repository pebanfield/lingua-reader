'use strict';

angular.module('lingua.reader', ['ionic', 'config'])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('reader', {
        url: "/reader",
        templateUrl: "src/modules/reader/reader.html",
        controller: 'ReaderCtrl',
        resolve: {
          chapterSet: ['BookService', 'AppData', function(BookService, AppData){
            return BookService.getTranslations(AppData.appState.selectedBook)
              .then(function(result){
                var selectedBookId = AppData.appState.selectedBook.id;
                var chapter = AppData.appState.position.chapter;
                return BookService.getChapterSet(selectedBookId, result, chapter);
              });
          }]
        },
        onEnter: ['chapterSet',
          function(chapterSet){

            console.log("test")
          }]
      });

});