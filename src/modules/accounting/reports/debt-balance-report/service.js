import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'debt-balance-report';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    console.log(info);
    var endpoint = `${serviceUri}?month=${info.month}&year=${info.year}&suppliertype=${info.supplierType}&category=${info.category}`;
    return super.get(endpoint);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download?month=${info.month}&year=${info.year}&suppliertype=${info.supplierType}&category=${info.category}`;
    return super.getXls(endpoint);
  }
}
