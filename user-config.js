const path = require('path');

const { makeConfig } = require('./project-config.js');
module.exports = {
    default: makeConfig({ path: path.resolve('../../formulae.local'), appPool: 'FormulaE' }),
};
