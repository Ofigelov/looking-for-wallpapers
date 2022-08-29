import { DeviceObserver, operators } from '@deleteagency/device-observer/src/index';
import { viewports } from 'general/js/config';

const deviceObserver = new DeviceObserver(viewports);

export { deviceObserver, operators };
