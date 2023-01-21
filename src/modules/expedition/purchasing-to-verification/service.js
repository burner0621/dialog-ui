import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const uriPurchasingToVerification = 'expedition/purchasing-to-verification';
const uriPOE = 'purchase-orders-externals';
const uriURN = 'unit-receipt-notes';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    getURN(info) {
        let endpoint = `${uriURN}/all/by-list-of-no`;
        return super.list(endpoint, info);
    }

    getCorrectionState(unitPaymentOrderId) {
        let endpoint = `unit-payment-correction-notes/quantity-correction/correction-state-by-unit-payment-order`
        return super.list(endpoint, { unitPaymentOrderId });
    }
}

export class AzureService extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'purchasing-azure');
    }

    create(data) {
        let endpoint = `${uriPurchasingToVerification}`;
        return super.post(endpoint, data);
    }
}
