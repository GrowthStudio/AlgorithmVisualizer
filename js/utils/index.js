'use strict';

const isScratchPaper = (category, algorithm) => {
  return category == 'scratch';
};

const getAlgorithmDir = (category, algorithm) => {
  return `https://growthstudio.github.io/AlgorithmVisualizer/algorithm/${category}/${algorithm}/`;
};

const getFileDir = (category, algorithm, file) => {
  return `https://growthstudio.github.io/AlgorithmVisualizer/algorithm/${category}/${algorithm}/${file}/`;
};

const renderMathJax = () =>{
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
};

module.exports = {
  isScratchPaper,
  getAlgorithmDir,
  getFileDir,
  renderMathJax
};
