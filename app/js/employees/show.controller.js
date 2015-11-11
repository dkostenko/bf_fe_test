module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $routeParams, EmployeeResource, EmployeeVacancyResource, EmployeeSkillResource) {
    /*jshint validthis:true */
    var vm = this;

    vm.employee = EmployeeResource.get(
      { id: $routeParams.employeeId },
      function(resp) {
        EmployeeVacancyResource.query({ employeeId: vm.employee.id }, function(resp) {
          vm.vacancies = resp.vacancies;
          vm.vacanciesCount = resp.total_count;
        });
        
        EmployeeVacancyResource.query({ employeeId: vm.employee.id, full_match: true }, function(resp) {
          vm.fullMatchVacancies = resp.vacancies;
          vm.fullMatchVacanciesCount = resp.total_count;
        });
        
        EmployeeSkillResource.query({ employeeId: vm.employee.id }, function(resp) {
          vm.skills = resp.skills;
          vm.skillsCount = resp.total_count;
        });
      },
      function(resp) {
        alert('errors');
      }
    );
  }

  ngModule.controller('EmployeesShowCtrl', ctrl);
};
