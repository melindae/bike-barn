// $(document).ready(function() {

// });

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
    //controller:'addCtrl',
    templateUrl: 'templates/quick-inventory.html',
  })
  .state('detailInv', {
    url: '/detailed-inventory',
    controller:'detailCtrl',
    templateUrl: 'templates/detailed-inventory.html',
  })
  .state('editBike', {
    url: '/edit-bike',
    controller:'editCtrl',
    templateUrl: 'templates/edit-bike.html',
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
      'notes': $scope.bk.notes,
      'empty1': 0,
      'empty2': 0,
      'empty3': 0,
      'empty4': 0,
    });
  };
})

bikeBarn.controller('detailCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

  $scope.bikes = $firebaseArray(bikeArray);

  $scope.edit = function(bike) {
    var bikeIndex = $scope.bikes.indexOf(bike);
      console.log(bikeIndex);
  };
 
})

bikeBarn.controller('editCtrl', function($scope, $firebaseArray) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");

  $scope.bikes = $firebaseArray(bikeArray);


//         //$scope.model = $scope.bikes[bikeIndex].model;
         var qqq = $scope.bikes[bikeIndex].notes
//         $scope.notes = qqq;
//         console.log();
         console.log(qqq);
//         $scope.model = 'murgle'  



  $scope.savebike = function() {
    $scope.bikes.$add({
      'ready': $scope.bk.ready,
      'ident':$scope.bk.ident,
      'year': $scope.bk.year,
      'make': $scope.bk.make,
      'model': $scope.bk.model,
      'maincolor': $scope.bk.maincolor,
      'maintype': $scope.bk.maintype,
      'sn': $scope.bk.sn,
      'notes': $scope.bk.notes,
      'empty1': 0,
      'empty2': 0,
      'empty3': 0,
      'empty4': 0,
    });
  };
})

bikeBarn.service = ('GetBikeIndex', function() {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  $scope.bikes = $firebaseArray(bikeArray);
  
}

var myModule = angular.module('myModule', []);
myModule.factory('serviceId', function() {
  var shinyNewServiceInstance;
  // factory function body that constructs shinyNewServiceInstance
  return shinyNewServiceInstance;
});

// bikeBarn.directive('editBike', function() {
//   return {
//     restrict: 'A',
//     template: "<td> {{bike.notes}}<button class='edit-button' ng-click='edit(bike)'> <a ui-sref='editBike'>edit</a> </button> </td>",
//     link: function($scope, element, attrs) {
//       $scope.edit = function(bike) {
//         $scope.model = 'murgle'        
//         var bikeIndex = $scope.bikes.indexOf(bike);
//         //$scope.model = $scope.bikes[bikeIndex].model;
//         var qqq = $scope.bikes[bikeIndex].notes
//         $scope.notes = qqq;
//         console.log();
//         console.log(qqq);
//       }
//     }
//   }
// })

//   change state
// doThings.directive('taskComplete', function() {
//    return {
//     restrict: 'A',
//     template: "<button class='tableDone fa fa-check-square-o' ng-click='taskDone(task)'></button>",

//     link: function($scope, element, attrs) {
//       $scope.taskDone = function(task) {
//         var taskIndex = $scope.tasks.indexOf(task);
//         $scope.tasks[taskIndex].done = "Yes!";
//         $scope.tasks.$save(taskIndex).then(function(fireRef) {
//           fireRef.key() === $scope.tasks[taskIndex].$id;
//         });
//       }
//     }
//   }
// });

// // delete entry
// doThings.directive('taskDelete', function() {
//    return {
//     restrict: 'A',
//     template: "<button class='tableDone fa fa-minus-square-o' ng-click='taskDelete(task)'></button>",
//     link: function($scope, element, attrs) {
//       $scope.taskDelete = function(task) {
//         var taskIndex = $scope.tasks.indexOf(task);
//         $scope.tasks.$remove(taskIndex).then(function(fireRef) {
//           fireRef.key() === $scope.tasks[taskIndex].$id;
//         });
//       }
//     }
//   }
// });