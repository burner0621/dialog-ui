import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "vb-request-documents";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}/by-user`;
    return super.list(endpoint, info);
  }

  getById(id) {
    let endpoint = `${serviceUri}/non-po/${id}`;
    return super.get(endpoint);
  }

  getPdfById(id) {
    let endpoint = `${serviceUri}/non-po/${id}`;
    return super.getPdf(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}/non-po`;
    return super.post(endpoint, data);
  }

  update(data) {
    let endpoint = `${serviceUri}/non-po/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/non-po/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getPdfById(id) {
    var endpoint = `${serviceUri}/non-po/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}
