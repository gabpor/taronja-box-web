import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

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
    ],
    // Habilitar rutas i18n / rutas locales sin redirecciones HTTP forzadas
    trailingSlash: 'never',
});
