import { inject } from 'aurelia-framework';
import { HttpClient, json } from 'aurelia-fetch-client';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Config } from "aurelia-api";

@inject(HttpClient, EventAggregator, Config, "")
export class RestService {

  constructor(HttpClient, EventAggregator, config, api) {
    this.endpoint = config.getEndpoint(api);
    // this._config =config; 

    // console.log(this.endpoint.defaults);
    // console.log(this.endpoint.client.defaults);
    // const timezoneOffsetHeader = "x-timezone-offset";
    // var timezone = this.endpoint.defaults.headers["x-timezone-offset"];
    // this.endpoint.client.defaults =  this.endpoint.defaults;
    this.eventAggregator = EventAggregator;
  }

  publish(promise) {
    this.eventAggregator.publish('httpRequest', promise);
  }

  parseResult(result) {
    if (result.statusCode === 500) {
      return Promise.reject(result);
    }
    else if (result.error) {
      return Promise.reject(result.error);
    }
    else {
      return Promise.resolve(result.data)
    }
  }

  list(endpoint, info, header) {
    var _info = Object.assign({}, info);

    if (_info.order && typeof _info.order === "object")
      _info.order = JSON.stringify(_info.order);
    else
      delete _info.order;

    var promise = this.endpoint.find(endpoint, _info);
    this.publish(promise);
    return promise
      .then((result) => {
        this.publish(promise);
        return Promise.resolve(result);
      });
  }

  get(endpoint, header, info) {
    var promise = this.endpoint.find(endpoint, info)
    this.publish(promise);
    return promise
      .then((result) => {
        this.publish(promise);
        return this.parseResult(result);
      });
  }

  post(endpoint, data, header) {
    var promise = this.endpoint.post(endpoint, data);
    this.publish(promise);
    return promise
      .catch(e => {
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this.publish(promise);
        if (result)
          return this.parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  put(endpoint, data, header) {
    var promise = this.endpoint.update(endpoint, null, data);
    this.publish(promise);
    return promise
      .catch(e => {
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this.publish(promise);
        if (result)
          return this.parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  delete(endpoint, data, header) {
    var promise = this.endpoint.destroy(endpoint);
    this.publish(promise);
    return promise
      .catch(e => {
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this.publish(promise);
        if (result)
          return this.parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  patch(endpoint, data, info, header) {
    var promise = this.endpoint.patch(endpoint, info, data);
    this.publish(promise);
    return promise
      .catch(e => {
        return e.json().then(result => {
          if (result.error)
            return Promise.resolve(result);
        });
      })
      .then(result => {
        this.publish(promise);
        if (result)
          return this.parseResult(result);
        else
          return Promise.resolve({});
      })
  }

  getXls(endpoint, header) {
    var request = {
      method: 'GET',
      headers: new Headers(Object.assign({}, this.header, header, { "Accept": "application/xls", "x-timezone-offset": this.endpoint.defaults.headers["x-timezone-offset"] }))
    };
    var getRequest = this.endpoint.client.fetch(endpoint, request)
    this.publish(getRequest);

    return this._downloadFile(getRequest);
  }

  getPdf(endpoint, header) {
    var request = {
      method: 'GET',
      headers: new Headers(Object.assign({}, this.header, header, { "Accept": "application/pdf", "x-timezone-offset": this.endpoint.defaults.headers["x-timezone-offset"] }))
    };
    var getRequest = this.endpoint.client.fetch(endpoint, request)
    this.publish(getRequest);
    return this._downloadFile(getRequest);

  }

  getFile(endpoint, header) {
    var request = {
      method: 'GET',
      headers: new Headers(Object.assign({}, this.header, header, { "x-timezone-offset": this.endpoint.defaults.headers["x-timezone-offset"] }))
    };
    var getRequest = this.endpoint.client.fetch(endpoint, request)
    this.publish(getRequest);
    return this._downloadFile(getRequest);

  }

  _downloadFile(request) {
    return request
      .then(response => {
        if (response.status == 200)
          return Promise.resolve(response);
        else {
          return response.json()
            .then(result => {
              this.publish(request);
              if (typeof result.error === 'string' || result.error instanceof String) {
                return Promise.reject(new Error(result.error));
              } else {
                return Promise.reject(result.error);
              }
            });
        }
      })
      .then(response => {
        return new Promise((resolve, reject) => {
          response.blob()
            .then(blob => {
              var filename = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(response.headers.get("Content-Disposition"))[1];
              filename = filename.replace(/"/g, '');
              var fileSaver = require('file-saver');
              fileSaver.saveAs(blob, filename);
              this.publish(request);
              resolve(true);
            })
            .catch(e => reject(e));
        })
      });
  }
}