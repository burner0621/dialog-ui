import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';

const accountBankServiceUri = "master/account-banks";

export class ServiceCore extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "core");
    }

    getBankById(id) {
        let endpoint = `${accountBankServiceUri}/${id}`;
        return super.get(endpoint);
    }
}
