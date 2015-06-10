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
   .state('maintLog', {
    url: '/maintenance-log',
    controller:'listCtrl',
    templateUrl: 'templates/maintenance-log.html',
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
      'mlogs': [{'date': '3/3', 'note': 'stuff stuff stuff'}],
      'extra1': 0,
      'extra2': 0
    });
  };
})


bikeBarn.controller('listCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  $scope.bikes = $firebaseArray(bikeArray);

  $scope.bikes = [
    bike1 = {
      name: 'klr',
      color: 'black',
      type: 'rad',
      year: '1999',
      mlogs: [
         { date: '4', note: 'four' },
         { date: '2', note: 'two' },
         { date: '1', note: 'one' }
      ]},
    bike2 = {
      name: 'ta',
      color: 'white',
      type: 'old',
      year: '1888',
      mlogs: [
         { date: '5', note: 'five' },
         { date: '2', note: 'two' },
         { date: '6', note: 'six' }
      ]}]


  $scope.bikeReady = function(ready) {
    if (ready === 'yes') {
      return true;
    }; 
  }

  // ********** get index of parent bike
  $scope.showBikeIndex = function(index) {
    $scope.activebikeIndex = index;
    console.log(index);
  };
  // ********** if parent bikes index matches = true / show
  $scope.showSingleBike = function(index) {
    return $scope.activebikeIndex === index;
    console.log(index); 
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







// $(document).ready(function() {

// });

// var bikeBarn = angular.module('bikeBarn', ['ui.router', 'firebase']);

// bikeBarn.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
// $locationProvider.html5Mode(true);

//   $stateProvider
//   .state('home', {
//     url: '',
//     //controller:'someController',
//     templateUrl: 'templates/home.html'
//   })
//   .state('newBike', {
//     url: '/new-bike',
//     controller:'addCtrl',
//     templateUrl: 'templates/new-bike.html',
//   })
//   .state('quickInv', {
//     url: '/quick-inventory',
//     controller:'listCtrl',
//     templateUrl: 'templates/quick-inventory.html',
//   })
//   .state('detailInv', {
//     url: '/detailed-inventory',
//     controller:'listCtrl',
//     templateUrl: 'templates/detailed-inventory.html',
//   })
//   .state('otherwise', {
//     url: '*path',
//     //controller:'someController',
//     templateUrl: 'templates/home.html'
//   });

// }]);


// bikeBarn.controller('addCtrl', function($scope, $firebaseArray) {
//   var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

//   $scope.bikes = $firebaseArray(bikeArray);

//   $scope.addbike = function() {
//     $scope.bikes.$add({
//       'ready': $scope.bk.ready,
//       'ident':$scope.bk.ident,
//       'year': $scope.bk.year,
//       'make': $scope.bk.make,
//       'model': $scope.bk.model,
//       'maincolor': $scope.bk.maincolor,
//       'maintype': $scope.bk.maintype,
//       'sn': $scope.bk.sn,
//       'mlogs': $scope.bk.mlogs,
//       'empty1': 0,
//       'empty2': 0,
//       'empty3': 0,
//       'empty4': 0,
//     });
//   };
// })

// bikeBarn.controller('listCtrl', function($scope, $firebaseArray) {
//   var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

//   $scope.bikes = $firebaseArray(bikeArray);

//   $scope.editMlog = function(bike) {
//     var bikeIndex = $scope.bikes.indexOf(bike);
//   }

//   $scope.saveMlog = function(bike) {
//     var bikeIndex = $scope.bikes.indexOf(bike);
//     $scope.bikes[bikeIndex].mlogs = bike.mlogs;
//     $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
//       bikeArray.key() === $scope.bikes[bikeIndex].$id;
//     })
//   }

//   $scope.bikeReady = function(ready) {
//     if (ready === 'yes') {
//       return true;
//     }; 
//   }
// })


// bikeBarn.directive('buttonToggle', function() {
//    return {
//     restrict: 'A',
//     template: "<button class='ready-button' ng-click='readyToggle(bike)'>{{bike.ready}}</button>",

//     link: function($scope, element, attrs) {
//       $scope.readyToggle = function(bike) {
//         var bikeIndex = $scope.bikes.indexOf(bike);

//         if ($scope.bikes[bikeIndex].ready === 'yes') {
//             $scope.bikes[bikeIndex].ready = 'no';
//           }
//         else {
//             $scope.bikes[bikeIndex].ready = 'yes';
//           }

//         $scope.bikes[bikeIndex].ready = bike.ready;
//         $scope.bikes.$save(bikeIndex).then(function(bikeArray) {
//           bikeArray.key() === $scope.bikes[bikeIndex].$id;
//         });
//       }
//     }
//   }
// });

        // playing with color changes
        // if ($scope.bikes[bikeIndex].ready === 'yes') {
        //   $('button').removeClass('red-button');
        //   $('button').addClass('green-button');
        // }
        // else {
        //   $('button').removeClass('green-button');
        //   $('button').addClass('red-button');
        // }
