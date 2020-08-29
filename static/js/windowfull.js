/*
    O-R-G inc.

    windowfull object
    screenfull.js shim for iOS safari
    see https://github.com/sindresorhus/screenfull.js/
*/

(function () {
    'use strict';

    var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var isCommonjs = typeof module !== 'undefined' && module.exports;

    var windowfull = {
        request: function (element) {
            // add css class
            // scroll.to()
        },
        exit: function () {
            // rm css class
        },
        toggle: function (element) {
            // return this.isFullscreen ? this.exit() : this.request(element);
            alert("** window full ! **" + element);
        }
    };

    Object.defineProperties(windowfull, {
        isFullscreen: {
            get: function () {
                // check if currently fullwindow
                // (by presence of class?)
                // return Boolean(document[fn.fullscreenElement]);
                return true;
            }
        }
    });

    if (isCommonjs) {
        module.exports = windowfull;
    } else {
        window.windowfull = windowfull;
    }
})();
