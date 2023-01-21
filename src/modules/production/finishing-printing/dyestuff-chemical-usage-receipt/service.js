import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/dyestuff-chemical-usage-receipt';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "production-azure");
  }

  search(info) {
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  getById(id) {
    let endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
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

  getPdfById(id) {
    var endpoint = `${serviceUri}/pdf/${id}`;
    return super.getPdf(endpoint);
  }

  getPrevData(strikeOffId) {
    let endpoint = `${serviceUri}/strike-off/${strikeOffId}`;
    return super.get(endpoint);
  }

}