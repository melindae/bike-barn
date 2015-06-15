(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var bikeBarn = angular.module('bikeBarn', ['ui.router', 'firebase']);

bikeBarn.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  });
  $stateProvider.state('newBike', {
    url: '/new-bike',
    controller: 'addCtrl',
    templateUrl: 'templates/new-bike.html'
  });
  $stateProvider.state('quickInv', {
    url: '/quick-inventory',
    controller: 'listCtrl',
    templateUrl: 'templates/quick-inventory.html'
  });
  $stateProvider.state('maintLog', {
    url: '/maintenance-log',
    controller: 'listCtrl',
    templateUrl: 'templates/maintenance-log.html'
  });
  $stateProvider.state('detailInv', {
    url: '/detailed-inventory',
    controller: 'listCtrl',
    templateUrl: 'templates/detailed-inventory.html'
  });
  $stateProvider.state('otherwise', {
    url: '*path',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  });
}]);


bikeBarn.controller('addCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  var bikeTime = Firebase.ServerValue.TIMESTAMP;
  $scope.bikes = $firebaseArray(bikeArray);

  $scope.addbike = function() {

    $scope.bikes.$add({

      'cycle': [{
        'timestamp': bikeTime,
        'ready': $scope.bk.ready,
        'ident': $scope.bk.ident,
        'year': $scope.bk.year,
        'make': $scope.bk.make,
        'model': $scope.bk.model,
        'maincolor': $scope.bk.maincolor,
        'maintype': $scope.bk.maintype,
        'sn': $scope.bk.sn,
        'extra1': 0,
        'extra2': 0
      }],

      'logs': [{
        'timestamp': bikeTime,
        'date': '8/8',
        'note': 'qstuff qstuff qstuff'
      }]
    });

  };
});


bikeBarn.controller('listCtrl', function($scope, $firebaseArray, GotoLogs) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  $scope.bikes = $firebaseArray(bikeArray);

  $scope.bikeReady = function(ready) {
    if (ready === 'yes') {
      return true;
    }
  };

  $scope.showBikeIndex = function (index) {
    GotoLogs.getIndex(index);
  };

  $scope.showSingleBike = function (index) {
    GotoLogs.giveIndex(index);
    return (activeBikeIndex === index);
  };

  $scope.addLog = function () {
    GotoLogs.giveIndex;  //returns activeBikeIndex
    var bikeIndex = activeBikeIndex;
    var bikekey = $scope.bikes[bikeIndex].$id;
    var logArray = bikeArray.child('-JrYpaJhc_8s1lDMNrq9/mlogs');
    $scope.logs = $firebaseArray(logArray);
    
      console.log(bikekey);

    $scope.logs.$add({
      'date': $scope.bk.date,
      'note': $scope.bk.note
    })  
  }
});

//*************************************
bikeBarn.service('GotoLogs', function() {

  this.getIndex = function(index) {
    activeBikeIndex = index;
  };

  this.giveIndex = function() {
    return activeBikeIndex;
  };
});


bikeBarn.directive('buttonToggle', function() {
  return {
    restrict: 'A',
    template: "<button class='ready-button' ng-click='readyToggle(bike)'>{{bike.ready}}</button>",

    link: function($scope, element, attrs) {
      $scope.readyToggle = function(bike) {
        var bikeIndex = $scope.bikes.indexOf(bike);

        if ($scope.bikes[bikeIndex].ready === 'yes') {
          $scope.bikes[bikeIndex].ready = 'no';
        } else {
          $scope.bikes[bikeIndex].ready = 'yes';
        }

        $scope.bikes[bikeIndex].ready = bike.ready;
        $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
          bikeArray.key() === $scope.bikes[bikeIndex].$id;
        });
      };
    }
  };
});




// bikeBarn.controller('addCtrl', function($scope, $firebaseArray) {
//   var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
//   var cycleArray =bikeArray.child('cycles')
//   var logArray =bikeArray.child('logs')
//   var bikeTime = Firebase.ServerValue.TIMESTAMP;

//   $scope.bikes = $firebaseArray(bikeArray);
//   $scope.cycles = $firebaseArray(cycleArray);
//   $scope.logs = $firebaseArray(logArray);

//   $scope.addbike = function() {

//     $scope.cycles.$add({

//         'timestamp': bikeTime,
//         'ready': $scope.bk.ready,
//         'ident': $scope.bk.ident,
//         'year': $scope.bk.year,
//         'make': $scope.bk.make,
//         'model': $scope.bk.model,
//         'maincolor': $scope.bk.maincolor,
//         'maintype': $scope.bk.maintype,
//         'sn': $scope.bk.sn,
//         'extra1': 0,
//         'extra2': 0
//     });

//     $scope.logs.$add({
//       'timestamp': bikeTime, 
//       'logs': [{
//         'date': '8/8',
//         'note': 'qstuff qstuff qstuff'
//       }]
//     });
//   };

// });




  // **********test data
  // $scope.bikes = [
  //   bike1 = {
  //     name: 'klr',
  //     color: 'black',
  //     type: 'rad',
  //     year: '1999',
  //     mlogs: [
  //        { date: '4', note: 'four' },
  //        { date: '2', note: 'two' },
  //        { date: '1', note: 'one' }
  //     ]},
  //   bike2 = {
  //     name: 'ta',
  //     color: 'white',
  //     type: 'old',
  //     year: '1888',
  //     mlogs: [
  //        { date: '5', note: 'five' },
  //        { date: '2', note: 'two' },
  //        { date: '6', note: 'six' }
  // ]}]
},{}]},{},[1]);