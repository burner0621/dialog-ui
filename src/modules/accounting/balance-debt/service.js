import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "balance-debt";
const deliveryOrderServiceUri = 'balance-debt/loader';

export class Service extends RestService {
  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }
  search(info) {
    var endpoint = `${serviceUri}`;
    return super.list(endpoint, info);
  }
  searchDeliveryOrder(info) {
    var endpoint = `${deliveryOrderServiceUri}`;
    return super.list(endpoint, info);
  }
  create(data) {
    var endpoint = `${serviceUri}`;
    return super.post(endpoint, data);
  }
  getById(id) {
    var endpoint = `${serviceUri}/${id}`;
    return super.get(endpoint);
  }
}
