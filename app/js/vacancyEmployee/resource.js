module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/vacancies/:vacancyId/employees/:collectionAction:employeeId/:memberAction.json',
    {
      vacancyId: '@vacancyId',
      employeeId: '@employeeId'
    },
    {
      query: {
        method: 'GET',
        isArray: false
      }
    });
  }

  ngModule.factory('VacancyEmployeeResource', resource);
};



