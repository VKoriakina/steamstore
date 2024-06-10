import enLocale from './EN.json';
import deLocale from './DE.json';

export function getLocalization() {
    if(process.env.locale === 'en-EN') {
        return enLocale;
    }

    return deLocale;
}