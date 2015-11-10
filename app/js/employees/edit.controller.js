module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $routeParams, $location, EmployeeResource, SkillResource, EmployeeSkillResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.updateEmployeeHandler = updateEmployeeHandler;
    vm.skillSeletionChangeHandler = skillSeletionChangeHandler;

    vm.employee = EmployeeResource.get(
      { id: $routeParams.employeeId },
      function(resp) {
        getSkills();
      },
      function(resp) {
        alert('errors');
      }
    );

    function getSkills() {
      SkillResource.query({}, function(resp) {
        vm.skills = resp.skills;
        vm.skillsCount = resp.total_count;
      
        EmployeeSkillResource.query({ employeeId: vm.employee.id }, function(resp) {
          vm.employeeSkills = resp.skills;
          vm.employeeSkillsCount = resp.total_count;
          
          angular.forEach(vm.skills, function(skill, idx) {
            angular.forEach(vm.employeeSkills, function(employeeSkill, idx) {
              if (skill.id != employeeSkill.id) {
                return;
              }

              skill.selected = true;
            });
          });
        });
      });
    }

    function updateEmployeeHandler() {
      vm.employee.$update({}, 
        function(resp) {
          $location.url('/employees');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
    
    function skillSeletionChangeHandler(skill) {
      if (skill.selected) {
        EmployeeSkillResource.add({ employeeId: vm.employee.id, skillId: skill.id });
      } else {
        EmployeeSkillResource.remove({ employeeId: vm.employee.id, skillId: skill.id });
      }
    }
  }

  ngModule.controller('EmployeesEditCtrl', ctrl);
};
