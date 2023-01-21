import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service'; 

const serviceUri = 'inventory-weaving';

export class Service extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "inventory-azure");
  }

  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }
  
  search1(info) {
    var endpoint = `${serviceUri}/monitoring`;
    //var endpoint = `${serviceUri}/monitoring?bonType=${info.fromList}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.list(endpoint, info);

    console.log(info);
  }

  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
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

  generateExcelAll(info) {

    console.log(info);
    var endpoint = `${serviceUri}/xls?from=${info.fromList}&dateFrom=${info.dateFrom}&dateTo=${info.dateTo}`;
    return super.getXls(endpoint);
  }

}
