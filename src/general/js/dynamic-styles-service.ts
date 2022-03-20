class DynamicStylesService {
    protected parent = document.head;

    private tag = document.createElement('style');

    private elements: { [id: string]: { selector: string; css: string } } = {};

    constructor() {
        this.parent.appendChild(this.tag);
    }

    setStyles = ({ id, selector, css }: { id: string; selector: string; css: string }): void => {
        this.elements[id] = { selector, css };
        this._updateTag();
    };

    _updateTag = (): void => {
        const { elements } = this;
        this.tag.innerHTML = Object.keys(elements)
            .map((key) => `${elements[key].selector} { ${elements[key].css} }`)
            .join(' ');
    };

    remove = (id: string): void => {
        if (this.elements[id]) {
            delete this.elements[id];
            this._updateTag();
        }
    };
}

export const dynamicStylesService = new DynamicStylesService();
