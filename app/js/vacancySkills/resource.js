module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/vacancies/:vacancyId/skills/:collectionAction:skillId/:memberAction.json',
    {
      vacancyId: '@vacancyId',
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

  ngModule.factory('VacancySkillResource', resource);
};



