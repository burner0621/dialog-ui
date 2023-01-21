import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'debt-card-report';

export class Service extends RestService {

  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "purchasing-azure");
  }

  search(info) {
    console.log(info);
    var endpoint = `${serviceUri}?month=${info.month}&year=${info.year}&suppliercode=${info.supplierCode}&suppliername=${info.suppliername}&currencyCode=${info.currencyCode}&paymentMethod=${info.paymentMethod}`;
    return super.get(endpoint);
  }

  generateExcel(info) {
    var endpoint = `${serviceUri}/download?month=${info.month}&year=${info.year}&suppliercode=${info.supplierCode}&suppliername=${info.suppliername}&currencyCode=${info.currencyCode}&currencyName=${info.currencyName}&paymentMethod=${info.paymentMethod}`;
    return super.getXls(endpoint);
  }
}
