import Model from './model';
import { defer } from 'rsvp';
import { equal } from 'macro-decorators';

const {
  assign
} = Object;

const status = value => equal('status', value);

export default class Dialog extends Model {

  @status('confirmed')
  isConfirmed;

  @status('rejected')
  isRejected;

  @status('cancelled')
  isCancelled;

  constructor(owner, props) {
    super(owner);
    assign(this, props);
    this._deferred = defer();
    this.promise = this._deferred.promise;
  }

  get componentName() {
    let { dialog } = this;
    return `block/dialogs/${dialog}`;
  }

  _done() {
    this.dialogs._remove(this);
  }

  resolve(props) {
    assign(this, props);
    this._deferred.resolve(this);
    this._done();
  }

  reject(err) {
    assign(this, { status: 'rejected', error: err })
    this._deferred.reject(err);
    this._done();
  }

  confirm() {
    this.resolve({ status: 'confirmed' });
  }

  cancel() {
    this.resolve({ status: 'cancelled' });
  }

}
