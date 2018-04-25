import Axios from 'axios';
import { SESSION_API_URL } from '../../constants';

export function getAboutUsContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/aboutUs`, {
        locale
    }).then(response => response.data && response.data.introductionText);
}

export function getFAQContent(locale) {
    return Axios.get(`${SESSION_API_URL}/content/FAQ`, {
        locale
    }).then(response => response.data && response.data.faq);
}

export function getLocalizationContent(locale) {
    return Promise.all([getAboutUsContent(locale), getFAQContent(locale)]).then(([aboutUs, FAQ]) => ({
        data: { aboutUs, FAQ }
    }));
}

export function getAboutUsInfo(locale) {
    return Promise.resolve({
        data: `Digital Energy aims at transparency and sustainability for a currently closed-off system and to directly link clean producers and smart consumers to revolutionize the energy market around the world. Be part of  a clean and affordable energy future in a decentralized environment!\nThe Digital Energy Exchange platform is the embodiment of our vision for an open and direct energy exchange. Using our blockchain-based exchange platform, we simplify the legal, operational and economic hurdles for green power producers and allow customers to buy truly green electricity at an affordable price.\nOn our Digital Energy Exchange platform registered producers and customers easily trade tokenized energy and have a real-time overview of the energy price development.`
    }).then(response => {
        const { data } = response;
        return { data: data.split('\n') };
    });
}
