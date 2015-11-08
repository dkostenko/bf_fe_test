module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, EmployeeResource) {
    /*jshint validthis:true */
    var vm = this;
    
    EmployeeResource.query({}, function(resp) {
      vm.employees = resp.employees;
      vm.employeesCount = resp.total_count;
    });
  }

  ngModule.controller('EmployeesCtrl', ctrl);
};
