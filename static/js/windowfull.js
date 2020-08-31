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
            var container = document.createElement('DIV');
            container.id = 'fullwindow';
            element.classList.toggle('fullwindow');
            alert("** window full ! **" + element);
            // scroll.to() ?
        },
        exit: function () {
            //var container = document.getElementById('fullwindow');
            // container.remove();
            // element.classList.toggle('fullwindow');
            alert("** window empty ! **" + element);
            // scroll.to() ?
        },
        toggle: function (element) {
            // alert("** window full ! **" + element);
            // this.request(element);
            // return this.isFullwindow ? this.request(element) : this.exit();
alert(this.isFullwindow);
            return this.isFullwindow ? this.exit() : this.request(element);
        }
    };

    Object.defineProperties(windowfull, {
        isFullwindow: {
            get: function () {
                // check if currently fullwindow
                // (by presence of class?
                // or presence of div)
                // return true;
                // return Boolean(document[fn.fullscreenElement]);
                // return Boolean(!(document.getElementById('fullwindow')));
                return Boolean(document.getElementById('fullwindow'));
            }
        }
    });

    if (isCommonjs) {
        module.exports = windowfull;
    } else {
        window.windowfull = windowfull;
    }
})();
