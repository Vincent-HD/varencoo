import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';

import { createRouter } from './router';
import { migrator } from './utils/migrator';

await migrator();

export default createStartHandler({
  createRouter,
})(defaultStreamHandler)
