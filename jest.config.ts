import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
};

config.testEnvironment = 'jsdom';
config.testEnvironmentOptions = {
  html: '<html lang="zh-cmn-Hant"></html>',
  url: 'https://jestjs.io/',
  userAgent:  'Agent/007'
}
  
export default config;

