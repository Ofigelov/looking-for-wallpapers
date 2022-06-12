import 'tippy.js/animations/shift-toward.css';

export const popupDefaultProps = {
    className: 'tippy-box popup',
    animation: 'shift-toward',
    interactive: true,
    interactiveBorder: 10,
    trigger: 'click',
    duration: [250, 0],
    arrow: false,
    maxWidth: 385,
    placement: 'bottom',
    offset: [0, 0],
    zIndex: 100,
};
