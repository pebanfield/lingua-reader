angular.module('lingua')
  .factory('BookService',
  ['$http', '$q', function($http, $q) {

    'use strict';

    //hardcoded yay because I can! yay!
    var serviceBasePath = 'http://localhost:3000/';

    $http.defaults.useXDomain = true;

    var api = {
      getCatalog: _getCatalog,
      getBook: _getBook,
      getTranslations: _getTranslations,
      getChapter: _getChapter,
      getChapterSet: _getChapterSet
    };

    function _getCatalog(){

      var deferred = $q.defer();

      $http.get(serviceBasePath + 'books/').
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          //TODO
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function _getBook(id){

      var deferred = $q.defer();

      $http.get(serviceBasePath + 'books/' + id).
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          //TODO
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function _getTranslation(bookId, transId){

      var deferred = $q.defer();

      $http.get(serviceBasePath + 'books/' + bookId + '/trans/' + transId).
        success(function(data, status, headers, config) {
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          //TODO
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function _getTranslations(book){

      var deferred = $q.defer();

      var trans = [];
      for(var b=0; b<book.texts.length; b++) {
        trans.push(_getTranslation(book.id, book.texts[b].id));
      }
      $q.all(trans).then(function(translations){
        deferred.resolve(translations);
      });

      return deferred.promise;
    }

    function _getChapter(bookId, trans, chapterId){

      var deferred = $q.defer();

      $http.get(serviceBasePath + 'books/'
                                + bookId
                                + '/trans/' + trans.id
                                + '/chapters/' + chapterId).
        success(function(data, status, headers, config) {
          data.language = trans.language;
          deferred.resolve(data);
        }).
        error(function(data, status, headers, config) {
          //TODOOP
          deferred.reject(data);
        });

      return deferred.promise;
    }

    function _getChapterSet(bookId, translations, chapter){

      var deferred = $q.defer();

      var trans = [];
      for(var t=0; t<translations.length; t++) {
        trans.push(_getChapter(bookId,
                               translations[t].translation,
                               'c'+chapter));
      }
      $q.all(trans).then(function(chapters){
        deferred.resolve(chapters);
      });
      return deferred.promise;
    }

    return api;
  }]);