// src/lib/geoRouting.ts
// ──────────────────────────────────────────────────────────────────────────────
// Lógica de Soft Routing para las sedes de Taronja Box.
// NUNCA produce redirecciones HTTP. Solo devuelve metadatos de la sede
// sugerida para que el componente en el DOM la muestre al usuario.
//
// El hosting real (Hostinger) sirve HTML estático puro — no hay servidor/edge
// que lea la IP del visitante por request. Por eso `resolveLocation()` es una
// función pura sin dependencias de Headers/Cloudflare: recibe datos ya
// resueltos (hoy, desde un fetch client-side a un servicio de geo-IP en
// LocationBanner.astro) y solo hace el cálculo de "¿qué sede está más cerca?".
// ──────────────────────────────────────────────────────────────────────────────

export type LocationKey = 'valencia' | 'moncada' | 'massanasa';

export interface TaronjaLocation {
    key: LocationKey;
    /** Nombre visible en la UI */
    label: string;
    /** Ruta de la landing local */
    href: string;
    /** Descripción corta para el banner */
    tagline: string;
    /** Coordenadas de la sede (para cálculo de distancia) */
    lat: number;
    lon: number;
}

// ── Catálogo de sedes ─────────────────────────────────────────────────────────
export const LOCATIONS: Record<LocationKey, TaronjaLocation> = {
    valencia: {
        key: 'valencia',
        label: 'Valencia',
        href: '/valencia',
        tagline: 'Box de entrenamiento en el centro de Valencia',
        lat: 39.4699,
        lon: -0.3763,
    },
    moncada: {
        key: 'moncada',
        label: 'Moncada',
        href: '/moncada',
        tagline: 'Tu hub de alto rendimiento en Moncada',
        lat: 39.5784,
        lon: -0.3960,
    },
    massanasa: {
        key: 'massanasa',
        label: 'Massanasa',
        href: '/massanassa',
        tagline: 'Cross training de élite en l\'Horta Sud',
        lat: 39.4019,
        lon: -0.4012,
    },
};

// ── Utilidades ────────────────────────────────────────────────────────────────

/**
 * Calcula la distancia haversine (km) entre dos coordenadas.
 * Usada solo en el servidor/edge para seleccionar la sede más cercana.
 */
function haversineKm(
    lat1: number, lon1: number,
    lat2: number, lon2: number,
): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Devuelve la sede Taronja Box más cercana a unas coordenadas dadas.
 */
function closestLocation(lat: number, lon: number): TaronjaLocation {
    let best: TaronjaLocation = LOCATIONS.valencia;
    let bestDist = Infinity;
    for (const loc of Object.values(LOCATIONS)) {
        const d = haversineKm(lat, lon, loc.lat, loc.lon);
        if (d < bestDist) {
            bestDist = d;
            best = loc;
        }
    }
    return best;
}

// ── Mapa rápido ciudad → sede ─────────────────────────────────────────────────
// Permite resolución O(1) para las ciudades del área metropolitana más comunes
// antes de caer en el cálculo haversine.
const CITY_MAP: Record<string, LocationKey> = {
    // Valencia capital y barrios
    valencia: 'valencia',
    'valència': 'valencia',
    benimàmet: 'valencia',
    benimaclet: 'valencia',
    campanar: 'valencia',
    patraix: 'valencia',
    // Norte (Moncada y entorno)
    moncada: 'moncada',
    montcada: 'moncada',
    vinalesa: 'moncada',
    alfara: 'moncada',
    foios: 'moncada',
    benifaraig: 'moncada',
    // Sur (Massanasa y entorno)
    massanasa: 'massanasa',
    catarroja: 'massanasa',
    albal: 'massanasa',
    beniparrell: 'massanasa',
    lloc: 'massanasa',
    silla: 'massanasa',
};

// ── API pública ───────────────────────────────────────────────────────────────

export interface GeoIpData {
    country?: string | null;
    city?: string | null;
    latitude?: number | null;
    longitude?: number | null;
}

/**
 * Determina la sede sugerida a partir de datos de geo-IP ya resueltos
 * (hoy: la respuesta de un servicio de geo-IP consultado desde el navegador).
 *
 * Prioridad de resolución:
 *   1. Mapa rápido por nombre de ciudad
 *   2. Cálculo haversine por coordenadas
 *   3. null si el país no es España o no hay datos suficientes
 *
 * ⚠️  Esta función NUNCA emite redirecciones. Solo devuelve metadatos.
 */
export function resolveLocation(data: GeoIpData): TaronjaLocation | null {
    // ── 1. Verificar que el visitante está en España ───────────────────────────
    // Solo sugerimos sede si el país es España. Para visitantes internacionales
    // no mostramos el banner.
    if (data.country && data.country !== 'ES') return null;

    // ── 2. Resolución por nombre de ciudad ────────────────────────────────────
    const rawCity = (data.city ?? '').toLowerCase().trim();
    if (rawCity && CITY_MAP[rawCity]) {
        return LOCATIONS[CITY_MAP[rawCity]];
    }

    // ── 3. Resolución por coordenadas ─────────────────────────────────────────
    const { latitude: lat, longitude: lon } = data;
    if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
        // Solo sugerir si estamos dentro de la provincia de Valencia (bounding box aproximado)
        const inProvincia =
            lat >= 38.8 && lat <= 40.0 &&
            lon >= -1.5 && lon <= 0.2;
        if (inProvincia) return closestLocation(lat, lon);
    }

    // ── 4. Fallback: sin datos suficientes ────────────────────────────────────
    return null;
}
