module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/employees/:employeeId/vacancies/:collectionAction:vacancyId/:memberAction.json',
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

  ngModule.factory('EmployeeVacancyResource', resource);
};



