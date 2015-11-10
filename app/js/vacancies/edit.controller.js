module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $routeParams, $location, VacancyResource, SkillResource, VacancySkillResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.updateVacancyHandler = updateVacancyHandler;
    vm.skillSeletionChangeHandler = skillSeletionChangeHandler;

    vm.vacancy = VacancyResource.get(
      { id: $routeParams.vacancyId },
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
      
        VacancySkillResource.query({ vacancyId: vm.vacancy.id }, function(resp) {
          vm.vacanciesSkills = resp.skills;
          vm.vacanciesSkillsCount = resp.total_count;
          
          angular.forEach(vm.skills, function(skill, idx) {
            angular.forEach(vm.vacanciesSkills, function(vacancySkill, idx) {
              if (skill.id != vacancySkill.id) {
                return;
              }

              skill.selected = true;
            });
          });
        });
      });
    }

    function updateVacancyHandler() {
      vm.vacancy.$update({}, 
        function(resp) {
          $location.url('/vacancies');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
    
    function skillSeletionChangeHandler(skill) {
      if (skill.selected) {
        VacancySkillResource.add({ vacancyId: vm.vacancy.id, skillId: skill.id });
      } else {
        VacancySkillResource.remove({ vacancyId: vm.vacancy.id, skillId: skill.id });
      }
    }
  }

  ngModule.controller('VacanciesEditCtrl', ctrl);
};
