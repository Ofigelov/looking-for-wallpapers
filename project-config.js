const path = require('path');

const makeConfig = ({
    path,
    buildConfiguration = 'Debug',
    buildToolsVersion = '16.0',
    solutionName = 'FormulaE.Web',
    runCleanBuilds = false,
    appPool = 'formulae.local',
    assemblyRoot = './FormulaE.Web',
    dist,
}) => ({
    buildConfiguration,
    buildToolsVersion,
    websiteRoot: path,
    dist: dist || path + '\\dist',
    ssrRoot: path + '\\_ssr',
    sitecoreLibraries: path + '\\bin',
    unicornPath: path + '\\Unicorn',
    licensePath: path + '\\Data\\license.xml',
    solutionName,
    runCleanBuilds,
    url: 'http://formulae.local',
    appPool,
    assemblyRoot,
});

module.exports = {
    makeConfig,
    default: makeConfig(
        process.env.deploy
            ? { path: path.resolve('./deploy'), buildConfiguration: 'Test' }
            : { path: path.resolve('../../formulae.local') }
    ),
};
