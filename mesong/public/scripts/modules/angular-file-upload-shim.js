/*! 1.4.0 */
window.XMLHttpRequest && window.FormData && (XMLHttpRequest = function (a) {
    return function () {
        var b = new a;
        return b.setRequestHeader = function (a) {
            return function (c, d) {
                if ("__setXHR_" === c) {
                    var e = d(b);
                    e instanceof Function && e(b)
                } else a.apply(b, arguments)
            }
        }(b.setRequestHeader), b
    }
}(XMLHttpRequest), window.XMLHttpRequest.__isShim = !0);