import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "garment-purchasing/memo";
const coreServiceUri = "master/garment-currencies";

class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    let endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  posting(data) {
    var endpoint = `${serviceUri}/posting`;
    return super.post(endpoint, data);
  }
}

class CoreService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  search(info) {
    var resource = `${coreServiceUri}/by-before-date`;
    var config = Container.instance.get(Config);
    var endpoint = config.getEndpoint("core");

    return endpoint.find(resource, info)
    .then(results => {
      return results.data;
    });

    // let promise = this.endpoint.find(uri, info);
    // this.publish(promise);
    // return promise
    //   .then((result) => {
    //     this.publish(promise);
    //     return Promise.resolve(result.data)
    //     return result.data;
    //   });

    // var config = Container.instance.get(Config);
    // var endpoint = config.getEndpoint("core");
    // return endpoint.find(resource, info)
    //     .then(results => {
    //         return results.data.map(unitPaymentOrder => {
    //             unitPaymentOrder.toString = function () {
    //                 return `${this.no}`;
    //             }
    //             return unitPaymentOrder;
    //         });
    //     });
    // return super.list(endpoint, info);
  }
}

export { Service, CoreService };