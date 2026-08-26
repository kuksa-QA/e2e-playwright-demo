import { BrowserContext, Page } from '@playwright/test';

export const THIRD_PARTY_NOISE =
    /googlesyndication\.com|googleadservices\.com|doubleclick\.net|adservice\.google\.|google-analytics\.com|googletagmanager\.com|adtrafficquality\.google/;

export async function blockThirdPartyNoise(target: Page | BrowserContext): Promise<void> {
    await target.route(THIRD_PARTY_NOISE, route => route.abort());
}