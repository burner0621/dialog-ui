import { inject, Lazy } from 'aurelia-framework';
import { RestService } from '../../../../utils/rest-service';

const serviceUri = 'journal-transactions/report/sub-ledgers';

export class Service extends RestService {
    constructor(http, aggregator, config, endpoint) {
        super(http, aggregator, config, 'finance');
    }

    search(info) {
        console.log(info);
        let endpoint = `${serviceUri}`;
        return super.list(endpoint, info);
    }

    getMonths() {
        let endpoint = `${serviceUri}/options/months`;
        return super.list(endpoint);
    }

    getXls(info) {
        let endpoint = `${serviceUri}/download/xls?month=${info.month}&year=${info.year}&coaId=${info.coaId}`;
        return super.getXls(endpoint);
    }
    getXlsAll(query) {
        let endpoint = `${serviceUri}/download/xls?month=${query.month}&year=${query.year}`;
        return super.getXls(endpoint);
    }
}