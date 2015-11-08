module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/skills/:collectionAction:id/:memberAction.json',
    {
      id: '@id'
    },
    {
      query: {
        method: 'GET',
        isArray: false
      },
      save: {
        method: 'POST',
        transformRequest: function(originalData) {
          var data = angular.copy(originalData);

          return angular.toJson({ skill: data });
        }
      }
    });
  }

  ngModule.factory('SkillResource', resource);
};



