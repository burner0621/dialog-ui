import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";
import { Container } from "aurelia-dependency-injection";
import { Config } from "aurelia-api";

const serviceUri = "vb-request-documents";

export class Service extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-user`;
    return super.list(endpoint, info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/with-po/${id}`;
    return super.get(endpoint);
  }

  create(data) {
    var endpoint = `${serviceUri}/with-po`;
    return super.post(endpoint, data);
  }

  update(data) {
    var endpoint = `${serviceUri}/with-po/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    var endpoint = `${serviceUri}/with-po/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getPdf(id) {
    var endpoint = `${serviceUri}/with-po/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}
