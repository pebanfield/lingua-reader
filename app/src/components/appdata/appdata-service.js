angular.module('lingua')
  .factory('AppData',
  [function() {

    'use strict';
    var api = {
      appState: {"selectedBook": null,
                 "position": {"chapter": 1,
                              "paragraph": 1,
                              "word": 1}}
    };

    return api;
  }]);