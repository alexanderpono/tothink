/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    function mapCallBack(value, index) {
        if (index === 0) {
            return '';
        };
        var withoutSpacesAr = value.split(' ');
        var tag = withoutSpacesAr[0];
        return tag;
    }

    var tags = tweet.split('#').map(mapCallBack);
    tags.shift();

    return tags;
};
