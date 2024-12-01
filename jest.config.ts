import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest',
  },
};

config.testEnvironment = 'jsdom';
config.testEnvironmentOptions = {
  html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
      </head>
      <body>
          <div id="js"><div/>
      </body>
      </html>`,
  url: 'https://jestjs.io/',
  userAgent:  'Agent/007'
}
  
export default config;

