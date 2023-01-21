import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = 'lock-transactions';

export class ServiceAccounting extends RestService {

    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, "finance");
    }

    getLastActiveLockingTransaction() {
        let endpoint = `${serviceUri}/active-lock-date/by-type/Pembelian`;
        return super.get(endpoint);
    }
}