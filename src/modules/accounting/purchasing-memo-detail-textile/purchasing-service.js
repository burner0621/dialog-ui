import {inject, Lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {RestService} from '../../../utils/rest-service';


const serviceUri = 'purchasing-dispositions/memo-loader';

export class PurchasingService extends RestService {

  constructor(http, aggregator, config, api) {
    super(http, aggregator, config, "purchasing-azure");
  }

  getUnitPaymentOrder(dispositionId) {
    var endpoint = `${serviceUri}/${dispositionId}`;
    return super.get(endpoint);
  }

}
