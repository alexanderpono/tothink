// Телефонная книга
var phoneBook = {};
var COMMAND = 0;
var CONTACT_NAME = 1;
var COMMAND_PARAMETER = 2;
var COMMAND_ADD = 'ADD';
var COMMAND_SHOW = 'SHOW';
var COMMAND_REMOVE = 'REMOVE_PHONE';
var REMOVED_NUMBER = 1;

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var commandAr = command.split(' ');
    if (commandAr[COMMAND] === COMMAND_ADD) {
        return execADD(commandAr);
    }

    if (commandAr[COMMAND] === COMMAND_SHOW) {
        return execSHOW(commandAr);
    }

    if (commandAr[COMMAND] === COMMAND_REMOVE) {
        return execREMOVE(commandAr);
    }
};


function execADD(commandAr) {
    var paramsStr = commandAr[COMMAND_PARAMETER];
    var params = paramsStr.split(',');
    var contactName = commandAr[CONTACT_NAME];

    if (!phoneBook.hasOwnProperty(contactName)) {
        phoneBook[contactName] = [];
    };

    params.forEach(function(value, index) {
        phoneBook[contactName].push(value);
    });
    return true;
}


function execSHOW(commandAr) {
    var contacts = Object.keys(phoneBook);
    contacts.sort();

    var printedBook = contacts.map(function(contact, index) {
        var phones = phoneBook[contact];
        var contactInfoS = contact + ': ' + phones.join(', ');
        return contactInfoS;
    });

    return printedBook;
}


function execREMOVE(commandAr) {
    var numberToRemove = commandAr[REMOVED_NUMBER];

    var contacts = Object.keys(phoneBook);
    var result = false;
    contacts.forEach(function(contact, index) {
        var phones = phoneBook[contact];
        var phoneIndex = phones.indexOf(numberToRemove);
        if (phoneIndex !== -1) {
            phones.splice(phoneIndex, 1);
            result = true;
        };
        phoneBook[contact] = phones;

        if (phones.length === 0) {
            delete phoneBook[contact];
        }
    });

    return result;
}
