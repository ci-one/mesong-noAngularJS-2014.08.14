'use strict';

var path = require('path');

/**
 * Send partial, or 404 if it doesn't exist
 */
/**
 * Send our single page app
 */
exports.index = function(req, res) {
  res.render('index');
};
