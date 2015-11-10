module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/employees/:employeeId/skills/:collectionAction:skillId/:memberAction.json',
    {
      employeeId: '@employeeId',
      skillId: '@skillId'
    },
    {
      query: {
        method: 'GET',
        isArray: false
      },
      add: {
        method: 'POST',
        isArray: false
      },
      remove: {
        method: 'DELETE',
        isArray: false
      }
    });
  }

  ngModule.factory('EmployeeSkillResource', resource);
};



