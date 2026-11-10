// src/lib/schema.ts
// Genera el JSON-LD LocalBusiness+ExerciseGym+FAQPage de cada landing local,
// enlazado por @id al Organization/WebSite global inyectado en Layout.astro.

import { faqs, type Faq } from './faqs';

const SITE_URL = 'https://taronjabox.com';

export interface LocationBusinessData {
    /** Ruta de la landing, ej. '/valencia' */
    path: string;
    name: string;
    description: string;
    telephone: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        postalCode: string;
        addressCountry: string;
    };
    geo: {
        latitude: number;
        longitude: number;
    };
    sameAs: string[];
}

export function buildLocationSchema(data: LocationBusinessData, faqList: Faq[] = faqs) {
    const url = `${SITE_URL}${data.path}`;
    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': ['ExerciseGym', 'LocalBusiness'],
                '@id': `${url}#business`,
                name: data.name,
                description: data.description,
                url,
                telephone: data.telephone,
                address: { '@type': 'PostalAddress', ...data.address },
                geo: { '@type': 'GeoCoordinates', ...data.geo },
                sameAs: data.sameAs,
                parentOrganization: { '@id': `${SITE_URL}/#organization` },
            },
            {
                '@type': 'FAQPage',
                '@id': `${url}#faq`,
                mainEntity: faqList.map((f) => ({
                    '@type': 'Question',
                    name: f.question,
                    acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
            },
        ],
    };
}
