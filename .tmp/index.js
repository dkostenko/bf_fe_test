(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  ngModule.config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/skills', {
      controller: 'SkillsCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/skills/index.html',
    });
    
    $routeProvider.when('/skills/new', {
      controller: 'SkillsNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/skills/new.html',
    });
    
    $routeProvider.when('/vacancies', {
      controller: 'VacanciesCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/vacancies/index.html',
    });
    
    $routeProvider.when('/vacancies/new', {
      controller: 'VacanciesNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/vacancies/new.html',
    });

    $routeProvider.when('/employees', {
      controller: 'EmployeesCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/employees/index.html',
    });

    $routeProvider.when('/employees/new', {
      controller: 'EmployeesNewCtrl',
      controllerAs: 'vm',
      templateUrl: '/views/employees/new.html',
    });

    $routeProvider.otherwise({ redirectTo: '/vacancies' });
  });
};

},{}],2:[function(require,module,exports){
'use strict';

module.exports = angular.module('app', [
  'ngRoute',
  'ngSanitize',
  'ngResource'
]);

},{}],3:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  ngModule.run(function() {});
};

},{}],4:[function(require,module,exports){
'use strict';

var ngModule = require('./app.module');

require('./app.config.js')(ngModule);

require('./js/skills/index.controller.js')(ngModule);
require('./js/skills/new.controller.js')(ngModule);
require('./js/skills/resource.js')(ngModule);

require('./js/vacancies/index.controller.js')(ngModule);
require('./js/vacancies/new.controller.js')(ngModule);
require('./js/vacancies/resource.js')(ngModule);

require('./js/employees/index.controller.js')(ngModule);
require('./js/employees/new.controller.js')(ngModule);
require('./js/employees/resource.js')(ngModule);

require('./app.run.js')(ngModule);

},{"./app.config.js":1,"./app.module":2,"./app.run.js":3,"./js/employees/index.controller.js":5,"./js/employees/new.controller.js":6,"./js/employees/resource.js":7,"./js/skills/index.controller.js":8,"./js/skills/new.controller.js":9,"./js/skills/resource.js":10,"./js/vacancies/index.controller.js":11,"./js/vacancies/new.controller.js":12,"./js/vacancies/resource.js":13}],5:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/employees.json').success(function(resp) {
      vm.employees = resp.employees;
      vm.employeesCount = resp.total_count;
    });
  }

  ngModule.controller('EmployeesCtrl', ctrl);
};

},{}],6:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $location, EmployeeResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createEmployee = createEmployee;
    
    vm.employee = new EmployeeResource({
      name: ''
    });

    function createEmployee() {
      vm.employee.$save({}, 
        function(resp) {
          $location.url('/employees');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
  }

  ngModule.controller('EmployeesNewCtrl', ctrl);
};

},{}],7:[function(require,module,exports){
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
      }
    });
  }

  ngModule.factory('EmployeeResource', resource);
};




},{}],8:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/skills.json').success(function(resp) {
      vm.skills = resp.skills;
      vm.skillsCount = resp.total_count;
    });
  }

  ngModule.controller('SkillsCtrl', ctrl);
};

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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




},{}],11:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  function ctrl($http) {
    /*jshint validthis:true */
    var vm = this;

    $http.get('/api/v1/vacancies.json').success(function(resp) {
      vm.vacancies = resp.vacancies;
      vm.vacanciesCount = resp.total_count;
    });
  }

  ngModule.controller('VacanciesCtrl', ctrl);
};

},{}],12:[function(require,module,exports){
module.exports = function(ngModule) {
  'use strict';

  function ctrl($http, $location, VacancyResource) {
    /*jshint validthis:true */
    var vm = this;
    
    vm.createVacancy = createVacancy;
    
    vm.vacancy = new VacancyResource({
      title: '',
      contacts: '',
      salary: 0,
      expired_at: new Date()
    });

    function createVacancy() {
      vm.vacancy.$save({}, 
        function(resp) {
          $location.url('/vacancies');
        },
        function(resp) {
          alert('errors');
        }
      )
    }
  }

  ngModule.controller('VacanciesNewCtrl', ctrl);
};

},{}],13:[function(require,module,exports){
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
      save: {
        method: 'POST',
        transformRequest: function(originalData) {
          var data = angular.copy(originalData);

          return angular.toJson({ vacancy: data });
        }
      }
    });
  }

  ngModule.factory('VacancyResource', resource);
};




},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXBwLmNvbmZpZy5qcyIsImFwcC9hcHAubW9kdWxlLmpzIiwiYXBwL2FwcC5ydW4uanMiLCJhcHAvaW5kZXguanMiLCJhcHAvanMvZW1wbG95ZWVzL2luZGV4LmNvbnRyb2xsZXIuanMiLCJhcHAvanMvZW1wbG95ZWVzL25ldy5jb250cm9sbGVyLmpzIiwiYXBwL2pzL2VtcGxveWVlcy9yZXNvdXJjZS5qcyIsImFwcC9qcy9za2lsbHMvaW5kZXguY29udHJvbGxlci5qcyIsImFwcC9qcy9za2lsbHMvbmV3LmNvbnRyb2xsZXIuanMiLCJhcHAvanMvc2tpbGxzL3Jlc291cmNlLmpzIiwiYXBwL2pzL3ZhY2FuY2llcy9pbmRleC5jb250cm9sbGVyLmpzIiwiYXBwL2pzL3ZhY2FuY2llcy9uZXcuY29udHJvbGxlci5qcyIsImFwcC9qcy92YWNhbmNpZXMvcmVzb3VyY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBuZ01vZHVsZS5jb25maWcoZnVuY3Rpb24oJGxvY2F0aW9uUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpO1xuXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3NraWxscycsIHtcbiAgICAgIGNvbnRyb2xsZXI6ICdTa2lsbHNDdHJsJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3NraWxscy9pbmRleC5odG1sJyxcbiAgICB9KTtcbiAgICBcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvc2tpbGxzL25ldycsIHtcbiAgICAgIGNvbnRyb2xsZXI6ICdTa2lsbHNOZXdDdHJsJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3NraWxscy9uZXcuaHRtbCcsXG4gICAgfSk7XG4gICAgXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL3ZhY2FuY2llcycsIHtcbiAgICAgIGNvbnRyb2xsZXI6ICdWYWNhbmNpZXNDdHJsJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3ZhY2FuY2llcy9pbmRleC5odG1sJyxcbiAgICB9KTtcbiAgICBcbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvdmFjYW5jaWVzL25ldycsIHtcbiAgICAgIGNvbnRyb2xsZXI6ICdWYWNhbmNpZXNOZXdDdHJsJyxcbiAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL3ZhY2FuY2llcy9uZXcuaHRtbCcsXG4gICAgfSk7XG5cbiAgICAkcm91dGVQcm92aWRlci53aGVuKCcvZW1wbG95ZWVzJywge1xuICAgICAgY29udHJvbGxlcjogJ0VtcGxveWVlc0N0cmwnLFxuICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvZW1wbG95ZWVzL2luZGV4Lmh0bWwnLFxuICAgIH0pO1xuXG4gICAgJHJvdXRlUHJvdmlkZXIud2hlbignL2VtcGxveWVlcy9uZXcnLCB7XG4gICAgICBjb250cm9sbGVyOiAnRW1wbG95ZWVzTmV3Q3RybCcsXG4gICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICB0ZW1wbGF0ZVVybDogJy92aWV3cy9lbXBsb3llZXMvbmV3Lmh0bWwnLFxuICAgIH0pO1xuXG4gICAgJHJvdXRlUHJvdmlkZXIub3RoZXJ3aXNlKHsgcmVkaXJlY3RUbzogJy92YWNhbmNpZXMnIH0pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgJ25nUm91dGUnLFxuICAnbmdTYW5pdGl6ZScsXG4gICduZ1Jlc291cmNlJ1xuXSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBuZ01vZHVsZS5ydW4oZnVuY3Rpb24oKSB7fSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbmdNb2R1bGUgPSByZXF1aXJlKCcuL2FwcC5tb2R1bGUnKTtcblxucmVxdWlyZSgnLi9hcHAuY29uZmlnLmpzJykobmdNb2R1bGUpO1xuXG5yZXF1aXJlKCcuL2pzL3NraWxscy9pbmRleC5jb250cm9sbGVyLmpzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9qcy9za2lsbHMvbmV3LmNvbnRyb2xsZXIuanMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL2pzL3NraWxscy9yZXNvdXJjZS5qcycpKG5nTW9kdWxlKTtcblxucmVxdWlyZSgnLi9qcy92YWNhbmNpZXMvaW5kZXguY29udHJvbGxlci5qcycpKG5nTW9kdWxlKTtcbnJlcXVpcmUoJy4vanMvdmFjYW5jaWVzL25ldy5jb250cm9sbGVyLmpzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9qcy92YWNhbmNpZXMvcmVzb3VyY2UuanMnKShuZ01vZHVsZSk7XG5cbnJlcXVpcmUoJy4vanMvZW1wbG95ZWVzL2luZGV4LmNvbnRyb2xsZXIuanMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL2pzL2VtcGxveWVlcy9uZXcuY29udHJvbGxlci5qcycpKG5nTW9kdWxlKTtcbnJlcXVpcmUoJy4vanMvZW1wbG95ZWVzL3Jlc291cmNlLmpzJykobmdNb2R1bGUpO1xuXG5yZXF1aXJlKCcuL2FwcC5ydW4uanMnKShuZ01vZHVsZSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBjdHJsKCRodHRwKSB7XG4gICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgJGh0dHAuZ2V0KCcvYXBpL3YxL2VtcGxveWVlcy5qc29uJykuc3VjY2VzcyhmdW5jdGlvbihyZXNwKSB7XG4gICAgICB2bS5lbXBsb3llZXMgPSByZXNwLmVtcGxveWVlcztcbiAgICAgIHZtLmVtcGxveWVlc0NvdW50ID0gcmVzcC50b3RhbF9jb3VudDtcbiAgICB9KTtcbiAgfVxuXG4gIG5nTW9kdWxlLmNvbnRyb2xsZXIoJ0VtcGxveWVlc0N0cmwnLCBjdHJsKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBjdHJsKCRodHRwLCAkbG9jYXRpb24sIEVtcGxveWVlUmVzb3VyY2UpIHtcbiAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgXG4gICAgdm0uY3JlYXRlRW1wbG95ZWUgPSBjcmVhdGVFbXBsb3llZTtcbiAgICBcbiAgICB2bS5lbXBsb3llZSA9IG5ldyBFbXBsb3llZVJlc291cmNlKHtcbiAgICAgIG5hbWU6ICcnXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVFbXBsb3llZSgpIHtcbiAgICAgIHZtLmVtcGxveWVlLiRzYXZlKHt9LCBcbiAgICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgICRsb2NhdGlvbi51cmwoJy9lbXBsb3llZXMnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgIGFsZXJ0KCdlcnJvcnMnKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIG5nTW9kdWxlLmNvbnRyb2xsZXIoJ0VtcGxveWVlc05ld0N0cmwnLCBjdHJsKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiByZXNvdXJjZSgkcmVzb3VyY2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL3YxL2VtcGxveWVlcy86Y29sbGVjdGlvbkFjdGlvbjppZC86bWVtYmVyQWN0aW9uLmpzb24nLFxuICAgIHtcbiAgICAgIGlkOiAnQGlkJ1xuICAgIH0sXG4gICAge1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBzYXZlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvcmlnaW5hbERhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGFuZ3VsYXIuY29weShvcmlnaW5hbERhdGEpO1xuXG4gICAgICAgICAgcmV0dXJuIGFuZ3VsYXIudG9Kc29uKHsgZW1wbG95ZWU6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG5nTW9kdWxlLmZhY3RvcnkoJ0VtcGxveWVlUmVzb3VyY2UnLCByZXNvdXJjZSk7XG59O1xuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuZ01vZHVsZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gY3RybCgkaHR0cCkge1xuICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgICRodHRwLmdldCgnL2FwaS92MS9za2lsbHMuanNvbicpLnN1Y2Nlc3MoZnVuY3Rpb24ocmVzcCkge1xuICAgICAgdm0uc2tpbGxzID0gcmVzcC5za2lsbHM7XG4gICAgICB2bS5za2lsbHNDb3VudCA9IHJlc3AudG90YWxfY291bnQ7XG4gICAgfSk7XG4gIH1cblxuICBuZ01vZHVsZS5jb250cm9sbGVyKCdTa2lsbHNDdHJsJywgY3RybCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuZ01vZHVsZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gY3RybCgkaHR0cCwgJGxvY2F0aW9uLCBTa2lsbFJlc291cmNlKSB7XG4gICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIFxuICAgIHZtLmNyZWF0ZVNraWxsID0gY3JlYXRlU2tpbGw7XG4gICAgXG4gICAgdm0uc2tpbGwgPSBuZXcgU2tpbGxSZXNvdXJjZSh7XG4gICAgICBuYW1lOiAnJ1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2tpbGwoKSB7XG4gICAgICB2bS5za2lsbC4kc2F2ZSh7fSwgXG4gICAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgICAkbG9jYXRpb24udXJsKCcvc2tpbGxzJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgICBhbGVydCgnZXJyb3JzJyk7XG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9XG4gIH1cblxuICBuZ01vZHVsZS5jb250cm9sbGVyKCdTa2lsbHNOZXdDdHJsJywgY3RybCk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuZ01vZHVsZSkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gcmVzb3VyY2UoJHJlc291cmNlKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgcmV0dXJuICRyZXNvdXJjZSgnL2FwaS92MS9za2lsbHMvOmNvbGxlY3Rpb25BY3Rpb246aWQvOm1lbWJlckFjdGlvbi5qc29uJyxcbiAgICB7XG4gICAgICBpZDogJ0BpZCdcbiAgICB9LFxuICAgIHtcbiAgICAgIHF1ZXJ5OiB7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICB9LFxuICAgICAgc2F2ZToge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogZnVuY3Rpb24ob3JpZ2luYWxEYXRhKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBhbmd1bGFyLmNvcHkob3JpZ2luYWxEYXRhKTtcblxuICAgICAgICAgIHJldHVybiBhbmd1bGFyLnRvSnNvbih7IHNraWxsOiBkYXRhIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBuZ01vZHVsZS5mYWN0b3J5KCdTa2lsbFJlc291cmNlJywgcmVzb3VyY2UpO1xufTtcblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmdNb2R1bGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGN0cmwoJGh0dHApIHtcbiAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAkaHR0cC5nZXQoJy9hcGkvdjEvdmFjYW5jaWVzLmpzb24nKS5zdWNjZXNzKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgIHZtLnZhY2FuY2llcyA9IHJlc3AudmFjYW5jaWVzO1xuICAgICAgdm0udmFjYW5jaWVzQ291bnQgPSByZXNwLnRvdGFsX2NvdW50O1xuICAgIH0pO1xuICB9XG5cbiAgbmdNb2R1bGUuY29udHJvbGxlcignVmFjYW5jaWVzQ3RybCcsIGN0cmwpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmdNb2R1bGUpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGN0cmwoJGh0dHAsICRsb2NhdGlvbiwgVmFjYW5jeVJlc291cmNlKSB7XG4gICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIFxuICAgIHZtLmNyZWF0ZVZhY2FuY3kgPSBjcmVhdGVWYWNhbmN5O1xuICAgIFxuICAgIHZtLnZhY2FuY3kgPSBuZXcgVmFjYW5jeVJlc291cmNlKHtcbiAgICAgIHRpdGxlOiAnJyxcbiAgICAgIGNvbnRhY3RzOiAnJyxcbiAgICAgIHNhbGFyeTogMCxcbiAgICAgIGV4cGlyZWRfYXQ6IG5ldyBEYXRlKClcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVZhY2FuY3koKSB7XG4gICAgICB2bS52YWNhbmN5LiRzYXZlKHt9LCBcbiAgICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgICRsb2NhdGlvbi51cmwoJy92YWNhbmNpZXMnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgIGFsZXJ0KCdlcnJvcnMnKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIG5nTW9kdWxlLmNvbnRyb2xsZXIoJ1ZhY2FuY2llc05ld0N0cmwnLCBjdHJsKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5nTW9kdWxlKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiByZXNvdXJjZSgkcmVzb3VyY2UpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICByZXR1cm4gJHJlc291cmNlKCcvYXBpL3YxL3ZhY2FuY2llcy86Y29sbGVjdGlvbkFjdGlvbjppZC86bWVtYmVyQWN0aW9uLmpzb24nLFxuICAgIHtcbiAgICAgIGlkOiAnQGlkJ1xuICAgIH0sXG4gICAge1xuICAgICAgcXVlcnk6IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgIH0sXG4gICAgICBzYXZlOiB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBmdW5jdGlvbihvcmlnaW5hbERhdGEpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGFuZ3VsYXIuY29weShvcmlnaW5hbERhdGEpO1xuXG4gICAgICAgICAgcmV0dXJuIGFuZ3VsYXIudG9Kc29uKHsgdmFjYW5jeTogZGF0YSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbmdNb2R1bGUuZmFjdG9yeSgnVmFjYW5jeVJlc291cmNlJywgcmVzb3VyY2UpO1xufTtcblxuXG5cbiJdfQ==
