(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    controller:'listCtrl',
    templateUrl: 'templates/quick-inventory.html',
  })
  .state('detailInv', {
    url: '/detailed-inventory',
    controller:'listCtrl',
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
})

bikeBarn.controller('listCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

  $scope.bikes = $firebaseArray(bikeArray);

  $scope.editNote = function(bike) {
    var bikeIndex = $scope.bikes.indexOf(bike);
  }

  $scope.saveNote = function(bike) {
    var bikeIndex = $scope.bikes.indexOf(bike);
    $scope.bikes[bikeIndex].notes = bike.notes;
    $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
      bikeArray.key() === $scope.bikes[bikeIndex].$id;
    })
  }

  $scope.bikeReady = function(ready) {
    if (ready === 'yes') {
      return true;
    }; 
  }
})


bikeBarn.directive('buttonToggle', function() {
   return {
    restrict: 'A',
    template: "<button class='ready-button' ng-click='readyToggle(bike)'>{{bike.ready}}</button>",

    link: function($scope, element, attrs) {
      $scope.readyToggle = function(bike) {
        var bikeIndex = $scope.bikes.indexOf(bike);

        if ($scope.bikes[bikeIndex].ready === 'yes') {
            $scope.bikes[bikeIndex].ready = 'no';
          }
        else {
            $scope.bikes[bikeIndex].ready = 'yes';
          }

        $scope.bikes[bikeIndex].ready = bike.ready;
        $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
          bikeArray.key() === $scope.bikes[bikeIndex].$id;
        });
      }
    }
  }
});

        // playing with color changes
        // if ($scope.bikes[bikeIndex].ready === 'yes') {
        //   $('button').removeClass('red-button');
        //   $('button').addClass('green-button');
        // }
        // else {
        //   $('button').removeClass('green-button');
        //   $('button').addClass('red-button');
        // }
},{}]},{},[1]);