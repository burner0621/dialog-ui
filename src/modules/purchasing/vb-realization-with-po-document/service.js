import { inject, Lazy } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { RestService } from "../../../utils/rest-service";

const serviceUri = "vb-realization-documents/with-po";
const vbRequestServiceWithPOUri = "vb-request-documents/with-po";

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    let endpoint = `${serviceUri}/by-user`;
    return super.list(endpoint, info);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getPdfById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.getPdf(endpoint);
  }

  create(data) {
    let endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }

  update(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  getSalesReceiptPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }
}

export class VBRequestDocumentService extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  getById(id) {
    let endpoint = `${vbRequestServiceWithPOUri}/${id}`;
    return super.get(endpoint);
  }
}
