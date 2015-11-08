var connect = require('gulp-connect');
var gulp = require('gulp');
var httpProxy = require('http-proxy');
var modRewrite = require('connect-modrewrite');

/**
 * Get proxy middleware for api & media requests
 *
 * @param {string} host - middleware insert this to 'Host' header
 * @param {string} proxyUrl
 */
function proxy(host, proxyUrl) {
  if (!host || !proxyUrl) {
    throw new Error('host or proxyUrl argument not found');
  }

  var proxyServer = httpProxy.createProxyServer({ target: proxyUrl, secure: false });

  proxyServer.on('error', function(err, req, res) {
    console.log(err);
    res.end();
  });

  return function(req, res, next) {
    if (req.url.indexOf('/api/') !== 0 && req.url.indexOf('/data/') !== 0 ) {
      return next();
    }

    req.headers.host = host;
    proxyServer.web(req, res);
  };
}

/**
 * Get modRewrite middleware: response index.html for non-files requests
 */
function rewrite() {
  return modRewrite([ '!\\.\\w+$ /index.html [L]' ]);
  // return modRewrite(['!\.[a-zA-Z0-9/-_]+$ /index.html']);
}

module.exports = function(host, proxyUrl) {
  if (!host) { throw new Error("gulp serve: 'host' variable not found") }
  if (!proxyUrl) { throw new Error("gulp serve: 'proxyUrl' variable not found") }

  gulp.task('serve', function() {
    connect.server({
      root: ['.tmp'],
      port: 3001,
      livereload: true,
      middleware: function(connect, opt) {
        return [
          proxy(host, proxyUrl),
          rewrite(),
        ];
      },
    });
  });
};
