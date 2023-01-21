import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Config } from "aurelia-api";

@inject(HttpClient, EventAggregator, Config, "")
export class RestService {

  constructor(HttpClient, EventAggregator, config, api) {
    this.endpoint = config.getEndpoint(api);
    this.eventAggregator = EventAggregator;
  }

  _publish(promise) {
    this.eventAggregator.publish('httpRequest', promise);
  }

  _parseResult(result) {
    if (result.error) {
      return Promise.reject(result.error);
    }
    else {
      return Promise.resolve(result.data)
    }
  }

  list(endpoint, info) {
    var _info = Object.assign({}, info);
    delete _info.order;
    var promise = this.endpoint.find(endpoint, _info);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then((result) => {
        this._publish(promise);
        return Promise.resolve(result);
      });
  }

  get(endpoint) {
    var promise = this.endpoint.find(endpoint)
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then((result) => {
        this._publish(promise);
        return this._parseResult(result);
      });
  }

  post(endpoint, data) {
    var promise = this.endpoint.post(endpoint, data);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  put(endpoint, data) {
    var promise = this.endpoint.update(endpoint, null, data);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  delete(endpoint, data) {
    var promise = this.endpoint.destroy(endpoint);
    this._publish(promise);
    return promise
      .catch(e => {
        this._publish(promise);
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this._publish(promise);
        if (result)
          return this._parseResult(result);
        else
          return Promise.resolve({});
      })
  }
}
