import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './pocketbase-types';

/**
 * Initialise l'instance PocketBase avec une URL adaptée à l'environnement.
 * En dev: localhost:8090 (serveur PocketBase local)
 * En prod: valeur de PB_URL ou PUBLIC_PB_URL (sinon fallback localhost:8090 pour éviter un faux port 8086 qui pointe vers l'app Astro)
 *
 * PROBLÈME CORRIGÉ: l'URL précédente "http://localhost:8086" en production pointait vers le serveur Astro lui‑même et non PocketBase,
 * entraînant des 404 "Missing collection context." lorsque le SDK tentait d'appeler /api/collections/... sur la mauvaise cible.
 */

// Déclarations minimales pour éviter les erreurs TS si @types/node absent
// et si la cible module TS ne supporte pas import.meta, on garde un fallback.
declare const process: any | undefined; // eslint-disable-line

function resolveBaseUrl() {
    // Variables côté serveur (PB_URL) ou exposées (PUBLIC_PB_URL) si besoin côté client.
    // import.meta.env est supporté par Vite/Astro; si indisponible on revient à un objet vide
        const mode = (typeof process !== 'undefined' ? process.env?.NODE_ENV : undefined) || 'production';
        const fromEnv = (typeof process !== 'undefined' ? (process.env?.PB_URL || process.env?.PUBLIC_PB_URL) : undefined);

    let url: string;
    if (mode === 'development') {
        url = 'http://localhost:8090';
    } else {
        url = fromEnv || 'http://127.0.0.1:8090'; // fallback raisonnable; éviter 8086 (serveur Astro)
    }

    // Normalisation légère
    url = url.replace(/\/$/, '');
    return url;
}

const baseUrl = resolveBaseUrl();
const pb = new PocketBase(baseUrl) as TypedPocketBase;

// Option: log une seule fois côté serveur (pas en edge/client) pour diagnostic.
if (typeof process !== 'undefined' && process?.stdout && !(globalThis as any).__PB_BASE_LOGGED__) {
    (globalThis as any).__PB_BASE_LOGGED__ = true;
    console.log('[PocketBase] Base URL =', baseUrl);
}

export default pb;
