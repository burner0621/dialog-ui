import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import moment from 'moment';

const serviceUri = 'garment-external-purchase-orders';


export class Service extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "purchasing-azure");
    }

    search(info) {
        var endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getById(id) {
        var endpoint = `${serviceUri}/${id}`;
        return super.get(endpoint);
    }

    approve(data) {
        var endpoint = `${serviceUri}/approve`;
        return super.post(endpoint, data);
    }

    unpost(id) {
      var endpoint = `${serviceUri}/unpost/${id}`;
      return super.put(endpoint);
  }
}

export class ServiceFinance extends RestService {
  constructor(http, aggregator, config, endpoint) {
    super(http, aggregator, config, "finance");
  }

  getVbWithPO(id){
    var endpoint = `vb-request-documents/purchasing/${id}`;
    return super.get(endpoint);
  }
}
