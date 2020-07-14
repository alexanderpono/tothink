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

    return false;
};


function execADD(commandAr) {
    var paramsStr = commandAr[COMMAND_PARAMETER];
    var params = paramsStr.split(',');
    var contactName = commandAr[CONTACT_NAME];

    params.forEach(function(value, index) {
        phoneBook[value] = contactName;
    });
    return true;
}


function execSHOW(commandAr) {
    var contactToPhones = {};
    var phoneNumbers = Object.keys(phoneBook);
    phoneNumbers.forEach(function(phone, index) {
        var contact = phoneBook[phone];
        var phonesOfContact = [];
        if (contactToPhones.hasOwnProperty(contact)) {
            phonesOfContact = contactToPhones[contact];
        };
        phonesOfContact.push(phone);
        contactToPhones[contact] = phonesOfContact;
    });

    var contacts = Object.keys(contactToPhones);
    contacts.sort();

    var printedBook = contacts.map(function(contact, index) {
        var phones = contactToPhones[contact];
        var contactInfoS = contact + ': ' + phones.join(', ');
        return contactInfoS;
    });

    return printedBook;
}


function execREMOVE(commandAr) {
    var numberToRemove = commandAr[REMOVED_NUMBER];

    if (!phoneBook.hasOwnProperty(numberToRemove)) {
        return false;
    };

    delete phoneBook[numberToRemove];
    return true;
}
