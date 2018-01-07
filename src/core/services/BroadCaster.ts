import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

interface BroadcastEvent {
  key: any;
  data?: any;
}

/**
 * Help class. Used for broadcast event and event listening.
 */
@Injectable()
export class BroadCaster {
  private _eventBus: Subject<BroadcastEvent>;

  constructor() {
    this._eventBus = new Subject<BroadcastEvent>();
  }

  /**
   * broadcast event with key and data
   * @param   key     any     the broadcast event key.
   * @param   data    any(optioal)  broadcast params data.
   */
  broadcast(key: any, data?: any) {
    this._eventBus.next({ key, data });
  }

  /**
   * broadcast event listener.
   * @param  key  any the key of the broadcast event listening to.
   */
  on<T>(key: any): Observable<T> {
    return this._eventBus.asObservable()
      .filter(event => event.key === key)
      .map(event => <T>event.data);
  }
}
