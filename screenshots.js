const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // 390px mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/final-390px.png', fullPage: true });
  console.log('✓ Saved final-390px.png');
  
  // 1440px desktop screenshot  
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/tmp/final-1440px.png', fullPage: true });
  console.log('✓ Saved final-1440px.png');
  
  await browser.close();
})().catch(err => console.error('Error:', err.message));
