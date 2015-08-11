(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);