import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    // Sitio estático puro (hosting real: Hostinger). Necesario para que
    // Astro.url/Astro.site resuelvan al dominio real (no http://localhost:4321)
    // al generar canonical/og:url.
    site: 'https://taronjabox.com',
    integrations: [
        tailwind({
            // Nuestro global.css inyecta @tailwind base/components/utilities
            applyBaseStyles: false,
        }),
        // Genera sitemap-index.xml y sitemap-0.xml al compilar; robots.txt lo enlaza.
        sitemap(),
    ],
    // Con barra final ("/valencia/"): es lo que ya hace el servidor (301 de
    // "/valencia" a "/valencia/"), así el canonical, el sitemap y los enlaces
    // internos coinciden con la URL que realmente se sirve.
    trailingSlash: 'always',
});
