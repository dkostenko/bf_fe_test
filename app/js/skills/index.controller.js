module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/skills.json').success(function(resp) {
      vm.skills = resp.skills;
      vm.skillsCount = resp.total_count;
    });
  }

  ngModule.controller('SkillsCtrl', ctrl);
};
