"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(uri, data) {
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

        try {
          err.body = typeof err.response == 'string' ? req.response : req.response && JSON.stringify(req.response) || req.responseText;
        } catch (e) {
          err.body = '';
        }

        reject(err);
      } else {
        if (typeof req.response == 'string') {
          resolve(req.response && JSON.parse(req.response) || null);
        } else if (req.response === null || req.response) {
          resolve(req.response);
        } else {
          resolve(req.responseText && JSON.parse(req.responseText) || null);
        }
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

exports["default"] = _default;
