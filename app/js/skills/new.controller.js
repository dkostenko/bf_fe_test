module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $location, SkillResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createSkill = createSkill;
    
    vm.skill = new SkillResource({
      name: ''
    });

    function createSkill() {
      vm.skill.$save({}, 
        function(resp) {
          $location.url('/skills');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
  }

  ngModule.controller('SkillsNewCtrl', ctrl);
};
