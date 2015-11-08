module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/vacancies.json').success(function(resp) {
      vm.vacancies = resp.vacancies;
      vm.vacanciesCount = resp.total_count;
    });
  }

  ngModule.controller('VacanciesCtrl', ctrl);
};
