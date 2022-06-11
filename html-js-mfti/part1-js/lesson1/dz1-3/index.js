/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    var MINUTES_IN_DAY = 24 * 60;

    var curAllMinutes = hours * 60 + minutes;
    var newAllMinutes = curAllMinutes + interval;
    newAllMinutes = newAllMinutes % MINUTES_IN_DAY;

    var newHours = Math.floor(newAllMinutes / 60);
    var newMinutes = newAllMinutes - newHours * 60;

    var newHoursS   = '' + newHours;
    var newMinutesS = '' + newMinutes;
    newHoursS = (newHoursS.length < 2) ? ('0' + newHoursS) : newHoursS;
    newMinutesS = (newMinutesS.length < 2) ? ('0' + newMinutesS) : newMinutesS;
    var timeS = newHoursS + ':' + newMinutesS;

    return timeS;
};
