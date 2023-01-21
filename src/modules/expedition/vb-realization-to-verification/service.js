import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "vb-realization-expeditions";

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "finance");
  }

  search(info) {
    info.position = 2;
    let endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }

  searchVBToVerification(info) {
    let endpoint = `${serviceUri}/vb-realization-to-verification`;
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
    let endpoint = `${serviceUri}/vb-to-verification`;
    return super.put(endpoint, data);
  }

  update(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.put(endpoint, data);
  }

  delete(data) {
    let endpoint = `${serviceUri}/${data.Id}`;
    return super.delete(endpoint, data);
  }

  posting(data) {
    let endpoint = `${serviceUri}/posting-transaction/${data.Id}`;
    return super.put(endpoint);
  }

  postingUpdateCOA(data) {
    let endpoint = `${serviceUri}/posting-transaction-update-coa/${data.Id}`;
    return super.put(endpoint, data);
  }

  getMonths() {
    let endpoint = `${subLedgerReportServiceUri}/options/months`;
    return super.list(endpoint);
  }

  getUnpostedTransactions(month, year) {
    let endpoint = `${serviceUri}/unposted-transactions?month=${month}&year=${year}`;
    return super.list(endpoint);
  }
}
