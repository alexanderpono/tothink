const YEARS = 'years';
const MONTHS = 'months';
const DAYS = 'days';
const HOURS = 'hours';
const MINUTES = 'minutes';
const SUPPORTED_UNITS = [
    YEARS, MONTHS, DAYS, HOURS, MINUTES
];


/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (dateString) {
    var startDate = getStartDate(dateString);

    function getStartDate(dateString)
    {
        var result = dateString.match(/([0-9]+)-([0-9]+)-([0-9]+) ([0-9]+):([0-9]+)/);
        var year = result[1];
        var month = parseInt(result[2]) - 1;
        var day = result[3];
        var hours = result[4];
        var minutes = result[5];
        var d = new Date(Date.UTC(year, month, day, hours, minutes));
        return d;
    }

    var timeObj = {
        myValue: startDate,
        add: function(quantity, unit) {
            if (SUPPORTED_UNITS.indexOf(unit) === -1) {
                throw new TypeError('Unsupported units');
            };

            if (quantity < 0) {
                throw new TypeError('Quantity must be > 0');
            };

            return this.internalAdd(quantity, unit);
        },

        subtract: function(quantity, unit) {
            if (SUPPORTED_UNITS.indexOf(unit) === -1) {
                throw new TypeError('Unsupported units');
            };

            if (quantity < 0) {
                throw new TypeError('Quantity must be > 0');
            };
            return this.internalAdd(-quantity, unit);
        },

        internalAdd: function(quantity, unit) {
            var minutes = 0;
            switch (unit) {
                case YEARS:
                    var curYear = this.myValue.getFullYear();
                    curYear += quantity;
                    this.myValue.setFullYear(curYear);
                    break;

                case MONTHS:
                    var curMonth = this.myValue.getMonth();
                    curMonth += quantity;
                    this.myValue.setMonth(curMonth);
                    break;

                case DAYS:
                    minutes = 60 * 24 * quantity;
                    minutes += this.myValue.getMinutes();
                    this.myValue.setMinutes(minutes);
                    break;

                case HOURS:
                    minutes = 60 * quantity;
                    minutes += this.myValue.getMinutes();
                    this.myValue.setMinutes(minutes);
                    break;

                case MINUTES:
                    minutes = quantity;
                    minutes += this.myValue.getMinutes();
                    this.myValue.setMinutes(minutes);
                    break;

            }

            return this;

        },
        getPrettyValue: function() {
            var year = this.myValue.getFullYear();
            var month = this.myValue.toLocaleString("ru", {timeZone : "UTC",month: '2-digit'});
            var day = this.myValue.toLocaleString("ru", {timeZone : "UTC",day: '2-digit'});
            var time = this.myValue.toLocaleString("ru", {timeZone : "UTC", hour: '2-digit', minute: '2-digit' });
            var dates = year + "-" + month + "-" + day + " " + time;
            return dates;
        }

    };

    Object.defineProperty(timeObj, 'value', {
        get: function() {
            return this.getPrettyValue();
        }
    });

    return timeObj;

};
