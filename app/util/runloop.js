import { next as _next, later as _later } from '@ember/runloop';

export const next = () => new Promise(resolve => _next(() => resolve()));
export const later = delay => new Promise(resolve => _later(() => resolve(), delay));
