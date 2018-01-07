import { Injectable, EventEmitter } from '@angular/core';
import { URLSearchParams, Headers, RequestOptions, Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { ServiceLocator } from '@/utils/ServiceLocator';
import { BroadCaster} from '@/core/services/BroadCaster';
import { APP_CONFIG, AppConfig } from '@/types';

/**
 * basic service.
 */
@Injectable()
export class BasicService {
  baseurl: string;
  private headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Aug'
  });
  private params = new URLSearchParams();
  private options: RequestOptions;
  private http: Http;
  private config: AppConfig;

  constructor(private broadCaster: BroadCaster) {
    this.config = ServiceLocator.injector.get(APP_CONFIG);
    this.baseurl = `${this.config.serviceAddress}/api`
    this.http = ServiceLocator.injector.get(Http);
    this.options = new RequestOptions({ headers: this.headers, search: this.params });
  }

  /**
   * basic function implement http get.
   */
  get(url: string) {
    return this.request('get', url);
  }

  /**
   * basic funciton inplement http post.
   */
  post(url: string, body: any) {
    return this.request('post', url, body);
  }

  /**
   * basic fucntion implement http put.
   */
  update(url: string, body: any) {
    return this.request('put', url, body);
  }

  /**
   * basic function implement http delete.
   */
  delete(url: string) {
    return this.request('delete', url);
  }

  /**
   * public error handle function.
   */
  errorHandler(error: any) {
    this.broadCaster.broadcast('AccessForbidden');
  }

  /**
   * basic funciton for http request implementation.
   * @param {method}    string    the request method, can be get, post, put, delete.
   * @param {url}       string    the request url.
   * @param {body}      json      optional,  the request body for post and put request.
   * @param {headers}   Headers   optional, request headers.
   *
   * @return            Promise<any> | void  response for request.
   */
  private request(method: string, url: string, body?: any, headers?: Headers) {
    let res = new Promise<any>((resolve, reject) => {
      ServiceLocator.accessToken.then(token => {
        let responser;
        if (token) {
          this.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          });
          this.options = new RequestOptions({ headers: this.headers, search: this.params});
        }
        switch (method) {
          case 'get':
            responser = this.http.get(url, this.options);
            break;
          case 'post':
            responser = this.http.post(url, body, this.options);
            break;
          case 'put':
            responser = this.http.put(url, body, this.options);
            break;
          case 'delete':
            responser = this.http.delete(url, this.options);
            break;
          default:
            break;
        }

        responser.subscribe(response => {
          resolve(response.json());
        }, error => {
          reject(error);
        });
      });
    });

    return res;
  }


  /**
   * request feature with custom option.
   * @param {method}    string    request method, can be get, post, put, delete.
   * @param {url}       string    request url.
   * @param {options}   string    custom request options.
   * @param {body}      any       optional, the request body.
   *
   * @return            Promise   response for request.
   */
  requestWithCustomOptions(method: string, url: string, options: RequestOptions = this.options, body?: any) {
    let responser;
    switch (method) {
      case 'get':
        responser = this.http.get(url, options);
        break;
      case 'post':
        responser = this.http.post(url, body, options);
        break;
      case 'put':
        responser = this.http.put(url, body, options);
        break;
      case 'delete':
        responser = this.http.delete(url, options);
        break;
      default:
        break;
    }
    return responser.toPromise();
  }
}
