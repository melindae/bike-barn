(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('bikeBarn').controller('addCtrl', function($scope, $firebaseArray, GetTheDate) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  var partArray = new Firebase("https://bike-barn.firebaseio.com/parts");
  var bikeTime = Firebase.ServerValue.TIMESTAMP;
  $scope.bikes = $firebaseArray(bikeArray);
  $scope.parts = $firebaseArray(partArray);

  $scope.bk = {
    ready: 'ready'
  };

  $scope.submitForm = function (isValid) {

    GetTheDate.now();
    
    // add leading zero to bike ID if needed
    var checkZero = $scope.bk.ident2;
    if ((checkZero.length == 1) && (0 < checkZero < 10)) {
      addZero = '0' + checkZero;
      $scope.bk.ident = addZero;
      }
    else {
      $scope.bk.ident = checkZero;
    };

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
        'mileage': '',
        'note': 'Log created'
      }]
    });

    if (isValid) {
      alert('Motorcycle added to Barn.');
       $scope.newBikeForm.$setPristine();
    };

    $scope.bk = "";

    $scope.bk = {
    ready: 'ready'
    };
  };
});
},{}]},{},[1]);