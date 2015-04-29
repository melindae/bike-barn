(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// $(document).ready(function() {

// });

var bikeBarn = angular.module('bikeBarn', ['ui.router']);

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
    //controller:'someController',
    templateUrl: 'templates/new-bike.html',
   })
  .state('quickInv', {
    url: '/quick-inventory',
    //controller:'someController',
    templateUrl: 'templates/quick-inventory.html',
   })
  .state('detailInv', {
    url: '/detailed-inventory',
    //controller:'someController',
    templateUrl: 'templates/detailed-inventory.html',
   })
  .state('otherwise', {
    url: '*path',
    //controller:'someController',
    templateUrl: 'templates/home.html'
  });

}]);
},{}]},{},[1]);