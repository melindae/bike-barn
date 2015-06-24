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
  var partArray = new Firebase("https://bike-barn.firebaseio.com/parts");
  var bikeTime = Firebase.ServerValue.TIMESTAMP;
  $scope.bikes = $firebaseArray(bikeArray);
  $scope.parts = $firebaseArray(partArray);

  $scope.addbike = function() {

    var now = new Date()
    var m = now.getMonth();
    var d = now.getDay();
    var y = now.getFullYear();
    var wholedate = String( m + '/' + d + '/' + y )

    $scope.bikes.$add({
      'archive': false,
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
        'archive': false,
        'timestamp': bikeTime,
        'date': wholedate,
        'note': 'Log created'
      }]
    });

    $scope.bk = "";
  };
});


bikeBarn.controller('listCtrl', function($scope, $firebaseArray, GotoLogs, ThingStates) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  var partArray = new Firebase("https://bike-barn.firebaseio.com/parts");
  var bikeTime = Firebase.ServerValue.TIMESTAMP;
  $scope.bikes = $firebaseArray(bikeArray);
  $scope.parts = $firebaseArray(partArray);
  // var testArray1 = new Firebase("https://bike-barn.firebaseio.com/bikes/-JsCOuI3zpWRPsPhgrZd/mlogs");
  // $scope.testme1 = $firebaseArray(testArray1);

  // this is done in html, keeping code for a bit,
  // $scope.bikeReady = function(ready) {
  //   return ThingStates.readyThing(ready);
  // };

  // $scope.archived = function(bike) {
  //   return ThingStates.archiveThing(bike);
  // };

  $scope.showBikeIndex = function (index) {
    GotoLogs.getIndex(index);
  };

  $scope.showSingleBike = function (index) {
    GotoLogs.giveIndex(index);
    return (activeBikeIndex === index);
  };

  $scope.bikeArchive = function (bike) {
    $scope.bikes[bike].archive = true;
    $scope.bikes.$save(bike).then(function(bikeArray) {
      bikeArray.key() === $scope.bikes[bike].$id;
    })
  };

  $scope.addLog = function () {
    GotoLogs.giveIndex;   //returns activeBikeIndex
    var bikeIndex = activeBikeIndex;
    var bikekey = $scope.bikes[bikeIndex].$id; 
    var somestring = String(bikekey + '/mlogs'); 
    var logArray = bikeArray.child(somestring);

    $scope.logs = $firebaseArray(logArray);
    
    $scope.logs.$add({
      'archive': false,
      'timestamp': bikeTime,      
      'date': $scope.bk.date,
      'note': $scope.bk.note
    })  

     $scope.bk = "";
    
  }

  $scope.reset = function() {
    getElementsByClassName("datepickr").value = "";
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

// this is done in html, keeping code for a bit,
// bikeBarn.service('ThingStates', function() {
//   this.readyThing = function(ready) {
//     if (ready === 'ready') {
//       return true;
//     }
//   };
//   this.archiveThing = function(bike) {
//     if (bike === true) {
//         return  true;
//     }
//   }
// });

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
        dateFormat: "mm/dd/yyyy",
        onSelect: function (dateText) {
          updateModel(dateText);
        }
      };
      elem.datepicker(options);
    }
  }
});




  // $scope.logArchive = function (bikeIndex, index) {

  //   var logArchIndex = $scope.bikes[bikeIndex].$id;
  //   var somestring = String(logArchIndex + '/mlogs'); 
  //   var newLogArray = bikeArray.child(somestring);
  //   $scope.newArchlogs = $firebaseArray(newLogArray);

  //   var test1 = $scope.newArchlogs[index].archive;
  //   $scope.newArchlogs[index].archive = false;

  //   $scope.testme1.$save(index).then(function(bikeArray) {
  //       bikeArray.key() === $scope.bikes[bikeIndex].$id;
  //   });
  // };

  // $scope.logDelete = function(bikeIndex, index) {
  //   var bikekey = $scope.bikes[bikeIndex].$id;
  //   var removeLog = String("https://bike-barn.firebaseio.com/bikes/" + bikekey + '/mlogs');
  //   var removeLogArray = new Firebase(removeLog);
  //   $scope.logz = $firebaseArray(removeLogArray);
  //   var gone = $scope.logz[index];
  //       console.log(gone);

  //   $scope.logz.$remove(gone).then(function(bikeArray) {
  //     bikeArray.key() === $scope.bikes[bikeIndex].$id;
  //   });
  // };