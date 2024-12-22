import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  useStderr: true,
  silent: false,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
export default config;
