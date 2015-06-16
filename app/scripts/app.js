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

var myDate = new Date(bikeTime*1000);
var formatedTime=myDate.toJSON();

  $scope.addbike = function() {

    $scope.bikes.$add({
      
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
      'extra2': 0,
      'mlogs': [{
        'timestamp': bikeTime,
        'date': '8/8',
        'note': 'bikes.mlogs:stuff'
      }]
    });
  };
});


bikeBarn.controller('listCtrl', function($scope, $firebaseArray, GotoLogs) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  $scope.bikes = $firebaseArray(bikeArray);

  $scope.bikeReady = function(ready) {
    if (ready === 'ready') {
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
      //returns activeBikeIndex
    GotoLogs.giveIndex;  
    var bikeIndex = activeBikeIndex;
      // gets bike id from index
    var bikekey = $scope.bikes[bikeIndex].$id; 
      // converts id and gchild folder into string for .child to use
    var somestring = String(bikekey + '/mlogs'); 
    var logArray = bikeArray.child(somestring);

    $scope.logs = $firebaseArray(logArray);
    
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

        if ($scope.bikes[bikeIndex].ready === 'ready') {
          $scope.bikes[bikeIndex].ready = 'offline';
        } else {
          $scope.bikes[bikeIndex].ready = 'ready';
        }

        $scope.bikes[bikeIndex].ready = bike.ready;
        $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
          bikeArray.key() === $scope.bikes[bikeIndex].$id;
        });
      };
    }
  };
});

  // this calendar directive comes from
  // codepen.io/tutorialab/pen/JDxkn'
bikeBarn.directive("datepicker", function () {
  return {
    restrict: "A",
    require: "ngModel",
    link: function (scope, elem, attrs, ngModelCtrl) {
      var updateModel = function (dateText) {
        scope.$apply(function () {
          ngModelCtrl.$setViewValue(dateText);
        });
      };
      var options = {
        dateFormat: "dd/mm/yy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});