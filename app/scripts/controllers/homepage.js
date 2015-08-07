angular.module('bikeBarn').controller('homeCtrl', function ($scope, $firebaseArray, CountThings) {
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