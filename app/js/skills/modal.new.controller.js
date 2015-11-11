module.exports = function(ngModule) {
  'use strict';

  function ctrl($scope, $uibModalInstance, SkillResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createSkillHandler = createSkillHandler;
    vm.cancelHandler = cancelHandler;
    
    vm.skill = new SkillResource({
      name: ''
    });

    function createSkillHandler() {
      vm.skill.$save({}, 
        function(resp) {
          $uibModalInstance.close(vm.skill);
        },
        function(resp) {
          alert('errors');
        }
      )
    }
    
    function cancelHandler() {
      $uibModalInstance.dismiss('cancel');
    }
  }

  ngModule.controller('SkillsModalNewCtrl', ctrl);
};
