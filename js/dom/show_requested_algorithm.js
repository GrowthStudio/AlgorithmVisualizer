'use strict';

const Server = require('../server');
const showAlgorithm = require('./show_algorithm');

module.exports = (category, algorithm, file) => {
  $(`.category[data-category="${category}"]`).click();
  Server.loadAlgorithm(category, algorithm).then((data) => {
    showAlgorithm(category, algorithm, data, file);

    window.setTimeout(function(){
      $('#btn_run').trigger('click');
      window.postMessage(JSON.stringify({ status: 'loading' }));
    }, 500);
  });
};
