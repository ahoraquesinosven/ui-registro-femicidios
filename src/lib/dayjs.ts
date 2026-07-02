// Centralised dayjs setup. Importing dayjs from this module guarantees the utc
// plugin and the `es` locale are registered before any use, regardless of module
// load order or code-splitting. Always import dayjs from '@/lib/dayjs' — never
// from 'dayjs' directly (enforced by the no-restricted-imports lint rule).
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';

dayjs.extend(utc);

export default dayjs;
export type { Dayjs } from 'dayjs';
