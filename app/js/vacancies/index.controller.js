module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, VacancyResource) {
    /*jshint validthis:true */
    var vm = this;
    
    VacancyResource.query({}, function(resp) {
      vm.vacancies = resp.vacancies;
      vm.vacanciesCount = resp.total_count;
    });
  }

  ngModule.controller('VacanciesCtrl', ctrl);
};
