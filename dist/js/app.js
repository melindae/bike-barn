(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var bikeBarn = angular.module('bikeBarn', ['ui.router', 'firebase']);
angular.module('bikeBarn.controllers', []);

bikeBarn.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider.state('home', {
    url: '/home',
    controller: 'homeCtrl',
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
  $stateProvider.state('about', {
    url: '/about',
    controller: '',
    templateUrl: 'templates/about.html'
  });
  $stateProvider.state('otherwise', {
    url: '*path',
    controller: 'homeCtrl',
    templateUrl: 'templates/home.html'
  });
}]);

//*************************************
bikeBarn.service('GetTheDate', function () {
  this.now = function () {
    var now = new Date();
    var m = ((now.getMonth())+1);
    var d = now.getDate();
    var y = now.getFullYear();
    if (m < 10) {
      m = String('0' + m);
    }
    if (d < 10) {
      d = String('0' + d);
    }
    wholedate = String( m + '/' + d + '/' + y );
  };
})

bikeBarn.service('CountThings', function () {
  this.count = function (field) {
   
    // return array with one of each bike thing
    var num = bikes.length;
    var listArray = []
    for (i = 0; i < num; i++) {
      var thing = bikes[i].field;
      var arch = bikes[i].archive;
      var check = listArray.indexOf(thing);
      if (check === -1 && arch === false) {
        listArray.push(thing);
      }
    }

    // count each thing and return array
    var thingNum = listArray.length
    var thingCount = []
    for (i = 0; i < thingNum; i++) {
      var a = listArray[i];
      var number = 0;
      
      for (x = 0; x < num; x++) {
        var thing = bikes[x].field;
        var arch = bikes[x].archive;
        
        if (a === thing && arch === false) {
          number++
        }
      };

      var count = {label:a, count:number }
      thingCount.push(count);
    }

    return thingCount;
  };
})

bikeBarn.service('GotoLogs', function () {
  this.giveIndex = function (i) {
    activeBikeIndex = i;
    localStorage.setItem('rememberABI', JSON.stringify(i))
  };

  this.getIndex = function () {
    var activeBikeIndex = JSON.parse(localStorage.getItem('rememberABI'));
    return activeBikeIndex;
  };
});

bikeBarn.service('ThingStates', function () {
  this.readyThing = function (ready) {
    if (ready === 'ready') {
      return true;
    }
  };
  this.archiveThing = function (bike) {
    if (bike === true) {
        return true;
    }
  };
});

bikeBarn.directive('buttonToggle', function () {
  return {
    restrict: 'A',
    template: "<button ng-class=\"bike.ready === 'offline' ? 'red-button common-button' : 'green-button common-button'\" ng-click='readyToggle(bike)'>{{bike.ready}}</button>",

    link: function ($scope, element, attrs) {
      $scope.readyToggle = function (bike) {
        var bikeIndex = $scope.bikes.indexOf(bike);

        if ($scope.bikes[bikeIndex].ready === 'ready') {
          $scope.bikes[bikeIndex].ready = 'offline';
        } else {
          $scope.bikes[bikeIndex].ready = 'ready';
        }

        $scope.bikes[bikeIndex].ready = bike.ready;
        $scope.bikes.$save(bikeIndex).then(function (bikeArray) {
          bikeArray.key() === $scope.bikes[bikeIndex].$id;
        });
      };
    }
  };
});


// kudos to http://justinklemm.com/angularjs-filter-ordering-objects-ngrepeat/ 
// for explaining filters and walking me throught this piece of code
bikeBarn.filter('orderObjectBy', function () {
  return function (items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function (item) {
      filtered.push(item);
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) {
      filtered.reverse();
      return filtered;
    }
  };
});
},{}]},{},[1]);