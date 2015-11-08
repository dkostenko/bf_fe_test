module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/employees.json').success(function(resp) {
      vm.employees = resp.employees;
    });
  }

  ngModule.controller('EmployeesCtrl', ctrl);
};
