module.exports = function(ngModule) {
  'use strict';

  ngModule.config(function($translateProvider) {
    $translateProvider.translations('ru', {
      'ID': 'ID',
      'SKILL': 'Умение',
      'SKILLS': 'Умения',
      'SKILL_NAME': 'Название',
      'ADD_SKILL': 'Добавить умение',
      'VACANCIES': 'Вакансии',
      'EMPLOYEES': 'Работники',
      'NEW_SKILL': 'Новое умение',
      'SAVE': 'Сохранить',
      'CANCEL': 'Отмена',
      'EDIT': 'Редактировать',
      'SKILL_EXAMPLE': 'Руководить проектами',
      'ADD_VACANCY': 'Добавить вакансию',
      'VACANCY_TITLE': 'Название',
      'VACANCY_SALARY': 'Зарплата',
      'VACANCY_CONTACTS': 'Контактная информация',
      'VACANCY_CREATED_AT': 'Дата добавления',
      'VACANCY_EXPIRED_AT': 'Срок действия',
      'EDITING_VACANCY_WITH_ID': 'Редактирование вакансии с ID {{ id }}',
      'VACANCY_TITLE_EXAMPLE': 'Разработчик ПО',
      'VACANCY_CONTACTS_EXAMPLE': 'Телефон или email',
      'VACANCY_SALARY_EXAMPLE': '100',
      'VACANCY_EXPIRED_AT_EXAMPLE': '',
      'SKILL_ADDING_WARNING': 'Добавление требуемого умения происходит в фоновом режиме, без необходимости жать кнопку "Сохранить".',
      'ADD_ONE_MORE_SKILL': 'Добавить еще одно умение',
      'ADDING_VACANCY': 'Добавление вакансии',
      'SHOWING_VACANCY_WITH_ID': 'Просмотр вакансии с ID {{ id }}',
      'APPROPRIATE_EMPLOYEES': 'Подходящие работники',
      'PARTIAL_SKILLS_MATCH': 'Частичное совпадение умений',
      'FULL_SKILLS_MATCH': 'Полное совпадение умений',
      'EMPLOYEE_NAME': 'Имя',
      'EMPLOYEE_EMAIL': 'Email',
      'EMPLOYEE_PHONE': 'Номер телефона',
      'EMPLOYEE_STATUS': 'Статус поиска работы',
      'EMPLOYEE_SALARY': 'Желаемая зарплата',
      'EMPLOYEE_IS_LOOKING_FOR_A_JOB': 'В поиске работы',
      'EMPLOYEE_IS_NOT_LOOKING_FOR_A_JOB': 'Не ищет',
      'ADD_EMPLOYEE': 'Добавить работника',
      'ADDING_EMPLOYEE': 'Добавление работника',
      'EMPLOYEE_NAME_EXAMPLE': 'Иванов Иван Иванович',
      'EMPLOYEE_EMAIL_EXAMPLE': 'exmple@example.com',
      'EMPLOYEE_PHONE_EXAMPLE': '+79991231234',
      'EMPLOYEE_SALARY_EXAMPLE': '100',
      'EDITING_EMPLOYE_WITH_ID': 'Редактирование работника с ID {{ id }}',
      'SHOWING_EMPLOYEE_WITH_ID': 'Просмотр работника с ID {{ id }}',
      'APPROPRIATE_VACANCIES': 'Подходящие вакансии',
      'EMPLOYEE_NAME_HINT': '3 слова и кириллические буквы и пробелы.',
      'EMPLOYEE_EMAIL_OR_PHONE_HINT': 'Необходимо ввести номер телефона или email.'
    });
    
    $translateProvider.preferredLanguage('ru');
  });
};
