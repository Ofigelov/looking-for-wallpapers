import fs from 'fs';
import projectConfig from './project-config.js';
import unicorn from './scripts/unicorn.js';
import habitat from './scripts/habitat.js';

let config = projectConfig.default;
if (fs.existsSync('./user-config.js')) {
    config = await import('./user-config.js').then(result => result.default.default)
}

const options = {
    siteHostName: habitat.getSiteUrl(),
    authenticationConfigFile: config.websiteRoot + '\\App_config\\Include\\Unicorn\\Unicorn.UI.config'
};

await new Promise((resolve) => {
    unicorn(resolve, options);
})
