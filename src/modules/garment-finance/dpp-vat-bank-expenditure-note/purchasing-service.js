import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const serviceUri = "garment-intern-notes/dpp-vat-bank-expenditures";

export class PurchasingService extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "purchasing-azure");
    }

    dppVATBankExpenditureNotes(info) {
        let endpoint = `${serviceUri}?supplierId=${info.supplierId}&currencyCode=${info.currencyCode}`;
        return super.get(endpoint);
    }
}