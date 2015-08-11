angular.module('bikeBarn').controller('listCtrl', function($scope, $firebaseArray, GotoLogs, ThingStates) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  var partArray = new Firebase("https://bike-barn.firebaseio.com/parts");
  var bikeTime = Firebase.ServerValue.TIMESTAMP;
  $scope.bikes = $firebaseArray(bikeArray);
  $scope.parts = $firebaseArray(partArray);

  $scope.bikeReady = function (ready) {
    return ThingStates.readyThing(ready);
  };

  $scope.archived = function (bike) {
    return ThingStates.archiveThing(bike);
  };

  $scope.showBikeIndex = function (time) {
    for (i = 0; i < $scope.bikes.length; i++) {
      if ($scope.bikes[i].timestamp === time) {
        GotoLogs.giveIndex(i);
      }
    }
  };

  $scope.showSingleBike = function (index) {
    var activeBikeIndex = JSON.parse(localStorage.getItem('rememberABI'));
    return (activeBikeIndex === index);
  };

  $scope.bikeArchive = function (time) {
    var doIt = confirm('Are you sure you want to remove this bike?');
    if (doIt === true) {

      for (i = 0; i < $scope.bikes.length; i++) {
        if ($scope.bikes[i].timestamp === time) {
          $scope.bikes[i].archive = true;
          $scope.bikes.$save(i);
        }
      }
    }
  };

  $scope.addLog = function () {
    GotoLogs.getIndex;  //returns activeBikeIndex
    var bikeIndex = activeBikeIndex;
    var bikekey = $scope.bikes[bikeIndex].$id;
    var somestring = String(bikekey + '/mlogs');
    var logArray = bikeArray.child(somestring);

    $scope.logs = $firebaseArray(logArray);

    $scope.logs.$add({
      'archive': false,
      'timestamp': bikeTime,
      'date': $scope.bk.date,
      'mileage': $scope.bk.mileage,
      'note': $scope.bk.note
    });

     $scope.bk = "";
  };

  $(function () {
    $( "#datepicker" ).datepicker();
    defaultDate: null;
  });

  $scope.bikeEdit = function(bike, time) {
    console.log(bike, time);
  };
  $scope.saveEdit = function(bike, time) {
    console.log(bike, time);
    for (i = 0; i < $scope.bikes.length; i++) {
      if ($scope.bikes[i].timestamp === time) {
        $scope.bikes.$save(i);
      }
    }
  };
});