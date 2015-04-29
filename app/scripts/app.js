// $(document).ready(function() {

// });

var bikeBarn = angular.module('bikeBarn', ['ui.router']);

bikeBarn.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
$locationProvider.html5Mode(true);

  $stateProvider
  .state('home', {
    url: '',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  })
  .state('newBike', {
    url: '/new-bike',
    //controller:'someController',
    templateUrl: 'templates/new-bike.html',
   })
  .state('quickInv', {
    url: '/quick-inventory',
    //controller:'someController',
    templateUrl: 'templates/quick-inventory.html',
   })
  .state('detailInv', {
    url: '/detailed-inventory',
    //controller:'someController',
    templateUrl: 'templates/detailed-inventory.html',
   })
  .state('otherwise', {
    url: '*path',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  });

}]);