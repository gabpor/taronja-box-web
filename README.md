# Taronja Box — sitio web multisede

Sitio web de [Taronja Box](https://taronjabox.com), un box de CrossTraining con tres sedes (Valencia, Moncada y Massanassa). Lo desarrollé durante mis prácticas de 1.º de DAW, sin remuneración y con autorización de Taronja Box para mostrarlo.

## Qué resuelve

Tres sedes que compiten por las mismas búsquedas locales. Cada sede tiene su página, sus datos estructurados y sus preguntas frecuentes, y no hay redirecciones automáticas por ubicación.

## Decisiones técnicas

- **Astro + Tailwind**, sitio estático pensado para alojamiento básico (Hostinger).
- **Una landing por sede** (`/valencia`, `/moncada`, `/massanassa`) con JSON-LD propio (`ExerciseGym`, `LocalBusiness`, `FAQPage`), generado desde `src/lib/schema.ts`.
- **Sin backend:** la reserva se delega en el calendario de WodBuster, la prueba gratuita en Google Forms y el contacto en WhatsApp.
- **Sugerencia de sede por geolocalización IP:** implementada y desactivada. Enviaba la IP del visitante a un tercero sin consentimiento; solo se reactivaría con aviso y consentimiento previos.

## Cómo se hizo (uso de IA)

Trabajé con Claude Code (agentes planificador, implementador y revisor). Yo definí el alcance, la estructura por sedes y las decisiones de SEO, y revisé el resultado. Buena parte del código de las páginas lo generó la IA a partir de esas especificaciones. Este repositorio no incluye el historial anterior.

## Estado y límites conocidos

- Faltan los datos del titular en `aviso-legal` y `privacidad` (pendientes del cliente).
- No hay `sitemap` ni `robots.txt`.
- Hay mucha duplicación entre los componentes de cada sede; sería el primer refactor.
- Algunas imágenes originales pesaban más de 1 MB sin optimizar.
- Las imágenes y vídeos del cliente (incluyen personas) no están en el repositorio, así que en local la web se ve sin fotos.

## Ejecutar en local

```bash
npm install
npm run dev
```

Se abre en http://localhost:4321.
