import whatInput from 'what-input';

if (whatInput.ask('intent') !== 'touch') {
    document.documentElement.classList.add('can-hover');
}
