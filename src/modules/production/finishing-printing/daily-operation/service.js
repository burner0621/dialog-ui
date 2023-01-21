import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'finishing-printing/daily-operations';
const productionOrderServiceUri = 'sales/production-orders';
const kanbanServiceUri = 'production/kanbans';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "production-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}/by-selected-column`;
    return super.list(endpoint, info);
  }

  getData(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }

  getColumnsToSearch() {
    var endpoint = `${serviceUri}/filter-options`;
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
    return super.delete(endpoint);
  }

  getByCode(code) {
    var endpoint = `${serviceUri}?keyword=${code}`;
    return super.get(endpoint);
  }

  productionOrder(info) {
    var endpoint = `${productionOrderServiceUri}`;
    return super.list(endpoint, info);
  }

  kanban(info) {
    var endpoint = `${kanbanServiceUri}`;
    return super.list(endpoint, info);
  }
}