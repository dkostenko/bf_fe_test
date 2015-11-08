module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $location, EmployeeResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createEmployee = createEmployee;
    
    vm.employee = new EmployeeResource({
      name: ''
    });

    function createEmployee() {
      vm.employee.$save({}, 
        function(resp) {
          $location.url('/employees');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
  }

  ngModule.controller('EmployeesNewCtrl', ctrl);
};
