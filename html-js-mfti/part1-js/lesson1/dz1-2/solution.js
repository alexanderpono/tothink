/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    // hours и minutes по условию целые числа. Дополнительных проверок никаких не нужно.
    // Проверяем, что значение hours находится в корректном интервале [0, 23]
    if (hours < 0 || hours > 23) {
        // Возвращаем false, если hours не попадает в интервал
        return false;
    }

    // Проверяем, что значение minutes находится в корректном интервале [0, 59]
    if (minutes < 0 || minutes > 59) {
        // Возвращаем false, если minutes не попадает в интервал
        return false;
    }

    // Иначе возвращаем true – время корректно
    return true;
};