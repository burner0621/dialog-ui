import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUriEstimated = "weaving/estimation-productions";
const serviceUriOrder = "weaving/orders/get-by-unit-period";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "weaving");
  }

  searchOpenOrders(info) {
    var endpoint =  `${serviceUriOrder}`;
    return super.list(endpoint, info);
  }

  searchEstimatedProductions(info) {
    var endpoint = `${serviceUriEstimated}`;
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUriEstimated}/${Id}`;
    return super.get(endpoint);
  }

  getByIdEdit(Id) {
    var endpoint = `${serviceUriEstimated}/edit/${Id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUriEstimated}`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUriEstimated}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUriEstimated}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getByCode(code) {
    var endpoint = `${serviceUriEstimated}?keyword=${code}`;
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
}
