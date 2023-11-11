import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  coverageReporters: ['text'],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};

export default config;