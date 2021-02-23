import ZugletObject from 'zuglet/object';
import { reads } from 'macro-decorators';

export const doc = key => reads(`doc.${key}`);
export const data = key => doc(`data.${key}`);

export default class Model extends ZugletObject {
}
