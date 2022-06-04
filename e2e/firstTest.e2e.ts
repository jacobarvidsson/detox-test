import { by, device, expect, element } from 'detox';
import { launchDetoxApp } from './detox-helpers';

describe('Example', () => {
  beforeAll(async () => {
    await launchDetoxApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('home.container.welcome'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('home.container.button')).tap();
    await expect(element(by.text('Thank you for clicking!'))).toBeVisible();
  });
});
