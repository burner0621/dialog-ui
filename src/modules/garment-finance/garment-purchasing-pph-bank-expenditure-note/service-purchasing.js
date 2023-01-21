import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "garment-purchasing-expeditions";

export class ServicePurchasing extends RestService 
  {
    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    getUnitPaymentOrders(info) {
        let endpoint = `${serviceUri}/internal-notes-details`;
        return super.list(endpoint, info);
      }
  }