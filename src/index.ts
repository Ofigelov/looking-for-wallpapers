/* general styles */
import 'general/scss/index.scss';

/* plugins */
import 'general/js/what-input';

/* components */
import 'components/lazysizes';
import 'components/notifications';
import 'components/spinner';
import 'components/kona-image';
import 'components/kona-grid';
import 'components/rule-grid';

/* require svg */
// @ts-ignore
const files = require.context('general/svg', true, /^\.\/.*\.svg/);
files.keys().forEach(files);
