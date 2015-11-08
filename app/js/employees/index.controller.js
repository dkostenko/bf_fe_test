module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/employees.json').success(function(resp) {
      vm.employees = resp.employees;
      vm.employeesCount = resp.total_count;
    });
  }

  ngModule.controller('EmployeesCtrl', ctrl);
};
