import { dcFactory } from '@deleteagency/dc';
import { nanoid } from 'nanoid';
import { dynamicStylesService } from 'general/js/dynamic-styles-service';
import { deviceObserver } from 'general/js/device-observer';
import { getScrollbarSize } from 'general/js/scrollbar-handler';

declare global {
    interface Window {
        appConfig: string;
    }
}

class App {
    public config = window.appConfig || '';

    private id = nanoid(10);

    public init(): void {
        dcFactory.init();
        this._setScrollbarSize();
        this._watchViewport();
    }

    private _watchViewport(): void {
        this._setViewportSize();
        deviceObserver.subscribeOnResize(this._setViewportSize);
    }

    private _setViewportSize = (): void => {
        dynamicStylesService.setStyles({
            id: this.id + 'v',
            selector: '.body',
            css: `--viewport-height: ${window.innerHeight}px;`,
        });
    };

    private _setScrollbarSize = (): void => {
        dynamicStylesService.setStyles({
            id: this.id + 's',
            selector: '.body',
            css: `--scrollbar: ${getScrollbarSize()}px;`,
        });
    };
}

export const app = new App();
