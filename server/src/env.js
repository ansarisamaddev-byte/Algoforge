// Loads ../.env (if present) before any other module reads process.env.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
try {
  process.loadEnvFile(path.resolve(here, '../../.env'));
} catch {
  /* no .env file — fine, defaults apply */
}
