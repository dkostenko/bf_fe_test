module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, SkillResource) {
    /*jshint validthis:true */
    var vm = this;
    
    SkillResource.query({}, function(resp) {
      vm.skills = resp.skills;
      vm.skillsCount = resp.total_count;
    });
  }

  ngModule.controller('SkillsCtrl', ctrl);
};
