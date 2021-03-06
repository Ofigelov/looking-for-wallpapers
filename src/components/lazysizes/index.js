import './scss/index.scss';

// object fit pollyfill for ie
import 'lazysizes/plugins/object-fit/ls.object-fit';
// data-src set
import 'lazysizes/plugins/respimg/ls.respimg';
// img sizes based on parent size
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

// lib
import 'lazysizes';

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.minSize = 0;
