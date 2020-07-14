/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    // Создаем объект для хранения тегов
    // Он будет содержать все теги, которые мы встретили
    // Проверка существования ключа в объекте происходит быстрее, чем поиск в массиве
    var tagsMap = {};

    // Создаем массив для хранения результирующего списка тегов
    var tagsList = [];

    for (var i = 0; i < hashtags.length; i++) {
        // Приводим хэштег к нижнему регистру
        var hashtag = hashtags[i].toLowerCase();

        // Проверяем, встречали ли такой хэштег
        // Если не встречали, сохраняем его в список tagsList и объект tagsMap
        if (!tagsMap.hasOwnProperty(hashtag)) {
            tagsMap[hashtag] = true;
            tagsList.push(hashtag);
        }
    }

    // Склеиваем теги и возвращаем результат
    return tagsList.join(', ');
};