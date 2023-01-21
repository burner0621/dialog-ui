import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../utils/rest-service';

const serviceUri = 'payment-disposition-note/report';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getXls(info) {

        let endpoint = `${serviceUri}/xls?bankExpenditureId=${info.bankExpenditureId}&dispositionId=${info.dispositionId}&supplierId=${info.supplierId}&divisionId=${info.divisionId}&startDate=${encodeURIComponent(info.startDate)}&endDate=${encodeURIComponent(info.endDate)}`;
        return super.getXls(endpoint);
    }
}