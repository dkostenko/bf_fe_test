module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $location, VacancyResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createVacancy = createVacancy;
    
    vm.vacancy = new VacancyResource({
      title: '',
      contacts: '',
      salary: 0,
      expired_at: new Date()
    });

    function createVacancy() {
      vm.vacancy.$save({}, 
        function(resp) {
          $location.url('/vacancies');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
  }

  ngModule.controller('VacanciesNewCtrl', ctrl);
};
