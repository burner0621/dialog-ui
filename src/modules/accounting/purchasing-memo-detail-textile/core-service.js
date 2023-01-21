import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';


const serviceUri = 'master/units';

export class CoreService extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "core");
  }

  getWithVBLayoutOrder(info) {
    var endpoint = `${serviceUri}/with-vb-layout-order`;
    return super.list(endpoint, info);
  }

  getById(Id) {
    var endpoint = `${serviceUri}/${Id}`;
    return super.get(endpoint);
  }

  getCurrencyByCode(currencyCode) {
    var endpoint = 'master/garment-currencies/single-by-code/' + currencyCode;
    return super.get(endpoint);
  }

}
