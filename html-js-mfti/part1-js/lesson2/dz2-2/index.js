/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    var loweredAr = hashtags.map(function(value, index) {
        return value.toLocaleLowerCase();
    });

    var uniqueAr = loweredAr.reduce(function(accumulator, value) {
        accumulator[value] = 0;
        return accumulator;
    }, {});

    var uniqueTags = Object.keys(uniqueAr);
    var uniqueTagsStr = uniqueTags.join(', ');

    return uniqueTagsStr;
};
