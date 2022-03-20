const path = require('path');

module.exports = function() {
  var instanceRoot = path.resolve('../../formulae.local');
  var config = {
    buildConfiguration: 'Debug',
    buildToolsVersion: '16.0',
    websiteRoot: instanceRoot + '',
    scriptRoot: instanceRoot + '\\_scripts',
    styleRoot: instanceRoot + '\\_styles',
    ssrRoot: instanceRoot + '\\_ssr',
    sitecoreLibraries: instanceRoot + '\\bin',
    unicornPath: instanceRoot + '\\Unicorn',
    licensePath: instanceRoot + '\\Data\\license.xml',
    solutionName: 'FormulaE.Web',
    runCleanBuilds: false,
    url: 'http://formulae.local',
    appPool: 'FormulaE',
    assemblyRoot: './FormulaE.Web',
  };
  return config;
};
