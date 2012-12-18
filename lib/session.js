module.exports.create = function (username, password, callback) {
  var libxmljs = require('libxmljs');
  var payload = new libxmljs.Document();
  payload.node("authentication-context")
    .node("username", username).parent()
    .node("password", password).parent()
    .node("validation-factors")
    .node("validation-factor")
    .node("name", "remote_address").parent()
    .node("value", "127.0.0.1");

  var options = {
    method: "POST",
    payload: payload.toString(),
    path: "/crowd/rest/usermanagement/latest/session"
  };

  _doRequest(options, function (err, res) {
    if(err) {
      return callback(err);
    }
    else {
      return callback(null, res.token);
    }
  });
};

module.exports.find = function (token, callback) {
  var options = {
    method: "GET",
    path: "/crowd/rest/usermanagement/latest/session/" + token
  };

  _doRequest(options, function (err, res) {
    return callback(err, res);
  });
};

module.exports.authenticate = function (token, callback) {
  var libxmljs = require('libxmljs');
  var payload = new libxmljs.Document();
  payload.node('validation-factors')
    .node('validation-factor')
    .node('name', 'remote_address').parent()
    .node('value', '127.0.0.1');

  var options = {
    "method": "POST",
    "payload": payload.toString(),
    "path": "/crowd/rest/usermanagement/latest/session/" + token
  };

  _doRequest(options, function (err, res) {
    return callback(err, res);
  });
};

module.exports.destroy = function (token, callback) {
  var options = {
    "method": "DELETE",
    "path": "/crowd/rest/usermanagement/latest/session/" + token
  };

  _doRequest(options, function (err, res) {
    return callback(err, res);
  });
};