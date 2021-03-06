// Встроенный в Node.JS модуль для проверок
var assert = require('assert');

// Подключаем свою функцию
var date = require('./index.js');

// var t = date('2017-05-16 13:45');
// console.log('t.getDay()', t.getDay());


// console.log('t.value', t.value);
//
// t.add(24, 'hours');
// console.log('t.value', t.value);
// t.subtract(1, 'months');
// console.log('t.value', t.value);
// t.add(3, 'days');
// console.log('t.value', t.value);
// t.add(15, 'minutes');
// console.log('t.value', t.value);
// t.add(15, 'months');
// console.log('t.value', t.value);
// t.add(1, 'days');
// console.log('t.value', t.value);
// t.add(15, 'days');
// console.log('t.value', t.value);
// t.add(2, 'hours');
// console.log('t.value', t.value);
// t.add(12, 'hours');
// console.log('t.value', t.value);
//
//
// return;

var time = date('2017-05-16 13:45')
    .add(24, 'hours')
    .subtract(1, 'months')
    .add(3, 'days')
    .add(15, 'minutes');
// console.log('time.value', time.value);

assert.deepEqual(
    time.value,
    '2017-04-20 14:00',

    'Если к дате "2017-05-16 13:45" ' +
    'прибавить 24 часа, 3 дня и 15 минут, вычесть 1 месяц, ' +
    'то получится "2017-04-20 14:00"'
);

// assert.throws принимает функцию и
// проверяет, что она выбрасывает исключение определенного типа
assert.throws(
    function () {
        date('2017-05-16 13:45').add(2, 'light-years');
    },
    TypeError,

    'Если попытаться прибавить к дате световой год, ' +
    'то выбросится исключение TypeError'
);

assert.throws(
    function () {
        date('2017-05-16 13:45').add(-2, 'years');
    },
    TypeError,

    'Если попытаться передать в функцию add отрицательное число – выбросится исключение TypeError'
);

console.info('OK!');
