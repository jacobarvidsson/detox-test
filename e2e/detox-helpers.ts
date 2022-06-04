import { device, cleanup, init } from 'detox';

const config = require('../package.json').detox;

jest.setTimeout(120000);

afterAll(async () => {
  await cleanup();
});

export const launchDetoxApp = async () => {
  await init(config, { initGlobals: false });
  await device.launchApp();
};
