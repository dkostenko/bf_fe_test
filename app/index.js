'use strict';

var ngModule = require('./app.module');

require('./app.config.js')(ngModule);
require('./app.i18n.js')(ngModule);

require('./js/skills/index.controller.js')(ngModule);
require('./js/skills/new.controller.js')(ngModule);
require('./js/skills/modal.new.controller.js')(ngModule);
require('./js/skills/resource.js')(ngModule);

require('./js/vacancies/index.controller.js')(ngModule);
require('./js/vacancies/new.controller.js')(ngModule);
require('./js/vacancies/show.controller.js')(ngModule);
require('./js/vacancies/edit.controller.js')(ngModule);
require('./js/vacancies/resource.js')(ngModule);

require('./js/employees/index.controller.js')(ngModule);
require('./js/employees/new.controller.js')(ngModule);
require('./js/employees/show.controller.js')(ngModule);
require('./js/employees/edit.controller.js')(ngModule);
require('./js/employees/resource.js')(ngModule);

require('./js/employeeSkills/resource.js')(ngModule);

require('./js/vacancySkills/resource.js')(ngModule);

require('./js/vacancyEmployee/resource.js')(ngModule);

require('./js/employeeVacancy/resource.js')(ngModule);

require('./app.run.js')(ngModule);
