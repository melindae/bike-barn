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

    var now = new Date()
    var m = now.getMonth();
    var d = now.getDay();
    var y = now.getFullYear();
    var wholedate = String( m + '/' + d + '/' + y )

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
        'date': wholedate,
        'note': 'Log created'
      }]
    });

    $scope.bk = "";
  };
});


bikeBarn.controller('listCtrl', function($scope, $firebaseArray, GotoLogs) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  var partArray = new Firebase("https://bike-barn.firebaseio.com/parts");
  $scope.bikes = $firebaseArray(bikeArray);
  $scope.parts = $firebaseArray(partArray);

    $scope.bikeReady = function(ready) {
    return ThingStates.readyThing(ready);
  };

  $scope.archived = function(bike) {
    return ThingStates.archiveThing(bike);
  };

  $scope.showBikeIndex = function (index) {
    GotoLogs.getIndex(index);
  };

  $scope.showSingleBike = function (index) {
    GotoLogs.giveIndex(index);
    return (activeBikeIndex === index);
  };

  $scope.bikeArchive = function (index) {
    $scope.bikes[index].archive = true;
    $scope.bikes.$save(index).then(function(bikeArray) {
      bikeArray.key() === $scope.bikes[index].$id;
    });
  }

  // $scope.bikeReady = function(ready) {
  //   if (ready === 'ready') {
  //     return true;
  //   }
  // };

//*************************************************************
  $scope.logArchive = function (logIndex, mlogIndex) {
    var logArchIndex = $scope.logs[logIndex].$id;
        console.log(logIndex, mlogIndex);
    var somestring = String(logArchIndex + '/mlogs'); 
        console.log(somestring);
    var newLogArray = logArray.child(somestring);
        console.log(newLogArray);
    $scope.newArchlogs = $firebaseArray(newLogArray);
    $scope.newArchlogs[2].archive = true;
        console.log('nla',$scope.newArchlogs);
        
        console.log($scope.newArchlogs[2]);


    // $scope.newlogs.$add({
    //   'timestamp': bikeTime,
    //   "archive": false,
    //   'date': $scope.bk.date,
    //   'note': $scope.bk.note
    // })
  }


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
      'timestamp': bikeTime,
      "archive": false,      
      'date': $scope.bk.date,
      'note': $scope.bk.note
    })  

     $scope.bk = "";
    
  }

  $scope.reset = function() {
    getElementsByClassName("datepickr").value = "";
  }

//******************************************
  $scope.logDelete = function(bike,log) {
    var removeLog = String(bike + '/mlogs/' + log);
        //console.log(removeLog);
    var removeLogArray = bikeArray.child(removeLog);
        //console.log(removeLogArray);
    $scope.logs = $firebaseArray(removeLogArray);

    $scope.logs.$remove();
  };

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

bikeBarn.service('ThingStates', function() {
  this.readyThing = function(ready) {
    if (ready === 'ready') {
      return true;
    }
  };
  this.archiveThing = function(bike) {
    if (bike === true) {
        return  true;
    }
  }
})

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


// bikeBarn.directive('logDelete', function() {
//    return {
//     restrict: 'A',
//     link: function($scope, element, attrs) {
//       $scope.logDelete = function(bike,log) {
//         var removeLog = String(bike/log);
//         var removeLogArray = bikeArray.child(removeLog)

//         $scope.logs = $firebaseArray(removeLogArray);
 
//         $scope.logs.$remove()


        
//       }
//     }
//   }
// });



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