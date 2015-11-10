module.exports = function(ngModule) {
  'use strict';

  function resource($resource) {
    'use strict';

    return $resource('/api/v1/employees/:collectionAction:id/:memberAction.json',
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

          return angular.toJson({ employee: data });
        }
      },
      update: {
        method: 'PUT',
        transformRequest: function(originalData) {
          var data = angular.copy(originalData);

          return angular.toJson({ employee: data });
        }
      }
    });
  }

  ngModule.factory('EmployeeResource', resource);
};



