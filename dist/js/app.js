(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var bikeBarn = angular.module('bikeBarn', ['ui.router', 'firebase']);

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
  $stateProvider.state('otherwise', {
    url: '*path',
    controller: 'homeCtrl',
    templateUrl: 'templates/home.html'
  });
}]);

bikeBarn.controller('homeCtrl', function ($scope, $firebaseArray, CountThings) {
  var bikeArray = new Firebase("https://bike-barn.firebaseio.com/bikes");
  $scope.bikes = $firebaseArray(bikeArray);


  // bike year count donut display
  $scope.bikes.$loaded().then(function (bikes) {
    
    // return array with one of each bike thing
    var num = bikes.length;
    var thingArray = []
    for (i = 0; i < num; i++) {
      var thing = bikes[i].year;
      var arch = bikes[i].archive;
      var check = thingArray.indexOf(thing);
      if (check === -1 && arch === false) {
        thingArray.push(thing);
      }
    }

    // count each thing and return array
    var thingNum = thingArray.length
    var thingCount = []
    for (i = 0; i < thingNum; i++) {
      var a = thingArray[i];
      var number = 0;
      
      for (x = 0; x < num; x++) {
        var thing = bikes[x].year;
        var arch = bikes[x].archive;
        
        if (a === thing && arch === false) {
          number++
        }
      };

      var count = {label:a, count:number }
      thingCount.push(count);
        console.log('tc',thingCount);
    }
 
    function compare(a,b) {
      if (a.label < b.label)
        return -1;
      if (a.label > b.label)
        return 1;
      return 0;
    }

    thingCount.sort(compare);

    (function (d3) {
      'use strict';

      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;
      var color = d3.scale.category10()
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;

      var svg = d3.select('.year-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + 
          ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function (d) { return d.count; })
        .sort(null);

      var path = svg.selectAll('path')
        .data(pie(thingCount))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
          return color(d.data.label);
        });

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -2 * legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style('fill', 'white')
        .text(function (d) { return d; });
    })(window.d3);
  });

  // bike ready count donut display
  $scope.bikes.$loaded().then(function (bikes) {
    var num = bikes.length;
    var numReady = 0;
    var numOffline = 0;

    for (i = 0; i < num; i++ ) {
      var test = $scope.bikes[i].ready;
      var arch = $scope.bikes[i].archive;
      if (test === 'ready' && arch === false) {
          numReady++;
      }
      else if (test === 'offline' && arch === false) {
        numOffline++;
      }
    };
    $scope.numReady = numReady;
    $scope.numOffline = numOffline;
    var dataset = [
      { label: 'Ready', count: numReady },
      { label: 'Offline', count: numOffline }
    ];

    // synthesized from http://zeroviscosity.com/d3-js-step-by-step/step-2-a-basic-donut-chart
    (function (d3) {
      'use strict';

      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;

      var color = d3.scale.ordinal()
        .range(['#528029', '#8E1212']); // ready, offline

      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;

      var svg = d3.select('.ready-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + 
          ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function (d) { return d.count; })
        .sort(null);

      var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
          return color(d.data.label);
        });

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -2 * legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style('fill', 'white')
        .text(function (d) { return d; });
    })(window.d3);
  });

    // bike type count donut
  $scope.bikes.$loaded().then(function (bikes) {
    
    // return array with one of each bike thing
    var num = bikes.length;
    var thingArray = []
    for (i = 0; i < num; i++) {
      var thing = bikes[i].maintype;
      var arch = bikes[i].archive;
      var check = thingArray.indexOf(thing);
      if (check === -1 && arch === false) {
        thingArray.push(thing);
      }
    }

    // count each thing and return array
    var thingNum = thingArray.length
    var thingCount = []
    for (i = 0; i < thingNum; i++) {
      var a = thingArray[i];
      var number = 0;
      
      for (x = 0; x < num; x++) {
        var thing = bikes[x].maintype;
        var arch = bikes[x].archive;
        
        if (a === thing && arch === false) {
          number++
        }
      };

      var count = {label:a, count:number }
      thingCount.push(count);
    }

    (function (d3) {
      'use strict';

      var width = 360;
      var height = 360;
      var radius = Math.min(width, height) / 2;
      var color = d3.scale.category10()
      var donutWidth = 75;
      var legendRectSize = 18;
      var legendSpacing = 4;

      var svg = d3.select('.type-chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + 
          ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
        .innerRadius(radius - donutWidth)
        .outerRadius(radius);

      var pie = d3.layout.pie()
        .value(function (d) { return d.count; })
        .sort(null);

      var path = svg.selectAll('path')
        .data(pie(thingCount))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function (d, i) {
          return color(d.data.label);
        });

      var legend = svg.selectAll('.legend')
        .data(color.domain())
        .enter()
        .append('g')
        .attr('class', 'legend')
        .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = height * color.domain().length / 2;
          var horz = -2 * legendRectSize;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
        });

      legend.append('rect')
        .attr('width', legendRectSize)
        .attr('height', legendRectSize)
        .style('fill', color)
        .style('stroke', color);

      legend.append('text')
        .attr('x', legendRectSize + legendSpacing)
        .attr('y', legendRectSize - legendSpacing)
        .style('fill', 'white')
        .text(function (d) { return d; });
    })(window.d3);
  });
});

bikeBarn.controller('addCtrl', function ($scope, $firebaseArray, GetTheDate) {
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

bikeBarn.controller('listCtrl', function ($scope, $firebaseArray, GotoLogs, ThingStates) {
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
});

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