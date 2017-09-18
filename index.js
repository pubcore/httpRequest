'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (uri, data) {
    var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';

    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState != 4) {
                return;
            }

            if (req.status != 200) {
                var err = new Error('HTTP Error:' + req.statusText);
                err.status = req.status;
                err.body = typeof err.response == 'string' ? req.response : req.responseText;
                reject(err);
            } else {
                var response = typeof req.response == 'string' ? JSON.parse(req.response) : req.response || JSON.parse(req.responseText);
                resolve(response);
            }
        };

        req.open(method, uri, true);
        req.withCredentials = true;
        req.setRequestHeader('Accept', 'application/json');
        req.setRequestHeader('Content-Type', 'application/json');
        req.responseType = 'json';
        req.send(JSON.stringify(data));
    });
};
