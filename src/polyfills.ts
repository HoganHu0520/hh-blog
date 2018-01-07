import 'babel-polyfill';
import 'events-polyfill';
import 'canvas-toBlob';
require('zone.js/dist/zone');
require('intl');
require('intl/locale-data/jsonp/en.js');

if (process.env.ENV === 'production') {
  // Production
} else {
  // Development and test
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
