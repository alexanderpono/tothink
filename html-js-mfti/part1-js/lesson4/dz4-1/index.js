/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var srcData = arguments[0];
    var data = srcData.slice();
    var selectOperations = [];
    var filterInOperations = [];
    for (var i=1; i<arguments.length; i++) {
        var func = arguments[i];

        if (func.id === 'select') {
            selectOperations.push(func);
        };
        if (func.id === 'filterIn') {
            filterInOperations.push(func);
        };
    };

    for (i=0; i<filterInOperations.length; i++) {
        data = filterInOperations[i](data);
    };

    for (i=0; i<selectOperations.length; i++) {
        data = selectOperations[i](data);
    };
    return data;
}

/**
 * @params {String[]}
 */
function select() {
    var fieldsToKeep = [].slice.call(arguments);
    var selectOperation = function(data) {
        var newData = data.reduce(function(accumulator, record) {
            var newRecord = {};
            fieldsToKeep.forEach(function(fieldName, index) {
                if (typeof record[fieldName] !== 'undefined') {
                    newRecord[fieldName] = record[fieldName];
                };
            });

            accumulator.push(newRecord);
            return accumulator;
        }, []);

        return newData;
    };
    selectOperation.id = 'select';
    return selectOperation;
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    var filterInOperation = function(data) {
        var newData = data.reduce(function(accumulator, record) {
            var testedValue = record[property];
            var index = values.indexOf(testedValue);
            var hit = (values.indexOf(testedValue) !== -1);

            if (hit) {
                accumulator.push(record);
            };
            return accumulator;
        }, []);

        return newData;
    };
    filterInOperation.id = 'filterIn';
    return filterInOperation;

}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
