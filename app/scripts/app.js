// $(document).ready(function() {

// });

var bikeBarn = angular.module('bikeBarn', ['ui.router', 'firebase']);

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
    controller:'addCtrl',
    templateUrl: 'templates/new-bike.html',
   })
  .state('quickInv', {
    url: '/quick-inventory',
    controller:'addCtrl',
    templateUrl: 'templates/quick-inventory.html',
   })
  .state('detailInv', {
    url: '/detailed-inventory',
    controller:'addCtrl',
    templateUrl: 'templates/detailed-inventory.html',
   })
  .state('otherwise', {
    url: '*path',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  });

}]);


bikeBarn.controller('addCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

  $scope.bikes = $firebaseArray(bikeArray);


  $scope.addbike = function() {
    $scope.bikes.$add({
      'ready': $scope.bk.ready,
      'ident':$scope.bk.ident,
      'year': $scope.bk.year,
      'make': $scope.bk.make,
      'model': $scope.bk.model,
      'maincolor': $scope.bk.maincolor,
      'maintype': $scope.bk.maintype,
      'sn': $scope.bk.sn,
      'notes': $scope.bk.notes,
      'empty1': 0,
      'empty2': 0,
      'empty3': 0,
      'empty4': 0,
    });
  };

  //console.log($scope.bikes)
 
})

  // $scope.addBike = function() {
  //   $scope.bikes.push({
  //     'ready': $scope.bike.ready,
  //     'ident': $scope.bike.ident,
  //     'year': $scope.bike.year,
  //     'make': $scope.bike.make,
  //     'model': $scope.bike.model,
  //     'maincolor': $scope.bike.maincolor,
  //     'maintype': $scope.bike.maintype,
  //     'sn': $scope.bike.sn,
  //     'notes': $scope.bike.notes,
  //     'empty1': 0,
  //     'empty2': 0,
  //     'empty3': 0,
  //     'empty4': 0,
  //   });
  // };


