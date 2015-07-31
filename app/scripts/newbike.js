angular.module('bikeBarn')
  .controller('addCtrl', 
    function ($scope, $firebaseArray, GetTheDate) {



//angular.module('bikeBarn.controllers').controller('addCtrl', function ($scope, $firebaseArray, GetTheDate) {
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