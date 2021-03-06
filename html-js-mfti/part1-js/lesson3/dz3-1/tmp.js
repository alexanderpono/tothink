,

getDay: function() {
    // console.log('getDay() value', this.value);
    // console.log('getDay() 2017-05-16T10:45:00.000Z', /[0-9]+-[0-9]+-[0-9]+T[0-9T:\.Z\-]+/.test('2017-05-16T10:45:00.000Z'));
    var result = this.value.toISOString().match(/([0-9]+)-([0-9]+)-([0-9]+)T[0-9T:\.Z\-]+/);
    // console.log('getDay() result', JSON.stringify(result));
    var dayOfMonth = result[3];
    if (typeof dayOfMonth === 'undefined') {
        throw new Error('Day of monthe decode internal error');
    };
    // console.log('getDay() dayOfMonth', dayOfMonth);
    dayOfMonth = parseInt(dayOfMonth);
    return dayOfMonth;
}

function isLeapYear (year) {
    return new Date(year, 1, 29).getMonth() == 1;
}

