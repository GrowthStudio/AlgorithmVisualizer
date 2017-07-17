'use strict';

const RSVP = require('rsvp');
const app = require('./app');
const AppConstructor = require('./app/constructor');
const DOM = require('./dom');
const Server = require('./server');
const modules = require('./module');

const {
  extend
} = $;

$.ajaxSetup({
  cache: false,
  dataType: 'text'
});

const {
  isScratchPaper
} = require('./utils');

const {
  getHashValue,
  getParameterByName,
  getPath
} = require('./server/helpers');

// set global promise error handler
RSVP.on('error', function (reason) {
  console.assert(false, reason);
});

$(() => {
  // initialize the application and attach in to the instance module
  const appConstructor = new AppConstructor();
  extend(true, app, appConstructor);

  // load modules to the global scope so they can be evaled
  extend(true, window, modules);

  Server.loadCategories().then((data) => {
    app.setCategories(data);
    DOM.addCategories();

    window.postMessage(JSON.stringify({
      status: 'ready'
    }));

    $(window).on('bridge.run', function() {
      DOM.showRequestedAlgorithm(window.algorithm.category, window.algorithm.algorithm, window.algorithm.file);
    });
  });

  var v1LoadedScratch = getHashValue('scratch-paper');
  var v2LoadedScratch = getParameterByName('scratch-paper');
  var vLoadedScratch = v1LoadedScratch || v2LoadedScratch;
  if (vLoadedScratch) {
    window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname + '#path=scratch/' + vLoadedScratch;
  }

});
