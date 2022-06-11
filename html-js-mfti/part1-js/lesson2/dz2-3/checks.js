// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var phoneBook = require('./index.js');

// console.log(phoneBook('SHOW'));
// phoneBook('ADD Ivan 555-10-01,555-10-03');
// phoneBook('ADD Alex 555-20-01');
// phoneBook('ADD Ivan 555-10-02');
// console.log(phoneBook('SHOW'));
// phoneBook('REMOVE_PHONE 555-20-01');
// console.log(phoneBook('SHOW'));
// phoneBook('REMOVE_PHONE 555-10-01'),
console.log(phoneBook('SHOW'));

// phoneBook('ADD Contact2 phone4,phone3');
// phoneBook('ADD Contact1 phone1');
// phoneBook('ADD Contact1 phone2');
// console.log(phoneBook('SHOW'));
// return;



// Добавляем телефоны контакту Ivan
phoneBook('ADD Ivan 555-10-01,555-10-03');
phoneBook('ADD Ivan 555-10-02');
phoneBook('ADD Ivan 555-10-02,555-10-03');
console.log(phoneBook('SHOW'));

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Ivan: 555-10-01, 555-10-03, 555-10-02'
    ],
    'В телефонной книге: "Ivan: 555-10-01, 555-10-03, 555-10-02"'
);

// Проверка работы функции REMOVE_PHONE
assert.equal(
    // Удаляем телефон 555-10-03
    phoneBook('REMOVE_PHONE 555-10-03'),
    true,
    'Телефон 555-10-03 успешно удален'
);

assert.equal(
    // Удаляем телефон 555-10-03
    phoneBook('REMOVE_PHONE 555-10-03'),
    false,
    'Телефон 555-10-03 не может быть удален, т.к. его нет'
);


// Добавляем новый контакт
phoneBook('ADD Alex 555-20-01');
console.log(phoneBook('SHOW'));

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Alex: 555-20-01',
        'Ivan: 555-10-01, 555-10-02'
    ],
    'В телефонной книге: "Alex: 555-20-01", "Ivan: 555-10-01, 555-10-02"'
);

// Удаляем телефон
phoneBook('REMOVE_PHONE 555-20-01');

// Проверка работы функции SHOW
assert.deepEqual(
    // Получаем содержимое телефонной книги
    phoneBook('SHOW'),
    [
        'Ivan: 555-10-01, 555-10-02'
    ],
    'В телефонной книге: "Ivan: 555-10-01, 555-10-02"'
);

console.info('OK!');
