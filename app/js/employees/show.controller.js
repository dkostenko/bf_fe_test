module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $routeParams, EmployeeResource) {
    /*jshint validthis:true */
    var vm = this;

    vm.employee = EmployeeResource.get(
      { id: $routeParams.employeeId },
      function(resp) {

      },
      function(resp) {
        alert('errors');
      }
    );
  }

  ngModule.controller('EmployeesShowCtrl', ctrl);
};
