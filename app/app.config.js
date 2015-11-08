module.exports = function(ngModule) {
  'use strict';

  ngModule.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/skills', {
      controller: 'SkillsCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/skills/index.html',
    });
    
    $routeProvider.when('/skills/new', {
      controller: 'SkillsNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/skills/new.html',
    });
    
    $routeProvider.when('/vacancies', {
      controller: 'VacanciesCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/vacancies/index.html',
    });
    
    $routeProvider.when('/vacancies/new', {
      controller: 'VacanciesNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/vacancies/new.html',
    });

    $routeProvider.when('/employees', {
      controller: 'EmployeesCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/employees/index.html',
    });

    $routeProvider.when('/employees/new', {
      controller: 'EmployeesNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/employees/new.html',
    });

    $routeProvider.otherwise({ redirectTo: '/vacancies' });
  });
};
