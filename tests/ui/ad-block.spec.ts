import { expect, test } from '../../fixtures/pages';
 
/**
 * TEMPORARY diagnostic — delete before merging.
 *
 * The second test is the control. Without it the first proves nothing: a count
 * of zero is equally consistent with "our route blocked the ads" and with
 * "no ads were served to this machine in the first place".
 */
 
const AD_SLOT = 'ins.adsbygoogle[data-ad-status="filled"]';
const AD_FRAME = 'iframe[title="Advertisement"]';
 
test('blocked: no ad frames are rendered', async ({ homePage }, testInfo) => {
    await homePage.navigate();
    await homePage.page.waitForTimeout(5000);
 
    const filled = await homePage.page.locator(AD_SLOT).count();
    const frames = await homePage.page.locator(AD_FRAME).count();
    console.log(`AD DIAGNOSTIC [${testInfo.project.name}] BLOCKED  slots=${filled}  frames=${frames}`);
 
    expect(filled + frames).toBe(0);
});
 
test('control: ads render when nothing is blocked', async ({ browser }, testInfo) => {
    const context = await browser.newContext();
    const page = await context.newPage();
 
    await page.goto('https://automationexercise.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
 
    const filled = await page.locator(AD_SLOT).count();
    const frames = await page.locator(AD_FRAME).count();
    console.log(`AD DIAGNOSTIC [${testInfo.project.name}] CONTROL  slots=${filled}  frames=${frames}`);
 
    await context.close();
});