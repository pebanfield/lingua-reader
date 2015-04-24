// Lingua Reader

angular.module('lingua', ['ionic', 'ngStorage', 'lingua.home', 'lingua.reader'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($urlRouterProvider, $stateProvider, $httpProvider) {

  $stateProvider

    .state('app', {
      url: '/',
      controller: 'AppCtrl as app'
    });

 $urlRouterProvider.otherwise('/home');

 $httpProvider.defaults.useXDomain = true;
 delete $httpProvider.defaults.headers.common['X-Requested-With'];

});


