module.exports = {
    events: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.events.hasOwnProperty(event)) {
            this.events[event] = [];
        };

        var eventListeners = this.events[event];
        eventListeners.push({subscriber: subscriber, handler: handler});
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (!this.events.hasOwnProperty(event)) {
            return this;
        };
        var eventListeners = this.events[event];
        eventListeners = eventListeners.filter(function(listenerInfo) {
            if (listenerInfo.subscriber === subscriber) {
                return false;
            };
            return true;
        });
        this.events[event] = eventListeners;
        return this;

    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (!this.events.hasOwnProperty(event)) {
            return this;
        };
        var eventListeners = this.events[event];
        eventListeners.forEach(function(listenerInfo) {
            var context = listenerInfo.subscriber;
            listenerInfo.handler.call(context, event);
        });
        return this;
    }
};
