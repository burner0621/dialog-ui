import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = 'weaving/machines';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "weaving");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("core");
    var _serviceUri = `master/units/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

  // getUomById(Id) {
  //   var config = Container.instance.get(Config);
  //   var _endpoint = config.getEndpoint("core");
  //   var _serviceUri = `master/uoms/${Id}`;

  //   return _endpoint.find(_serviceUri).then(result => {
  //     return result.data;
  //   });
  // }

  getMachineTypeById(Id) {
    var config = Container.instance.get(Config);
    var _endpoint = config.getEndpoint("weaving");
    var _serviceUri = `weaving/machine-types/${Id}`;

    return _endpoint.find(_serviceUri).then(result => {
      return result.data;
    });
  }

}
