module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/vacancies/:collectionAction:id/:memberAction.json',
    {
      id: '@id'
    },
    {
      query: {
        method: 'GET',
        isArray: false
      },
      get: {
        method: 'GET',
        transformResponse: function(originalData) {
          var data = angular.fromJson(originalData);
          
          data.expired_at = new Date(data.expired_at);
          
          return data;
        }
      },
      save: {
        method: 'POST',
        transformRequest: function(originalData) {
          var data = angular.copy(originalData);

          return angular.toJson({ vacancy: data });
        }
      },
      update: {
        method: 'PUT',
        transformRequest: function(originalData) {
          var data = angular.copy(originalData);

          return angular.toJson({ vacancy: data });
        }
      }
    });
  }

  ngModule.factory('VacancyResource', resource);
};



