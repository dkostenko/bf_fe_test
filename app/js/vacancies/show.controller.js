module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $routeParams, VacancyResource, VacancyEmployeeResource, VacancySkillResource) {
    /*jshint validthis:true */
    var vm = this;

    vm.vacancy = VacancyResource.get(
      { id: $routeParams.vacancyId },
      function(resp) {
        VacancyEmployeeResource.query({ vacancyId: vm.vacancy.id }, function(resp) {
          vm.employees = resp.employees;
          vm.employeesCount = resp.total_count;
        });
        
        VacancySkillResource.query({ vacancyId: vm.vacancy.id }, function(resp) {
          vm.skills = resp.skills;
          vm.skillsCount = resp.total_count;
        });
      },
      function(resp) {
        alert('errors');
      }
    );
  }

  ngModule.controller('VacanciesShowCtrl', ctrl);
};
