import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "weaving/orders";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
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

  getConstructionById(Id) {
    var config = Container.instance.get(Config);
    var constructionEndpoint = config.getEndpoint("weaving");
    var constructionServiceUri = `weaving/fabric-constructions/get-construction/${Id}`;

    return constructionEndpoint.find(constructionServiceUri).then(result => {
      return result.data;
    });
  }

  getUnitById(Id) {
    var config = Container.instance.get(Config);
    var unitEndpoint = config.getEndpoint("core");
    var unitServiceUri = `master/units/${Id}`;

    return unitEndpoint.find(unitServiceUri).then(result => {
      return result.data;
    });
  }

  getSupplierById(Id) {
    var config = Container.instance.get(Config);
    var supplierEndpoint = config.getEndpoint("weaving");
    var supplierServiceUri = `weaving/suppliers/get-supplier/${Id}`;

    return supplierEndpoint.find(supplierServiceUri).then(result => {
      return result.data;
    });
  }
}
